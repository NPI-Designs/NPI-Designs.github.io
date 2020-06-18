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
		{name:"Logo Animation _ Concept_HTML5 Canvas_atlas_7", frames: [[1640,440,100,126],[1946,381,100,126],[1742,310,100,127],[1946,509,100,126],[874,631,102,127],[1844,381,100,127],[1640,310,100,128],[874,760,100,129],[1880,250,127,129],[874,503,108,126],[1742,439,100,127],[1880,0,93,248],[1640,568,284,28],[1640,0,238,308],[0,503,872,504],[1072,0,566,790],[0,0,1070,501]]}
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



(lib.eventpersonnel = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.warehousingdistribution = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.videoproduction = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.onsitedisplayservices = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.experientialmarketing = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.fabricationservices = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.portabledisplays = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.rentaldisplays = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.experientialmarketing_1 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.warehousinganddistribution = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.customdisplays = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.graphicdesignproduction = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.onsitedisplayservices_1 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.fabricationservices_1 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.graphicdesign = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.portabledisplays_1 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.eventpersonel = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.customdisplaysanddesign = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.rentaldisplays_1 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.videoproduction_1 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["Logo Animation _ Concept_HTML5 Canvas_atlas_7"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
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
	this.instance = new lib.experientialmarketing_1();
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
	this.instance = new lib.videoproduction();
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
	this.instance = new lib.onsitedisplayservices();
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
	this.instance = new lib.portabledisplays();
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
	this.instance = new lib.experientialmarketing();
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
	this.instance = new lib.videoproduction_1();
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
	this.instance = new lib.onsitedisplayservices_1();
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
	this.instance = new lib.portabledisplays_1();
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
	this.instance_1.setTransform(960,539.8,1,1,162.0041,0,0,-226.2,-0.7);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(79).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:174.0027,x:734.9621,y:562.7695},0).wait(1).to({rotation:186.0013,x:735.1101,y:515.4854},0).wait(1).to({rotation:198,x:745.0845,y:469.2651},0).wait(1).to({y:469.2644},0).wait(1).to({y:469.2637},0).wait(1).to({y:469.2631},0).wait(1).to({y:469.2624},0).wait(1).to({y:469.2617},0).wait(1).to({y:469.2611},0).wait(1).to({y:469.2604},0).wait(1).to({y:469.2597},0).wait(1).to({y:469.2591},0).wait(1).to({y:469.2584},0).wait(1).to({y:469.2577},0).wait(1).to({y:469.2571},0).wait(1).to({y:469.2564},0).wait(1).to({y:469.2557},0).wait(1).to({y:469.2551},0).wait(1).to({y:469.2544},0).wait(1).to({y:469.2537},0).wait(1).to({y:469.2531},0).wait(1).to({y:469.2524},0).wait(1).to({y:469.2517},0).wait(1).to({y:469.2511},0).wait(1).to({y:469.2504},0).wait(1).to({y:469.2497},0).wait(1).to({y:469.2491},0).wait(1).to({y:469.2484},0).wait(1).to({y:469.2477},0).wait(1).to({y:469.2471},0).wait(1).to({y:469.2464},0).wait(1).to({y:469.2457},0).wait(1).to({y:469.2451},0).wait(1).to({y:469.2444},0).wait(1).to({y:469.2437},0).wait(1).to({y:469.2431},0).wait(1).to({y:469.2424},0).wait(1).to({y:469.2417},0).wait(1).to({y:469.2411},0).wait(1).to({y:469.2404},0).wait(1).to({y:469.2397},0).wait(1).to({y:469.2391},0).wait(1).to({y:469.2384},0).wait(1).to({y:469.2377},0).wait(1).to({y:469.2371},0).wait(1).to({y:469.2364},0).wait(1).to({y:469.2357},0).wait(1).to({y:469.2351},0).wait(1).to({y:469.2344},0).wait(1).to({y:469.2337},0).wait(1).to({y:469.2331},0).wait(1).to({y:469.2324},0).wait(1).to({y:469.2317},0).wait(1).to({y:469.2311},0).wait(1).to({y:469.2304},0).wait(1).to({y:469.2297},0).wait(1).to({y:469.2291},0).wait(1).to({y:469.2284},0).wait(1).to({y:469.2277},0).wait(1).to({y:469.2271},0).wait(1).to({y:469.2264},0).wait(1).to({y:469.2257},0).wait(1).to({y:469.2251},0).wait(1).to({y:469.2244},0).wait(1).to({y:469.2237},0).wait(1).to({y:469.2231},0).wait(1).to({y:469.2224},0).wait(1).to({y:469.2217},0).wait(1).to({y:469.2211},0).wait(1).to({y:469.2204},0).wait(1).to({y:469.2197},0).wait(1).to({y:469.2191},0).wait(1).to({y:469.2184},0).wait(1).to({y:469.2177},0).wait(1).to({y:469.2171},0).wait(1));

	// Btn8
	this.Btn8 = new lib.Btn8();
	this.Btn8.name = "Btn8";
	this.Btn8.setTransform(614,664.5);
	this.Btn8._off = true;
	new cjs.ButtonHelper(this.Btn8, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn8).wait(78).to({_off:false},0).wait(77));

	// Line8
	this.instance_2 = new lib.Line("synched",0);
	this.instance_2.setTransform(959.95,539.95,1,1,123.0009,0,0,-225.1,0.4);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(75).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:136.0007,x:798.3245,y:696.5953},0).wait(1).to({rotation:149.0003,x:767.2378,y:656.2111},0).wait(1).to({rotation:162,x:746.0319,y:609.8692},0).wait(1).to({y:609.8685},0).wait(1).to({y:609.8679},0).wait(1).to({y:609.8673},0).wait(1).to({y:609.8666},0).wait(1).to({y:609.866},0).wait(1).to({y:609.8654},0).wait(1).to({y:609.8647},0).wait(1).to({y:609.8641},0).wait(1).to({y:609.8635},0).wait(1).to({y:609.8628},0).wait(1).to({y:609.8622},0).wait(1).to({y:609.8616},0).wait(1).to({y:609.8609},0).wait(1).to({y:609.8603},0).wait(1).to({y:609.8597},0).wait(1).to({y:609.859},0).wait(1).to({y:609.8584},0).wait(1).to({y:609.8578},0).wait(1).to({y:609.8571},0).wait(1).to({y:609.8565},0).wait(1).to({y:609.8559},0).wait(1).to({y:609.8552},0).wait(1).to({y:609.8546},0).wait(1).to({y:609.854},0).wait(1).to({y:609.8533},0).wait(1).to({y:609.8527},0).wait(1).to({y:609.8521},0).wait(1).to({y:609.8514},0).wait(1).to({y:609.8508},0).wait(1).to({y:609.8502},0).wait(1).to({y:609.8495},0).wait(1).to({y:609.8489},0).wait(1).to({y:609.8483},0).wait(1).to({y:609.8476},0).wait(1).to({y:609.847},0).wait(1).to({y:609.8464},0).wait(1).to({y:609.8457},0).wait(1).to({y:609.8451},0).wait(1).to({y:609.8445},0).wait(1).to({y:609.8438},0).wait(1).to({y:609.8432},0).wait(1).to({y:609.8426},0).wait(1).to({y:609.8419},0).wait(1).to({y:609.8413},0).wait(1).to({y:609.8407},0).wait(1).to({y:609.84},0).wait(1).to({y:609.8394},0).wait(1).to({y:609.8388},0).wait(1).to({y:609.8381},0).wait(1).to({y:609.8375},0).wait(1).to({y:609.8369},0).wait(1).to({y:609.8362},0).wait(1).to({y:609.8356},0).wait(1).to({y:609.835},0).wait(1).to({y:609.8343},0).wait(1).to({y:609.8337},0).wait(1).to({y:609.8331},0).wait(1).to({y:609.8324},0).wait(1).to({y:609.8318},0).wait(1).to({y:609.8312},0).wait(1).to({y:609.8305},0).wait(1).to({y:609.8299},0).wait(1).to({y:609.8293},0).wait(1).to({y:609.8286},0).wait(1).to({y:609.828},0).wait(1).to({y:609.8274},0).wait(1).to({y:609.8267},0).wait(1).to({y:609.8261},0).wait(1).to({y:609.8255},0).wait(1).to({y:609.8248},0).wait(1).to({y:609.8242},0).wait(1).to({y:609.8236},0).wait(1).to({y:609.823},0).wait(1).to({y:609.8223},0).wait(1).to({y:609.8217},0).wait(1).to({y:609.8211},0).wait(1));

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
	this.instance_4.setTransform(960.1,540,1,1,53.0002,0,0,-225.2,-1.1);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(67).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:65.3333,x:1053.0268,y:745.1019},0).wait(1).to({rotation:77.6667,x:1007.0589,y:760.2332},0).wait(1).to({rotation:90,x:958.9198,y:765.1967},0).wait(1).to({x:958.9192},0).wait(1).to({x:958.9187},0).wait(1).to({x:958.9181},0).wait(1).to({x:958.9175},0).wait(1).to({x:958.9169},0).wait(1).to({x:958.9164},0).wait(1).to({x:958.9158},0).wait(1).to({x:958.9152},0).wait(1).to({x:958.9147},0).wait(1).to({x:958.9141},0).wait(1).to({x:958.9135},0).wait(1).to({x:958.9129},0).wait(1).to({x:958.9124},0).wait(1).to({x:958.9118},0).wait(1).to({x:958.9112},0).wait(1).to({x:958.9106},0).wait(1).to({x:958.9101},0).wait(1).to({x:958.9095},0).wait(1).to({x:958.9089},0).wait(1).to({x:958.9083},0).wait(1).to({x:958.9078},0).wait(1).to({x:958.9072},0).wait(1).to({x:958.9066},0).wait(1).to({x:958.906},0).wait(1).to({x:958.9055},0).wait(1).to({x:958.9049},0).wait(1).to({x:958.9043},0).wait(1).to({x:958.9037},0).wait(1).to({x:958.9032},0).wait(1).to({x:958.9026},0).wait(1).to({x:958.902},0).wait(1).to({x:958.9014},0).wait(1).to({x:958.9009},0).wait(1).to({x:958.9003},0).wait(1).to({x:958.8997},0).wait(1).to({x:958.8991},0).wait(1).to({x:958.8986},0).wait(1).to({x:958.898},0).wait(1).to({x:958.8974},0).wait(1).to({x:958.8968},0).wait(1).to({x:958.8963},0).wait(1).to({x:958.8957},0).wait(1).to({x:958.8951},0).wait(1).to({x:958.8945},0).wait(1).to({x:958.894},0).wait(1).to({x:958.8934},0).wait(1).to({x:958.8928},0).wait(1).to({x:958.8922},0).wait(1).to({x:958.8917},0).wait(1).to({x:958.8911},0).wait(1).to({x:958.8905},0).wait(1).to({x:958.8899},0).wait(1).to({x:958.8894},0).wait(1).to({x:958.8888},0).wait(1).to({x:958.8882},0).wait(1).to({x:958.8876},0).wait(1).to({x:958.8871},0).wait(1).to({x:958.8865},0).wait(1).to({x:958.8859},0).wait(1).to({x:958.8853},0).wait(1).to({x:958.8848},0).wait(1).to({x:958.8842},0).wait(1).to({x:958.8836},0).wait(1).to({x:958.883},0).wait(1).to({x:958.8825},0).wait(1).to({x:958.8819},0).wait(1).to({x:958.8813},0).wait(1).to({x:958.8807},0).wait(1).to({x:958.8802},0).wait(1).to({x:958.8796},0).wait(1).to({x:958.879},0).wait(1).to({x:958.8784},0).wait(1).to({x:958.8779},0).wait(1).to({x:958.8773},0).wait(1).to({x:958.8767},0).wait(1).to({x:958.8761},0).wait(1).to({x:958.8756},0).wait(1).to({x:958.875},0).wait(1).to({x:958.8744},0).wait(1).to({x:958.8738},0).wait(1).to({x:958.8733},0).wait(1).to({x:958.8727},0).wait(1).to({x:958.8721},0).wait(1).to({x:958.8715},0).wait(1));

	// Btn5
	this.Btn5 = new lib.Btn5();
	this.Btn5.name = "Btn5";
	this.Btn5.setTransform(1193.65,848.4);
	this.Btn5._off = true;
	new cjs.ButtonHelper(this.Btn5, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn5).wait(66).to({_off:false},0).wait(89));

	// Line5
	this.instance_5 = new lib.Line("synched",0);
	this.instance_5.setTransform(960.05,540.05,1,1,18.9998,0,0,-227.7,2);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(63).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:30.6667,x:1156.9321,y:654.4765},0).wait(1).to({rotation:42.3333,x:1129.7278,y:691.924},0).wait(1).to({rotation:54,x:1095.5128,y:723.0966},0).wait(1).to({y:723.0961},0).wait(1).to({y:723.0955},0).wait(1).to({y:723.095},0).wait(1).to({y:723.0944},0).wait(1).to({y:723.0939},0).wait(1).to({y:723.0933},0).wait(1).to({y:723.0928},0).wait(1).to({y:723.0922},0).wait(1).to({y:723.0917},0).wait(1).to({y:723.0911},0).wait(1).to({y:723.0906},0).wait(1).to({y:723.09},0).wait(1).to({y:723.0895},0).wait(1).to({y:723.0889},0).wait(1).to({y:723.0884},0).wait(1).to({y:723.0878},0).wait(1).to({y:723.0873},0).wait(1).to({y:723.0867},0).wait(1).to({y:723.0862},0).wait(1).to({y:723.0856},0).wait(1).to({y:723.0851},0).wait(1).to({y:723.0845},0).wait(1).to({y:723.084},0).wait(1).to({y:723.0834},0).wait(1).to({y:723.0829},0).wait(1).to({y:723.0823},0).wait(1).to({y:723.0818},0).wait(1).to({y:723.0812},0).wait(1).to({y:723.0807},0).wait(1).to({y:723.0801},0).wait(1).to({y:723.0796},0).wait(1).to({y:723.079},0).wait(1).to({y:723.0785},0).wait(1).to({y:723.0779},0).wait(1).to({y:723.0774},0).wait(1).to({y:723.0768},0).wait(1).to({y:723.0763},0).wait(1).to({y:723.0757},0).wait(1).to({y:723.0752},0).wait(1).to({y:723.0746},0).wait(1).to({y:723.0741},0).wait(1).to({y:723.0735},0).wait(1).to({y:723.073},0).wait(1).to({y:723.0724},0).wait(1).to({y:723.0719},0).wait(1).to({y:723.0713},0).wait(1).to({y:723.0708},0).wait(1).to({y:723.0702},0).wait(1).to({y:723.0697},0).wait(1).to({y:723.0691},0).wait(1).to({y:723.0686},0).wait(1).to({y:723.068},0).wait(1).to({y:723.0675},0).wait(1).to({y:723.0669},0).wait(1).to({y:723.0664},0).wait(1).to({y:723.0658},0).wait(1).to({y:723.0653},0).wait(1).to({y:723.0647},0).wait(1).to({y:723.0642},0).wait(1).to({y:723.0636},0).wait(1).to({y:723.0631},0).wait(1).to({y:723.0625},0).wait(1).to({y:723.062},0).wait(1).to({y:723.0614},0).wait(1).to({y:723.0609},0).wait(1).to({y:723.0603},0).wait(1).to({y:723.0598},0).wait(1).to({y:723.0593},0).wait(1).to({y:723.0587},0).wait(1).to({y:723.0582},0).wait(1).to({y:723.0576},0).wait(1).to({y:723.0571},0).wait(1).to({y:723.0565},0).wait(1).to({y:723.056},0).wait(1).to({y:723.0554},0).wait(1).to({y:723.0549},0).wait(1).to({y:723.0543},0).wait(1).to({y:723.0538},0).wait(1).to({y:723.0532},0).wait(1).to({y:723.0527},0).wait(1).to({y:723.0521},0).wait(1).to({y:723.0516},0).wait(1).to({y:723.051},0).wait(1).to({y:723.0505},0).wait(1).to({y:723.0499},0).wait(1).to({y:723.0494},0).wait(1).to({y:723.0488},0).wait(1).to({y:723.0483},0).wait(1));

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
	this.instance_7.setTransform(960.15,540,1,1,-51.0001,0,0,-226.9,1.1);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(55).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:-39.9999,x:1133.264,y:393.2925},0).wait(1).to({rotation:-28.9998,x:1158.0652,y:429.0241},0).wait(1).to({rotation:-17.9997,x:1175.5928,y:468.8316},0).wait(1).to({x:1175.5923},0).wait(1).to({x:1175.5918},0).wait(1).to({x:1175.5913},0).wait(1).to({x:1175.5908},0).wait(1).to({x:1175.5903},0).wait(1).to({x:1175.5898},0).wait(1).to({x:1175.5893},0).wait(1).to({x:1175.5888},0).wait(1).to({x:1175.5883},0).wait(1).to({x:1175.5878},0).wait(1).to({x:1175.5873},0).wait(1).to({x:1175.5867},0).wait(1).to({x:1175.5862},0).wait(1).to({x:1175.5857},0).wait(1).to({x:1175.5852},0).wait(1).to({x:1175.5847},0).wait(1).to({x:1175.5842},0).wait(1).to({x:1175.5837},0).wait(1).to({x:1175.5832},0).wait(1).to({x:1175.5827},0).wait(1).to({x:1175.5822},0).wait(1).to({x:1175.5817},0).wait(1).to({x:1175.5812},0).wait(1).to({x:1175.5807},0).wait(1).to({x:1175.5802},0).wait(1).to({x:1175.5797},0).wait(1).to({x:1175.5792},0).wait(1).to({x:1175.5787},0).wait(1).to({x:1175.5782},0).wait(1).to({x:1175.5777},0).wait(1).to({x:1175.5772},0).wait(1).to({x:1175.5766},0).wait(1).to({x:1175.5761},0).wait(1).to({x:1175.5756},0).wait(1).to({x:1175.5751},0).wait(1).to({x:1175.5746},0).wait(1).to({x:1175.5741},0).wait(1).to({x:1175.5736},0).wait(1).to({x:1175.5731},0).wait(1).to({x:1175.5726},0).wait(1).to({x:1175.5721},0).wait(1).to({x:1175.5716},0).wait(1).to({x:1175.5711},0).wait(1).to({x:1175.5706},0).wait(1).to({x:1175.5701},0).wait(1).to({x:1175.5696},0).wait(1).to({x:1175.5691},0).wait(1).to({x:1175.5686},0).wait(1).to({x:1175.5681},0).wait(1).to({x:1175.5676},0).wait(1).to({x:1175.567},0).wait(1).to({x:1175.5665},0).wait(1).to({x:1175.566},0).wait(1).to({x:1175.5655},0).wait(1).to({x:1175.565},0).wait(1).to({x:1175.5645},0).wait(1).to({x:1175.564},0).wait(1).to({x:1175.5635},0).wait(1).to({x:1175.563},0).wait(1).to({x:1175.5625},0).wait(1).to({x:1175.562},0).wait(1).to({x:1175.5615},0).wait(1).to({x:1175.561},0).wait(1).to({x:1175.5605},0).wait(1).to({x:1175.56},0).wait(1).to({x:1175.5595},0).wait(1).to({x:1175.559},0).wait(1).to({x:1175.5585},0).wait(1).to({x:1175.558},0).wait(1).to({x:1175.5575},0).wait(1).to({x:1175.5569},0).wait(1).to({x:1175.5564},0).wait(1).to({x:1175.5559},0).wait(1).to({x:1175.5554},0).wait(1).to({x:1175.5549},0).wait(1).to({x:1175.5544},0).wait(1).to({x:1175.5539},0).wait(1).to({x:1175.5534},0).wait(1).to({x:1175.5529},0).wait(1).to({x:1175.5524},0).wait(1).to({x:1175.5519},0).wait(1).to({x:1175.5514},0).wait(1).to({x:1175.5509},0).wait(1).to({x:1175.5504},0).wait(1).to({x:1175.5499},0).wait(1).to({x:1175.5494},0).wait(1).to({x:1175.5489},0).wait(1).to({x:1175.5484},0).wait(1).to({x:1175.5479},0).wait(1).to({x:1175.5474},0).wait(1).to({x:1175.5468},0).wait(1).to({x:1175.5463},0).wait(1).to({x:1175.5458},0).wait(1).to({x:1175.5453},0).wait(1).to({x:1175.5448},0).wait(1).to({x:1175.5443},0).wait(1));

	// Btn2
	this.Btn2 = new lib.Btn2();
	this.Btn2.name = "Btn2";
	this.Btn2.setTransform(1182.95,237.9);
	this.Btn2._off = true;
	new cjs.ButtonHelper(this.Btn2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn2).wait(54).to({_off:false},0).wait(101));

	// Line2
	this.instance_8 = new lib.Line("synched",0);
	this.instance_8.setTransform(960.1,540.05,1,1,-83.0007,0,0,-230.1,1.9);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(51).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:-73.3334,x:1024.2591,y:319.0428},0).wait(1).to({rotation:-63.6668,x:1060.4421,y:332.9607},0).wait(1).to({rotation:-54.0002,x:1093.7743,y:352.7567},0).wait(1).to({x:1093.7738},0).wait(1).to({x:1093.7733},0).wait(1).to({x:1093.7728},0).wait(1).to({x:1093.7723},0).wait(1).to({x:1093.7718},0).wait(1).to({x:1093.7714},0).wait(1).to({x:1093.7709},0).wait(1).to({x:1093.7704},0).wait(1).to({x:1093.7699},0).wait(1).to({x:1093.7694},0).wait(1).to({x:1093.7689},0).wait(1).to({x:1093.7684},0).wait(1).to({x:1093.768},0).wait(1).to({x:1093.7675},0).wait(1).to({x:1093.767},0).wait(1).to({x:1093.7665},0).wait(1).to({x:1093.766},0).wait(1).to({x:1093.7655},0).wait(1).to({x:1093.765},0).wait(1).to({x:1093.7646},0).wait(1).to({x:1093.7641},0).wait(1).to({x:1093.7636},0).wait(1).to({x:1093.7631},0).wait(1).to({x:1093.7626},0).wait(1).to({x:1093.7621},0).wait(1).to({x:1093.7616},0).wait(1).to({x:1093.7612},0).wait(1).to({x:1093.7607},0).wait(1).to({x:1093.7602},0).wait(1).to({x:1093.7597},0).wait(1).to({x:1093.7592},0).wait(1).to({x:1093.7587},0).wait(1).to({x:1093.7583},0).wait(1).to({x:1093.7578},0).wait(1).to({x:1093.7573},0).wait(1).to({x:1093.7568},0).wait(1).to({x:1093.7563},0).wait(1).to({x:1093.7558},0).wait(1).to({x:1093.7553},0).wait(1).to({x:1093.7549},0).wait(1).to({x:1093.7544},0).wait(1).to({x:1093.7539},0).wait(1).to({x:1093.7534},0).wait(1).to({x:1093.7529},0).wait(1).to({x:1093.7524},0).wait(1).to({x:1093.7519},0).wait(1).to({x:1093.7515},0).wait(1).to({x:1093.751},0).wait(1).to({x:1093.7505},0).wait(1).to({x:1093.75},0).wait(1).to({x:1093.7495},0).wait(1).to({x:1093.749},0).wait(1).to({x:1093.7485},0).wait(1).to({x:1093.7481},0).wait(1).to({x:1093.7476},0).wait(1).to({x:1093.7471},0).wait(1).to({x:1093.7466},0).wait(1).to({x:1093.7461},0).wait(1).to({x:1093.7456},0).wait(1).to({x:1093.7451},0).wait(1).to({x:1093.7447},0).wait(1).to({x:1093.7442},0).wait(1).to({x:1093.7437},0).wait(1).to({x:1093.7432},0).wait(1).to({x:1093.7427},0).wait(1).to({x:1093.7422},0).wait(1).to({x:1093.7417},0).wait(1).to({x:1093.7413},0).wait(1).to({x:1093.7408},0).wait(1).to({x:1093.7403},0).wait(1).to({x:1093.7398},0).wait(1).to({x:1093.7393},0).wait(1).to({x:1093.7388},0).wait(1).to({x:1093.7383},0).wait(1).to({x:1093.7379},0).wait(1).to({x:1093.7374},0).wait(1).to({x:1093.7369},0).wait(1).to({x:1093.7364},0).wait(1).to({x:1093.7359},0).wait(1).to({x:1093.7354},0).wait(1).to({x:1093.735},0).wait(1).to({x:1093.7345},0).wait(1).to({x:1093.734},0).wait(1).to({x:1093.7335},0).wait(1).to({x:1093.733},0).wait(1).to({x:1093.7325},0).wait(1).to({x:1093.732},0).wait(1).to({x:1093.7316},0).wait(1).to({x:1093.7311},0).wait(1).to({x:1093.7306},0).wait(1).to({x:1093.7301},0).wait(1).to({x:1093.7296},0).wait(1).to({x:1093.7291},0).wait(1).to({x:1093.7286},0).wait(1).to({x:1093.7282},0).wait(1).to({x:1093.7277},0).wait(1).to({x:1093.7272},0).wait(1).to({x:1093.7267},0).wait(1).to({x:1093.7262},0).wait(1).to({x:1093.7257},0).wait(1));

	// Btn1
	this.Btn1 = new lib.Btn1();
	this.Btn1.name = "Btn1";
	this.Btn1.setTransform(960,154);
	this.Btn1.alpha = 0;
	this.Btn1._off = true;
	new cjs.ButtonHelper(this.Btn1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Btn1).wait(47).to({_off:false},0).wait(1).to({regY:246.7,y:400.7,alpha:0.25},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:1},0).wait(104));

	// Line1
	this.instance_9 = new lib.Line("synched",0);
	this.instance_9.setTransform(960.05,310.05,1,1,-90.0017,0,0,0,0.1);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(43).to({_off:false},0).wait(1).to({regY:0,rotation:-90.0018,x:959.95,alpha:0.25},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// Logo
	this.instance_10 = new lib.Logo("synched",0);
	this.instance_10.setTransform(961.1,541.3,3.962,3.962,0,0,0,0.3,0.4);
	this.instance_10.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({regX:0,regY:0,scaleX:3.8376,scaleY:3.8376,x:959.9373,y:539.7436,alpha:0.0625},0).wait(1).to({scaleX:3.7143,scaleY:3.7143,x:959.9743,y:539.7867,alpha:0.125},0).wait(1).to({scaleX:3.5923,scaleY:3.5923,x:960.0109,y:539.8294,alpha:0.1875},0).wait(1).to({scaleX:3.4714,scaleY:3.4714,x:960.0472,y:539.8717,alpha:0.25},0).wait(1).to({scaleX:3.3383,scaleY:3.3383,x:960.0871,y:539.9183,alpha:0.3125},0).wait(1).to({scaleX:3.2054,scaleY:3.2054,x:960.127,y:539.9648,alpha:0.375},0).wait(1).to({scaleX:3.0737,scaleY:3.0737,x:960.1665,y:540.0109,alpha:0.4375},0).wait(1).to({scaleX:2.9433,scaleY:2.9433,x:960.2056,y:540.0566,alpha:0.5},0).wait(1).to({scaleX:2.8142,scaleY:2.8142,x:960.2443,y:540.1017,alpha:0.5625},0).wait(1).to({scaleX:2.6864,scaleY:2.6864,x:960.2827,y:540.1465,alpha:0.625},0).wait(1).to({scaleX:2.56,scaleY:2.56,x:960.3206,y:540.1907,alpha:0.6875},0).wait(1).to({scaleX:2.4348,scaleY:2.4348,x:960.3582,y:540.2345,alpha:0.75},0).wait(1).to({scaleX:2.3108,scaleY:2.3108,x:960.3954,y:540.2779,alpha:0.8125},0).wait(1).to({scaleX:2.1881,scaleY:2.1881,x:960.4322,y:540.3209,alpha:0.875},0).wait(1).to({scaleX:2.0666,scaleY:2.0666,x:960.4686,y:540.3634,alpha:0.9375},0).wait(1).to({scaleX:1.9464,scaleY:1.9464,x:960.5047,y:540.4055,alpha:1},0).wait(1).to({scaleX:1.8273,scaleY:1.8273,x:960.5404,y:540.4471},0).wait(1).to({scaleX:1.7095,scaleY:1.7095,x:960.5758,y:540.4884},0).wait(1).to({scaleX:1.5929,scaleY:1.5929,x:960.6107,y:540.5292},0).wait(1).to({scaleX:1.4776,scaleY:1.4776,x:960.6453,y:540.5696},0).wait(1).to({scaleX:1.3634,scaleY:1.3634,x:960.6796,y:540.6095},0).wait(1).to({scaleX:1.2503,scaleY:1.2503,x:960.7135,y:540.6491},0).wait(1).to({scaleX:1.2159,scaleY:1.2159,x:960.7238,y:540.6611},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1492.2,631,-104.10000000000014,351.9);
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
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_2.png", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_2"},
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_3.png", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_3"},
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_4.png", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_4"},
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_5.png", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_5"},
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_6.png", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_6"},
		{src:"images/Logo Animation _ Concept_HTML5 Canvas_atlas_7.png", id:"Logo Animation _ Concept_HTML5 Canvas_atlas_7"}
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