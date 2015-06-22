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

    function loadCanvas(dataURL) {
        
        var context = game.canvas.getContext('2d');

        // load image from data url
        var imageObj = new Image();
        imageObj.onload = function() {
          context.drawImage(this, 200, 200);
        };

        imageObj.src = dataURL;
      }
      
      // make ajax call to get image data url
      var request = new XMLHttpRequest();
      //request.open('GET', 'http://www.html5canvastutorials.com/demos/assets/dataURL.txt', true);
      request.open('GET', 'assets/invader-ipad.png', true);
      request.onreadystatechange = function() {
        // Makes sure the document is ready to parse.
        if(request.readyState == 4) {
          // Makes sure it's found the file.
          if(request.status == 200) {
            loadCanvas(request.responseText);
          }
        }
      };
      request.send(null);

    game.load.crossOrigin = 'anonymous';

    game.load.image('bullet', 'assets/bullet-ipad.png');
    game.load.image('puBullet', 'assets/bulletpu-ipad.png');
    game.load.image('enemyBullet', 'assets/enemy-bullet-ipad.png');
    game.load.image('invader', 'assets/invader-ipad.png');
    //game.load.spritesheet('invader', 'assets/invader32x32x4.png', 32, 32);
    game.load.spritesheet('ship', 'assets/shipBank.png', 106, 110);
    game.load.spritesheet('kaboom', 'assets/explosion.png', 125, 125);
    game.load.image('background', 'assets/background.jpg');
    game.load.image('topBar', 'assets/topOverlay.png');
    
    game.load.image('powerUp', 'assets/powerUp-ipad.png');
    game.load.image('powerUpSpinner', 'assets/powerUpSpinner-ipad.png');
    game.load.spritesheet('hitSpark', 'assets/jizhong.png', 61, 104);   
    game.load.image('enemyShip', 'assets/enemy-ship-ipad.png');
    game.load.image('dialogBox', 'assets/dialog-box-ipad.png');   
    game.load.image('powerUpBlip', 'assets/weaponUpgradeHR.png');  
    game.load.image('hpMask', 'assets/hpMask.png');
    game.load.image('shipThruster', 'assets/shipThruster-ipad.png');
}

var fonter = "24px Michroma"
screenWidth = 768;
screenHeight = 1024;
/*
var fonter = "14px Aero"
screenWidth = 320;
screenHeight = 480;*/
