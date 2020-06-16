(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Logo Animation _ Concept_HTML5 Canvas_atlas_1", frames: [[0,0,1712,1712]]},
		{name:"Logo Animation _ Concept_HTML5 Canvas_atlas_2", frames: [[1640,310,100,128],[1640,440,100,126],[1742,310,100,127],[1946,381,100,126],[874,760,100,129],[1946,509,100,126],[1844,381,100,127],[874,631,102,127],[1742,439,100,127],[874,503,108,126],[1640,568,284,28],[1880,0,93,248],[1880,250,127,129],[1640,0,238,308],[1072,0,566,790],[0,503,872,504],[0,0,1070,501]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.fabricationservices = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.rentaldisplays = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.videoproduction = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.eventpersonnel = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.portabledisplays = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.warehousingdistribution = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.onsitedisplayservices = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.graphicdesignproduction = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.experientialmarketing = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.customdisplaysanddesign = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Logo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(33.1,25.45,0.1262,0.1262);

	this.instance_1 = new lib.CachedBmp_15();
	this.instance_1.setTransform(-47.05,-12.65,0.1262,0.1262);

	this.instance_2 = new lib.CachedBmp_14();
	this.instance_2.setTransform(-107.95,-107.95,0.1262,0.1262);

	this.instance_3 = new lib.CachedBmp_13();
	this.instance_3.setTransform(-59.2,-23.8,0.1262,0.1262);

	this.instance_4 = new lib.CachedBmp_12();
	this.instance_4.setTransform(-73.5,-72.45,0.1262,0.1262);

	this.instance_5 = new lib.CachedBmp_11();
	this.instance_5.setTransform(29.3,-44.3,0.1262,0.1262);

	this.instance_6 = new lib.CachedBmp_10();
	this.instance_6.setTransform(49.85,-42.65,0.1262,0.1262);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-107.9,-107.9,216,216);


(lib.Line = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-70.9,-6.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.9,-6.9,142,14);


(lib.Btn10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.experientialmarketing();
	this.instance.setTransform(-50,-63.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-63.5,100,127);


(lib.Btn9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.eventpersonnel();
	this.instance.setTransform(-50,-63);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-63,100,126);


(lib.Btn8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.videoproduction();
	this.instance.setTransform(-50,-63.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-63.5,100,127);


(lib.Btn7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.warehousingdistribution();
	this.instance.setTransform(-50,-63);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-63,100,126);


(lib.Btn6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.onsitedisplayservices();
	this.instance.setTransform(-50,-63.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-63.5,100,127);


(lib.Btn5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.graphicdesignproduction();
	this.instance.setTransform(-51,-63.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51,-63.5,102,127);


(lib.Btn4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.portabledisplays();
	this.instance.setTransform(-50,-64.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-64.5,100,129);


(lib.Btn3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.rentaldisplays();
	this.instance.setTransform(-50,-63);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-63,100,126);


(lib.Btn2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.fabricationservices();
	this.instance.setTransform(-50,-64);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-64,100,128);


(lib.Btn1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.customdisplaysanddesign();
	this.instance.setTransform(-54,-63);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54,-63,108,126);


// stage content:
(lib.LogoAnimationConcept_HTML5Canvas = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,51,54,58,62,66,70,74,78,82,86];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_51 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.Btn1.addEventListener("click", fl_ClickToGoToWebPage);
		
		function fl_ClickToGoToWebPage() {
			window.open("http://www.adobe.com", "_blank");
		}
	}
	this.frame_54 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.Btn2.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			window.open("http://www.adobe.com", "_blank");
		}
	}
	this.frame_58 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.Btn3.addEventListener("click", fl_ClickToGoToWebPage_3);
		
		function fl_ClickToGoToWebPage_3() {
			window.open("http://www.adobe.com", "_blank");
		}
	}
	this.frame_62 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.Btn4.addEventListener("click", fl_ClickToGoToWebPage_4);
		
		function fl_ClickToGoToWebPage_4() {
			window.open("http://www.adobe.com", "_blank");
		}
	}
	this.frame_66 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.Btn5.addEventListener("click", fl_ClickToGoToWebPage_5);
		
		function fl_ClickToGoToWebPage_5() {
			window.open("http://www.adobe.com", "_blank");
		}
	}
	this.frame_70 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.Btn6.addEventListener("click", fl_ClickToGoToWebPage_6);
		
		function fl_ClickToGoToWebPage_6() {
			window.open("http://www.adobe.com", "_blank");
		}
	}
	this.frame_74 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.Btn7.addEventListener("click", fl_ClickToGoToWebPage_7);
		
		function fl_ClickToGoToWebPage_7() {
			window.open("http://www.adobe.com", "_blank");
		}
	}
	this.frame_78 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.Btn8.addEventListener("click", fl_ClickToGoToWebPage_8);
		
		function fl_ClickToGoToWebPage_8() {
			window.open("http://www.adobe.com", "_blank");
		}
	}
	this.frame_82 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.Btn9.addEventListener("click", fl_ClickToGoToWebPage_9);
		
		function fl_ClickToGoToWebPage_9() {
			window.open("http://www.adobe.com", "_blank");
		}
	}
	this.frame_86 = function() {
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.Btn10.addEventListener("click", fl_ClickToGoToWebPage_10);
		
		function fl_ClickToGoToWebPage_10() {
			window.open("http://www.adobe.com", "_blank");
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(51).call(this.frame_51).wait(3).call(this.frame_54).wait(4).call(this.frame_58).wait(4).call(this.frame_62).wait(4).call(this.frame_66).wait(4).call(this.frame_70).wait(4).call(this.frame_74).wait(4).call(this.frame_78).wait(4).call(this.frame_82).wait(4).call(this.frame_86).wait(69));

	// Btn10
	this.Btn10 = new lib.Btn10();
	this.Btn10.name = "Btn10";
	this.Btn10.setTransform(729,237.5);
	this.Btn10._off = true;
	new cjs.ButtonHelper(this.Btn10, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn10).wait(86).to({_off:false},0).wait(69));

	// Line10
	this.instance = new lib.Line("synched",0);
	this.instance.setTransform(960,540.05,1,1,-161.8432,0,0,-225.7,-0.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(83).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:-150.2287,x:764.263,y:427.5912},0).wait(1).to({rotation:-138.6143,x:790.894,y:390.4857},0).wait(1).to({rotation:-127,x:824.4499,y:359.5014},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// Btn9
	this.Btn9 = new lib.Btn9();
	this.Btn9.name = "Btn9";
	this.Btn9.setTransform(614,426);
	this.Btn9._off = true;
	new cjs.ButtonHelper(this.Btn9, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn9).wait(82).to({_off:false},0).wait(73));

	// Line9
	this.instance_1 = new lib.Line("synched",0);
	this.instance_1.setTransform(960.05,539.85,1,1,162.0041,0,0,-226.2,-0.7);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(79).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:174.0027,x:735.0143,y:562.8297},0).wait(1).to({rotation:186.0013,x:735.1622,y:515.5561},0).wait(1).to({rotation:198,x:745.1345,y:469.346},0).wait(1).to({y:469.3453},0).wait(1).to({y:469.3446},0).wait(1).to({y:469.344},0).wait(1).to({y:469.3433},0).wait(1).to({y:469.3426},0).wait(1).to({y:469.342},0).wait(1).to({y:469.3413},0).wait(1).to({y:469.3406},0).wait(1).to({y:469.34},0).wait(1).to({y:469.3393},0).wait(1).to({y:469.3386},0).wait(1).to({y:469.338},0).wait(1).to({y:469.3373},0).wait(1).to({y:469.3366},0).wait(1).to({y:469.336},0).wait(1).to({y:469.3353},0).wait(1).to({y:469.3346},0).wait(1).to({y:469.334},0).wait(1).to({y:469.3333},0).wait(1).to({y:469.3326},0).wait(1).to({y:469.332},0).wait(1).to({y:469.3313},0).wait(1).to({y:469.3306},0).wait(1).to({y:469.33},0).wait(1).to({y:469.3293},0).wait(1).to({y:469.3286},0).wait(1).to({y:469.328},0).wait(1).to({y:469.3273},0).wait(1).to({y:469.3266},0).wait(1).to({y:469.326},0).wait(1).to({y:469.3253},0).wait(1).to({y:469.3246},0).wait(1).to({y:469.324},0).wait(1).to({y:469.3233},0).wait(1).to({y:469.3226},0).wait(1).to({y:469.322},0).wait(1).to({y:469.3213},0).wait(1).to({y:469.3206},0).wait(1).to({y:469.32},0).wait(1).to({y:469.3193},0).wait(1).to({y:469.3186},0).wait(1).to({y:469.318},0).wait(1).to({y:469.3173},0).wait(1).to({y:469.3166},0).wait(1).to({y:469.316},0).wait(1).to({y:469.3153},0).wait(1).to({y:469.3146},0).wait(1).to({y:469.314},0).wait(1).to({y:469.3133},0).wait(1).to({y:469.3126},0).wait(1).to({y:469.312},0).wait(1).to({y:469.3113},0).wait(1).to({y:469.3106},0).wait(1).to({y:469.31},0).wait(1).to({y:469.3093},0).wait(1).to({y:469.3086},0).wait(1).to({y:469.308},0).wait(1).to({y:469.3073},0).wait(1).to({y:469.3066},0).wait(1).to({y:469.306},0).wait(1).to({y:469.3053},0).wait(1).to({y:469.3046},0).wait(1).to({y:469.304},0).wait(1).to({y:469.3033},0).wait(1).to({y:469.3026},0).wait(1).to({y:469.302},0).wait(1).to({y:469.3013},0).wait(1).to({y:469.3006},0).wait(1).to({y:469.3},0).wait(1).to({y:469.2993},0).wait(1).to({y:469.2986},0).wait(1).to({y:469.298},0).wait(1));

	// Btn8
	this.Btn8 = new lib.Btn8();
	this.Btn8.name = "Btn8";
	this.Btn8.setTransform(614,664.5);
	this.Btn8._off = true;
	new cjs.ButtonHelper(this.Btn8, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn8).wait(78).to({_off:false},0).wait(77));

	// Line8
	this.instance_2 = new lib.Line("synched",0);
	this.instance_2.setTransform(960,539.95,1,1,123.0009,0,0,-225.2,0.4);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(75).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:136.0007,x:798.3085,y:696.6468},0).wait(1).to({rotation:149.0003,x:767.206,y:656.2606},0).wait(1).to({rotation:162,x:745.9851,y:609.913},0).wait(1).to({y:609.9124},0).wait(1).to({y:609.9117},0).wait(1).to({y:609.9111},0).wait(1).to({y:609.9105},0).wait(1).to({y:609.9098},0).wait(1).to({y:609.9092},0).wait(1).to({y:609.9086},0).wait(1).to({y:609.9079},0).wait(1).to({y:609.9073},0).wait(1).to({y:609.9067},0).wait(1).to({y:609.906},0).wait(1).to({y:609.9054},0).wait(1).to({y:609.9048},0).wait(1).to({y:609.9041},0).wait(1).to({y:609.9035},0).wait(1).to({y:609.9029},0).wait(1).to({y:609.9022},0).wait(1).to({y:609.9016},0).wait(1).to({y:609.901},0).wait(1).to({y:609.9003},0).wait(1).to({y:609.8997},0).wait(1).to({y:609.8991},0).wait(1).to({y:609.8984},0).wait(1).to({y:609.8978},0).wait(1).to({y:609.8972},0).wait(1).to({y:609.8965},0).wait(1).to({y:609.8959},0).wait(1).to({y:609.8953},0).wait(1).to({y:609.8946},0).wait(1).to({y:609.894},0).wait(1).to({y:609.8934},0).wait(1).to({y:609.8927},0).wait(1).to({y:609.8921},0).wait(1).to({y:609.8915},0).wait(1).to({y:609.8908},0).wait(1).to({y:609.8902},0).wait(1).to({y:609.8896},0).wait(1).to({y:609.8889},0).wait(1).to({y:609.8883},0).wait(1).to({y:609.8877},0).wait(1).to({y:609.887},0).wait(1).to({y:609.8864},0).wait(1).to({y:609.8858},0).wait(1).to({y:609.8851},0).wait(1).to({y:609.8845},0).wait(1).to({y:609.8839},0).wait(1).to({y:609.8832},0).wait(1).to({y:609.8826},0).wait(1).to({y:609.882},0).wait(1).to({y:609.8813},0).wait(1).to({y:609.8807},0).wait(1).to({y:609.8801},0).wait(1).to({y:609.8794},0).wait(1).to({y:609.8788},0).wait(1).to({y:609.8782},0).wait(1).to({y:609.8775},0).wait(1).to({y:609.8769},0).wait(1).to({y:609.8763},0).wait(1).to({y:609.8756},0).wait(1).to({y:609.875},0).wait(1).to({y:609.8744},0).wait(1).to({y:609.8738},0).wait(1).to({y:609.8731},0).wait(1).to({y:609.8725},0).wait(1).to({y:609.8719},0).wait(1).to({y:609.8712},0).wait(1).to({y:609.8706},0).wait(1).to({y:609.87},0).wait(1).to({y:609.8693},0).wait(1).to({y:609.8687},0).wait(1).to({y:609.8681},0).wait(1).to({y:609.8674},0).wait(1).to({y:609.8668},0).wait(1).to({y:609.8662},0).wait(1).to({y:609.8655},0).wait(1).to({y:609.8649},0).wait(1));

	// Btn7
	this.Btn7 = new lib.Btn7();
	this.Btn7.name = "Btn7";
	this.Btn7.setTransform(729,848);
	this.Btn7._off = true;
	new cjs.ButtonHelper(this.Btn7, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn7).wait(74).to({_off:false},0).wait(81));

	// Line7
	this.instance_3 = new lib.Line("synched",0);
	this.instance_3.setTransform(960,540,1,1,90.9993,0,0,-226.6,0.1);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(71).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:102.6667,x:910.4117,y:761.0791},0).wait(1).to({rotation:114.3333,x:866.7272,y:746.4728},0).wait(1).to({rotation:126,x:826.8986,y:723.3345},0).wait(1).to({x:826.898,y:723.3339},0).wait(1).to({x:826.8974,y:723.3333},0).wait(1).to({x:826.8968,y:723.3327},0).wait(1).to({x:826.8962,y:723.3321},0).wait(1).to({x:826.8956,y:723.3315},0).wait(1).to({x:826.895,y:723.3309},0).wait(1).to({x:826.8944,y:723.3303},0).wait(1).to({x:826.8938,y:723.3297},0).wait(1).to({x:826.8932,y:723.3291},0).wait(1).to({x:826.8926,y:723.3285},0).wait(1).to({x:826.892,y:723.3279},0).wait(1).to({x:826.8914,y:723.3273},0).wait(1).to({x:826.8908,y:723.3267},0).wait(1).to({x:826.8902,y:723.3261},0).wait(1).to({x:826.8896,y:723.3255},0).wait(1).to({x:826.889,y:723.3249},0).wait(1).to({x:826.8884,y:723.3243},0).wait(1).to({x:826.8878,y:723.3237},0).wait(1).to({x:826.8872,y:723.3231},0).wait(1).to({x:826.8865,y:723.3225},0).wait(1).to({x:826.8859,y:723.3219},0).wait(1).to({x:826.8853,y:723.3213},0).wait(1).to({x:826.8847,y:723.3207},0).wait(1).to({x:826.8841,y:723.3201},0).wait(1).to({x:826.8835,y:723.3195},0).wait(1).to({x:826.8829,y:723.3189},0).wait(1).to({x:826.8823,y:723.3183},0).wait(1).to({x:826.8817,y:723.3177},0).wait(1).to({x:826.8811,y:723.3171},0).wait(1).to({x:826.8805,y:723.3165},0).wait(1).to({x:826.8799,y:723.3159},0).wait(1).to({x:826.8793,y:723.3153},0).wait(1).to({x:826.8787,y:723.3147},0).wait(1).to({x:826.8781,y:723.3141},0).wait(1).to({x:826.8775,y:723.3135},0).wait(1).to({x:826.8769,y:723.3129},0).wait(1).to({x:826.8763,y:723.3122},0).wait(1).to({x:826.8757,y:723.3116},0).wait(1).to({x:826.8751,y:723.311},0).wait(1).to({x:826.8745,y:723.3104},0).wait(1).to({x:826.8739,y:723.3098},0).wait(1).to({x:826.8733,y:723.3092},0).wait(1).to({x:826.8727,y:723.3086},0).wait(1).to({x:826.8721,y:723.308},0).wait(1).to({x:826.8715,y:723.3074},0).wait(1).to({x:826.8709,y:723.3068},0).wait(1).to({x:826.8703,y:723.3062},0).wait(1).to({x:826.8697,y:723.3056},0).wait(1).to({x:826.8691,y:723.305},0).wait(1).to({x:826.8685,y:723.3044},0).wait(1).to({x:826.8679,y:723.3038},0).wait(1).to({x:826.8673,y:723.3032},0).wait(1).to({x:826.8667,y:723.3026},0).wait(1).to({x:826.8661,y:723.302},0).wait(1).to({x:826.8655,y:723.3014},0).wait(1).to({x:826.8649,y:723.3008},0).wait(1).to({x:826.8643,y:723.3002},0).wait(1).to({x:826.8637,y:723.2996},0).wait(1).to({x:826.8631,y:723.299},0).wait(1).to({x:826.8625,y:723.2984},0).wait(1).to({x:826.8619,y:723.2978},0).wait(1).to({x:826.8612,y:723.2972},0).wait(1).to({x:826.8606,y:723.2966},0).wait(1).to({x:826.86,y:723.296},0).wait(1).to({x:826.8594,y:723.2954},0).wait(1).to({x:826.8588,y:723.2948},0).wait(1).to({x:826.8582,y:723.2942},0).wait(1).to({x:826.8576,y:723.2936},0).wait(1).to({x:826.857,y:723.293},0).wait(1).to({x:826.8564,y:723.2924},0).wait(1).to({x:826.8558,y:723.2918},0).wait(1).to({x:826.8552,y:723.2912},0).wait(1).to({x:826.8546,y:723.2906},0).wait(1).to({x:826.854,y:723.29},0).wait(1).to({x:826.8534,y:723.2894},0).wait(1).to({x:826.8528,y:723.2888},0).wait(1).to({x:826.8522,y:723.2882},0).wait(1).to({x:826.8516,y:723.2875},0).wait(1).to({x:826.851,y:723.2869},0).wait(1).to({x:826.8504,y:723.2863},0).wait(1));

	// Btn6
	this.Btn6 = new lib.Btn6();
	this.Btn6.name = "Btn6";
	this.Btn6.setTransform(956,919.4);
	this.Btn6._off = true;
	new cjs.ButtonHelper(this.Btn6, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn6).wait(70).to({_off:false},0).wait(85));

	// Line6
	this.instance_4 = new lib.Line("synched",0);
	this.instance_4.setTransform(960.1,539.95,1,1,53.0002,0,0,-225.3,-1.1);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(67).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:65.3333,x:1053.1139,y:745.1722},0).wait(1).to({rotation:77.6667,x:1007.129,y:760.3204},0).wait(1).to({rotation:90,x:958.9697,y:765.2969},0).wait(1).to({x:958.9691},0).wait(1).to({x:958.9686},0).wait(1).to({x:958.968},0).wait(1).to({x:958.9674},0).wait(1).to({x:958.9668},0).wait(1).to({x:958.9663},0).wait(1).to({x:958.9657},0).wait(1).to({x:958.9651},0).wait(1).to({x:958.9645},0).wait(1).to({x:958.964},0).wait(1).to({x:958.9634},0).wait(1).to({x:958.9628},0).wait(1).to({x:958.9622},0).wait(1).to({x:958.9617},0).wait(1).to({x:958.9611},0).wait(1).to({x:958.9605},0).wait(1).to({x:958.9599},0).wait(1).to({x:958.9594},0).wait(1).to({x:958.9588},0).wait(1).to({x:958.9582},0).wait(1).to({x:958.9576},0).wait(1).to({x:958.9571},0).wait(1).to({x:958.9565},0).wait(1).to({x:958.9559},0).wait(1).to({x:958.9553},0).wait(1).to({x:958.9548},0).wait(1).to({x:958.9542},0).wait(1).to({x:958.9536},0).wait(1).to({x:958.953},0).wait(1).to({x:958.9525},0).wait(1).to({x:958.9519},0).wait(1).to({x:958.9513},0).wait(1).to({x:958.9507},0).wait(1).to({x:958.9502},0).wait(1).to({x:958.9496},0).wait(1).to({x:958.949},0).wait(1).to({x:958.9484},0).wait(1).to({x:958.9479},0).wait(1).to({x:958.9473},0).wait(1).to({x:958.9467},0).wait(1).to({x:958.9461},0).wait(1).to({x:958.9456},0).wait(1).to({x:958.945},0).wait(1).to({x:958.9444},0).wait(1).to({x:958.9438},0).wait(1).to({x:958.9433},0).wait(1).to({x:958.9427},0).wait(1).to({x:958.9421},0).wait(1).to({x:958.9415},0).wait(1).to({x:958.941},0).wait(1).to({x:958.9404},0).wait(1).to({x:958.9398},0).wait(1).to({x:958.9393},0).wait(1).to({x:958.9387},0).wait(1).to({x:958.9381},0).wait(1).to({x:958.9375},0).wait(1).to({x:958.937},0).wait(1).to({x:958.9364},0).wait(1).to({x:958.9358},0).wait(1).to({x:958.9352},0).wait(1).to({x:958.9347},0).wait(1).to({x:958.9341},0).wait(1).to({x:958.9335},0).wait(1).to({x:958.9329},0).wait(1).to({x:958.9324},0).wait(1).to({x:958.9318},0).wait(1).to({x:958.9312},0).wait(1).to({x:958.9306},0).wait(1).to({x:958.9301},0).wait(1).to({x:958.9295},0).wait(1).to({x:958.9289},0).wait(1).to({x:958.9283},0).wait(1).to({x:958.9278},0).wait(1).to({x:958.9272},0).wait(1).to({x:958.9266},0).wait(1).to({x:958.926},0).wait(1).to({x:958.9255},0).wait(1).to({x:958.9249},0).wait(1).to({x:958.9243},0).wait(1).to({x:958.9237},0).wait(1).to({x:958.9232},0).wait(1).to({x:958.9226},0).wait(1).to({x:958.922},0).wait(1).to({x:958.9214},0).wait(1));

	// Btn5
	this.Btn5 = new lib.Btn5();
	this.Btn5.name = "Btn5";
	this.Btn5.setTransform(1193.65,848.4);
	this.Btn5._off = true;
	new cjs.ButtonHelper(this.Btn5, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn5).wait(66).to({_off:false},0).wait(89));

	// Line5
	this.instance_5 = new lib.Line("synched",0);
	this.instance_5.setTransform(960.05,540,1,1,18.9998,0,0,-227.7,2);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(63).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:30.6667,x:1156.9358,y:654.4173},0).wait(1).to({rotation:42.3333,x:1129.737,y:691.8566},0).wait(1).to({rotation:54,x:1095.529,y:723.0224},0).wait(1).to({x:1095.5285,y:723.0219},0).wait(1).to({x:1095.5279,y:723.0213},0).wait(1).to({x:1095.5274,y:723.0208},0).wait(1).to({x:1095.5268,y:723.0202},0).wait(1).to({x:1095.5263,y:723.0197},0).wait(1).to({x:1095.5257,y:723.0191},0).wait(1).to({x:1095.5252,y:723.0186},0).wait(1).to({x:1095.5246,y:723.018},0).wait(1).to({x:1095.5241,y:723.0175},0).wait(1).to({x:1095.5235,y:723.0169},0).wait(1).to({x:1095.523,y:723.0164},0).wait(1).to({x:1095.5224,y:723.0158},0).wait(1).to({x:1095.5219,y:723.0153},0).wait(1).to({x:1095.5213,y:723.0147},0).wait(1).to({x:1095.5208,y:723.0142},0).wait(1).to({x:1095.5202,y:723.0136},0).wait(1).to({x:1095.5197,y:723.0131},0).wait(1).to({x:1095.5191,y:723.0126},0).wait(1).to({x:1095.5186,y:723.012},0).wait(1).to({x:1095.518,y:723.0115},0).wait(1).to({x:1095.5175,y:723.0109},0).wait(1).to({x:1095.5169,y:723.0104},0).wait(1).to({x:1095.5164,y:723.0098},0).wait(1).to({x:1095.5158,y:723.0093},0).wait(1).to({x:1095.5153,y:723.0087},0).wait(1).to({x:1095.5147,y:723.0082},0).wait(1).to({x:1095.5142,y:723.0076},0).wait(1).to({x:1095.5136,y:723.0071},0).wait(1).to({x:1095.5131,y:723.0065},0).wait(1).to({x:1095.5125,y:723.006},0).wait(1).to({x:1095.512,y:723.0054},0).wait(1).to({x:1095.5114,y:723.0049},0).wait(1).to({x:1095.5109,y:723.0043},0).wait(1).to({x:1095.5103,y:723.0038},0).wait(1).to({x:1095.5098,y:723.0032},0).wait(1).to({x:1095.5092,y:723.0027},0).wait(1).to({x:1095.5087,y:723.0021},0).wait(1).to({x:1095.5081,y:723.0016},0).wait(1).to({x:1095.5076,y:723.001},0).wait(1).to({x:1095.507,y:723.0005},0).wait(1).to({x:1095.5065,y:722.9999},0).wait(1).to({x:1095.506,y:722.9994},0).wait(1).to({x:1095.5054,y:722.9988},0).wait(1).to({x:1095.5049,y:722.9983},0).wait(1).to({x:1095.5043,y:722.9977},0).wait(1).to({x:1095.5038,y:722.9972},0).wait(1).to({x:1095.5032,y:722.9966},0).wait(1).to({x:1095.5027,y:722.9961},0).wait(1).to({x:1095.5021,y:722.9955},0).wait(1).to({x:1095.5016,y:722.995},0).wait(1).to({x:1095.501,y:722.9944},0).wait(1).to({x:1095.5005,y:722.9939},0).wait(1).to({x:1095.4999,y:722.9933},0).wait(1).to({x:1095.4994,y:722.9928},0).wait(1).to({x:1095.4988,y:722.9922},0).wait(1).to({x:1095.4983,y:722.9917},0).wait(1).to({x:1095.4977,y:722.9911},0).wait(1).to({x:1095.4972,y:722.9906},0).wait(1).to({x:1095.4966,y:722.99},0).wait(1).to({x:1095.4961,y:722.9895},0).wait(1).to({x:1095.4955,y:722.9889},0).wait(1).to({x:1095.495,y:722.9884},0).wait(1).to({x:1095.4944,y:722.9878},0).wait(1).to({x:1095.4939,y:722.9873},0).wait(1).to({x:1095.4933,y:722.9867},0).wait(1).to({x:1095.4928,y:722.9862},0).wait(1).to({x:1095.4922,y:722.9856},0).wait(1).to({x:1095.4917,y:722.9851},0).wait(1).to({x:1095.4911,y:722.9845},0).wait(1).to({x:1095.4906,y:722.984},0).wait(1).to({x:1095.49,y:722.9834},0).wait(1).to({x:1095.4895,y:722.9829},0).wait(1).to({x:1095.4889,y:722.9823},0).wait(1).to({x:1095.4884,y:722.9818},0).wait(1).to({x:1095.4878,y:722.9812},0).wait(1).to({x:1095.4873,y:722.9807},0).wait(1).to({x:1095.4867,y:722.9801},0).wait(1).to({x:1095.4862,y:722.9796},0).wait(1).to({x:1095.4856,y:722.979},0).wait(1).to({x:1095.4851,y:722.9785},0).wait(1).to({x:1095.4845,y:722.9779},0).wait(1).to({x:1095.484,y:722.9774},0).wait(1).to({x:1095.4834,y:722.9768},0).wait(1).to({x:1095.4829,y:722.9763},0).wait(1).to({x:1095.4823,y:722.9757},0).wait(1).to({x:1095.4818,y:722.9752},0).wait(1).to({x:1095.4812,y:722.9746},0).wait(1).to({x:1095.4807,y:722.9741},0).wait(1));

	// Btn4
	this.Btn4 = new lib.Btn4();
	this.Btn4.name = "Btn4";
	this.Btn4.setTransform(1307.9,663.45);
	this.Btn4._off = true;
	new cjs.ButtonHelper(this.Btn4, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn4).wait(62).to({_off:false},0).wait(93));

	// Line4
	this.instance_6 = new lib.Line("synched",0);
	this.instance_6.setTransform(960.05,539.95,1,1,-15.9999,0,0,-229.2,0.1);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(59).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:-4.6666,x:1188.4467,y:521.1633},0).wait(1).to({rotation:6.6668,x:1187.686,y:566.4101},0).wait(1).to({rotation:18.0002,x:1178.0482,y:610.6252},0).wait(1).to({x:1178.0477},0).wait(1).to({x:1178.0472},0).wait(1).to({x:1178.0466},0).wait(1).to({x:1178.0461},0).wait(1).to({x:1178.0456},0).wait(1).to({x:1178.0451},0).wait(1).to({x:1178.0445},0).wait(1).to({x:1178.044},0).wait(1).to({x:1178.0435},0).wait(1).to({x:1178.043},0).wait(1).to({x:1178.0424},0).wait(1).to({x:1178.0419},0).wait(1).to({x:1178.0414},0).wait(1).to({x:1178.0408},0).wait(1).to({x:1178.0403},0).wait(1).to({x:1178.0398},0).wait(1).to({x:1178.0393},0).wait(1).to({x:1178.0387},0).wait(1).to({x:1178.0382},0).wait(1).to({x:1178.0377},0).wait(1).to({x:1178.0372},0).wait(1).to({x:1178.0366},0).wait(1).to({x:1178.0361},0).wait(1).to({x:1178.0356},0).wait(1).to({x:1178.0351},0).wait(1).to({x:1178.0345},0).wait(1).to({x:1178.034},0).wait(1).to({x:1178.0335},0).wait(1).to({x:1178.033},0).wait(1).to({x:1178.0324},0).wait(1).to({x:1178.0319},0).wait(1).to({x:1178.0314},0).wait(1).to({x:1178.0308},0).wait(1).to({x:1178.0303},0).wait(1).to({x:1178.0298},0).wait(1).to({x:1178.0293},0).wait(1).to({x:1178.0287},0).wait(1).to({x:1178.0282},0).wait(1).to({x:1178.0277},0).wait(1).to({x:1178.0272},0).wait(1).to({x:1178.0266},0).wait(1).to({x:1178.0261},0).wait(1).to({x:1178.0256},0).wait(1).to({x:1178.0251},0).wait(1).to({x:1178.0245},0).wait(1).to({x:1178.024},0).wait(1).to({x:1178.0235},0).wait(1).to({x:1178.023},0).wait(1).to({x:1178.0224},0).wait(1).to({x:1178.0219},0).wait(1).to({x:1178.0214},0).wait(1).to({x:1178.0208},0).wait(1).to({x:1178.0203},0).wait(1).to({x:1178.0198},0).wait(1).to({x:1178.0193},0).wait(1).to({x:1178.0187},0).wait(1).to({x:1178.0182},0).wait(1).to({x:1178.0177},0).wait(1).to({x:1178.0172},0).wait(1).to({x:1178.0166},0).wait(1).to({x:1178.0161},0).wait(1).to({x:1178.0156},0).wait(1).to({x:1178.0151},0).wait(1).to({x:1178.0145},0).wait(1).to({x:1178.014},0).wait(1).to({x:1178.0135},0).wait(1).to({x:1178.013},0).wait(1).to({x:1178.0124},0).wait(1).to({x:1178.0119},0).wait(1).to({x:1178.0114},0).wait(1).to({x:1178.0108},0).wait(1).to({x:1178.0103},0).wait(1).to({x:1178.0098},0).wait(1).to({x:1178.0093},0).wait(1).to({x:1178.0087},0).wait(1).to({x:1178.0082},0).wait(1).to({x:1178.0077},0).wait(1).to({x:1178.0072},0).wait(1).to({x:1178.0066},0).wait(1).to({x:1178.0061},0).wait(1).to({x:1178.0056},0).wait(1).to({x:1178.0051},0).wait(1).to({x:1178.0045},0).wait(1).to({x:1178.004},0).wait(1).to({x:1178.0035},0).wait(1).to({x:1178.003},0).wait(1).to({x:1178.0024},0).wait(1).to({x:1178.0019},0).wait(1).to({x:1178.0014},0).wait(1).to({x:1178.0008},0).wait(1).to({x:1178.0003},0).wait(1).to({x:1177.9998},0).wait(1));

	// Btn3
	this.Btn3 = new lib.Btn3();
	this.Btn3.name = "Btn3";
	this.Btn3.setTransform(1307.9,426.05);
	this.Btn3._off = true;
	new cjs.ButtonHelper(this.Btn3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn3).wait(58).to({_off:false},0).wait(97));

	// Line3
	this.instance_7 = new lib.Line("synched",0);
	this.instance_7.setTransform(960.1,540,1,1,-51.0001,0,0,-227.1,1);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(55).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:-39.9999,x:1133.3778,y:393.2195},0).wait(1).to({rotation:-28.9998,x:1158.1874,y:428.9802},0).wait(1).to({rotation:-17.9997,x:1175.7177,y:468.8179},0).wait(1).to({x:1175.7172},0).wait(1).to({x:1175.7167},0).wait(1).to({x:1175.7161},0).wait(1).to({x:1175.7156},0).wait(1).to({x:1175.7151},0).wait(1).to({x:1175.7146},0).wait(1).to({x:1175.7141},0).wait(1).to({x:1175.7136},0).wait(1).to({x:1175.7131},0).wait(1).to({x:1175.7126},0).wait(1).to({x:1175.7121},0).wait(1).to({x:1175.7116},0).wait(1).to({x:1175.7111},0).wait(1).to({x:1175.7106},0).wait(1).to({x:1175.7101},0).wait(1).to({x:1175.7096},0).wait(1).to({x:1175.7091},0).wait(1).to({x:1175.7086},0).wait(1).to({x:1175.7081},0).wait(1).to({x:1175.7076},0).wait(1).to({x:1175.7071},0).wait(1).to({x:1175.7066},0).wait(1).to({x:1175.706},0).wait(1).to({x:1175.7055},0).wait(1).to({x:1175.705},0).wait(1).to({x:1175.7045},0).wait(1).to({x:1175.704},0).wait(1).to({x:1175.7035},0).wait(1).to({x:1175.703},0).wait(1).to({x:1175.7025},0).wait(1).to({x:1175.702},0).wait(1).to({x:1175.7015},0).wait(1).to({x:1175.701},0).wait(1).to({x:1175.7005},0).wait(1).to({x:1175.7},0).wait(1).to({x:1175.6995},0).wait(1).to({x:1175.699},0).wait(1).to({x:1175.6985},0).wait(1).to({x:1175.698},0).wait(1).to({x:1175.6975},0).wait(1).to({x:1175.697},0).wait(1).to({x:1175.6964},0).wait(1).to({x:1175.6959},0).wait(1).to({x:1175.6954},0).wait(1).to({x:1175.6949},0).wait(1).to({x:1175.6944},0).wait(1).to({x:1175.6939},0).wait(1).to({x:1175.6934},0).wait(1).to({x:1175.6929},0).wait(1).to({x:1175.6924},0).wait(1).to({x:1175.6919},0).wait(1).to({x:1175.6914},0).wait(1).to({x:1175.6909},0).wait(1).to({x:1175.6904},0).wait(1).to({x:1175.6899},0).wait(1).to({x:1175.6894},0).wait(1).to({x:1175.6889},0).wait(1).to({x:1175.6884},0).wait(1).to({x:1175.6879},0).wait(1).to({x:1175.6874},0).wait(1).to({x:1175.6869},0).wait(1).to({x:1175.6863},0).wait(1).to({x:1175.6858},0).wait(1).to({x:1175.6853},0).wait(1).to({x:1175.6848},0).wait(1).to({x:1175.6843},0).wait(1).to({x:1175.6838},0).wait(1).to({x:1175.6833},0).wait(1).to({x:1175.6828},0).wait(1).to({x:1175.6823},0).wait(1).to({x:1175.6818},0).wait(1).to({x:1175.6813},0).wait(1).to({x:1175.6808},0).wait(1).to({x:1175.6803},0).wait(1).to({x:1175.6798},0).wait(1).to({x:1175.6793},0).wait(1).to({x:1175.6788},0).wait(1).to({x:1175.6783},0).wait(1).to({x:1175.6778},0).wait(1).to({x:1175.6773},0).wait(1).to({x:1175.6768},0).wait(1).to({x:1175.6762},0).wait(1).to({x:1175.6757},0).wait(1).to({x:1175.6752},0).wait(1).to({x:1175.6747},0).wait(1).to({x:1175.6742},0).wait(1).to({x:1175.6737},0).wait(1).to({x:1175.6732},0).wait(1).to({x:1175.6727},0).wait(1).to({x:1175.6722},0).wait(1).to({x:1175.6717},0).wait(1).to({x:1175.6712},0).wait(1).to({x:1175.6707},0).wait(1).to({x:1175.6702},0).wait(1).to({x:1175.6697},0).wait(1).to({x:1175.6692},0).wait(1));

	// Btn2
	this.Btn2 = new lib.Btn2();
	this.Btn2.name = "Btn2";
	this.Btn2.setTransform(1182.95,237.9);
	this.Btn2._off = true;
	new cjs.ButtonHelper(this.Btn2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn2).wait(54).to({_off:false},0).wait(101));

	// Line2
	this.instance_8 = new lib.Line("synched",0);
	this.instance_8.setTransform(960.05,540,1,1,-83.0007,0,0,-230,1.8);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(51).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:-73.3334,x:1024.2909,y:319.1476},0).wait(1).to({rotation:-63.6668,x:1060.4551,y:333.0671},0).wait(1).to({rotation:-54.0002,x:1093.7685,y:352.8616},0).wait(1).to({x:1093.768},0).wait(1).to({x:1093.7675},0).wait(1).to({x:1093.767},0).wait(1).to({x:1093.7666},0).wait(1).to({x:1093.7661},0).wait(1).to({x:1093.7656},0).wait(1).to({x:1093.7651},0).wait(1).to({x:1093.7646},0).wait(1).to({x:1093.7641},0).wait(1).to({x:1093.7636},0).wait(1).to({x:1093.7632},0).wait(1).to({x:1093.7627},0).wait(1).to({x:1093.7622},0).wait(1).to({x:1093.7617},0).wait(1).to({x:1093.7612},0).wait(1).to({x:1093.7607},0).wait(1).to({x:1093.7602},0).wait(1).to({x:1093.7598},0).wait(1).to({x:1093.7593},0).wait(1).to({x:1093.7588},0).wait(1).to({x:1093.7583},0).wait(1).to({x:1093.7578},0).wait(1).to({x:1093.7573},0).wait(1).to({x:1093.7569},0).wait(1).to({x:1093.7564},0).wait(1).to({x:1093.7559},0).wait(1).to({x:1093.7554},0).wait(1).to({x:1093.7549},0).wait(1).to({x:1093.7544},0).wait(1).to({x:1093.7539},0).wait(1).to({x:1093.7535},0).wait(1).to({x:1093.753},0).wait(1).to({x:1093.7525},0).wait(1).to({x:1093.752},0).wait(1).to({x:1093.7515},0).wait(1).to({x:1093.751},0).wait(1).to({x:1093.7505},0).wait(1).to({x:1093.7501},0).wait(1).to({x:1093.7496},0).wait(1).to({x:1093.7491},0).wait(1).to({x:1093.7486},0).wait(1).to({x:1093.7481},0).wait(1).to({x:1093.7476},0).wait(1).to({x:1093.7471},0).wait(1).to({x:1093.7467},0).wait(1).to({x:1093.7462},0).wait(1).to({x:1093.7457},0).wait(1).to({x:1093.7452},0).wait(1).to({x:1093.7447},0).wait(1).to({x:1093.7442},0).wait(1).to({x:1093.7437},0).wait(1).to({x:1093.7433},0).wait(1).to({x:1093.7428},0).wait(1).to({x:1093.7423},0).wait(1).to({x:1093.7418},0).wait(1).to({x:1093.7413},0).wait(1).to({x:1093.7408},0).wait(1).to({x:1093.7403},0).wait(1).to({x:1093.7399},0).wait(1).to({x:1093.7394},0).wait(1).to({x:1093.7389},0).wait(1).to({x:1093.7384},0).wait(1).to({x:1093.7379},0).wait(1).to({x:1093.7374},0).wait(1).to({x:1093.7369},0).wait(1).to({x:1093.7365},0).wait(1).to({x:1093.736},0).wait(1).to({x:1093.7355},0).wait(1).to({x:1093.735},0).wait(1).to({x:1093.7345},0).wait(1).to({x:1093.734},0).wait(1).to({x:1093.7336},0).wait(1).to({x:1093.7331},0).wait(1).to({x:1093.7326},0).wait(1).to({x:1093.7321},0).wait(1).to({x:1093.7316},0).wait(1).to({x:1093.7311},0).wait(1).to({x:1093.7306},0).wait(1).to({x:1093.7302},0).wait(1).to({x:1093.7297},0).wait(1).to({x:1093.7292},0).wait(1).to({x:1093.7287},0).wait(1).to({x:1093.7282},0).wait(1).to({x:1093.7277},0).wait(1).to({x:1093.7272},0).wait(1).to({x:1093.7268},0).wait(1).to({x:1093.7263},0).wait(1).to({x:1093.7258},0).wait(1).to({x:1093.7253},0).wait(1).to({x:1093.7248},0).wait(1).to({x:1093.7243},0).wait(1).to({x:1093.7238},0).wait(1).to({x:1093.7234},0).wait(1).to({x:1093.7229},0).wait(1).to({x:1093.7224},0).wait(1).to({x:1093.7219},0).wait(1).to({x:1093.7214},0).wait(1).to({x:1093.7209},0).wait(1).to({x:1093.7204},0).wait(1).to({x:1093.72},0).wait(1));

	// Btn1
	this.Btn1 = new lib.Btn1();
	this.Btn1.name = "Btn1";
	this.Btn1.setTransform(960,154);
	this.Btn1.alpha = 0;
	this.Btn1._off = true;
	new cjs.ButtonHelper(this.Btn1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn1).wait(47).to({_off:false},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:1},0).wait(104));

	// Line1
	this.instance_9 = new lib.Line("synched",0);
	this.instance_9.setTransform(960.05,310.05,1,1,-90.0017,0,0,0,0.1);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(43).to({_off:false},0).wait(1).to({regY:0,rotation:-90.0018,x:959.95,alpha:0.25},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// Logo
	this.instance_10 = new lib.Logo("synched",0);
	this.instance_10.setTransform(961.05,541.25,3.962,3.962,0,0,0,0.3,0.4);
	this.instance_10.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({regX:0,regY:0,scaleX:3.8376,scaleY:3.8376,x:959.8873,y:539.6936,alpha:0.0625},0).wait(1).to({scaleX:3.7143,scaleY:3.7143,x:959.9243,y:539.7367,alpha:0.125},0).wait(1).to({scaleX:3.5923,scaleY:3.5923,x:959.9609,y:539.7794,alpha:0.1875},0).wait(1).to({scaleX:3.4714,scaleY:3.4714,x:959.9972,y:539.8217,alpha:0.25},0).wait(1).to({scaleX:3.3383,scaleY:3.3383,x:960.0371,y:539.8683,alpha:0.3125},0).wait(1).to({scaleX:3.2054,scaleY:3.2054,x:960.077,y:539.9148,alpha:0.375},0).wait(1).to({scaleX:3.0737,scaleY:3.0737,x:960.1165,y:539.9609,alpha:0.4375},0).wait(1).to({scaleX:2.9433,scaleY:2.9433,x:960.1556,y:540.0066,alpha:0.5},0).wait(1).to({scaleX:2.8142,scaleY:2.8142,x:960.1943,y:540.0517,alpha:0.5625},0).wait(1).to({scaleX:2.6864,scaleY:2.6864,x:960.2327,y:540.0965,alpha:0.625},0).wait(1).to({scaleX:2.56,scaleY:2.56,x:960.2706,y:540.1407,alpha:0.6875},0).wait(1).to({scaleX:2.4348,scaleY:2.4348,x:960.3082,y:540.1845,alpha:0.75},0).wait(1).to({scaleX:2.3108,scaleY:2.3108,x:960.3454,y:540.2279,alpha:0.8125},0).wait(1).to({scaleX:2.1881,scaleY:2.1881,x:960.3822,y:540.2709,alpha:0.875},0).wait(1).to({scaleX:2.0666,scaleY:2.0666,x:960.4186,y:540.3134,alpha:0.9375},0).wait(1).to({scaleX:1.9464,scaleY:1.9464,x:960.4547,y:540.3555,alpha:1},0).wait(1).to({scaleX:1.8273,scaleY:1.8273,x:960.4904,y:540.3971},0).wait(1).to({scaleX:1.7095,scaleY:1.7095,x:960.5258,y:540.4384},0).wait(1).to({scaleX:1.5929,scaleY:1.5929,x:960.5607,y:540.4792},0).wait(1).to({scaleX:1.4776,scaleY:1.4776,x:960.5953,y:540.5196},0).wait(1).to({scaleX:1.3634,scaleY:1.3634,x:960.6296,y:540.5595},0).wait(1).to({scaleX:1.2503,scaleY:1.2503,x:960.6635,y:540.5991},0).wait(1).to({scaleX:1.2159,scaleY:1.2159,x:960.6738,y:540.6111},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1492.1,631,-104,351.9);
// library properties:
lib.properties = {
	id: '2787E54436C2464EA9DB4D0582DC77FF',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_1.png", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_1"},
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_2.png", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_2"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['2787E54436C2464EA9DB4D0582DC77FF'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;