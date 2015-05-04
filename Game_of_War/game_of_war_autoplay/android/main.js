var scene1, scene2, scene3;
var activescene, activeplot, numberbuilt = 0;
var upperplot, lowerplot, lowerarrow, upperarrow, tutorialarrow;
var stage, preload, hitpreload, smallpreload, smallestpreload;
var greetingsimg1, greetingsimg2, tutorialhitarea, tutorialtext, tutorialscreen;
function init() {
    var scene1manifest = [
        {src: "blank_02.png", id: "emptyplot1"},
        {src: "blank_00.png", id: "emptyplot0"},
        {src: "waterfalls1.png", id: "largewaterfall"},
        {src: "waterfalls2.png", id: "smallwaterfall"},
        {src: "purpleArrow.png", id: "purplearrow"},
        {src: "greenarrow.png", id: "greenarrow"},
        {src: "cloud_3.png", id: "cloud_3"},
        {src: "barracksTextBox.png", id: "tutorial1"},
        {src: "barracksTextBox.png", id: "tutorial2"}
    ];

    var scene2Manifest = [
        {src:"buildingList.jpg", id: "scene2Background"},
        {src:"popUpBarracksBox.jpg", id: "barracksBox"},
        {src:"barracks_01.png", id: "barracks"},
        {src:"civilian_soldier_swordpractice.png", id: "civilian_soldier_swordpractice"},
        {src:"civilian_walk_north.png", id: "civilian_walk_north"},
        {src:"civilian_walk_south.png", id: "civilian_walk_south"},
        {src: "purpleArrow.png", id: "purplearrow"}
    ];

    var scene3Manifest = [
        {src:"barracksScene.jpg", id: "scene3Background"},
        {src:"buildButton.jpg", id: "buildButton"},
        {src:"spritesheet_yellowSparkle.png", id: "sparkles"},
        {src: "purpleArrow.png", id: "purplearrow"}
    ];

    scene1preload = new createjs.LoadQueue(false);
    scene1preload.addEventListener("complete", handlescene1load);
    scene1preload.loadManifest(scene1manifest, true, "assets/");

    scene2preload = new createjs.LoadQueue(false);
    scene2preload.addEventListener("complete", handlescene2load);
    scene2preload.loadManifest(scene2Manifest, true, "assets/");

    scene3preload = new createjs.LoadQueue(false);
    scene3preload.addEventListener("complete", handlescene3load);
    scene3preload.loadManifest(scene3Manifest, true, "assets/");

    // create a new stage and point it at our canvas:
    stage = new createjs.Stage(document.getElementById("testCanvas"));
    

    scene1 = createscene("scene1");
    scene2 = createscene("scene2");
    scene3 = createscene("scene3");

    var backgroundimg = new Image();
    backgroundimg.src = "assets/gamePlay.jpg";
    var backgroundbitmap = new createjs.Bitmap(backgroundimg);
    backgroundbitmap.x = 0;
    backgroundbitmap.y = 0;
    backgroundbitmap.scaleX = backgroundbitmap.scaleY = 1;
    scene1.addimage(backgroundbitmap);

    activescene = scene1;
    gotoscene(scene1);

    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", tick);

    //stage.addEventListener("mousedown", getPosition, false);
}
init();

function tick(event){
    // draw the updates to stage
    stage.update(event);
}


function sparkletick(event) {
    // loop through all of the active sparkles on stage:
    var l = stage.getNumChildren();
    var m = event.delta / 16;
    for (var i = l - 1; i > 0; i--) {
        var sparkle = stage.getChildAt(i);
        if(sparkle.name == "sparkle"){

            // apply gravity and friction
            sparkle.vY += 0;
            sparkle.vX *= 1.01;

            // update position, scale, and alpha:
            sparkle.x += sparkle.vX * m;
            sparkle.y += sparkle.vY * m;
            //sparkle.scaleX = sparkle.scaleY = sparkle.scaleX + sparkle.vS * m;

            if (
                sparkle.y > sparkle.startingy + 10 || sparkle.y < sparkle.startingy - 15 || sparkle.x > sparkle.startingx + 20 || sparkle.x < sparkle.startingx - 20 
                ) {
                sparkle.alpha += sparkle.vA * m;
            }

            if (
                sparkle.alpha <= 0 || sparkle.y > sparkle.startingy + 25 || sparkle.y < sparkle.startingy - 30 || sparkle.x > sparkle.startingx + 40 || sparkle.x < sparkle.startingx - 40 
                ) {
                stage.removeChildAt(i);
            }
        }
    }

    // draw the updates to stage
    //stage.update(event);
}

