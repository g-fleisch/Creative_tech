
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
    game.load.image('powerUp', 'assets/powerUp.png');    
    game.load.image('puBullet', 'assets/puBullet.png');
    game.load.image('enemyShip', 'assets/enemyShip.png');

}

var player;
var aliens;
var bullets;
var bigAlien = null;
var bulletTime = 0;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];
var oddEvenBullet = 1;
var deltaShipX;
var deltaShipY;
var catchFlag = false;
var bulletCycle = 1;
var powerUp;
var seekSpeed = 20;
var powerUpNext = false;
var endGame = true;
var firing = true;

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

    puBullets = game.add.group();
    puBullets.enableBody = true;
    puBullets.physicsBodyType = Phaser.Physics.ARCADE;
    puBullets.createMultiple(20, 'puBullet');
    puBullets.setAll('anchor.x', 0.5);
    puBullets.setAll('anchor.y', 1);
    puBullets.setAll('outOfBoundsKill', true);
    puBullets.setAll('checkWorldBounds', true);

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
    player = game.add.sprite(174, 420, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    //player.inputEnabled = true;
    //player.input.start(0, true);

    //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;


    firstAliens();
    //createAliens();
    //spawnBigAlien();
    //spawnPowerUp();

  //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(15, 'kaboom');
    explosions.forEach(setupInvader, this);

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

    for (var i = 0; i < 15; i++) {
        var hp = lives.create(game.world.width - 10 - (20 * i), 10, 'hp');
        hp.anchor.setTo(1, 1);
        hp.angle = 0;
        hp.alpha = 0.0;
    }

  
    //  And some controls to play the game with
    game.input.onDown.add(touchStart);
    game.input.onUp.add(touchEnd);
}

function touchStart() { 

    deltaShipX = player.x - game.input.activePointer.worldX;
    deltaShipY = player.y - game.input.activePointer.worldY;

    catchFlag = true;

}

function touchEnd() {

    catchFlag = false;

}

function firstAliens() {
    var x = 100;

    for(i = 0; i < 2; i++) {
        var alien = aliens.create(x, -50, 'invader');
        alien.anchor.setTo(0.5, 0.5);
        alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        alien.play('fly');
        var flyIn =  game.add.tween(alien).to( { y: 85 }, 500, "Sine", true, 0, 0, false);
        if (score > 1000) {
            flyIn.onComplete.add(angularMovement, alien);
            if (i==1) {alien.leftOrRight = 1;}
            else {alien.leftOrRight = -1;}
        }
        x += 140;
    }
}   

function angularMovement(thisAlien) {
        thisAlien.angularGuy = 1;  ///TESTING DIRECTION
        thisAlien.body.angularVelocity = 25 * thisAlien.leftOrRight;
}   


function createAliens() {
    var x = 85;
    var y = 0;

    for ( i = 0; i < 5; i++) {
        var alien = aliens.create(x, y, 'invader');
        alien.anchor.setTo(0.5, 0.5);
        alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        alien.play('fly');
        alien.body.velocity.y = 100;
        x += 40;
        y -= 45;
    }

    aliens.x = 0;
    aliens.y = 0;

    //  All this does is basically start the invaders moving. Notice we're moving
    // the Group they belong to, rather than the invaders directly.
    // var tween = game.add.tween(aliens).to( { x: 100 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);


}

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}

function spawnBigAlien() {

    bigAlien = game.add.sprite( 60, -20, 'enemyShip');
    bigAlien.sendToBack();
    bigAlien.moveUp();
    bigAlien.anchor.setTo(0.5, 0.5);
    game.physics.enable(bigAlien, Phaser.Physics.ARCADE);
    bigAlien.rotation = 3.1415;
    bigAlien.bossHP = 25;

    var bossDescend = game.add.tween(bigAlien)
        .to( { y: 110 }, 500, "Sine", false, 4000, 0, false)
        .to( { x: 280 }, 3000, Phaser.Easing.Linear.None, false, 150, 0, false)
        .to( { x: 60 }, 3000, Phaser.Easing.Linear.None, false, 150, 0, false)
        .to( { y: 550 }, 3000, "Sine", false, 300, 0, false)
        .start();
}

function spawnPowerUp(deadAlienX, deadAlienY) {

    powerUp = game.add.sprite( deadAlienX, deadAlienY, 'powerUp');
    powerUp.anchor.setTo(0.5, 0.5);
    game.physics.enable(powerUp, Phaser.Physics.ARCADE);
    powerUp.body.velocity.y = 50;
    powerUpNext = false;
}

