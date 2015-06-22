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

    game.load.crossOrigin = 'anonymous';

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
    game.load.image('shipThruster', 'assets/shipThruster-iphone.png');  

}

var fonter = "10px Michroma"
screenWidth = 320;
screenHeight = 480;