function createscene(theid){
    var thescene = {
        id: theid,
        children: [],
        intervals: [],
        draw: function(){
            for (i = 0; i < this.children.length; i++){
                stage.addChild(this.children[i]);
            }
        },
        obliterate: function(){
            for (i = 0; i < this.children.length; i++){
                stage.removeChild(this.children[i]);
            }
            for (i = 0; i < this.intervals.length; i++){
                window.clearInterval(this.intervals[i]);
            }
        },
        addimage: function(theimage){
            this.children.push(theimage);
        },
        addinterval: function(theinterval){
            this.intervals.push(theinterval);
        }
    }
    return thescene;
}

function gotoscene(thescene){
    activescene.obliterate();
    activescene = thescene;
    thescene.draw();
    /*stage.addChild(CTA);*/
}

function handlescene1load(){
    var spriteSheet4 = new createjs.SpriteSheet({
        framerate: 30,
        "images": [
        scene1preload.getResult("emptyplot1")
        ],
        "frames": {"regX": 0, "height": 102, "count": 1, "regY": 0, "width": 203},
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": {
            "run": [0, 0]
        }
    });

    var largewaterfallspritesheet = new createjs.SpriteSheet({
        framerate: 30,
        "images": [
        scene1preload.getResult("largewaterfall")
        ],
        "frames": {"regX": 0, "height": 80, "count": 12, "regY": 0, "width": 110},
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": {
            fall: {
                frames: [11,10,9,8,7,6,5,4,3,2,1,0],
                next: "fall",
                speed: 0.05
            }
        }
    });

    var smallwaterfallspritesheet = new createjs.SpriteSheet({
        framerate: 30,
        "images": [
        scene1preload.getResult("smallwaterfall")
        ],
        "frames": {"regX": 0, "height": 44, "count": 12, "regY": 0, "width": 22},
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": {
            fall: {
                frames: [11,10,9,8,7,6,5,4,3,2,1,0],
                next: "fall",
                speed: 0.05
            }
        }
    });

    var waterfallcloud = new createjs.Bitmap(scene1preload.getResult("cloud_3"));
    waterfallcloud.x = 193;
    waterfallcloud.y = 243;
    waterfallcloud.alpha = 1;
    waterfallcloud.scaleX = waterfallcloud.scaleY = 0.08;

    lowerarrow = new createjs.Bitmap(scene1preload.getResult("purplearrow"));
    lowerarrow.x = 130;
    lowerarrow.y = 173;
    lowerarrow.alpha = 1;
    lowerarrow.regX = 33;
    lowerarrow.regY = 45;
    lowerarrow.rotation = 180;
    lowerarrow.scaleX = lowerarrow.scaleY = 0.6;

    upperarrow = new createjs.Bitmap(scene1preload.getResult("purplearrow"));
    upperarrow.x = 222;
    upperarrow.y = 120;
    upperarrow.alpha = 1;
    upperarrow.regX = 33;
    upperarrow.regY = 45;
    upperarrow.rotation = 180;
    upperarrow.scaleX = upperarrow.scaleY = 0.6;

    var largewaterfallsprite = new createjs.Sprite(largewaterfallspritesheet, "fall");
    largewaterfallsprite.x = 180;
    largewaterfallsprite.y = 258;
    largewaterfallsprite.scaleX = largewaterfallsprite.scaleY = 0.5;

    var smallwaterfallsprite = new createjs.Sprite(smallwaterfallspritesheet, "fall");
    smallwaterfallsprite.x = 198;
    smallwaterfallsprite.y = 233;
    smallwaterfallsprite.scaleX = smallwaterfallsprite.scaleY = 0.5;

    lowerplot = new createjs.Sprite(spriteSheet4, "run");
    lowerplot.x = 95;
    lowerplot.y = 210;
    lowerplot.scaleX = lowerplot.scaleY = 0.35;

    upperplot = new createjs.Sprite(spriteSheet4, "run");
    upperplot.x = 187;
    upperplot.y = 164;
    upperplot.scaleX = upperplot.scaleY = 0.35;

    var lowerplotshine = new createjs.Bitmap(scene1preload.getResult("emptyplot0"));
    lowerplotshine.x = 98;
    lowerplotshine.y = 212;
    lowerplotshine.alpha = 1;
    lowerplotshine.scaleX = lowerplotshine.scaleY = 1;
    lowerplot.shine = lowerplotshine;

    var upperplotshine = new createjs.Bitmap(scene1preload.getResult("emptyplot0"));
    upperplotshine.x = 190;
    upperplotshine.y = 166;
    upperplotshine.alpha = 1;
    upperplotshine.scaleX = upperplotshine.scaleY = 1;
    upperplot.shine = upperplotshine;

    var shinepulselower = (function (ashine) {
           var shinepulsedirection = 1;
           var theshine = ashine;
           return function ()
           {
                if(theshine.alpha >= 0.7){
                   shinepulsedirection = -1;
                } else if (theshine.alpha <= 0.1){
                   shinepulsedirection = 1;
                }
                theshine.alpha += shinepulsedirection * 0.06;
               
                stage.update();
           };
    })(lowerplotshine)

    var shinepulseupper = (function (ashine) {
           var shinepulsedirection = 1;
           var theshine = ashine;
           return function ()
           {
                if(theshine.alpha >= 0.7){
                   shinepulsedirection = -1;
                } else if (theshine.alpha <= 0.1){
                   shinepulsedirection = 1;
                }
                theshine.alpha += shinepulsedirection * 0.06;
               
                stage.update();
           };
    })(upperplotshine)

    var arrowpulselower = (function (aarrow) {
           var arrowscaledirection = 1;
           var thearrow = aarrow;
           return function ()
           {
                if(thearrow.scaleX >= 0.7){
                   arrowscaledirection = -1;
                } else if (thearrow.scaleX <= 0.6){
                   arrowscaledirection = 1;
                }
                thearrow.scaleX += arrowscaledirection * 0.0075;
                thearrow.scaleY += arrowscaledirection * 0.0075;
               
                stage.update();
           };
    })(lowerarrow)

    var arrowpulseupper = (function (event,aarrow) {
           var arrowscaledirection = 1;
           var thearrow = aarrow;
           return function (event)
           {
                //console.log(event.delta/1000);
                if(thearrow.scaleX >= 0.7){
                   arrowscaledirection = -1;
                } else if (thearrow.scaleX <= 0.6){
                   arrowscaledirection = 1;
                }
                thearrow.scaleX += arrowscaledirection * 0.007;
                thearrow.scaleY += arrowscaledirection * 0.007;
               
                stage.update();
           };
    })(event,upperarrow)

    createjs.Ticker.addEventListener("tick", shinepulselower);
    createjs.Ticker.addEventListener("tick", shinepulseupper);
    //setInterval(shinepulselower, 50);
    //setInterval(shinepulseupper, 50);
    scene1.addinterval(shinepulselower);
    scene1.addinterval(shinepulseupper);

    createjs.Ticker.addEventListener("tick", arrowpulselower);
    createjs.Ticker.addEventListener("tick", arrowpulseupper);
    //setInterval(arrowpulselower, 51);
    //setInterval(arrowpulseupper, 49);
    scene1.addinterval(arrowpulselower);
    scene1.addinterval(arrowpulseupper);

    // Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
    scene1.addimage(upperplot);
    scene1.addimage(lowerplot);
    scene1.addimage(upperplotshine);
    scene1.addimage(lowerplotshine);
    scene1.addimage(largewaterfallsprite);
    scene1.addimage(smallwaterfallsprite);
    scene1.addimage(lowerarrow);
    scene1.addimage(upperarrow);
    scene1.addimage(waterfallcloud);

    stage.addChild(upperplot);
    stage.addChild(lowerplot);
    stage.addChild(upperplotshine);
    stage.addChild(lowerplotshine);
    stage.addChild(largewaterfallsprite);
    stage.addChild(smallwaterfallsprite);
    stage.addChild(lowerarrow);
    stage.addChild(upperarrow);
    stage.addChild(waterfallcloud);

    //load the tutorial image and text
    tutorialscreen = new createjs.Shape;
    tutorialscreen.graphics.beginFill("#000").drawRect(0,0,320,480);
    tutorialscreen.alpha = 0.6;
    stage.addChild(tutorialscreen);

    var tutorialimg = new Image();
    tutorialimg.src = "assets/barracksTextBox.png";
    greetingsimg1 = new createjs.Bitmap(tutorialimg);
    greetingsimg1.x = 0;
    greetingsimg1.y = 120;
    greetingsimg1.scaleX = greetingsimg1.scaleY = 1;
    stage.addChild(greetingsimg1);

    tutorialtext = new createjs.Text("Greetings my King! I am Athena, your guide.", "bold 11.5px Arial", "#402000");
    tutorialtext.x = 205;
    tutorialtext.y = 180;
    tutorialtext.lineHeight = 12;
    tutorialtext.textAlign = 'center';
    tutorialtext.lineWidth = 190;
    tutorialtext.textBaseline = "alphabetic";
    stage.addChild(tutorialtext);

    tutorialhitarea = new createjs.Shape;
    tutorialhitarea.graphics.beginFill("#fff").drawRect(120,225,170,42);
    tutorialhitarea.alpha = 0.01;
    stage.addChild(tutorialhitarea);
    setTimeout(function(){
        tutorialhitarea.addEventListener("click", handletutorialclick, false);
    }, 1500);
    
    tutorialarrow = new createjs.Bitmap(scene1preload.getResult("greenarrow"));
    tutorialarrow.x = 205;
    tutorialarrow.y = 301;
    tutorialarrow.alpha = 1;
    tutorialarrow.regX = 33;
    tutorialarrow.regY = 45;
    tutorialarrow.rotation = 0;
    tutorialarrow.scaleX = tutorialarrow.scaleY = 0.6;

    var tutorialpulse = (function (aarrow) {
           var arrowscaledirection = 1;
           var thearrow = aarrow;
           return function ()
           {
                if(thearrow.scaleX >= 0.7){
                   arrowscaledirection = -1;
                } else if (thearrow.scaleX <= 0.6){
                   arrowscaledirection = 1;
                }
                thearrow.scaleX += arrowscaledirection * 0.007;
                thearrow.scaleY += arrowscaledirection * 0.007;
               
                stage.update();
           };
    })(tutorialarrow)
    createjs.Ticker.addEventListener("tick", tutorialpulse);
    //setInterval(tutorialpulse, 50);
    stage.addChild(tutorialarrow);
}

