
var game = new Phaser.Game(320, 480, Phaser.AUTO, 'phaser-example', 
    { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('enemyBullet', 'assets/enemy-bullet.png');
    game.load.spritesheet('invader', 'assets/invader32x32x4.png', 32, 32);
    game.load.image('ship', 'assets/ship.png');
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    game.load.image('starfield', 'assets/starfield.png');
    game.load.image('background', 'assets/background2.png');
    game.load.image('hp', 'assets/hp.png');
    game.load.image('topBar', 'assets/topOverlay.png');


}

var player;
var aliens;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];
var oddEvenBullet = 1;
var deltaShipX;
var deltaShipY;
var catchFlag = false;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 320, 480, 'starfield');

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(20, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(20, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  The hero!
    player = game.add.sprite(160, 420, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    //player.inputEnabled = true;
    //player.input.start(0, true);

    //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    createAliens();
    spawnBigAlien();

    game.add.sprite(0, 0, 'topBar');

    //  The score
    scoreString = ' ';
    scoreText = game.add.text(265, 4, scoreString + score, { font: '11px Arial', fill: /* MOST */ '#def' });

    //  Lives
    lives = game.add.group();
    //game.add.text(game.world.width - 105, 10, 'Ship Health ', { font: '18px Arial', fill: '#fff' });

    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '20px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 15; i++) 
    {
        var hp = lives.create(game.world.width - 10 - (20 * i), 10, 'hp');
        hp.anchor.setTo(1, 1);
        hp.angle = 0;
        hp.alpha = 0.0;
    }

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(15, 'kaboom');
    explosions.forEach(setupInvader, this);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    game.input.onDown.add(touchStart);
    game.input.onUp.add(touchEnd);
}

function touchStart (){

    deltaShipX = player.x - game.input.activePointer.worldX;
    deltaShipY = player.y - game.input.activePointer.worldY;
    console.log(player.x);
    console.log(player.y);
    catchFlag = true;

}

function touchEnd (){

    catchFlag = false;

}


function createAliens () {

    for (var y = 0; y < 3; y++)
    {
        for (var x = 0; x < 5; x++)
        {
            var alien = aliens.create(x * 48, y * 50, 'invader');
            alien.anchor.setTo(0.5, 0.5);
            alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            alien.play('fly');
            alien.body.moves = false;
        }
    }

    aliens.x = 50;
    aliens.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving
    // the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(aliens).to( { x: 100 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);

    //  When the tween loops it calls descend
    tween.onLoop.add(descend, this);

}

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}

function descend() {

    aliens.y += 10;

}

function spawnBigAlien() {

    bigAlien = game.add.sprite( 160, -20, 'ship');
    bigAlien.anchor.setTo(0.5, 0.5);
    game.physics.enable(bigAlien, Phaser.Physics.ARCADE);
    bigAlien.rotation = 3.1415;
    bigAlien.bossHP = 20;

    var bossDescend = game.add.tween(bigAlien)
        .to( { y: 300 }, 800, "Sine", false, 4000, 0, false)
        .to( { x: 280 }, 3000, "Sine", false, 0, 0, false)
        .to( { x: 35 }, 6000, "Sine", false, 0, -1, true)
        .start();
}

function update() {

    //  Scroll the background
    starfield.tilePosition.y += 4;

    if (catchFlag){

       player.x = deltaShipX + game.input.activePointer.worldX;
       player.y = deltaShipY + game.input.activePointer.worldY;

    }

    if (player.alive) {
    //Auto fire at 2.5 into the game
        if (game.time.now > 2500) {
            fireBullet();
        }
    //Enemies fire timer
        if (game.time.now > firingTimer) {
            enemyFires(); 
        }
    //  Run collision
        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
        game.physics.arcade.overlap(bullets, bigAlien, collisionBoss, null, this);
        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
    }
}

function render() {
}

function collisionBoss(bigBoss, bullet) {
    //bullet.kill();
    bullet.kill();

    score += 5;
    scoreText.text = scoreString + score;

    bigBoss.bossHP -= 1;
    console.log(bigBoss.bossHP);
    if (bigBoss.bossHP < 1) {
        score += 1000;
        scoreText.text = scoreString + score;
        bigBoss.kill();
        var explosion = explosions.getFirstExists(false);
        explosion.reset(bigBoss.body.x+32, bigBoss.body.y+32);
        explosion.play('kaboom', 30, false, true);
    }
}

function collisionHandler (alien, bullet) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);

    if (aliens.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = scoreString + score;

        enemyBullets.callAll('kill',this);
        //stateText.text = " You Won, \n Click to restart";
        //stateText.visible = true;

        //the "click to restart" handler
        //game.input.onTap.addOnce(restart,this);
    }

}

function enemyHitsPlayer (player,bullet) {
    
    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x+32, player.body.y+12);
    explosion.play('kaboom', 45, false, true);

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }

}

function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    aliens.forEachAlive(function(alien){

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,120);
        firingTimer = game.time.now + 1500;
    }

}

var bulletCycle = 1;

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime) {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);
        if (bullet) {
            //  And fire one bullet
            if (bulletCycle == 1) {
                bullet.reset(player.x, player.y + 8);
                bullet.body.velocity.y = -600;
                bulletCycle = 2;
            }
            else if (bulletCycle == 2) {
            //Fire Two Bullets  
                bullet.reset(player.x-12, player.y + 8);
                bullet.body.velocity.y = -600;
                bullet = bullets.getFirstExists(false);
                if (bullet) {
                    // And fire it
                    bullet.reset(player.x+12, player.y + 8);
                    bullet.body.velocity.y = -600;
                }
                bulletCycle = 1;
            }
        }
        bulletTime = game.time.now + 100;
    }

}

function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

function restart () {

    //  A new level starts
    
    //resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    aliens.removeAll();
    createAliens();

    //revives the player
    player.revive();
    //hides the text
    stateText.visible = false;

}
