
if(typeof(AN)==="undefined"){var AN={}}AN.instances={symbols:[],controllers:[]};AN.apiVersion=1;AN.Symbol=function(){return{currentTimeline:false,userData:{},lastTimelineClass:false,setConfig:function(b,f,a){AN.instances.symbols.push(this);this.containerEl=b;this.controller=a;this.data=f;this.events=this.data.events;this.timelines=[];this.timelinesById={};this.timelinesByName={};var e;for(var c=0;c<this.data.timelines.length;c++){e=this.data.timelines[c];this.timelines.push(e);this.timelinesById[e.id]=e;this.timelinesByName[e.name]=e}this.setupListeners();if(f.actions.init){f.actions.init.call(this.userData,this.controller,this)}var d=this;setTimeout(function(){d.goToTimelineByIndex(0)},0)},setupListeners:function(){var h=this;function f(i){if(i.target!==h.containerEl){h.onAnimationEnd();i.stopPropagation()}}this.containerEl.addEventListener("webkitAnimationEnd",f,false);this.containerEl.addEventListener("animationend",f,false);function a(l,j,i){l.addEventListener(j,function(m){i.call(h.userData,h.controller,m,h)},false)}var d,b,k,g;for(var e=0;e<this.events.length;e++){b=this.events[e];k=b.type;g=".an-symbol-"+b.id;d=this.containerEl.querySelector(g);for(var c=0;c<k.length;c++){a(d,k[c],b.handler)}}},onAnimationEnd:function(){this.runningAnimationCount--;if(this.runningAnimationCount===0){this.onAllAnimationEnd()}},onAllAnimationEnd:function(){var a=this.currentTimeline.endWaitTime;if(a){var b=this;this.symbolTimeout=setTimeout(function(){b.onTimelineFinish()},a*1000)}else{this.onTimelineFinish()}},fireTimelineEvent:function(a){if(this.currentTimeline[a]){this.currentTimeline[a].call(this.userData,this.controller,{},this)}},onTimelineFinish:function(){this.fireTimelineEvent("endAction")},forceRefresh:function(){this.forceRefreshValue=this.containerEl.offsetHeight},getUserData:function(){return this.userData},getSymbolMasterId:function(){return this.data.id},getParentSymbol:function(){var a=this.containerEl;while((a=a.parentNode)&&a!==this.controller.olElement){if(a.className.indexOf("an-symbol-container")!==-1){return this.controller.getSymbolByHtmlId(a.id)}}return null},getChildSymbols:function(){var c=this.containerEl.querySelectorAll(".an-symbol-container");var a=[];for(var b=0;b<c.length;b++){a.push(this.controller.getSymbolByHtmlId(c[b].id))}return a},getChildSymbolByInstanceId:function(b){var a=this.containerEl.querySelector(".an-symbol-container.an-symbol-"+b);return this.controller.getSymbolByHtmlId(a.id)},getContainerElement:function(){return this.containerEl},getController:function(){return this.controller},getTimelineByIndex:function(a){return this.timelines[a]},getTimelineById:function(a){return this.timelinesById[a]},getTimelineByName:function(a){return this.timelinesByName[a]},getCurrentTimeline:function(){return this.currentTimeline},restartTimeline:function(){this.goToTimeline(this.currentTimeline)},goToNextTimeline:function(){var b=this.timelines.indexOf(this.currentTimeline);var a=Math.min(b+1,this.timelines.length-1);if(b===a){return}this.goToTimelineByIndex(a)},goToPreviousTimeline:function(){var b=this.timelines.indexOf(this.currentTimeline);var a=Math.max(b-1,0);if(b===a){return}this.goToTimelineByIndex(a)},goToTimelineByIndex:function(a){this.goToTimeline(this.timelines[a])},goToTimelineById:function(a){this.goToTimeline(this.timelinesById[a])},goToTimelineByName:function(a){this.goToTimeline(this.timelinesByName[a])},goToTimeline:function(a){var c=this.currentTimeline;var b=false;if(c===a){b=true}if(c){this.fireTimelineEvent("exitAction")}this.runningAnimationCount=a.animationCount;this.currentTimeline=a;this.fireTimelineEvent("initAction");var d="t-"+a.id;clearTimeout(this.symbolTimeout);if(this.lastTimelineClass){this.adjustClasses([],[this.lastTimelineClass],this.containerEl);this.lastTimelineClass=false}if(b||this.controller.browser==="moz"){this.adjustClasses(["restart","run",d],[],this.containerEl);this.forceRefresh()}this.adjustClasses(["run",d],["restart"],this.containerEl);this.lastTimelineClass=d;this.fireTimelineEvent("startAction");if(a.animationCount===0){this.onAllAnimationEnd()}},getClassArray:function(c){var a=c.className;a=a.split(" ");var d=[];for(var b=0;b<a.length;b++){if(a[b]){d.push(a[b])}}return a},adjustClasses:function(f,c,b){var d=this.getClassArray(b);var e;for(var a=d.length-1;a>=0;a--){e=d[a];if(c.indexOf(e)!==-1){d.splice(a,1)}}for(var a=0;a<f.length;a++){if(d.indexOf(f[a])===-1){d.push(f[a])}}b.className=d.join(" ")}}};AN.Controller=function(){return{currentScene:false,userData:{},setConfig:function(a){AN.instances.controllers.push(this);this.events=a.events;this.prefix=a.cssPrefix;this.projectActions=a.projectActions;this.basePath=a.basePath?a.basePath:"";this.olElement=document.querySelector("#"+a.parentId+" ol");var d=this.olElement.children;this.useOrmma=a.ormma;this.scenes=[];this.scenesById={};this.sceneByName={};var g;for(var e=0;e<a.scenes.length;e++){g=a.scenes[e];g.element=d[e];g.timelinesById={};g.timelinesByName={};for(var c=0;c<g.timelines.length;c++){g.timelinesById[g.timelines[c].id]=g.timelines[c];g.timelinesByName[g.timelines[c].name]=g.timelines[c]}this.scenesById[g.id]=g;this.scenes.push(g);if(g.name){this.sceneByName[g.name]=g}}this.setupListeners();this.startSceneByName=this.goToSceneByName;this.startSceneById=this.goToSceneById;this.startSceneByID=this.startSceneById;this.symbolInstancesByHtmlId={};this.symbolInstancesById={};this.symbols=[];var h,b,f;for(var e=0;e<a.symbols.length;e++){h=a.symbols[e];this.symbolInstancesById[h.id]=[];b=this.olElement.querySelectorAll(".an-symbol-container-"+h.id);for(var c=0;c<b.length;c++){f=new AN.Symbol();f.setConfig(b[c],h,this);this.symbolInstancesByHtmlId[b[c].id]=f;this.symbolInstancesById[h.id].push(f);this.symbols.push(f)}}this.fireAction(this.projectActions,"init");this.goToScene(this.scenes[0])},setupListeners:function(){var l=this;this.browser="unknown";if(document.body.style.MozAnimationName!==undefined){this.browser="moz"}function h(j){var i;if(l.browser==="moz"){i=j.target;while(i=i.parentNode){if(i===l.currentScene.element){l.onAnimationEnd();return}}}else{l.onAnimationEnd()}}this.olElement.addEventListener("webkitAnimationEnd",h,false);this.olElement.addEventListener("animationend",h,false);function c(i){i.element.addEventListener("mousemove",function(j){i.mousemoveAction.call(l.userData,l,j)},false)}var g;for(var e=0;e<this.scenes.length;e++){g=this.scenes[e];if(g.mousemoveAction){c(g)}}function a(m,j,i){m.addEventListener(j,function(n){i.call(l.userData,l,n)},false)}var f,b,k;for(var e=0;e<this.events.length;e++){b=this.events[e];k=b.type;f=document.getElementById(b.id);for(var d=0;d<k.length;d++){a(f,k[d],b.handler)}}},onAnimationEnd:function(){this.runningAnimationCount--;if(this.runningAnimationCount===0){this.onAllAnimationEnd()}},onAllAnimationEnd:function(){var a=this.currentScene.currentTimeline.endWaitTime;if(a){var b=this;this.sceneTimeout=setTimeout(function(){b.onSceneFinish()},a*1000)}else{this.onSceneFinish()}},forceRefresh:function(a){this.forceRefreshValue=a.element.offsetHeight},fireAction:function(b,a){if(b&&b[a]){b[a].call(this.userData,this)}},getSymbolByHtmlId:function(a){return this.symbolInstancesByHtmlId[a]},getSymbolByInstanceId:function(b){var a=this.olElement.querySelector(".an-symbol-container.an-symbol-"+b);return this.getSymbolByHtmlId(a.id)},getSymbols:function(){return this.symbols},getSymbolsBySymbolMasterId:function(a){return this.symbolInstancesById[a]},getUserData:function(){return this.userData},getTimelineByIndex:function(a){return this.currentScene.timelines[a]},getTimelineById:function(a){return this.currentScene.timelinesById[a]},getTimelineByName:function(a){return this.currentScene.timelinesByName[a]},getCurrentTimeline:function(){return this.currentScene.currentTimeline},getCurrentScene:function(){return this.currentScene},getSceneByIndex:function(a){return this.scenes[a]},getSceneById:function(a){return this.scenesById[a]},getSceneByName:function(a){return this.sceneByName[a]},goToNextTimeline:function(){var b=this.currentScene.timelines.indexOf(this.currentScene.currentTimeline);var a=Math.min(b+1,this.currentScene.timelines.length-1);if(a===b){return}this.goToTimelineByIndex(a)},goToPreviousTimeline:function(){var b=this.currentScene.timelines.indexOf(this.currentScene.currentTimeline);var a=Math.max(b-1,0);if(b===a){return}this.goToTimelineByIndex(a)},goToTimelineById:function(a){this.goToScene(this.currentScene,this.currentScene.timelinesById[a])},goToTimelineByName:function(a){this.goToScene(this.currentScene,this.currentScene.timelinesByName[a])},goToTimelineByIndex:function(a){this.goToScene(this.currentScene,this.currentScene.timelines[a])},goToTimeline:function(a){this.goToScene(this.currentScene,a)},goToNextScene:function(){var b=this.scenes.indexOf(this.currentScene);var a=Math.min(b+1,this.scenes.length-1);if(b===a){return}this.goToSceneByIndex(a)},goToPreviousScene:function(){var a=this.scenes.indexOf(this.currentScene);var b=Math.max(a-1,0);if(a===b){return}this.goToSceneByIndex(b)},goToSceneByIndex:function(a){this.goToScene(this.scenes[a])},goToSceneByName:function(a){this.goToScene(this.sceneByName[a])},goToSceneById:function(a,b){var c=this.scenesById[a];this.goToScene(c,c.timelinesById[b])},goToScene:function(g,f){var d=g;var e=this.currentScene;var a=f;var c=e?e.currentTimeline:false;if(a===undefined){a=d.timelines[0]}var b=false;if(c===a&&e===d){b=true}else{if(e){e.element.setAttribute("class","")}}this.fireAction(c,"exitAction");clearTimeout(this.sceneTimeout);if(e!==d){this.fireAction(e,"exitAction");this.fireAction(d,"initAction")}this.fireAction(a,"initAction");this.runningAnimationCount=a.animationCount;this.currentScene=d;d.currentTimeline=a;var h="t-"+a.id;if(b||this.browser==="moz"){d.element.setAttribute("class","run restart "+h);this.forceRefresh(d)}d.element.setAttribute("class","run "+h);if(!b&&this.useOrmma){this.ormmaNextScene(d)}this.fireAction(a,"startAction");if(a.animationCount===0){this.onAllAnimationEnd()}},replayScene:function(){console.warn("replayScene is deprecated. Use restartScene instead.");this.restartScene()},restartScene:function(){this.goToScene(this.currentScene)},restartTimeline:function(){this.goToScene(this.currentScene,this.currentScene.currentTimeline)},onSceneFinish:function(){this.fireAction(this.currentScene.currentTimeline,"endAction")},goToURL:function(a){document.location.href=a},getElementById:function(a){return document.getElementById(this.getElementIdById(a))},getElementIdById:function(a){return this.prefix+a},getUrlForLocalAsset:function(b){var a="assets/"+b;if(this.basePath){a=this.basePath+"/"+a}return a},ormmaNextScene:function(c){var a=ormma.getState();if(c.dimensions.expanded){var i=ormma.getMaxSize();if(a!=="expanded"){ormma.expand({x:0,y:0,width:i.width,height:i.height})}var b="";var d=c.element.offsetHeight;var g=c.element.offsetWidth;var e=(i.height-d)/2;var h=(i.width-g)/2;b+=" translate3d("+Math.round(h)+"px,"+Math.round(e)+"px,0)";if(c.dimensions.fit){var f=Math.min(i.width/g,i.height/d);b+=" scale3d("+f+","+f+",1)"}c.element.style.webkitTransform=b}else{if(a==="expanded"){ormma.close()}ormma.resize(c.dimensions.width,c.dimensions.height)}}}};window.addEventListener('load',function(){var configData={parentId:'pxr4YkFPF-an-anim',cssPrefix:'pxr4YkFPF-',ormma:false,mraid:false,layout:{"type":"absolute","width":320,"height":480},scenes:[{id:0,dimensions:{height:100,width:100,expanded:false,fit:false},timelines:[{id:"0",name:'start',animationCount:0,duration:0,lastKeyframeTime:0,startAction:function(controller,event,symbolController){controller.dropOverlay(1500);controller.dropOutro(10000);}},{id:"vaBCPo",name:'end',animationCount:0,duration:0,lastKeyframeTime:0,startAction:function(controller,event,symbolController){var main=controller.getSymbolByInstanceId('6HNIcJFP');main.goToTimelineByName('Outro');controller.dropOverlay(1000);}}]}],symbols:[{id:'aH8BNJ',name:'overlay',events:[{id:"e3it6sRl",type:['click'],handler:function(controller,event,symbolController){symbolController.goToNextTimeline();}}],actions:{init:function(controller,symbolController){if(typeof(initTestDrive)!='undefined'&&typeof(initTestDrive)=="function"){initTestDrive();}
if(typeof(previewController)=='undefined'){var previewController;}
if(!previewController){previewController=controller;}
previewController.dropOverlay=function(timeout){var t=timeout||0;setTimeout(function(){symbolController.goToTimelineByName('down');},t);}
previewController.dropOutro=function(timeout){var t=timeout||0;setTimeout(function(){postviewStageAppearHelper();},t);}
postviewStageAppearHelper=function(message){var outroMessage;if(arguments.length==1){if(message!=""){outroMessage=message;}}else if(message==undefined){var outromessagecontainer=document.getElementsByClassName("hidden-outro-message")[0];outroMessage=outromessagecontainer.childNodes[0].textContent;}
var modalTextContainers=document.getElementsByClassName("overlay-text-container");if(modalTextContainers.length>0){for(var i=0;i<modalTextContainers.length;++i){modalTextContainers[i].innerHTML="<span style='display: table-cell; vertical-align: middle;'>"+outroMessage+"</span>";}}
var modalContinueContainers;modalContinueContainers=document.getElementsByClassName("overlay-cta-container-ios");if(modalContinueContainers.length>0){for(var i=0;i<modalContinueContainers.length;++i){modalContinueContainers[i].innerHTML="Tap Anywhere to Get";}}
modalContinueContainers=document.getElementsByClassName("overlay-cta-container-android");if(modalContinueContainers.length>0){for(var i=0;i<modalContinueContainers.length;++i){modalContinueContainers[i].innerHTML="Tap Anywhere to Install";}}
controller.goToTimelineByName("end");symbolController.goToTimelineByName('cta-up');var appstorelinks=document.querySelectorAll('a.destination-url');if(appstorelinks.length>0){var taparea=document.getElementsByClassName("overlay-tap-area")[0];tapareaclone=taparea.cloneNode(true);var newatag=appstorelinks[0].cloneNode(true);newatag.appendChild(tapareaclone);taparea.parentNode.replaceChild(newatag,taparea);}
var mnGameHolders=document.getElementsByClassName("mn-game-holder");if(mnGameHolders.length>0){for(var i=0;i<mnGameHolders.length;++i){if(typeof mixpanel=='object'&&typeof mixpanel!='undefined'){mixpanel.track(environment+" - session end",properties);}}}}
var modalTextContainers=document.getElementsByClassName("overlay-text-container");if(modalTextContainers.length>0){for(var i=0;i<modalTextContainers.length;++i){if(modalTextContainers[i].style.display!="none"){modalTextContainers[i].childNodes[0].style.display="table-cell";modalTextContainers[i].childNodes[0].style.verticalAlign="middle";modalTextContainers[i].style.display="table";}}}
var mnGameHolders=document.getElementsByClassName("mn-game-holder");if(mnGameHolders.length>0){for(var i=0;i<mnGameHolders.length;++i){var mnectarcenters=document.getElementsByClassName("mn-center");if(mnectarcenters.length>0){mnectarcenters[0].style.background="#ffffff";}
var mnectarenters=document.getElementsByClassName(".mn-ectar");if(mnectarcenters.length>0){mnectarcenters[0].style.background="#ffffff";}}}}},timelines:[{id:"0",name:'hidden',animationCount:0,duration:0,lastKeyframeTime:0},{id:"BkkFCc",name:'down',animationCount:2,duration:0.5,lastKeyframeTime:0.5,endAction:function(controller,event,symbolController){symbolController.goToNextTimeline();},startAction:function(controller,event,symbolController){var progameholder=document.getElementsByClassName("mn-pro-game-holder");if(progameholder.length>0){for(var i=0;i<progameholder.length;++i){progameholder[i].style.WebkitTransition="all 0.5s";progameholder[i].style.webkitFilter="blur(4px)";}}
var mnGameHolders=document.getElementsByClassName("mn-game-holder");if(mnGameHolders.length>0){for(var i=0;i<mnGameHolders.length;++i){mnGameHolders[i].style.WebkitTransition="all 0.5s";mnGameHolders[i].style.webkitFilter="blur(4px)";}}}},{id:"NFTQc8",name:'wait',animationCount:0,duration:0,lastKeyframeTime:0},{id:"E2F1C7",name:'up',animationCount:2,duration:0,lastKeyframeTime:0.5,endAction:function(controller,event,symbolController){if(typeof(startTestDrive)!='undefined'&&typeof(startTestDrive)=="function"){startTestDrive();}
var mnGameHolders=document.getElementsByClassName("mn-game-holder");if(mnGameHolders.length>0){symbolController.goToTimelineByName('cta-down');}},startAction:function(controller,event,symbolController){var progameholder=document.getElementsByClassName("mn-pro-game-holder");if(progameholder.length>0){for(var i=0;i<progameholder.length;++i){progameholder[0].style.webkitFilter="blur(0px)";}}
var mnGameHolders=document.getElementsByClassName("mn-game-holder");if(mnGameHolders.length>0){for(var i=0;i<mnGameHolders.length;++i){mnGameHolders[i].style.webkitFilter="blur(0px)";}}}},{id:"XAFz2J",name:'cta-down',animationCount:1,duration:0.5,lastKeyframeTime:0.5,startAction:function(controller,event,symbolController){var mnGameHolders=document.getElementsByClassName("mn-game-holder");if(mnGameHolders.length>0){for(var i=0;i<mnGameHolders.length;++i){mnGameHolders[i].style.webkitTransformOrigin="50% 100%";mnGameHolders[i].style.WebkitTransition="all 0.5s";mnGameHolders[i].style.webkitTransform="scale(0.91667,0.91667)";}}}},{id:"BsrH93",name:'cta-up',animationCount:1,duration:0.5,lastKeyframeTime:0.5,startAction:function(controller,event,symbolController){mnGameHolders=document.getElementsByClassName("mn-game-holder");if(mnGameHolders.length>0){for(var i=0;i<mnGameHolders.length;++i){mnGameHolders[i].style.WebkitTransition="all 0.5s";mnGameHolders[i].style.webkitTransformOrigin="50% 100%";mnGameHolders[i].style.webkitTransform="scale(1,1)";}}}}]}],projectActions:{},events:[],externalResources:[]};setTimeout(function(){var controller=new AN.Controller;controller.setConfig(configData);},0);},false);