function mixpaneltrack(message){
    //" - session end"
    if(typeof mixpanel == 'object' && typeof mixpanel != 'undefined') {
        mixpanel.track(environment + message, properties);
    }
}

function handletutorialclick(){
    mixpaneltrack(" - continue 1");

    tutorialtext.text = "First, let me show you how to build some Barracks. A thriving city will need Soldiers!";

    tutorialhitarea.removeEventListener("click", handletutorialclick);
    tutorialhitarea.addEventListener("click", handletutorialclickfinal, false);
}

function handletutorialclickfinal(){
    mixpaneltrack(" - continue 2");

    stage.removeChild(greetingsimg1);
    stage.removeChild(tutorialtext);
    stage.removeChild(tutorialhitarea);
    stage.removeChild(tutorialscreen);
    stage.removeChild(tutorialarrow);

    //create the hit areas for the plots of land
    var plothitarea = new createjs.Shape;
    plothitarea.graphics.beginFill("#000").drawRect(0,0,64,32);

    upperplot.hitArea = plothitarea;
    lowerplot.hitArea = plothitarea;
    upperplot.shine.hitArea = plothitarea;
    lowerplot.shine.hitArea = plothitarea;

    upperplot.addEventListener("mousedown", handleupperclick, false);
    lowerplot.addEventListener("mousedown", handlelowerclick, false);
    upperplot.shine.addEventListener("mousedown", handleupperclick, false);
    lowerplot.shine.addEventListener("mousedown", handlelowerclick, false);
}

