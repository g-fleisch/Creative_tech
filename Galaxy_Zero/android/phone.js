/*

Assests load: we should name the ipad assets different names

screen height and width: 320 & 480

player starting position


*/
function preload() {

    game.load.image('bullet', 'assets/playerBullet.png');
    game.load.image('enemyBullet', 'assets/enemyBulletHR.png');
    game.load.image('invader', 'assets/invader-iPhone.png');
    //game.load.spritesheet('invader', 'assets/invader32x32x4.png', 32, 32);
    game.load.spritesheet('ship', 'assets/ship-iPhone-spritesheet.png', 50, 75);
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    game.load.image('starfield', 'assets/background.png');
    game.load.image('background', 'assets/background2.png');
    game.load.image('hp', 'assets/hp.png');	
    game.load.image('topBar', 'assets/topOverlay.png');
    game.load.image('puBullet', 'assets/puBullet-iPhone.png');
    game.load.image('powerUp', 'assets/powerUp-iPhone.png');
    game.load.image('powerUpSpinner', 'assets/powerUpSpinner-iPhone.png');
    game.load.image('hitSpark', 'assets/hitSpark-iPhone.png');   
    game.load.image('enemyShip', 'assets/enemyShip-iPhone.png');
    game.load.image('dialogBox', 'assets/dialog-iPhone.png');	
    game.load.image('powerUpBlip', 'assets/weaponUpgradeBlip-iPhone.png');	
    game.load.image('hpMask', 'assets/hpMask-iPhone.png');	
	game.load.spritesheet('shipBank', 'assets/shipBank.png', 110, 106);
    game.load.image('thrusters', 'assets/thrusters.png');	

}

var fonter = "14px Aero"
screenWidth = 320;
screenHeight = 480;