function update() {

    aliens.forEach(function(someAlien){
        if (someAlien.angularGuy){   
            game.physics.arcade.velocityFromAngle(someAlien.angle+90, 140, someAlien.body.velocity);
        }
    })

    //  Scroll the background
    starfield.tilePosition.y += 4;

    if (powerUp) {
        game.physics.arcade.moveToObject(powerUp, player, seekSpeed);
        seekSpeed ++;
    }
/*    aliens.forEach(function(outOfThisWorld) {
        if(!outOfThisWorld.inWorld){
            outOfThisWorld.kill();
        }
    });
*/
    if (catchFlag && firing){
        var newX = deltaShipX + game.input.activePointer.worldX;
        var newY = deltaShipY + game.input.activePointer.worldY

        if (newX > 290){
            newX = 290;
        }
        else if (newX < 30){
            newX = 30;
        }

        if (newY > 444){
            newY = 444;
        }
        else if (newY < 60){
            newY = 60;
        }

        player.x = newX;
        player.y = newY;
        
        deltaShipX = player.x - game.input.activePointer.worldX;
        deltaShipY = player.y - game.input.activePointer.worldY;

    }

    if (player.alive) {
    //Auto fire at 2.5 into the game
        if (game.time.now > 2500 && firing) {
            fireBullet();
        }
    //Enemies fire timer
        if (game.time.now > firingTimer) {
            enemyFires(); 
        }
    //  Run collision
        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
        game.physics.arcade.overlap(bullets, bigAlien, collisionBossman, null, this);
        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
        game.physics.arcade.overlap(aliens, player, enemyCrashPlayer, null, this);
        game.physics.arcade.overlap(bigAlien, player, bigEnemyCrashPlayer, null, this);
        game.physics.arcade.overlap(powerUp, player, powerUpPlayer, null, this);


    }
}

function enemyCrashPlayer(player, littleEnemy) {
    littleEnemy.kill();

    score += 20;
    scoreText.text = scoreString + score;
    
    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);

    if (powerUpNext) {
        spawnPowerUp(alien.x,alien.y);
    }

    if (aliens.countLiving() == 0) {
        score += 1000;
        scoreText.text = scoreString + score;
        enemyBullets.callAll('kill',this);
        if (score >1000 && score < 1155){
            timeline();
            //spawnPowerUp(alien.
        }
    }
}

function bigEnemyCrashPlayer(bigEnemy, player) {
    bigEnemy.kill();
    blinkRed(player);
    var explosion = explosions.getFirstExists(false);
    explosion.reset(bigEnemy.body.x, bigEnemy.body.y);
    explosion.play('kaboom', 30, false, true);

}

function powerUpPlayer(powerUp, player) {
    powerUp.kill();
    bullets = puBullets;
}

function render() {

}

function collisionBossman(bigBoss, bullet) {
    //bullet.kill();
    if (bigBoss.body.y > 30) {
        bullet.kill();

        bigBoss.bossHP -= 1;
        blinkRed(bigBoss);

        if (bigBoss.bossHP < 1) {
            score += 1000;
            scoreText.text = scoreString + score;
            bigBoss.kill();
            var explosion = explosions.getFirstExists(false);
            explosion.reset(bigBoss.body.x+32, bigBoss.body.y+32);
            explosion.play('kaboom', 30, false, true);
            postviewStageAppearHelper();
            firing = false;
            endGame = false;
        }
    }
}

function blink(thisGuy) {
    game.time.events.repeat(100,8, function(){
        if(thisGuy.alpha == 0.5){
            thisGuy.alpha = 1;
        }
        else if(thisGuy.alpha == 1){
            thisGuy.alpha = 0.5;
        }
    }, this);
}

function blinkRed(thatGuy) {
    game.time.events.repeat(10,2, function(){
       
        if(thatGuy.tint == 0xFFFFFF){
            thatGuy.tint = 0xFF0000;
        }
        else if(thatGuy.tint == 0xFF0000){
            thatGuy.tint = 0xFFFFFF;
        }
//

















































        //fdgfdgf
    }, this);
}

function collisionHandler (alien, bullet) {
    if (alien.body.y > 20) {
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
`
        if (powerUpNext) {
            spawnPowerUp(alien.x,alien.y);
        }

        if (aliens.countLiving() == 0) {
            score += 1000;
            scoreText.text = scoreString + score;
            enemyBullets.callAll('kill',this);
            if (score >1000 && score < 1155){
                timeline();
                //spawnPowerUp(alien.x, alien.y);
            }
        }
    }
}

function enemyHitsPlayer (player,bullet) {
    
    bullet.kill();
    blink(player);

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x+32, player.body.y+12);
    explosion.play('kaboom', 45, false, true);

}

function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);
    if (enemyBullet && bigAlien && bigAlien.bossHP > 0 && bigAlien.y < 111) {
        enemyBullet.reset(bigAlien.x, bigAlien.y)
        enemyBullet.body.velocity.y = 150;
        firingTimer = game.time.now + 1260;
    }

}

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

function timeline(){
    
    var timelinetime = 0; 

    setTimeout(function(){    
        createAliens();  

    },timelinetime+800); 
    timelinetime += 800;

    setTimeout(function(){    
        
        //DROP OVERLAY FUNCTION FOR THE DIALOG BOX (SENCHA CODE)

    }, timelinetime+3000)
    timelinetime += 3000;
 
    setTimeout(function(){    
        firstAliens()
    }, timelinetime+ 1000)
    timelinetime += 1000;
    
    setTimeout(function(){    
        firstAliens()
    }, timelinetime+ 1000)
    timelinetime += 1000;

    setTimeout(function(){       
        firstAliens()
        powerUpNext = true;
    }, timelinetime+ 1000)
    timelinetime += 1000;

    setTimeout(function(){    
        createAliens();  
    },timelinetime+1500); 
    timelinetime += 1500;

    setTimeout(function(){    
        spawnBigAlien();
    }, timelinetime+ 1000)
    timelinetime += 1000;
 
    setTimeout(function(){ 
        firing = false;
    }, timelinetime+ 13000)
    timelinetime += 13000;
       
    setTimeout(function(){ 
        if (endGame){ postviewStageAppearHelper(); }
    }, timelinetime+ 1000)
    timelinetime += 1000;

}