function handleupperclick(event)
{
    mixpaneltrack(" - upperplot clicked");
    //stage.addChild(backgroundbitmap);
    if(activescene.id == "scene1"){
        activeplot = "upper";
        gotoscene(scene2);
    } else {
        gotoscene(scene1);
    }
}

function handlelowerclick(event)
{
    mixpaneltrack(" - lowerplot clicked");
    //stage.addChild(backgroundbitmap);
    if(activescene.id == "scene1"){
        activeplot = "lower";
        gotoscene(scene2);
    } else {
        gotoscene(scene1);
    }
}

function handlescene2load(){
    var scene2barracksbox = new createjs.Bitmap(scene2preload.getResult("barracksBox"));
    scene2barracksbox.x = 5;
    scene2barracksbox.y = 73;
    scene2barracksbox.alpha = 1;
    scene2barracksbox.scaleX = scene2barracksbox.scaleY = 1;

    var scene2backgroundbitmap = new createjs.Bitmap(scene2preload.getResult("scene2Background"));
    scene2backgroundbitmap.x = 0;
    scene2backgroundbitmap.y = 0;
    scene2backgroundbitmap.scaleX = scene2backgroundbitmap.scaleY = 1;

    var scene2arrow = new createjs.Bitmap(scene2preload.getResult("purplearrow"));
    scene2arrow.x = 160;
    scene2arrow.y = 150;
    scene2arrow.alpha = 1;
    scene2arrow.regX = 33;
    scene2arrow.regY = 45;
    scene2arrow.scaleX = scene2arrow.scaleY = 0.6;

    var barracksShadow =  new createjs.Shadow("#ffdd00", 0, 0, 5);

    scene2barracksbox.shadow = barracksShadow;
    var shadowpulsebarracks = (function (ashadow) {
           var shadowblurdirection = 1;
           var theshadow = ashadow;
           return function ()
           {
                if(theshadow.blur >= 20){
                   shadowblurdirection = -1;
                } else if (theshadow.blur <= 0){
                   shadowblurdirection = 1;
                }
                theshadow.blur += shadowblurdirection;
               
                stage.update();
           };
    })(barracksShadow)

    var arrowpulse = (function (aarrow) {
           var arrowscaledirection = 1;
           var thearrow = aarrow;
           return function ()
           {
                if(thearrow.scaleX >= 0.7){
                   arrowscaledirection = -1;
                } else if (thearrow.scaleX <= 0.6){
                   arrowscaledirection = 1;
                }
                thearrow.scaleX += arrowscaledirection * 0.007;
                thearrow.scaleY += arrowscaledirection * 0.007;
               
                stage.update();
           };
    })(scene2arrow)

    createjs.Ticker.addEventListener("tick", shadowpulsebarracks);
    createjs.Ticker.addEventListener("tick", arrowpulse);
    //setInterval(shadowpulsebarracks, 50);
    //setInterval(arrowpulse, 50);
    scene2.addinterval(shadowpulsebarracks);
    scene2.addinterval(arrowpulse);

    var barracksboxhitarea = new createjs.Shape;
    barracksboxhitarea.graphics.beginFill("#000").drawRect(0,0,310,52);

    scene2barracksbox.hitArea = barracksboxhitarea;

    scene2barracksbox.addEventListener("click", handlebarracksclick, false);
    scene2.addimage(scene2backgroundbitmap);
    scene2.addimage(scene2barracksbox);
    scene2.addimage(scene2arrow);
}

