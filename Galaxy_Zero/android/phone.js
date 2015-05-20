/*

Assests load: we should name the ipad assets different names

screen height and width: 320 & 480

player starting position


*/
function preload() {

    game.load.image('bullet', 'assets/bullet-iPhone.png');
    game.load.image('enemyBullet', 'assets/enemy-bullet.png');
    game.load.spritesheet('invader', 'assets/invader32x32x4.png', 32, 32);
    game.load.image('ship', 'assets/ship.png');
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    game.load.image('starfield', 'assets/starfield.png');
    game.load.image('background', 'assets/background2.png');
    game.load.image('hp', 'assets/hp.png');	
    game.load.image('topBar', 'assets/topOverlay.png');
    game.load.image('puBullet', 'assets/puBullet-iPhone.png');
    game.load.image('powerUp', 'assets/powerUp.png');
    game.load.image('hitSpark', 'assets/powerUp.png');   
    game.load.image('enemyShip', 'assets/enemyShip.png');

}

var fonter = "14px Aero"
screenWidth = 320;
screenHeight = 480;