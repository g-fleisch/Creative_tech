/*

Assests load: we should name the ipad assets different names

screen height and width: 320 & 480

player starting position


*/
function preload() {

    game.load.image('bullet', 'assets/bullet-ipad.png');
    game.load.image('puBullet', 'assets/bulletpu-ipad.png');
    game.load.image('enemyBullet', 'assets/enemy-bullet-ipad.png');
    game.load.image('invader', 'assets/invader_ipad.png');
    //game.load.spritesheet('invader', 'assets/invader32x32x4.png', 32, 32);
    game.load.spritesheet('ship', 'assets/shipBank.png', 106, 110);
    game.load.spritesheet('kaboom', 'assets/explosions.png', 125, 125);
    game.load.image('background', 'assets/background_city.jpg');
    game.load.image('hp', 'assets/hp.png'); 
    game.load.image('topBar', 'assets/topOverlay.png');
    
    game.load.image('powerUp', 'assets/powerUp-iPhone.png');
    game.load.image('powerUpSpinner', 'assets/powerUpSpinner-iPhone.png');
    game.load.image('hitSpark', 'assets/hitSpark-iPhone.png');   
    game.load.image('enemyShip', 'assets/enemy-ship_ipad.png');
    game.load.image('dialogBox', 'assets/dialog-iPhone.png');   
    game.load.image('powerUpBlip', 'assets/weaponUpgradeBlip-iPhone.png');  
    game.load.image('hpMask', 'assets/hpMask-iPhone.png');  

}

var fonter = "24px Aero"
screenWidth = 768;
screenHeight = 1024;