function handlebarracksclick(){
    mixpaneltrack(" - barracks selected");
    if(activescene.id == "scene2"){
        gotoscene(scene3);
    } else {
        gotoscene(scene1);
    }

}

var finalbuildbutton;
function handlescene3load(){
    var scene3backgroundbitmap = new createjs.Bitmap(scene3preload.getResult("scene3Background"));
    scene3backgroundbitmap.x = 0;
    scene3backgroundbitmap.y = 0;
    scene3backgroundbitmap.scaleX = scene3backgroundbitmap.scaleY = 1;

    var scene3BuildButton = new createjs.Bitmap(scene3preload.getResult("buildButton"));
    scene3BuildButton.x = 201;
    scene3BuildButton.y = 95;
    scene3BuildButton.alpha = 1;
    scene3BuildButton.scaleX = scene3BuildButton.scaleY = 1;

    var scene3arrow = new createjs.Bitmap(scene3preload.getResult("purplearrow"));
    scene3arrow.x = 260;
    scene3arrow.y = 150;
    scene3arrow.alpha = 1;
    scene3arrow.regX = 33;
    scene3arrow.regY = 45;
    scene3arrow.scaleX = scene3arrow.scaleY = 0.6;

    var buildShadow =  new createjs.Shadow("#ffdd00", 0, 0, 5);

    scene3BuildButton.shadow = buildShadow;
    var shadowpulsebuild = (function (ashadow) {
           var shadowblurdirection = 1;
           var theshadow = ashadow;
           return function ()
           {
                if(theshadow.blur >= 20){
                   shadowblurdirection = -1;
                } else if (theshadow.blur <= 0){
                   shadowblurdirection = 1;
                }
                theshadow.blur += shadowblurdirection;
               
                stage.update();
           };
    })(buildShadow)

    var arrowpulse3 = (function (aarrow) {
           var arrowscaledirection = 1;
           var thearrow = aarrow;
           return function ()
           {
                if(thearrow.scaleX >= 0.7){
                   arrowscaledirection = -1;
                } else if (thearrow.scaleX <= 0.6){
                   arrowscaledirection = 1;
                }
                thearrow.scaleX += arrowscaledirection * 0.008;
                thearrow.scaleY += arrowscaledirection * 0.008;
               
                stage.update();
           };
    })(scene3arrow)

    createjs.Ticker.addEventListener("tick", shadowpulsebuild);
    createjs.Ticker.addEventListener("tick", arrowpulse3);
    //setInterval(shadowpulsebuild, 50);
    //setInterval(arrowpulse3, 50);
    scene3.addinterval(shadowpulsebuild);
    scene3.addinterval(arrowpulse3);

    var BuildButtonhitarea = new createjs.Shape;
    BuildButtonhitarea.graphics.beginFill("#000").drawRect(0,0,310,52);

    scene3BuildButton.hitArea = BuildButtonhitarea;

    scene3BuildButton.addEventListener("mousedown", handlebuildclick, false);
    finalbuildbutton = scene3BuildButton;

    scene3.addimage(scene3backgroundbitmap);
    scene3.addimage(scene3BuildButton);
    scene3.addimage(scene3arrow);
}

