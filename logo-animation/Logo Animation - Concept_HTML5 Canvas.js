(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Logo Animation _ Concept_HTML5 Canvas_atlas_1", frames: [[0,0,1712,1712]]},
		{name:"Logo Animation _ Concept_HTML5 Canvas_atlas_2", frames: [[0,0,1542,1021],[0,1023,1542,1021]]},
		{name:"Logo Animation _ Concept_HTML5 Canvas_atlas_3", frames: [[0,0,1542,1021],[0,1023,1542,1021]]},
		{name:"Logo Animation _ Concept_HTML5 Canvas_atlas_4", frames: [[0,0,1542,1021],[0,1023,1542,1021]]},
		{name:"Logo Animation _ Concept_HTML5 Canvas_atlas_5", frames: [[0,0,1542,1021],[0,1023,1542,1021]]},
		{name:"Logo Animation _ Concept_HTML5 Canvas_atlas_6", frames: [[0,0,1542,1021],[0,1023,1542,1021]]},
		{name:"Logo Animation _ Concept_HTML5 Canvas_atlas_7", frames: [[874,760,100,129],[874,503,108,126],[1742,310,100,127],[1640,440,100,126],[1946,381,100,126],[1946,509,100,126],[874,631,102,127],[1844,381,100,127],[1640,310,100,128],[1640,568,284,28],[1742,439,100,127],[1880,0,93,248],[1880,250,127,129],[1640,0,238,308],[1072,0,566,790],[0,503,872,504],[0,0,1070,501]]}
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



(lib.portabledisplays = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.customdisplaysanddesign = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.fabricationservices = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.videoproduction = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.warehousinganddistribution = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.warehousingdistribution = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.portabledisplays_1 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.experientialmarketing = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.eventpersonnel = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.rentaldisplays = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.videoproduction_1 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.rentaldisplays_1 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.graphicdesignproduction = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.experientialmarketing_1 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.fabricationservices_1 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.graphicdesign = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.eventpersonel = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.customdisplays = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.onsitedisplayservices = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.onsitedisplayservices_1 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
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


(lib.btn10image = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.experientialmarketing();
	this.instance.setTransform(-257,-170.15,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257,-170.1,514,340.29999999999995);


(lib.btn9image = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.eventpersonel();
	this.instance.setTransform(-257,-170.15,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257,-170.1,514,340.29999999999995);


(lib.btn8image = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.videoproduction_1();
	this.instance.setTransform(-257,-170.2,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257,-170.2,514,340.4);


(lib.btn7image = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.warehousinganddistribution();
	this.instance.setTransform(-257,-170.15,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257,-170.1,514,340.29999999999995);


(lib.btn6image = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.onsitedisplayservices_1();
	this.instance.setTransform(-257,-170.2,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257,-170.2,514,340.4);


(lib.btn5image = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.graphicdesign();
	this.instance.setTransform(-257,-170.2,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257,-170.2,514,340.4);


(lib.btn4image = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.portabledisplays_1();
	this.instance.setTransform(-257,-170.15,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257,-170.1,514,340.29999999999995);


(lib.btn3image = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.rentaldisplays_1();
	this.instance.setTransform(-257,-170.15,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257,-170.1,514,340.29999999999995);


(lib.btn2image = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.fabricationservices();
	this.instance.setTransform(-257,-170.15,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257,-170.1,514,340.29999999999995);


(lib.btn1image = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.customdisplays();
	this.instance.setTransform(-257,-170.15,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257,-170.1,514,340.29999999999995);


(lib.Btn10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.experientialmarketing_1();
	this.instance.setTransform(-50,-63.5);

	this.instance_1 = new lib.btn10image("synched",0);
	this.instance_1.setTransform(231,302.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-63.5,538,536.3);


(lib.Btn9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.eventpersonnel();
	this.instance.setTransform(-50,-63);

	this.instance_1 = new lib.btn9image("synched",0);
	this.instance_1.setTransform(346,114.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-63,653,347.3);


(lib.Btn8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.videoproduction();
	this.instance.setTransform(-50,-63.5);

	this.instance_1 = new lib.btn8image("synched",0);
	this.instance_1.setTransform(346,-124.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-294.6,653,358.1);


(lib.Btn7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.warehousingdistribution();
	this.instance.setTransform(-50,-63);

	this.instance_1 = new lib.btn7image("synched",0);
	this.instance_1.setTransform(231,-308);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-478.1,538,541.1);


(lib.Btn6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.onsitedisplayservices();
	this.instance.setTransform(-50,-63.5);

	this.instance_1 = new lib.btn6image("synched",0);
	this.instance_1.setTransform(4,-379.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-253,-549.5,514,613);


(lib.Btn5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.graphicdesignproduction();
	this.instance.setTransform(-51,-63.5);

	this.instance_1 = new lib.btn5image("synched",0);
	this.instance_1.setTransform(-233.65,-308.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-490.6,-478.5,541.6,542);


(lib.Btn4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.portabledisplays();
	this.instance.setTransform(-50,-64.5);

	this.instance_1 = new lib.btn4image("synched",0);
	this.instance_1.setTransform(-348,-123.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-605,-293.4,655,357.9);


(lib.Btn3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.rentaldisplays();
	this.instance.setTransform(-50,-63);

	this.instance_1 = new lib.btn3image("synched",0);
	this.instance_1.setTransform(-348,114.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-605,-63,655,347.4);


(lib.Btn2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.fabricationservices_1();
	this.instance.setTransform(-50,-64);

	this.instance_1 = new lib.btn2image("synched",0);
	this.instance_1.setTransform(-223,302);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-480,-64,530,536.2);


(lib.Btn1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.customdisplaysanddesign();
	this.instance.setTransform(-54,-63);

	this.instance_1 = new lib.btn1image("synched",0);
	this.instance_1.setTransform(0,386.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257,-63,514,619.4);


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
			window.open("https://www.northernproductions.com/#services", "_blank");
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
			window.open("https://www.northernproductions.com/#services", "_blank");
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
			window.open("https://www.northernproductions.com/#rentaldisplays", "_blank");
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
			window.open("https://www.northernproductions.com/#rentaldisplays", "_blank");
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
			window.open("https://www.northernproductions.com/#graphicdesign", "_blank");
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
			window.open("https://www.northernproductions.com/#graphicdesign", "_blank");
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
			window.open("https://www.northernproductions.com/#warehousing", "_blank");
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
			window.open("https://www.northernproductions.com/#warehousing", "_blank");
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
			window.open("https://www.northernproductions.com/#experientialmarketing", "_blank");
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
			window.open("https://www.northernproductions.com/#experientialmarketing", "_blank");
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

	// Btn9
	this.Btn9 = new lib.Btn9();
	this.Btn9.name = "Btn9";
	this.Btn9.setTransform(614,426);
	this.Btn9._off = true;
	new cjs.ButtonHelper(this.Btn9, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn9).wait(82).to({_off:false},0).wait(73));

	// Btn8
	this.Btn8 = new lib.Btn8();
	this.Btn8.name = "Btn8";
	this.Btn8.setTransform(614,664.5);
	this.Btn8._off = true;
	new cjs.ButtonHelper(this.Btn8, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn8).wait(78).to({_off:false},0).wait(77));

	// Btn7
	this.Btn7 = new lib.Btn7();
	this.Btn7.name = "Btn7";
	this.Btn7.setTransform(729,848);
	this.Btn7._off = true;
	new cjs.ButtonHelper(this.Btn7, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn7).wait(74).to({_off:false},0).wait(81));

	// Btn6
	this.Btn6 = new lib.Btn6();
	this.Btn6.name = "Btn6";
	this.Btn6.setTransform(956,919.4);
	this.Btn6._off = true;
	new cjs.ButtonHelper(this.Btn6, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn6).wait(70).to({_off:false},0).wait(85));

	// Btn5
	this.Btn5 = new lib.Btn5();
	this.Btn5.name = "Btn5";
	this.Btn5.setTransform(1193.65,848.4);
	this.Btn5._off = true;
	new cjs.ButtonHelper(this.Btn5, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn5).wait(66).to({_off:false},0).wait(89));

	// Btn4
	this.Btn4 = new lib.Btn4();
	this.Btn4.name = "Btn4";
	this.Btn4.setTransform(1307.9,663.45);
	this.Btn4._off = true;
	new cjs.ButtonHelper(this.Btn4, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn4).wait(62).to({_off:false},0).wait(93));

	// Btn3
	this.Btn3 = new lib.Btn3();
	this.Btn3.name = "Btn3";
	this.Btn3.setTransform(1307.9,426.05);
	this.Btn3._off = true;
	new cjs.ButtonHelper(this.Btn3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn3).wait(58).to({_off:false},0).wait(97));

	// Btn2
	this.Btn2 = new lib.Btn2();
	this.Btn2.name = "Btn2";
	this.Btn2.setTransform(1182.95,237.9);
	this.Btn2._off = true;
	new cjs.ButtonHelper(this.Btn2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn2).wait(54).to({_off:false},0).wait(101));

	// Btn1
	this.Btn1 = new lib.Btn1();
	this.Btn1.name = "Btn1";
	this.Btn1.setTransform(960,154);
	this.Btn1.alpha = 0;
	this.Btn1._off = true;
	new cjs.ButtonHelper(this.Btn1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn1).wait(47).to({_off:false},0).wait(1).to({regY:246.7,y:400.7,alpha:0.25},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:1},0).wait(104));

	// Line10
	this.instance = new lib.Line("synched",0);
	this.instance.setTransform(960,540.05,1,1,-161.8432,0,0,-225.7,-0.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(83).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:-150.2287,x:764.263,y:427.5912},0).wait(1).to({rotation:-138.6143,x:790.894,y:390.4857},0).wait(1).to({rotation:-127,x:824.4499,y:359.5014},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// Line9
	this.instance_1 = new lib.Line("synched",0);
	this.instance_1.setTransform(960.05,539.7,1,1,162.0041,0,0,-226.2,-0.7);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(79).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:174.0027,x:735.004,y:562.6825},0).wait(1).to({rotation:186.0013,x:735.1416,y:515.4096},0).wait(1).to({rotation:198,x:745.1036,y:469.198},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// Line8
	this.instance_2 = new lib.Line("synched",0);
	this.instance_2.setTransform(960,540.1,1,1,123.0009,0,0,-224.8,0.3);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(75).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:136.0007,x:798.4754,y:696.4726},0).wait(1).to({rotation:149.0003,x:767.4321,y:656.1264},0).wait(1).to({rotation:162,x:746.26,y:609.8312},0).wait(1).to({y:609.8306},0).wait(1).to({y:609.83},0).wait(1).to({y:609.8293},0).wait(1).to({y:609.8287},0).wait(1).to({y:609.8281},0).wait(1).to({y:609.8274},0).wait(1).to({y:609.8268},0).wait(1).to({y:609.8262},0).wait(1).to({y:609.8255},0).wait(1).to({y:609.8249},0).wait(1).to({y:609.8243},0).wait(1).to({y:609.8236},0).wait(1).to({y:609.823},0).wait(1).to({y:609.8224},0).wait(1).to({y:609.8217},0).wait(1).to({y:609.8211},0).wait(1).to({y:609.8205},0).wait(1).to({y:609.8198},0).wait(1).to({y:609.8192},0).wait(1).to({y:609.8186},0).wait(1).to({y:609.818},0).wait(1).to({y:609.8173},0).wait(1).to({y:609.8167},0).wait(1).to({y:609.8161},0).wait(1).to({y:609.8154},0).wait(1).to({y:609.8148},0).wait(1).to({y:609.8142},0).wait(1).to({y:609.8135},0).wait(1).to({y:609.8129},0).wait(1).to({y:609.8123},0).wait(1).to({y:609.8116},0).wait(1).to({y:609.811},0).wait(1).to({y:609.8104},0).wait(1).to({y:609.8097},0).wait(1).to({y:609.8091},0).wait(1).to({y:609.8085},0).wait(1).to({y:609.8078},0).wait(1).to({y:609.8072},0).wait(1).to({y:609.8066},0).wait(1).to({y:609.8059},0).wait(1).to({y:609.8053},0).wait(1).to({y:609.8047},0).wait(1).to({y:609.804},0).wait(1).to({y:609.8034},0).wait(1).to({y:609.8028},0).wait(1).to({y:609.8021},0).wait(1).to({y:609.8015},0).wait(1).to({y:609.8009},0).wait(1).to({y:609.8002},0).wait(1).to({y:609.7996},0).wait(1).to({y:609.799},0).wait(1).to({y:609.7983},0).wait(1).to({y:609.7977},0).wait(1).to({y:609.7971},0).wait(1).to({y:609.7964},0).wait(1).to({y:609.7958},0).wait(1).to({y:609.7952},0).wait(1).to({y:609.7945},0).wait(1).to({y:609.7939},0).wait(1).to({y:609.7933},0).wait(1).to({y:609.7926},0).wait(1).to({y:609.792},0).wait(1).to({y:609.7914},0).wait(1).to({y:609.7907},0).wait(1).to({y:609.7901},0).wait(1).to({y:609.7895},0).wait(1).to({y:609.7888},0).wait(1).to({y:609.7882},0).wait(1).to({y:609.7876},0).wait(1).to({y:609.7869},0).wait(1).to({y:609.7863},0).wait(1).to({y:609.7857},0).wait(1).to({y:609.785},0).wait(1).to({y:609.7844},0).wait(1).to({y:609.7838},0).wait(1).to({y:609.7831},0).wait(1));

	// Line7
	this.instance_3 = new lib.Line("synched",0);
	this.instance_3.setTransform(960,540,1,1,90.9993,0,0,-226.6,0.1);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(71).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:102.6667,x:910.4117,y:761.0791},0).wait(1).to({rotation:114.3333,x:866.7272,y:746.4728},0).wait(1).to({rotation:126,x:826.8986,y:723.3345},0).wait(1).to({x:826.898,y:723.3339},0).wait(1).to({x:826.8974,y:723.3333},0).wait(1).to({x:826.8968,y:723.3327},0).wait(1).to({x:826.8962,y:723.3321},0).wait(1).to({x:826.8956,y:723.3315},0).wait(1).to({x:826.895,y:723.3309},0).wait(1).to({x:826.8944,y:723.3303},0).wait(1).to({x:826.8938,y:723.3297},0).wait(1).to({x:826.8932,y:723.3291},0).wait(1).to({x:826.8926,y:723.3285},0).wait(1).to({x:826.892,y:723.3279},0).wait(1).to({x:826.8914,y:723.3273},0).wait(1).to({x:826.8908,y:723.3267},0).wait(1).to({x:826.8902,y:723.3261},0).wait(1).to({x:826.8896,y:723.3255},0).wait(1).to({x:826.889,y:723.3249},0).wait(1).to({x:826.8884,y:723.3243},0).wait(1).to({x:826.8878,y:723.3237},0).wait(1).to({x:826.8872,y:723.3231},0).wait(1).to({x:826.8865,y:723.3225},0).wait(1).to({x:826.8859,y:723.3219},0).wait(1).to({x:826.8853,y:723.3213},0).wait(1).to({x:826.8847,y:723.3207},0).wait(1).to({x:826.8841,y:723.3201},0).wait(1).to({x:826.8835,y:723.3195},0).wait(1).to({x:826.8829,y:723.3189},0).wait(1).to({x:826.8823,y:723.3183},0).wait(1).to({x:826.8817,y:723.3177},0).wait(1).to({x:826.8811,y:723.3171},0).wait(1).to({x:826.8805,y:723.3165},0).wait(1).to({x:826.8799,y:723.3159},0).wait(1).to({x:826.8793,y:723.3153},0).wait(1).to({x:826.8787,y:723.3147},0).wait(1).to({x:826.8781,y:723.3141},0).wait(1).to({x:826.8775,y:723.3135},0).wait(1).to({x:826.8769,y:723.3129},0).wait(1).to({x:826.8763,y:723.3122},0).wait(1).to({x:826.8757,y:723.3116},0).wait(1).to({x:826.8751,y:723.311},0).wait(1).to({x:826.8745,y:723.3104},0).wait(1).to({x:826.8739,y:723.3098},0).wait(1).to({x:826.8733,y:723.3092},0).wait(1).to({x:826.8727,y:723.3086},0).wait(1).to({x:826.8721,y:723.308},0).wait(1).to({x:826.8715,y:723.3074},0).wait(1).to({x:826.8709,y:723.3068},0).wait(1).to({x:826.8703,y:723.3062},0).wait(1).to({x:826.8697,y:723.3056},0).wait(1).to({x:826.8691,y:723.305},0).wait(1).to({x:826.8685,y:723.3044},0).wait(1).to({x:826.8679,y:723.3038},0).wait(1).to({x:826.8673,y:723.3032},0).wait(1).to({x:826.8667,y:723.3026},0).wait(1).to({x:826.8661,y:723.302},0).wait(1).to({x:826.8655,y:723.3014},0).wait(1).to({x:826.8649,y:723.3008},0).wait(1).to({x:826.8643,y:723.3002},0).wait(1).to({x:826.8637,y:723.2996},0).wait(1).to({x:826.8631,y:723.299},0).wait(1).to({x:826.8625,y:723.2984},0).wait(1).to({x:826.8619,y:723.2978},0).wait(1).to({x:826.8612,y:723.2972},0).wait(1).to({x:826.8606,y:723.2966},0).wait(1).to({x:826.86,y:723.296},0).wait(1).to({x:826.8594,y:723.2954},0).wait(1).to({x:826.8588,y:723.2948},0).wait(1).to({x:826.8582,y:723.2942},0).wait(1).to({x:826.8576,y:723.2936},0).wait(1).to({x:826.857,y:723.293},0).wait(1).to({x:826.8564,y:723.2924},0).wait(1).to({x:826.8558,y:723.2918},0).wait(1).to({x:826.8552,y:723.2912},0).wait(1).to({x:826.8546,y:723.2906},0).wait(1).to({x:826.854,y:723.29},0).wait(1).to({x:826.8534,y:723.2894},0).wait(1).to({x:826.8528,y:723.2888},0).wait(1).to({x:826.8522,y:723.2882},0).wait(1).to({x:826.8516,y:723.2875},0).wait(1).to({x:826.851,y:723.2869},0).wait(1).to({x:826.8504,y:723.2863},0).wait(1));

	// Line6
	this.instance_4 = new lib.Line("synched",0);
	this.instance_4.setTransform(960.05,539.95,1,1,53.0002,0,0,-225.1,-1.2);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(67).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:65.3333,x:1052.9027,y:744.9615},0).wait(1).to({rotation:77.6667,x:1006.9687,y:760.0587},0).wait(1).to({rotation:90,x:958.87,y:764.9962},0).wait(1).to({x:958.8695},0).wait(1).to({x:958.8689},0).wait(1).to({x:958.8683},0).wait(1).to({x:958.8677},0).wait(1).to({x:958.8672},0).wait(1).to({x:958.8666},0).wait(1).to({x:958.866},0).wait(1).to({x:958.8654},0).wait(1).to({x:958.8649},0).wait(1).to({x:958.8643},0).wait(1).to({x:958.8637},0).wait(1).to({x:958.8632},0).wait(1).to({x:958.8626},0).wait(1).to({x:958.862},0).wait(1).to({x:958.8614},0).wait(1).to({x:958.8609},0).wait(1).to({x:958.8603},0).wait(1).to({x:958.8597},0).wait(1).to({x:958.8591},0).wait(1).to({x:958.8586},0).wait(1).to({x:958.858},0).wait(1).to({x:958.8574},0).wait(1).to({x:958.8568},0).wait(1).to({x:958.8563},0).wait(1).to({x:958.8557},0).wait(1).to({x:958.8551},0).wait(1).to({x:958.8545},0).wait(1).to({x:958.854},0).wait(1).to({x:958.8534},0).wait(1).to({x:958.8528},0).wait(1).to({x:958.8522},0).wait(1).to({x:958.8517},0).wait(1).to({x:958.8511},0).wait(1).to({x:958.8505},0).wait(1).to({x:958.8499},0).wait(1).to({x:958.8494},0).wait(1).to({x:958.8488},0).wait(1).to({x:958.8482},0).wait(1).to({x:958.8476},0).wait(1).to({x:958.8471},0).wait(1).to({x:958.8465},0).wait(1).to({x:958.8459},0).wait(1).to({x:958.8453},0).wait(1).to({x:958.8448},0).wait(1).to({x:958.8442},0).wait(1).to({x:958.8436},0).wait(1).to({x:958.843},0).wait(1).to({x:958.8425},0).wait(1).to({x:958.8419},0).wait(1).to({x:958.8413},0).wait(1).to({x:958.8407},0).wait(1).to({x:958.8402},0).wait(1).to({x:958.8396},0).wait(1).to({x:958.839},0).wait(1).to({x:958.8384},0).wait(1).to({x:958.8379},0).wait(1).to({x:958.8373},0).wait(1).to({x:958.8367},0).wait(1).to({x:958.8361},0).wait(1).to({x:958.8356},0).wait(1).to({x:958.835},0).wait(1).to({x:958.8344},0).wait(1).to({x:958.8338},0).wait(1).to({x:958.8333},0).wait(1).to({x:958.8327},0).wait(1).to({x:958.8321},0).wait(1).to({x:958.8315},0).wait(1).to({x:958.831},0).wait(1).to({x:958.8304},0).wait(1).to({x:958.8298},0).wait(1).to({x:958.8292},0).wait(1).to({x:958.8287},0).wait(1).to({x:958.8281},0).wait(1).to({x:958.8275},0).wait(1).to({x:958.8269},0).wait(1).to({x:958.8264},0).wait(1).to({x:958.8258},0).wait(1).to({x:958.8252},0).wait(1).to({x:958.8246},0).wait(1).to({x:958.8241},0).wait(1).to({x:958.8235},0).wait(1).to({x:958.8229},0).wait(1).to({x:958.8223},0).wait(1).to({x:958.8218},0).wait(1));

	// Line5
	this.instance_5 = new lib.Line("synched",0);
	this.instance_5.setTransform(960.1,540,1,1,18.9998,0,0,-227.6,2.1);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(63).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:30.6667,x:1156.9678,y:654.2709},0).wait(1).to({rotation:42.3333,x:1129.7995,y:691.7201},0).wait(1).to({rotation:54,x:1095.6194,y:722.9019},0).wait(1).to({x:1095.6189,y:722.9014},0).wait(1).to({x:1095.6183,y:722.9008},0).wait(1).to({x:1095.6178,y:722.9003},0).wait(1).to({x:1095.6172,y:722.8997},0).wait(1).to({x:1095.6167,y:722.8992},0).wait(1).to({x:1095.6161,y:722.8986},0).wait(1).to({x:1095.6156,y:722.8981},0).wait(1).to({x:1095.615,y:722.8975},0).wait(1).to({x:1095.6145,y:722.897},0).wait(1).to({x:1095.6139,y:722.8964},0).wait(1).to({x:1095.6134,y:722.8959},0).wait(1).to({x:1095.6128,y:722.8953},0).wait(1).to({x:1095.6123,y:722.8948},0).wait(1).to({x:1095.6117,y:722.8942},0).wait(1).to({x:1095.6112,y:722.8937},0).wait(1).to({x:1095.6106,y:722.8931},0).wait(1).to({x:1095.6101,y:722.8926},0).wait(1).to({x:1095.6095,y:722.892},0).wait(1).to({x:1095.609,y:722.8915},0).wait(1).to({x:1095.6084,y:722.8909},0).wait(1).to({x:1095.6079,y:722.8904},0).wait(1).to({x:1095.6073,y:722.8898},0).wait(1).to({x:1095.6068,y:722.8893},0).wait(1).to({x:1095.6062,y:722.8887},0).wait(1).to({x:1095.6057,y:722.8882},0).wait(1).to({x:1095.6051,y:722.8876},0).wait(1).to({x:1095.6046,y:722.8871},0).wait(1).to({x:1095.604,y:722.8865},0).wait(1).to({x:1095.6035,y:722.886},0).wait(1).to({x:1095.6029,y:722.8854},0).wait(1).to({x:1095.6024,y:722.8849},0).wait(1).to({x:1095.6018,y:722.8843},0).wait(1).to({x:1095.6013,y:722.8838},0).wait(1).to({x:1095.6008,y:722.8832},0).wait(1).to({x:1095.6002,y:722.8827},0).wait(1).to({x:1095.5997,y:722.8821},0).wait(1).to({x:1095.5991,y:722.8816},0).wait(1).to({x:1095.5986,y:722.881},0).wait(1).to({x:1095.598,y:722.8805},0).wait(1).to({x:1095.5975,y:722.8799},0).wait(1).to({x:1095.5969,y:722.8794},0).wait(1).to({x:1095.5964,y:722.8788},0).wait(1).to({x:1095.5958,y:722.8783},0).wait(1).to({x:1095.5953,y:722.8778},0).wait(1).to({x:1095.5947,y:722.8772},0).wait(1).to({x:1095.5942,y:722.8767},0).wait(1).to({x:1095.5936,y:722.8761},0).wait(1).to({x:1095.5931,y:722.8756},0).wait(1).to({x:1095.5925,y:722.875},0).wait(1).to({x:1095.592,y:722.8745},0).wait(1).to({x:1095.5914,y:722.8739},0).wait(1).to({x:1095.5909,y:722.8734},0).wait(1).to({x:1095.5903,y:722.8728},0).wait(1).to({x:1095.5898,y:722.8723},0).wait(1).to({x:1095.5892,y:722.8717},0).wait(1).to({x:1095.5887,y:722.8712},0).wait(1).to({x:1095.5881,y:722.8706},0).wait(1).to({x:1095.5876,y:722.8701},0).wait(1).to({x:1095.587,y:722.8695},0).wait(1).to({x:1095.5865,y:722.869},0).wait(1).to({x:1095.5859,y:722.8684},0).wait(1).to({x:1095.5854,y:722.8679},0).wait(1).to({x:1095.5848,y:722.8673},0).wait(1).to({x:1095.5843,y:722.8668},0).wait(1).to({x:1095.5837,y:722.8662},0).wait(1).to({x:1095.5832,y:722.8657},0).wait(1).to({x:1095.5826,y:722.8651},0).wait(1).to({x:1095.5821,y:722.8646},0).wait(1).to({x:1095.5815,y:722.864},0).wait(1).to({x:1095.581,y:722.8635},0).wait(1).to({x:1095.5804,y:722.8629},0).wait(1).to({x:1095.5799,y:722.8624},0).wait(1).to({x:1095.5793,y:722.8618},0).wait(1).to({x:1095.5788,y:722.8613},0).wait(1).to({x:1095.5782,y:722.8607},0).wait(1).to({x:1095.5777,y:722.8602},0).wait(1).to({x:1095.5771,y:722.8596},0).wait(1).to({x:1095.5766,y:722.8591},0).wait(1).to({x:1095.576,y:722.8585},0).wait(1).to({x:1095.5755,y:722.858},0).wait(1).to({x:1095.5749,y:722.8574},0).wait(1).to({x:1095.5744,y:722.8569},0).wait(1).to({x:1095.5738,y:722.8563},0).wait(1).to({x:1095.5733,y:722.8558},0).wait(1).to({x:1095.5727,y:722.8552},0).wait(1).to({x:1095.5722,y:722.8547},0).wait(1).to({x:1095.5716,y:722.8541},0).wait(1).to({x:1095.5711,y:722.8536},0).wait(1));

	// Line4
	this.instance_6 = new lib.Line("synched",0);
	this.instance_6.setTransform(960.05,539.95,1,1,-15.9999,0,0,-229.2,0.1);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(59).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:-4.6666,x:1188.4467,y:521.1633},0).wait(1).to({rotation:6.6668,x:1187.686,y:566.4101},0).wait(1).to({rotation:18.0002,x:1178.0482,y:610.6252},0).wait(1).to({x:1178.0477},0).wait(1).to({x:1178.0472},0).wait(1).to({x:1178.0466},0).wait(1).to({x:1178.0461},0).wait(1).to({x:1178.0456},0).wait(1).to({x:1178.0451},0).wait(1).to({x:1178.0445},0).wait(1).to({x:1178.044},0).wait(1).to({x:1178.0435},0).wait(1).to({x:1178.043},0).wait(1).to({x:1178.0424},0).wait(1).to({x:1178.0419},0).wait(1).to({x:1178.0414},0).wait(1).to({x:1178.0408},0).wait(1).to({x:1178.0403},0).wait(1).to({x:1178.0398},0).wait(1).to({x:1178.0393},0).wait(1).to({x:1178.0387},0).wait(1).to({x:1178.0382},0).wait(1).to({x:1178.0377},0).wait(1).to({x:1178.0372},0).wait(1).to({x:1178.0366},0).wait(1).to({x:1178.0361},0).wait(1).to({x:1178.0356},0).wait(1).to({x:1178.0351},0).wait(1).to({x:1178.0345},0).wait(1).to({x:1178.034},0).wait(1).to({x:1178.0335},0).wait(1).to({x:1178.033},0).wait(1).to({x:1178.0324},0).wait(1).to({x:1178.0319},0).wait(1).to({x:1178.0314},0).wait(1).to({x:1178.0308},0).wait(1).to({x:1178.0303},0).wait(1).to({x:1178.0298},0).wait(1).to({x:1178.0293},0).wait(1).to({x:1178.0287},0).wait(1).to({x:1178.0282},0).wait(1).to({x:1178.0277},0).wait(1).to({x:1178.0272},0).wait(1).to({x:1178.0266},0).wait(1).to({x:1178.0261},0).wait(1).to({x:1178.0256},0).wait(1).to({x:1178.0251},0).wait(1).to({x:1178.0245},0).wait(1).to({x:1178.024},0).wait(1).to({x:1178.0235},0).wait(1).to({x:1178.023},0).wait(1).to({x:1178.0224},0).wait(1).to({x:1178.0219},0).wait(1).to({x:1178.0214},0).wait(1).to({x:1178.0208},0).wait(1).to({x:1178.0203},0).wait(1).to({x:1178.0198},0).wait(1).to({x:1178.0193},0).wait(1).to({x:1178.0187},0).wait(1).to({x:1178.0182},0).wait(1).to({x:1178.0177},0).wait(1).to({x:1178.0172},0).wait(1).to({x:1178.0166},0).wait(1).to({x:1178.0161},0).wait(1).to({x:1178.0156},0).wait(1).to({x:1178.0151},0).wait(1).to({x:1178.0145},0).wait(1).to({x:1178.014},0).wait(1).to({x:1178.0135},0).wait(1).to({x:1178.013},0).wait(1).to({x:1178.0124},0).wait(1).to({x:1178.0119},0).wait(1).to({x:1178.0114},0).wait(1).to({x:1178.0108},0).wait(1).to({x:1178.0103},0).wait(1).to({x:1178.0098},0).wait(1).to({x:1178.0093},0).wait(1).to({x:1178.0087},0).wait(1).to({x:1178.0082},0).wait(1).to({x:1178.0077},0).wait(1).to({x:1178.0072},0).wait(1).to({x:1178.0066},0).wait(1).to({x:1178.0061},0).wait(1).to({x:1178.0056},0).wait(1).to({x:1178.0051},0).wait(1).to({x:1178.0045},0).wait(1).to({x:1178.004},0).wait(1).to({x:1178.0035},0).wait(1).to({x:1178.003},0).wait(1).to({x:1178.0024},0).wait(1).to({x:1178.0019},0).wait(1).to({x:1178.0014},0).wait(1).to({x:1178.0008},0).wait(1).to({x:1178.0003},0).wait(1).to({x:1177.9998},0).wait(1));

	// Line3
	this.instance_7 = new lib.Line("synched",0);
	this.instance_7.setTransform(960.05,540,1,1,-51.0001,0,0,-226.8,1.1);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(55).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:-39.9999,x:1133.1002,y:393.3655},0).wait(1).to({rotation:-28.9998,x:1157.8931,y:429.068},0).wait(1).to({rotation:-17.9997,x:1175.418,y:468.8453},0).wait(1).to({x:1175.4174},0).wait(1).to({x:1175.4169},0).wait(1).to({x:1175.4164},0).wait(1).to({x:1175.4159},0).wait(1).to({x:1175.4154},0).wait(1).to({x:1175.4149},0).wait(1).to({x:1175.4144},0).wait(1).to({x:1175.4139},0).wait(1).to({x:1175.4134},0).wait(1).to({x:1175.4129},0).wait(1).to({x:1175.4124},0).wait(1).to({x:1175.4119},0).wait(1).to({x:1175.4114},0).wait(1).to({x:1175.4109},0).wait(1).to({x:1175.4104},0).wait(1).to({x:1175.4099},0).wait(1).to({x:1175.4094},0).wait(1).to({x:1175.4089},0).wait(1).to({x:1175.4084},0).wait(1).to({x:1175.4079},0).wait(1).to({x:1175.4073},0).wait(1).to({x:1175.4068},0).wait(1).to({x:1175.4063},0).wait(1).to({x:1175.4058},0).wait(1).to({x:1175.4053},0).wait(1).to({x:1175.4048},0).wait(1).to({x:1175.4043},0).wait(1).to({x:1175.4038},0).wait(1).to({x:1175.4033},0).wait(1).to({x:1175.4028},0).wait(1).to({x:1175.4023},0).wait(1).to({x:1175.4018},0).wait(1).to({x:1175.4013},0).wait(1).to({x:1175.4008},0).wait(1).to({x:1175.4003},0).wait(1).to({x:1175.3998},0).wait(1).to({x:1175.3993},0).wait(1).to({x:1175.3988},0).wait(1).to({x:1175.3983},0).wait(1).to({x:1175.3978},0).wait(1).to({x:1175.3972},0).wait(1).to({x:1175.3967},0).wait(1).to({x:1175.3962},0).wait(1).to({x:1175.3957},0).wait(1).to({x:1175.3952},0).wait(1).to({x:1175.3947},0).wait(1).to({x:1175.3942},0).wait(1).to({x:1175.3937},0).wait(1).to({x:1175.3932},0).wait(1).to({x:1175.3927},0).wait(1).to({x:1175.3922},0).wait(1).to({x:1175.3917},0).wait(1).to({x:1175.3912},0).wait(1).to({x:1175.3907},0).wait(1).to({x:1175.3902},0).wait(1).to({x:1175.3897},0).wait(1).to({x:1175.3892},0).wait(1).to({x:1175.3887},0).wait(1).to({x:1175.3882},0).wait(1).to({x:1175.3877},0).wait(1).to({x:1175.3871},0).wait(1).to({x:1175.3866},0).wait(1).to({x:1175.3861},0).wait(1).to({x:1175.3856},0).wait(1).to({x:1175.3851},0).wait(1).to({x:1175.3846},0).wait(1).to({x:1175.3841},0).wait(1).to({x:1175.3836},0).wait(1).to({x:1175.3831},0).wait(1).to({x:1175.3826},0).wait(1).to({x:1175.3821},0).wait(1).to({x:1175.3816},0).wait(1).to({x:1175.3811},0).wait(1).to({x:1175.3806},0).wait(1).to({x:1175.3801},0).wait(1).to({x:1175.3796},0).wait(1).to({x:1175.3791},0).wait(1).to({x:1175.3786},0).wait(1).to({x:1175.3781},0).wait(1).to({x:1175.3775},0).wait(1).to({x:1175.377},0).wait(1).to({x:1175.3765},0).wait(1).to({x:1175.376},0).wait(1).to({x:1175.3755},0).wait(1).to({x:1175.375},0).wait(1).to({x:1175.3745},0).wait(1).to({x:1175.374},0).wait(1).to({x:1175.3735},0).wait(1).to({x:1175.373},0).wait(1).to({x:1175.3725},0).wait(1).to({x:1175.372},0).wait(1).to({x:1175.3715},0).wait(1).to({x:1175.371},0).wait(1).to({x:1175.3705},0).wait(1).to({x:1175.37},0).wait(1).to({x:1175.3695},0).wait(1));

	// Line2
	this.instance_8 = new lib.Line("synched",0);
	this.instance_8.setTransform(960,540.05,1,1,-83.0007,0,0,-230.1,1.9);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(51).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:-73.3334,x:1024.1626,y:319.0263},0).wait(1).to({rotation:-63.6668,x:1060.3517,y:332.9285},0).wait(1).to({rotation:-54.0002,x:1093.6926,y:352.7101},0).wait(1).to({x:1093.6921},0).wait(1).to({x:1093.6917},0).wait(1).to({x:1093.6912},0).wait(1).to({x:1093.6907},0).wait(1).to({x:1093.6902},0).wait(1).to({x:1093.6897},0).wait(1).to({x:1093.6892},0).wait(1).to({x:1093.6887},0).wait(1).to({x:1093.6883},0).wait(1).to({x:1093.6878},0).wait(1).to({x:1093.6873},0).wait(1).to({x:1093.6868},0).wait(1).to({x:1093.6863},0).wait(1).to({x:1093.6858},0).wait(1).to({x:1093.6853},0).wait(1).to({x:1093.6849},0).wait(1).to({x:1093.6844},0).wait(1).to({x:1093.6839},0).wait(1).to({x:1093.6834},0).wait(1).to({x:1093.6829},0).wait(1).to({x:1093.6824},0).wait(1).to({x:1093.6819},0).wait(1).to({x:1093.6815},0).wait(1).to({x:1093.681},0).wait(1).to({x:1093.6805},0).wait(1).to({x:1093.68},0).wait(1).to({x:1093.6795},0).wait(1).to({x:1093.679},0).wait(1).to({x:1093.6785},0).wait(1).to({x:1093.6781},0).wait(1).to({x:1093.6776},0).wait(1).to({x:1093.6771},0).wait(1).to({x:1093.6766},0).wait(1).to({x:1093.6761},0).wait(1).to({x:1093.6756},0).wait(1).to({x:1093.6751},0).wait(1).to({x:1093.6747},0).wait(1).to({x:1093.6742},0).wait(1).to({x:1093.6737},0).wait(1).to({x:1093.6732},0).wait(1).to({x:1093.6727},0).wait(1).to({x:1093.6722},0).wait(1).to({x:1093.6717},0).wait(1).to({x:1093.6713},0).wait(1).to({x:1093.6708},0).wait(1).to({x:1093.6703},0).wait(1).to({x:1093.6698},0).wait(1).to({x:1093.6693},0).wait(1).to({x:1093.6688},0).wait(1).to({x:1093.6684},0).wait(1).to({x:1093.6679},0).wait(1).to({x:1093.6674},0).wait(1).to({x:1093.6669},0).wait(1).to({x:1093.6664},0).wait(1).to({x:1093.6659},0).wait(1).to({x:1093.6654},0).wait(1).to({x:1093.665},0).wait(1).to({x:1093.6645},0).wait(1).to({x:1093.664},0).wait(1).to({x:1093.6635},0).wait(1).to({x:1093.663},0).wait(1).to({x:1093.6625},0).wait(1).to({x:1093.662},0).wait(1).to({x:1093.6616},0).wait(1).to({x:1093.6611},0).wait(1).to({x:1093.6606},0).wait(1).to({x:1093.6601},0).wait(1).to({x:1093.6596},0).wait(1).to({x:1093.6591},0).wait(1).to({x:1093.6586},0).wait(1).to({x:1093.6582},0).wait(1).to({x:1093.6577},0).wait(1).to({x:1093.6572},0).wait(1).to({x:1093.6567},0).wait(1).to({x:1093.6562},0).wait(1).to({x:1093.6557},0).wait(1).to({x:1093.6552},0).wait(1).to({x:1093.6548},0).wait(1).to({x:1093.6543},0).wait(1).to({x:1093.6538},0).wait(1).to({x:1093.6533},0).wait(1).to({x:1093.6528},0).wait(1).to({x:1093.6523},0).wait(1).to({x:1093.6518},0).wait(1).to({x:1093.6514},0).wait(1).to({x:1093.6509},0).wait(1).to({x:1093.6504},0).wait(1).to({x:1093.6499},0).wait(1).to({x:1093.6494},0).wait(1).to({x:1093.6489},0).wait(1).to({x:1093.6484},0).wait(1).to({x:1093.648},0).wait(1).to({x:1093.6475},0).wait(1).to({x:1093.647},0).wait(1).to({x:1093.6465},0).wait(1).to({x:1093.646},0).wait(1).to({x:1093.6455},0).wait(1).to({x:1093.645},0).wait(1).to({x:1093.6446},0).wait(1).to({x:1093.6441},0).wait(1));

	// Line1
	this.instance_9 = new lib.Line("synched",0);
	this.instance_9.setTransform(960.05,310.05,1,1,-90.0017,0,0,0,0.1);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(43).to({_off:false},0).wait(1).to({regY:0,rotation:-90.0018,x:959.95,alpha:0.25},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// Logo
	this.instance_10 = new lib.Logo("synched",0);
	this.instance_10.setTransform(961.2,541.4,3.962,3.962,0,0,0,0.4,0.5);
	this.instance_10.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({regX:0,regY:0,scaleX:3.8376,scaleY:3.8376,x:959.6498,y:539.456,alpha:0.0625},0).wait(1).to({scaleX:3.7143,scaleY:3.7143,x:959.6991,y:539.5115,alpha:0.125},0).wait(1).to({scaleX:3.5923,scaleY:3.5923,x:959.7479,y:539.5664,alpha:0.1875},0).wait(1).to({scaleX:3.4714,scaleY:3.4714,x:959.7962,y:539.6208,alpha:0.25},0).wait(1).to({scaleX:3.3383,scaleY:3.3383,x:959.8495,y:539.6807,alpha:0.3125},0).wait(1).to({scaleX:3.2054,scaleY:3.2054,x:959.9027,y:539.7405,alpha:0.375},0).wait(1).to({scaleX:3.0737,scaleY:3.0737,x:959.9553,y:539.7998,alpha:0.4375},0).wait(1).to({scaleX:2.9433,scaleY:2.9433,x:960.0075,y:539.8584,alpha:0.5},0).wait(1).to({scaleX:2.8142,scaleY:2.8142,x:960.0591,y:539.9165,alpha:0.5625},0).wait(1).to({scaleX:2.6864,scaleY:2.6864,x:960.1102,y:539.974,alpha:0.625},0).wait(1).to({scaleX:2.56,scaleY:2.56,x:960.1608,y:540.0309,alpha:0.6875},0).wait(1).to({scaleX:2.4348,scaleY:2.4348,x:960.2109,y:540.0873,alpha:0.75},0).wait(1).to({scaleX:2.3108,scaleY:2.3108,x:960.2605,y:540.1431,alpha:0.8125},0).wait(1).to({scaleX:2.1881,scaleY:2.1881,x:960.3096,y:540.1983,alpha:0.875},0).wait(1).to({scaleX:2.0666,scaleY:2.0666,x:960.3582,y:540.2529,alpha:0.9375},0).wait(1).to({scaleX:1.9464,scaleY:1.9464,x:960.4063,y:540.307,alpha:1},0).wait(1).to({scaleX:1.8273,scaleY:1.8273,x:960.4539,y:540.3606},0).wait(1).to({scaleX:1.7095,scaleY:1.7095,x:960.501,y:540.4136},0).wait(1).to({scaleX:1.5929,scaleY:1.5929,x:960.5476,y:540.4661},0).wait(1).to({scaleX:1.4776,scaleY:1.4776,x:960.5938,y:540.518},0).wait(1).to({scaleX:1.3634,scaleY:1.3634,x:960.6395,y:540.5694},0).wait(1).to({scaleX:1.2503,scaleY:1.2503,x:960.6847,y:540.6203},0).wait(1).to({scaleX:1.2159,scaleY:1.2159,x:960.6984,y:540.6357},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1491.9,631,-104.10000000000014,351.9);
// library properties:
lib.properties = {
	id: '2787E54436C2464EA9DB4D0582DC77FF',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_1.png?1592498331663", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_1"},
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_2.png?1592498331664", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_2"},
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_3.png?1592498331664", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_3"},
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_4.png?1592498331664", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_4"},
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_5.png?1592498331664", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_5"},
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_6.png?1592498331664", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_6"},
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_7.png?1592498331664", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_7"}
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