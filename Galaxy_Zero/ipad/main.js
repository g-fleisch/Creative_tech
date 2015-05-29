
var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaser-example', 
    { preload: preload, create: create, update: update, render: render });


var player;
var aliens;
var bullets;
var sparks;
var bigAlien = null;
var bulletTime = 0;
var explosions;
var background;
var score = 0;
var scoreString = '';
var scoreText;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];
var deltaShipX;
var deltaShipY;
var catchFlag = false;
var bulletCycle = 1;
var powerUp;
var seekSpeed = 20;
var powerUpNext = false;
var endGame = true;
var firing = true;
var blipDirection = 1; //replace when you do better upgrade icon
var hpMaskRect;
var bossHPBar;
var topBar;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling background
    background = game.add.tileSprite(0, 0, screenWidth, screenHeight, 'background');
    background.scale.x = 1.129;

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(20, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('width',screenWidth/320*10);
    bullets.setAll('height',screenWidth/320*50);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    puBullets = game.add.group();
    puBullets.enableBody = true;
    puBullets.physicsBodyType = Phaser.Physics.ARCADE;
    puBullets.createMultiple(20, 'puBullet');
    puBullets.setAll('anchor.x', 0.5);
    puBullets.setAll('anchor.y', 1);
    puBullets.setAll('width',screenWidth/320*10);
    puBullets.setAll('height',screenWidth/320*50);
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
    enemyBullets.callAll('body.setSize', 'body', screenWidth/320*10, screenWidth/320*10, 0, 0);

    //  The hero!
    player = game.add.sprite(screenWidth/2, screenHeight-60, 'ship');
    player.animations.add("bankL2", [1,1], 10, true);
    player.animations.add("bankL1", [2,2], 10, true);
    player.animations.add("bank0", [3,3], 10, true);
    player.animations.add("bankR1", [4,4], 10, true);
    player.animations.add("bankR2", [5,5], 10, true);
    player.animations.add("bankR3", [6,6], 10, true);

    player.animations.add("fly", [1,0], 10, true);
    player.play('fly');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.setSize(screenWidth/30,screenWidth/20,0,-10);
    player.width = screenWidth/320 * 50;
    player.height = screenWidth/320 * 75;
    
    //player.inputEnabled = true;
    //player.input.start(0, true);

    //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;
    aliens.setAll('width', screenWidth/320*64);
    aliens.setAll('height', screenWidth/320*84);
    //  The hiy sparks!
    sparks = game.add.group();
    sparks.createMultiple(15, 'hitSpark');
    sparks.setAll('anchor.x', 0.5);
    sparks.setAll('anchor.y', 0.5);
    sparks.alpha = 0.9;

    firstAliens();
    //createAliens();
    //spawnBigAlien();
    //spawnPowerUp();

  //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(15, 'kaboom');
    explosions.forEach(setupInvader, this);
    explosions.setAll('anchor.x', 0.5);
    explosions.setAll('anchor.y', 0.5);

    topBar = game.add.sprite(0, 0, 'topBar');
    topBar.width = screenWidth;
    topBar.height = screenWidth/320 * 21;
    //  The score
    scoreString = ' ';
    scoreText = game.add.text(screenWidth*4/5, screenWidth/150, scoreString + score, { font: fonter, fill: '#93FAFF' });

    //  Lives
    
    lives = game.add.group();
    //game.add.text(game.world.width - 105, 10, 'Ship Health ', { font: '18px Arial', fill: '#fff' });

    //  Text
    //stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '20px Arial', fill: '#fff' });
    //stateText.anchor.setTo(0.5, 0.5);
    //stateText.visible = false;

  
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
    var x = screenWidth/3;

    for(i = 0; i < 2; i++) {
        var alien = aliens.create(x, -50, 'invader');
        alien.anchor.setTo(0.5, 0.5);
        //alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        //alien.play('fly');
        var flyIn =  game.add.tween(alien).to( { y: screenHeight/8 }, 400, "Sine", true, 0, 0, false);
        if (score > 1000) {
            flyIn.onComplete.add(angularMovement, alien);
            if (i==1) {alien.leftOrRight = 1;}
            else {alien.leftOrRight = -1;}
        }
        x += screenWidth/3;
    }
}   