function handlebuildclick(){
    stage.removeChild(finalbuildbutton);
    numberbuilt += 1;
    mixpaneltrack(" - barracks built: "+numberbuilt);
    setTimeout( function(){
        if(activeplot == "lower"){
            //add a barracks based on which plot we clicked to the scene
            var barracks = new createjs.Bitmap(scene2preload.getResult("barracks"));
            barracks.x = 95;
            barracks.y = 190;
            barracks.scaleX = barracks.scaleY = 0.35;

            scene1.addimage(barracks);

            //add a training guy to the scene
            var civitrainingspritesheet = new createjs.SpriteSheet({
                framerate: 30,
                "images": [
                scene2preload.getResult("civilian_soldier_swordpractice")
                ],
                "frames": {"regX": 0, "regY": 0, "width": 43, "height": 46, "count": 12},
                "animations": {
                    train1: {
                        frames: [0,1,2,3,4,5,6,7,8,9,10,11],
                        next: "train1",
                        speed: 0.05
                    }
                }
            });

            var civitrainingsprite = new createjs.Sprite(civitrainingspritesheet, "train1");
            civitrainingsprite.x = 109;
            civitrainingsprite.y = 213;
            civitrainingsprite.scaleX = civitrainingsprite.scaleY = 0.35;
            scene1.addimage(civitrainingsprite);

            //add a walking guy to the scene
            var civiwalkingspritesheet = new createjs.SpriteSheet({
                framerate: 30,
                "images": [
                scene2preload.getResult("civilian_walk_north"),
                scene2preload.getResult("civilian_walk_south")
                ],
                "frames": {"regX": 0, "regY": 0, "width": 24, "height": 39, "count": 23},
                "animations": {
                    "walknorth": [0, 9, "walknorth", 0.05],
                    "walksouth": [10,22, "walksouth", 0.05]
                }
            });

            var civiwalkingsprite1 = new createjs.Sprite(civiwalkingspritesheet, "walknorth");
            civiwalkingsprite1.x = 40;
            civiwalkingsprite1.y = 223;
            civiwalkingsprite1.scaleX = civiwalkingsprite1.scaleY = 0.35;
            scene1.addimage(civiwalkingsprite1);

            var civilianwalker1 = createciviupdate(civiwalkingsprite1, 100, 197, "right");

            var civiwalkingsprite2 = new createjs.Sprite(civiwalkingspritesheet, "walknorth");
            civiwalkingsprite2.x = 280;
            civiwalkingsprite2.y = 320;
            civiwalkingsprite2.scaleX = civiwalkingsprite2.scaleY = 0.35;
            scene1.addimage(civiwalkingsprite2);

            var civilianwalker2 = createciviupdate(civiwalkingsprite2, 200, 280, "left");

            createjs.Ticker.addEventListener("tick", civilianwalker1);
            //setInterval(civilianwalker1, 50);
            scene3.addinterval(civilianwalker1);
            createjs.Ticker.addEventListener("tick", civilianwalker2);
            //setInterval(civilianwalker2, 50);
            scene3.addinterval(civilianwalker2);

            lowerplot.removeEventListener("mousedown", handlelowerclick, false);
            lowerplot.shadow = null;

            gotoscene(scene1);
            stage.removeChild(lowerarrow);
            stage.removeChild(lowerplot);
            stage.removeChild(lowerplot.shine);
            //add burst of stars to the completed barracks
            createjs.Ticker.addEventListener("tick", sparkletick);
            setTimeout( function(){
                addSparkles(150, 130, 225, 0.05);
            },100);
            setTimeout( function(){
                createjs.Ticker.removeEventListener("tick", sparkletick);
            },2000);
        }
        if(activeplot == "upper"){
        
            //add a barracks based on which plot we clicked to the scene
            var barracks = new createjs.Bitmap(scene2preload.getResult("barracks"));
            barracks.x = 187;
            barracks.y = 144;
            barracks.scaleX = barracks.scaleY = 0.35;

            scene1.addimage(barracks);

            //add a training guy to the scene
            var civitrainingspritesheet = new createjs.SpriteSheet({
                framerate: 30,
                "images": [
                scene2preload.getResult("civilian_soldier_swordpractice")
                ],
                "frames": {"regX": 0, "height": 46, "width": 43, "count": 12, "regY": 0},
                "animations": {
                    "train": [0, 11, "train", 0.05]
                }
            });

            var civitrainingsprite = new createjs.Sprite(civitrainingspritesheet, "train");
            civitrainingsprite.x = 201;
            civitrainingsprite.y = 167;
            civitrainingsprite.scaleX = civitrainingsprite.scaleY = 0.35;

            scene1.addimage(civitrainingsprite);

            //add a walking guy to the scene
            var civiwalkingspritesheet = new createjs.SpriteSheet({
                framerate: 30,
                "images": [
                scene2preload.getResult("civilian_walk_north"),
                scene2preload.getResult("civilian_walk_south")
                ],
                "frames": {"regX": 0, "regY": 0, "width": 24, "height": 39, "count": 23},
                "animations": {
                    "walknorth": [0, 9, "walknorth", 0.05],
                    "walksouth": [10,22, "walksouth", 0.05]
                }
            });

            var civiwalkingsprite1 = new createjs.Sprite(civiwalkingspritesheet, "walknorth");
            civiwalkingsprite1.x = 130; 230
            civiwalkingsprite1.y = 360; 310
            civiwalkingsprite1.scaleX = civiwalkingsprite1.scaleY = 0.35;
            scene1.addimage(civiwalkingsprite1);

            var civilianwalker1 = createciviupdate(civiwalkingsprite1, 230, 310, "right");

            var civiwalkingsprite2 = new createjs.Sprite(civiwalkingspritesheet, "walknorth");
            civiwalkingsprite2.x = 300;
            civiwalkingsprite2.y = 175;
            civiwalkingsprite2.scaleX = civiwalkingsprite2.scaleY = 0.35;
            scene1.addimage(civiwalkingsprite2);

            var civilianwalker2 = createciviupdate(civiwalkingsprite2, 260, 155, "left");

            createjs.Ticker.addEventListener("tick", civilianwalker1);
            //setInterval(civilianwalker1, 50);
            scene3.addinterval(civilianwalker1);
            createjs.Ticker.addEventListener("tick", civilianwalker2);
            //setInterval(civilianwalker2, 50);
            scene3.addinterval(civilianwalker2);

            upperplot.removeEventListener("mousedown", handleupperclick, false);
            upperplot.shadow = null;

            gotoscene(scene1);
            stage.removeChild(upperarrow);
            stage.removeChild(upperplot);
            stage.removeChild(upperplot.shine);
            //add burst of stars to the completed barracks
            createjs.Ticker.addEventListener("tick", sparkletick);
            setTimeout( function(){
                addSparkles(150, 225, 180, 0.05);
            },100);
            setTimeout( function(){
                createjs.Ticker.removeEventListener("tick", sparkletick);
            },2000);
        }
        if(numberbuilt == 2){
            stage.removeChild(lowerarrow);
            stage.removeChild(upperarrow);
            setTimeout( function(){
                postviewStageAppearHelper();
            },1000);
            //controller.dropOverlay(1500);
        }
    }, 400);
}

