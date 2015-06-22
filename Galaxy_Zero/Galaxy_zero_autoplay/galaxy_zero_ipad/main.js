
var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaser-example', 
    { preload: preload, create: create, update: update, render: render });


var player;
var playership;
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
var firing = false;
var blipDirection = 1; //replace when you do better upgrade icon
var hpMaskRect;
var bossHPBar;
var topBar;
var lThrust;
var rThrust;
var delayTime=0;

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
    puBullets.setAll('width',screenWidth/320*20);
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

    //The thrusters
    lThrust = game.add.sprite(screenWidth/2, screenHeight* 0.8, 'shipThruster');
    rThrust = game.add.sprite(screenWidth/2, screenHeight* 0.8, 'shipThruster');
    lThrust.anchor.setTo(0.25,-0.25);
    rThrust.anchor.setTo(0.75,-0.25); 

    //  The hero!
    player = game.add.sprite(screenWidth/2, screenHeight* 0.8, 'ship');
    player.animations.add("bank0", [0,0], 100, true);
    player.animations.add("bankR1", [1,1], 100, true);
    player.animations.add("bankR2", [2,2], 100, true);
    player.animations.add("bankR3", [3,3], 100, true);

    player.play('bank0');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.setSize(screenWidth/30,screenWidth/20,0,-10);
    player.width = screenWidth/320 * 50;
    player.height = screenWidth/320 * 60;


    //player.inputEnabled = true;
    //player.input.start(0, true);

    //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;
    aliens.setAll('width', screenWidth/768*64);
    aliens.setAll('height', screenWidth/768*84);
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

    //An explosion pool
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
    scoreText = game.add.text(screenWidth*4.25/5, screenWidth/150*2, scoreString + score, { font: fonter, fill: '#93FAFF' });
    scoreWord = game.add.text(screenWidth*3.55/5, screenWidth/150*2, "SCORE", { font: fonter, fill: '#93FAFF' });
    //  And some controls to play the game with
    game.input.onDown.add(touchStart);
    game.input.onUp.add(touchEnd);
}

function startGame() {
    firing = true;
    showTutorial();
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
    bigAlien.width = screenWidth/320*54;
    bigAlien.height = screenWidth/320*48;
    bigAlien.body.setSize(screenWidth/15,screenWidth/15,0,-10);
    //bigAlien.rotation = 3.1415;
    bigAlien.bossHP = 25;

    mixpanel.track(environment + " - boss spawns", properties);

    bossHPBarBackdrop = game.add.sprite( bigAlien.x, bigAlien.y + bigAlien.height/2, 'hpMask');
    bossHPBarBackdrop.width = 25*screenWidth/125;
    bossHPBarBackdrop.height = screenWidth/50;
    bossHPBarBackdrop.alpha = 0.0;
    hpMaskRect = new Phaser.Rectangle(0, 0, bigAlien.bossHP*screenWidth/125, screenWidth/50);

    bossHPBar = game.add.sprite( bigAlien.x, bigAlien.y + bigAlien.height/2, 'hpMask');
    bossHPBar.width = 25*screenWidth/125;
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
    powerUp.width = screenWidth/320 * 24;
    powerUp.height = screenWidth/320 * 24;

    powerUpSpinner = game.add.sprite( deadAlienX, deadAlienY, 'powerUpSpinner');
    powerUpSpinner.anchor.setTo(0.5, 0.5);
    game.physics.enable(powerUpSpinner, Phaser.Physics.ARCADE);
    powerUpSpinner.body.angularVelocity = 750;       
    powerUpSpinner.width = screenWidth/320 * 32;
    powerUpSpinner.height = screenWidth/320 * 32;

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
    if(score < 10){
        scoreText.text = score;
    }

    if (powerUpBlip) {
        //powerUpBlip.x = player.x;
        //powerUpBlip.y = player.y - player.height/1.5
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
        //bossHPBar.width = bigAlien.bossHP*screenWidth/125;
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
            player.play("bankR3");
            player.scale.x = -1;
        }
        else if (newX - player.x < -10 && newX - player.x > -20){
            player.play("bankR2");
            player.scale.x = -1;
        }
        else if (newX - player.x < -2 && player.x - newX > -10){
            player.play("bankR1");
            player.scale.x = -1;
        }
        else if (newX - player.x < 2 && newX - player.x > -2){
            player.play("bank0");
            //player.scale.x = -1;
        }
        else if (newX - player.x > 2 && newX - player.x < 10){
            player.play("bankR1");
            player.scale.x = 1;
        }
        else if (newX - player.x > 10 && newX - player.x < 20){
            player.play("bankR2");
            player.scale.x = 1;
        }
        else if (newX - player.x > 20){
            player.play("bankR3");
            player.scale.x = 1;
        }

        lThrust.x = newX;
        lThrust.y = newY + screenWidth/100;
        rThrust.x = newX;
        rThrust.y = newY + screenWidth/100;

        player.x = newX;
        player.y = newY;
        
        deltaShipX = player.x - game.input.activePointer.worldX;
        deltaShipY = player.y - game.input.activePointer.worldY;
    }

    if (firing) {
        delayTime ++
        if (lThrust.alpha > 0.75 && delayTime > 1) {
            lThrust.alpha = 0.65;
            rThrust.alpha = 1;
            delayTime = 0;
        }
        if (lThrust.alpha < 0.75 && delayTime > 1) {
            lThrust.alpha = 1;
            rThrust.alpha = 0.65;
            delayTime = 0;
        }
    }


    if (player.alive) {
    //Auto fire at 2.5 into the game
        if (firing) {
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
    
    if(score == 20) { mixpanel.track(environment + " - first enemy kill", properties);}

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
            mixpanel.track(environment + " - first two enemies killed", properties);
        }
    }
}