function angularMovement(thisAlien) {
        thisAlien.angularGuy = 1;  ///TESTING DIRECTION
        thisAlien.body.angularVelocity = 33 * thisAlien.leftOrRight;
}   

function createAliens() {
    var x = screenWidth/3;
    var y = 0;

    for ( i = 0; i < 5; i++) {
        var alien = aliens.create(x, y, 'invader');
        alien.anchor.setTo(0.5, 0.5);
        //alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        //alien.play('fly');
        alien.body.velocity.y = 1.25*screenHeight/2;
        x += alien.width*1;
        y -= alien.height*1.5;
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

    bigAlien = game.add.sprite( screenWidth/5, -20, 'enemyShip');
    bigAlien.sendToBack();
    bigAlien.moveUp();
    bigAlien.anchor.setTo(0.5, 0.5);
    game.physics.enable(bigAlien, Phaser.Physics.ARCADE);
    bigAlien.body.setSize(screenWidth/320*32, screenWidth/320*32,0,0);
    //bigAlien.rotation = 3.1415;
    bigAlien.bossHP = 25;


    bossHPBarBackdrop = game.add.sprite( bigAlien.x, bigAlien.y + bigAlien.height/2, 'hpMask');
    bossHPBarBackdrop.width = bigAlien.bossHP*screenWidth/125;
    bossHPBarBackdrop.height = screenWidth/50;
    bossHPBarBackdrop.alpha = 0.0;
    hpMaskRect = new Phaser.Rectangle(0, 0, bigAlien.bossHP*screenWidth/125, screenWidth/50);

    bossHPBar = game.add.sprite( bigAlien.x, bigAlien.y + bigAlien.height/2, 'hpMask');
    bossHPBar.width = bigAlien.bossHP*screenWidth/125;
    bossHPBar.height = screenWidth/50;
    bossHPBar.alpha = 0.0;
    bossHPBar.tint = 0xFF0000;
    bossHPBar.crop(hpMaskRect);


    var bossDescend = game.add.tween(bigAlien)
        .to( { y: screenHeight/3 }, 500, "Sine", false, 0, 0, false)
        .to( { x: screenWidth*7/8 }, 3000, Phaser.Easing.Linear.None, false, 150, 0, false)
        .to( { x: screenWidth*1/8 }, 3000, Phaser.Easing.Linear.None, false, 150, 0, false)
        .to( { y: screenHeight+200 }, 3000, "Sine", false, 300, 0, false)
        .start();
}

function spawnPowerUp(deadAlienX, deadAlienY) {

    powerUp = game.add.sprite( deadAlienX, deadAlienY, 'powerUp');
    powerUp.anchor.setTo(0.5, 0.5);
    game.physics.enable(powerUp, Phaser.Physics.ARCADE);
    powerUp.body.velocity.y = 50;

    powerUpSpinner = game.add.sprite( deadAlienX, deadAlienY, 'powerUpSpinner');
    powerUpSpinner.anchor.setTo(0.5, 0.5);
    game.physics.enable(powerUpSpinner, Phaser.Physics.ARCADE);
    powerUpSpinner.body.angularVelocity = 750;       

    powerUpNext = false;


}

function spawnSpark(sparksX, sparksY) {
    var spark = sparks.getFirstExists(false);
    if (spark) {
        spark.reset(sparksX, sparksY - Math.random()*screenWidth/15);
        setTimeout(function(){
            spark.kill();
        },30)
    }
}

function update() {

    aliens.forEach(function(someAlien){
        if (someAlien.angularGuy){   
            game.physics.arcade.velocityFromAngle(someAlien.angle+90, 230, someAlien.body.velocity);
        }
    })

    //  Scroll the background
    background.tilePosition.y += 2;


    if (powerUpBlip) {
        powerUpBlip.x = player.x;
        powerUpBlip.y = player.y - player.height/1.5
        powerUpBlip.alpha += blipDirection*(1-powerUpBlip.alpha)/5;
        if (powerUpBlip.alpha >= 0.99) {
            blipDirection = -1;
        }
        else if (powerUpBlip.alpha <= 0.01) {
            powerUpBlip.kill();
        }

    }

    if (powerUp) {
        game.physics.arcade.moveToObject(powerUp, player, 32 + seekSpeed);
        seekSpeed += 8;
        powerUpSpinner.body.x = powerUp.body.x-(powerUpSpinner.width-powerUp.width)/2;    
        powerUpSpinner.body.y = powerUp.body.y-(powerUpSpinner.height-powerUp.height)/2;

    }

    aliens.forEach(function(outOfThisWorld) {
        if(outOfThisWorld.x < -16 || outOfThisWorld.x > screenWidth + 16){
            outOfThisWorld.kill();
        }
    });

    if (bigAlien) {
        bossHPBar.x = bigAlien.x-screenWidth/10;
        bossHPBar.y = bigAlien.y+screenWidth/10; 
        bossHPBarBackdrop.x = bossHPBar.x;
        bossHPBarBackdrop.y = bossHPBar.y;
        //hpMaskRect.x = bossHPBar.x;
        //hpMaskRect.y = bossHPBar.y;
        bossHPBar.width = bigAlien.bossHP*screenWidth/125;
    }

    if (catchFlag && firing){
        var newX = deltaShipX + game.input.activePointer.worldX;
        var newY = deltaShipY + game.input.activePointer.worldY

        if (newX > screenWidth-player.width/2){
            newX = screenWidth-player.width/2;
        }
        else if (newX < player.width/2){
            newX = player.width/2;
        }

        if (newY > screenHeight-player.height/2){
            newY = screenHeight-player.height/2;
        }
        else if (newY < screenHeight*.15){
            newY = screenHeight*.15;
        }


        if (newX - player.x < -20){
            player.play("bankL2");
   //         player.scale = 1;
        }
        else if (newX - player.x < -4 && newX - player.x > -20){
            player.play("bankL1");
   //         player.scale = 1;
        }
    //    else if (player.x - newX < -2 && player.x - newX > -5){
    //        player.play("bank1");
    //        player.scale = 1;
    //    }
        else if (newX - player.x < 2 && newX - player.x > -4){
            player.play("bank0");
    //        player.scale = 1;
        }
        else if (newX - player.x > 2 && newX - player.x < 10){
            player.play("bankR1");
            player.body.scale = -1;
        }
        else if (newX - player.x > 10 && newX - player.x < 20){
            player.play("bankR2");
            player.body.scale = -1;
        }
        else if (newX - player.x > 20){
            player.play("bankR3");
            player.body.scale = -1;
        }
      
        console.log(newX - player.x);

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
    explosion.reset(littleEnemy.body.x, littleEnemy.body.y);
    explosion.play('kaboom', 30, false, true);

    if (powerUpNext) {
        spawnPowerUp(littleEnemy.x,littleEnemy.y);
    }

    blink(player);

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

     bigEnemy.bossHP -= 0.25;
        blinkRed(bigEnemy);

        if (bigEnemy.bossHP < 1) {
            score += 1000;
            scoreText.text = scoreString + score;
            bigEnemy.kill();
            var explosion = explosions.getFirstExists(false);
            explosion.reset(bigEnemy.body.x+32, bigEnemy.body.y+32);
            explosion.play('kaboom', 30, false, true);
            postviewStageAppearHelper();
            firing = false;
            endGame = false;
        }

    blink(player);

}

function powerUpPlayer(powerUp, player) {
    powerUp.kill();
    powerUpSpinner.kill();
    bullets = puBullets;
    powerUpBlip();
}

function powerUpBlip() {
    powerUpBlip = game.add.sprite( player.x, player.y-player.height/1.5, 'powerUpBlip');
    powerUpBlip.anchor.setTo(0.5, 0.5);
    game.physics.enable(powerUpBlip, Phaser.Physics.ARCADE);
    powerUpBlip.alpha = 0.05;
}

function render() {

   // game.debug.geom(hpMaskRect);
    game.debug.body(player);

}

function collisionBossman(bigBoss, bullet) {
    //bullet.kill();
    if (bigBoss.body.y > 30) {
        bullet.kill();
        bossHPBar.alpha = 0.70;
        bossHPBarBackdrop.alpha = 0.25;

        hpMaskRect.width = bigAlien.bossHP*screenWidth/125;
        hpMaskRect.height = screenWidth/50;
        bossHPBar.updateCrop();

        spawnSpark(bullet.x, bigBoss.y);

        bigBoss.bossHP -= 1;
        blinkRed(bigBoss);

        if (bigBoss.bossHP < 1) {
            score += 1000;
            scoreText.text = scoreString + score;

            bigBoss.kill();
            bossHPBar.kill();
            bossHPBarBackdrop.kill();

            var explosion = explosions.getFirstExists(false);
            explosion.reset(bigBoss.body.x+32, bigBoss.body.y+32);
            explosion.play('kaboom', 30, false, true);


            setTimeout(function(){    
                postviewStageAppearHelper();
                firing = false;
                endGame = false;
            }, 1500)
                

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
    game.time.events.repeat(50,2, function(){
       
        if(thatGuy.tint == 0xFFFFFF){
            thatGuy.tint = 0xFF0000;
        }
        else if(thatGuy.tint == 0xFF0000){
            thatGuy.tint = 0xFFFFFF;
        }
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
        explosion.play('kaboom', 24, false, true);

        if (powerUpNext) {
            spawnPowerUp(alien.x,alien.y-screenWidth/5);
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
    //var explosion = explosions.getFirstExists(false);
    //explosion.reset(player.body.x+32, player.body.y+12);
    //explosion.play('kaboom', 45, false, true);

}

function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);
    if (enemyBullet && bigAlien && bigAlien.bossHP > 0 && bigAlien.y < screenHeight/3+5) {
        enemyBullet.reset(bigAlien.x, bigAlien.y)
        enemyBullet.body.velocity.y = 200;
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
                bullet.reset(player.x, player.y + 8*screenWidth/320);
                bullet.body.velocity.y = -600*screenWidth/320;
                bulletCycle = 2;
            }
            else if (bulletCycle == 2) {
            //Fire Two Bullets  
                bullet.reset(player.x-8*screenWidth/320, player.y + 8*screenWidth/3208);
                bullet.body.velocity.y = -600*screenWidth/320;
                bullet = bullets.getFirstExists(false);
                if (bullet) {
                    // And fire it
                    bullet.reset(player.x+12, player.y + 8);
                    bullet.body.velocity.y = -600*screenWidth/320;
                }
                bulletCycle = 1;
            }
        }
        bulletTime = game.time.now + 120;
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
    //dialogappearhelper();
    dialogBox = game.add.sprite( -1 * screenWidth/2, screenHeight/3, 'dialogBox');
    dialogBox.anchor.setTo(0.5, 0.5);
    game.physics.enable(dialogBox, Phaser.Physics.ARCADE);
  
    var dialogBoxSlideIn = game.add.tween(dialogBox)
        .to( { x: screenWidth/2 }, 500, "Sine", false, 0, 0, false)
    //    .to( { x: screenWidth*7/8 }, 3000, Phaser.Easing.Linear.None, false, 150, 0, false)
    //    .to( { x: screenWidth*1/8 }, 3000, Phaser.Easing.Linear.None, false, 150, 0, false)
        .to( { x:-1 *  screenWidth/2 }, 500, "Sine", false, 2500, 0, false)
        .start();

    }, timelinetime+3000)
    timelinetime += 3000;
 
    setTimeout(function(){    
        firstAliens()
    }, timelinetime + 4000)
    timelinetime += 4000;
    
    setTimeout(function(){    
        firstAliens()
        powerUpNext = true;
    }, timelinetime+ 1000)
    timelinetime += 1000;

    setTimeout(function(){       
        firstAliens()
    }, timelinetime+ 1000)
    timelinetime += 1000;

    setTimeout(function(){    
        createAliens();  
    },timelinetime+1500); 
    timelinetime += 1500;

    setTimeout(function(){    
        spawnBigAlien();
    }, timelinetime+ 2500)
    timelinetime += 2500;
 
    setTimeout(function(){ 
        firing = false;
    }, timelinetime+ 9500)
    timelinetime += 9500;
       
    setTimeout(function(){ 
        if (endGame){ postviewStageAppearHelper(); }
    }, timelinetime+ 1000)

}