function addSparkles(count, x, y, speed) {
    var data = {
        images: [
        scene3preload.getResult("sparkles")
        ],
        frames: {width: 21, height: 23, regX: 10, regY: 11}
    };

    var sparklesprite = new createjs.Sprite(new createjs.SpriteSheet(data));

    //create the specified number of sparkles
    for (var i = 0; i < count ; i++) {
        // clone the original sparkle, so we don't need to set shared properties:
        var sparkle = sparklesprite.clone();

        sparkle.name = "sparkle";
        sparkle.startingx = x;
        sparkle.startingy = y;

        // set display properties:
        sparkle.x = x;
        sparkle.y = y;

        //sparkle.rotation = Math.random()*360;
        sparkle.alpha = Math.random() * 0.5 + 0.5;
        sparkle.scaleX = sparkle.scaleY = Math.random() + 0.3;

        // set up velocities:
        var a = Math.PI * 2 * Math.random();
        var v = (Math.random() + 0.13) * 40 * speed;
        sparkle.vX = Math.cos(a) * v;
        sparkle.vY = Math.sin(a) * v;
        sparkle.vS = (Math.random() - 0.5) * 0.2; // scale
        sparkle.vA = -Math.random() * 0.05 - 0.01; // alpha

        // start the animation on a random frame:
        sparkle.gotoAndPlay(Math.random() * sparkle.spriteSheet.getNumFrames());

        // add to the display list:
        stage.addChild(sparkle);
    }
}