function bigEnemyCrashPlayer(bigEnemy, player) {
    if (bigEnemy.body.y > 30) {
        bossHPBar.alpha = 0.70;
        bossHPBarBackdrop.alpha = 0.25;

        hpMaskRect.width = bigAlien.bossHP*screenWidth/320;
        hpMaskRect.height = screenWidth/50;
        bossHPBar.updateCrop();

        spawnSpark(bullet.x, bigEnemy.y);

        bigEnemy.bossHP -= 0.25;
        blinkRed(bigEnemy);

        if (bigEnemy.bossHP < 1) {
            score += 1000;
            scoreText.text = scoreString + score;

            bigEnemy.kill();
            bossHPBar.kill();
            bossHPBarBackdrop.kill();

            mixpanel.track(environment + " - kill boss", properties);


            for(i=0; i<10; i++){
                setTimeout(function(){    
                    var explosion = explosions.getFirstExists(false);
                    explosion.reset(bigEnemy.body.x + Math.random()*bigEnemy.width*2, bigEnemy.body.y + Math.random()*bigEnemy.width*2);
                    explosion.play('kaboom', 24, false, true);
                }, 100*i)
            }           


            setTimeout(function(){    
                postviewStageAppearHelper();
                firing = false;
                endGame = false;
            }, 1500)
                

        }
    }

    blink(player);

}

function powerUpPlayer(powerUp, player) {
    powerUp.kill();
    powerUpSpinner.kill();
    bullets = puBullets;
    powerUpBlip();
    mixpanel.track(environment + " - power-up get", properties);
}

function powerUpBlip() {
    powerUpBlip = game.add.sprite( player.x, player.y-player.height/1.5, 'powerUpBlip');
    powerUpBlip.anchor.setTo(0.5, 0.5);
    game.physics.enable(powerUpBlip, Phaser.Physics.ARCADE);
    powerUpBlip.alpha = 0.05;
    powerUpBlip.width = player.width * 1.0;
    powerUpBlip.height = player.width * 0.5;
    powerUpBlip.scale.x = 1;
    powerUpBlip.scale.y = 1;
}

function render() {

    //game.debug.geom(hpMaskRect);
//    if (bigAlien){game.debug.body(bigAlien);}

}

function collisionBossman(bigBoss, bullet) {
    //bullet.kill();
    if (bigBoss.body.y > 30) {
        bullet.kill();
        bossHPBar.alpha = 0.70;
        bossHPBarBackdrop.alpha = 0.25;

        hpMaskRect.width = bigAlien.bossHP*screenWidth/320;
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
            mixpanel.track(environment + " - boss kill", properties);


            for(i=0; i<10; i++){
                setTimeout(function(){    
                    var explosion = explosions.getFirstExists(false);
                    explosion.reset(bigBoss.body.x + Math.random()*bigBoss.width*2, bigBoss.body.y + Math.random()*bigBoss.width*2);
                    explosion.play('kaboom', 24, false, true);
                }, 100*i)
            }


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

function collisionHandler (bullet, alien) {
    if (alien.body.y > 20) {
        //  When a bullet hits an alien we kill them both
        bullet.kill();
        alien.kill();
    
        //  Increase the score
        score += 20;
        scoreText.text = scoreString + score;
    
        if(score == 20) { mixpanel.track(environment + " - first enemy kill", properties);}

        //  And create an explosion :)

        var explosion = explosions.getFirstExists(false);
        explosion.reset(alien.body.x + screenWidth/320 * 16, alien.body.y + screenWidth/320 * 16);
        explosion.play('kaboom', 30, false, true);       


        if (powerUpNext) {
            spawnPowerUp(alien.x,alien.y-screenWidth/5);
        }

        if (aliens.countLiving() == 0) {
            score += 1000;
            scoreText.text = scoreString + score;
            enemyBullets.callAll('kill',this);
            if (score >1000 && score < 1155){
                timeline();
                mixpanel.track(environment + " - first two enemies killed", properties);
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
                    bullet.reset(player.x+14, player.y + 8);
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
    //DROP OVERLAY FUNCTION FOR THE DIALOG BOX
    //dialogappearhelper();
    dialogBox = game.add.sprite( -1 * screenWidth/2, screenHeight/3.3, 'dialogBox');
    dialogBox.width = screenWidth * 0.8;
    dialogBox.height = screenWidth * 0.218;
    dialogBox.anchor.setTo(0.5, 0.5);
    game.physics.enable(dialogBox, Phaser.Physics.ARCADE);    
    mixpanel.track(environment + " - dialog box", properties);

  
    var dialogBoxSlideIn = game.add.tween(dialogBox)
        .to( { x: screenWidth/2 }, 500, "Sine", false, 0, 0, false)
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