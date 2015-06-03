/*

Assests load: we should name the ipad assets different names

screen height and width: 320 & 480

player starting position


*/

function preload() {

    WebFontConfig = {
        google: { families: [ 'Michroma::latin' ] }
    };
    (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();

    game.load.image('bullet', 'assets/bullet-iphone.png');
    game.load.image('puBullet', 'assets/bulletpu-iphone.png');
    game.load.image('enemyBullet', 'assets/enemy-bullet-iphone.png');
    game.load.image('invader', 'assets/invader-iphone.png');
    //game.load.spritesheet('invader', 'assets/invader32x32x4.png', 32, 32);
    game.load.spritesheet('ship', 'assets/shipBank-iphone.png', 53, 55);
    game.load.spritesheet('kaboom', 'assets/explosion-iphone.png', 63, 63);
    game.load.image('background', 'assets/background-iphone.jpg');
    game.load.image('topBar', 'assets/topOverlay-iphone.png');
    
    game.load.image('powerUp', 'assets/powerUp-iphone.png');
    game.load.image('powerUpSpinner', 'assets/powerUpSpinner-iphone.png');
    game.load.spritesheet('hitSpark', 'assets/jizhong-iphone.png', 30, 52);   
    game.load.image('enemyShip', 'assets/enemy-ship-iphone.png');
    game.load.image('dialogBox', 'assets/dialog-box-iphone.png');   
    game.load.image('powerUpBlip', 'assets/weaponUpgradeHR-iphone.png');  
    game.load.image('hpMask', 'assets/hpMask-iphone.png');  

}

var fonter = "10px Michroma"
screenWidth = 320;
screenHeight = 480;





/*


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
*/