function createciviupdate(thecivilian,targetx,targety,flip){
    if(flip == "right"){
        thecivilian.scaleX *= 1;
    } else if (flip == "left"){
        thecivilian.scaleX *= -1;
    }
    var civilianwalker = (function (civilian, destx, desty) {
       var walkdirection = 1,
       thecivi = civilian,
       endx = destx,
       endy = desty,
       startx = thecivi.x,
       starty = thecivi.y,
       distancex = Math.abs(startx - endx),
       distancey = Math.abs(starty - endy),
       //stepx = distancex/100,
       //stepy = distancey/100;
       stepx = 0.4;
       stepy = 0.2;

       return function ()
       {
            var desinationx, destinationy;
            if(walkdirection == 1){
                destinationx = endx;
                destinationy = endy;
            } else if (walkdirection == -1){
                destinationx = startx;
                destinationy = starty;
            }
            if(thecivi.x > destinationx){
               thecivi.x += -stepx;
            } else if (thecivi.x < destinationx){
               thecivi.x += stepx;
            }

            if(thecivi.y > destinationy){
               thecivi.y += -stepy;
            } else if (thecivi.y < destinationy){
               thecivi.y += stepy;
            }

            if (Math.floor(thecivi.x) == destinationx && Math.floor(thecivi.y) == destinationy){
                walkdirection = -1 * walkdirection;
                //flip the sprite around
                if(thecivi.currentAnimation == "walknorth"){
                    thecivi.gotoAndPlay("walksouth");
                } else if (thecivi.currentAnimation == "walksouth"){
                    thecivi.gotoAndPlay("walknorth");
                }
                
            }
            
            stage.update();
       };
    })(thecivilian, targetx, targety)
    return civilianwalker;
}


function getPosition(event)
{
    var x = event.rawX;
    var y = event.rawY;

    console.log("x:" + x + " y:" + y);
}