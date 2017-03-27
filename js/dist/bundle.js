/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _game = null;
var _rectGraphic = null;
var _fadeInSignal = null;
var _fadeOutSignal = null;
const TRANSITION_COLOR = 0xFFFFFF;

	function fade(isFadeIn) {
		var val = 0;
		if(isFadeIn)
			val = 1;
		_rectGraphic = _game.add.graphics(0, 0);
		_rectGraphic.beginFill(TRANSITION_COLOR, 1);
		_rectGraphic.drawRect(0, 0, _game.width, _game.height);
		_rectGraphic.endFill();
		_rectGraphic.alpha = val;
		_game.world.bringToTop(_rectGraphic);
        startFade(_rectGraphic, isFadeIn);
	}

function startFade(obj, isFadeIn) {
	var val = 1;
	if(isFadeIn)
		val = 0;
	var fadeTween = _game.add.tween(obj).to({alpha:val}, 1000, Phaser.Easing.Linear.None, true);
}

//Not used
function destroyGraphic() {
	_game.world.remove(_rectGraphic);
}

module.exports = {
	init: function(game) {
		if(_instance !== null)
			return _instance;
		_instance = this;
		_game = game;
		return _instance;
	},
	fadeInTransition: function() {
		fade(true);
	},
	fadeOutTransition: function() {
		fade(false);
	}
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//Dependency: Nonde


const Image = __webpack_require__(6),
    Video = __webpack_require__(4);

var _instance = null;
var _game = null;
var _graphics = null;
var _pauseImage = null;

const pauseButtonImageKeyEnum = 'IMAGE_PAUSE';

function drawPauseButton() {
    if(_pauseImage) {
        _pauseImage.addImageToGame(_game, pauseButtonImageKeyEnum, _game.uiGroup);
        _pauseImage.changeImage(_game, pauseButtonImageKeyEnum, _game.global.gameManager.getPauseSignal());
    }
    else {
        _pauseImage = new Image(10, 10, 'thoughtIcon');
        _pauseImage.addImageToGame(_game, pauseButtonImageKeyEnum, _game.uiGroup);
        _pauseImage.changeImage(_game, pauseButtonImageKeyEnum, _game.global.gameManager.getPauseSignal());
    }
}

function Pause() {
    console.log(_game.paused);
    if(!_game.paused) {
        _game.input.onDown.addOnce(Unpause, self);
        _game.paused = true;
        Video.stop();
        drawRect();
    }

    function Unpause() {

        Video.play();
        _game.paused = false;
        _graphics.destroy();
    }
}

function drawRect() {
    _graphics = _game.add.graphics(0, 0);
    _graphics.beginFill(0x000000, 0.8);
    _graphics.drawRect(0, 0, _game.width, _game.height);
}

function drawUI() {
    _graphics = _game.add.graphics(0, 0);
    drawName();
}

function drawName() {
    _game.add.text(0, 0, 'Chris', {})
    _graphics.beginFill(0x000000);
    _graphics.drawRoundedRect(0, 0, _game.width, _game.height, 10);
}

module.exports = {
    init: function(game) {
        if(_instance !== null)
            return _instance;
        _instance = this;
        _game = game;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        drawPauseButton();
    },
    pause: function() {
        Pause();
    }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _filterFadeSignal = null;
const FADE_SPEED = 700;

//Linkable constructor
var Linkable = function(xPos, yPos, key, properties) {
    this._xPos = xPos;
    this._yPos = yPos;
    this._properties = properties;
    this._key = key;
    this._image = null;
}

Linkable.fadeIn = function(game, object, time, signal) {
    var tween;

    if(time)
        tween = game.add.tween(object).to({alpha:1}, time, Phaser.Easing.Linear.None, true, 0, 0, false);
    else
        tween = game.add.tween(object).to({alpha:1}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);

    if(signal)
        tween.onComplete.add(SignalDispatcher);

    function SignalDispatcher(){
        signal.dispatch();
    }
}

Linkable.setLink = function(event, callbackFunc, scope, arg1, arg2) {
    event.onInputUp.addOnce(driver, scope);

    function driver() {
        callbackFunc(arg1, arg2);
    }
}

Linkable.setPermanentLink = function(event, callbackFunc, scope, arg1, arg2) {
    event.onInputUp.add(driver, scope);

    function driver() {
        callbackFunc(arg1, arg2);
    }
}

Linkable.fadeOut = function(game, object, destroy) {
    var tween = game.add.tween(object).to({alpha:0}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);
    tween.onComplete.add(Disable, this);

    function Disable() {
        if(destroy)
            object.destroy();
    }
}

Linkable.fadeOutOthers = function(game, object, event, callbackFunc) {
    game.add.tween(object).to({alpha:1}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);
    otherObjArr.forEach(function(element) {
        game.add.tween(element).to({alpha:1}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);
    });

    var objectFadeOut = game.add.tween(object).to({alpha:0}, FADE_SPEED, Phaser.Easing.Linear.None, false, 0, 0, false);
    objectFadeOut.onComplete.add(DisableButton, this);

    game.add.tween(object).to({alpha:1}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);

}

Linkable.zoomIn = function(game, object, scale, originalWidth, originalHeight) {
    object.width = originalWidth;
    object.height = originalHeight;
    var tween = game.add.tween(object).to({width:object.width*scale, height:object.height*scale}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);
}


module.exports = Linkable;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
    "use strict";

    var _instance = null;
    var _game = null;

    function InitializeGroups() {        
        _game.mediaGroup = _game.add.group();
        _game.uiGroup = _game.add.group();
    }

    return {
        init: function(game) {
            if(_instance !== null)
                return _instance;
            _game = game;
            _instance = this;
            return _instance;
        },
        preload: function() {
        },
        initializeGroups: function() {
            InitializeGroups();
        }
    }

}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const VideoFilter = __webpack_require__(22),
    Linkable = __webpack_require__(2),
    Subtitle = __webpack_require__(10);

var _instance = null;
var _game = null;
var _video = null
var _videoImage = null;
var _videoFilter = null;
var _interactionTimeStamps = null;

const FADEOUT_OFFSET_SECONDS = 5;
const VIDEO_SLOW_PLAYBACK_RATE = 0.2;

function CreateVideo(src, doFadeOut, nextScenes, sub, interactionTimeStamps) {
    _video = _video.changeSource(src, false);
    _video.play();
//    _video.video.setAttribute('autoplay', 'autoplay');
    AddVideoAndFilter(doFadeOut, sub);
    if(_interactionTimeStamps)
        AddInteractionEvents(_interactionTimeStamps);
    //console.log(_video.video.currentTime);
    /*
    if(doFadeOut)
        _game.time.events.add((_video.video.duration-FADEOUT_OFFSET_SECONDS)*1000, fadeOut, this, signal);
    */
    if(nextScenes)
        _video.onComplete.addOnce(ChangeScene(nextScenes), this);
}

function AddInteractionEvents() {
    var timestamp = _interactionTimeStamps.shift();
    if(timestamp)
        checkVideoDuration(timestamp);
}

function AddVideoAndFilter(doFadeOut, sub) {
    _videoImage = _video.addToWorld(0, 0, 0, 0);
    _game.mediaGroup.add(_videoImage);
    _video.onChangeSource.addOnce(OnVideoLoad, this);
    function OnVideoLoad() {
        if(doFadeOut) {
            //_game.time.events.add((_video.video.duration-FADEOUT_OFFSET_SECONDS)*Phaser.Timer.SECOND, FadeOut, this);
        }
        if(sub)
            Subtitle.create(_video.video, sub);
        if(_videoFilter != null && _videoFilter != 'none') {
            VideoFilter.init(_game, _video);
            VideoFilter.create(_videoFilter);
        }
    }
}

function TriggerMoment() {
    console.log(_video.video.duration);
    console.log(_video.video.currentTime);
    VideoFilter.startFilterFade(_game.global.gameManager.getTriggerInteractionSignal());
}

function VideoZoom() {
    Linkable.zoomIn(_game, _video, 1.5);
}
/*
function checkVideoDuration(time) {
  var interval = setInterval(function(){
    if(_video.video.currentTime >= time){
        clearInterval(interval);
        TriggerMoment();
        AddInteractionEvents();
    }
  },500);
}
*/

function checkVideoDuration(time) {
    _video.video.addEventListener("timeupdate", function trigger() {        
        if(_video.video.currentTime >= time){
            //clearInterval(interval);
            _video.video.removeEventListener("timeupdate", trigger);
            TriggerMoment();
            AddInteractionEvents();
        }
    }, false);
}

function FadeOut(signal) {
    _game.global.gameManager.getFadeOutTransitionSignal().dispatch();
}

function ChangeScene(nextScenes) {
   return function() {
        if(typeof(nextScenes) === 'string'); {
            _game.global.gameManager.getChangeSceneSignal().dispatch(nextScenes);
        }
    }
}

function stopVideo() {
    if(_video !== null)
        _video.stop();
}

module.exports = {
    init: function(game) {
        console.log("Video initialized");
        _interactionTimeStamps = null;
        //stopVideo();
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        _video = _game.add.video('start', 'emptyVideo');
        _video.video.setAttribute('playsinline', 'playsinline');
        return _instance;
    },
    preload: function(videos) {
        load(videos);
    },
    create: function(src, doFadeOut, videoFilter, scenes, sub, interactionTimeStamps) {
        _videoFilter = videoFilter;
        _interactionTimeStamps = interactionTimeStamps;
        CreateVideo(src, doFadeOut, scenes, sub, interactionTimeStamps);
    },
    stop: function() {
        if(_video)
            _video.stop();
    },
    play: function() {
        if(_video)
            _video.play();
    },
    endFilter() {
        this.play();
        VideoFilter.endFilter();
    }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
    

    var State = function(scene) {
      this._scene = scene;
    };

    State.prototype.setStateScene = function(scene) {
      this._scene = scene;
    };

    State.prototype.getMovieKey = function() {
      return this._scene.movieKey;
    }

    State.prototype.getChoiceMoments = function() {
      return this._scene.choiceMoments;
    }

    State.prototype.getThoughtBubble = function(index) {
      return this._scene.choiceMoments.choiceMomentsProperties[index].thoughtBubbles;
    }

    State.prototype.getChoices = function(index){
      return this._scene.choiceMoments.choiceMomentsProperties[index].choices;
    }
    /*
    State.prototype.getThoughtsInfo = function() {
      return this._scene.thoughts;
    }
    State.prototype.getChoicesInfo = function() {
      return this._scene.choices;
    }
    State.prototype.getThoughtIconKey = function() {
      return this._scene.thoughtIconKey;
    }*/

    State.prototype.getBgImageKey = function() {
      return this._scene.bgImageKey;
    }

    State.prototype.getIconsInfo = function() {
      return this._scene.icons;
    }

    State.prototype.getInputInfo = function() {
      return this._scene.input;
    }

    State.prototype.getMovieSrc = function() {
      return this._scene.movieSrc;
    }

    State.prototype.getMovieSubKey = function() {
      return this._scene.sub;
    }

    State.prototype.getTransitionInfo = function() {
      return this._scene.transition;
    }

    State.prototype.getVideoFilter = function() {
      return this._scene.videoFilter;
    }

    State.prototype.getNextScenes = function() {
      return this._scene.nextScenes;
    }

    State.prototype.getDraggable = function() {
      return this._scene.draggable;
    }

    module.exports = State;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ImageTypeEnum = {
        Info: 'IMAGE_BUTTON_INFO',
        SceneChange: 'IMAGE_BUTTON_SCENECHANGE',
        Thought: 'IMAGE_BUTTON_THOUGHT',
        Transition: 'IMAGE_TRANSITION',
        Background: 'IMAGE_BACKGROUND',
        ChoiceBackground: 'IMAGE_CHOICE_BACKGROUND',
        Pause: 'IMAGE_PAUSE'
    }
var Linkable = __webpack_require__(2);

//Image constructor
var Image = function(xPos, yPos, key, properties) {
    this._xPos = xPos;
    this._yPos = yPos;
    this._properties = properties;
    this._key = key;
    this._image = null;
}

Image.prototype.addImageToGame = function(game, type, group) {
    if(type && (type == ImageTypeEnum.SceneChange || type == ImageTypeEnum.Thought || type == ImageTypeEnum.Pause))
        this._image = game.add.button(this._xPos, this._yPos, this._key);
    else {
        this._image = game.add.image(this._xPos, this._yPos, this._key);
    }
    group.add(this._image);
}

Image.prototype.setImage = function(key) {
    this._key = key;
}

//Assigns image change function depending on enum
Image.prototype.changeImage = function (game, enumType, arg1, arg2, arg3) {
    switch(enumType) {
        case ImageTypeEnum.Background:
            this.changeToBgImage(game, arg1);
            break;
        case ImageTypeEnum.Thought:
            this.changeToThoughtIcon(game, arg1);
            break;
        case ImageTypeEnum.SceneChange:
            this.changeToSceneChangeImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.ChoiceBackground:
            this.changeToChoiceBackgroundImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.Pause:
            this.changeToPauseButton(game, arg1, arg2);
            break;
        default:
            console.warn("Invalid Image Type.");
    }
}

//Changes image to a horizontally draggable image
//Scales and sets a rectangle container for Bg image to pan around
Image.prototype.changeToBgImage = function(game, draggable) {

    //Scales Bg image to fit game height, maintains Bg image aspect ratio
    var scale = game.height/this._image.height;
    this._image.height = Math.floor(this._image.height*scale);
    this._image.width = Math.floor(this._image.width*scale);
    //Initializes container for bg image to be dragged around

    if(draggable) {
        this.makeDraggable(game, 'stub', false, true, -this._image.width+game.width, 0, this._image.width*2-game.width, this._image.height)
    }
}

Image.prototype.changeToThoughtIcon = function(game, callbackFunc, thoughts) {
    Linkable.setLink(this._image, callbackFunc);
}

Image.prototype.changeToSceneChangeImage = function(game, signal, targetScene) {
    Linkable.setLink(this._image, SignalDispatcher, this, signal, targetScene);
}

Image.prototype.changeToChoiceBackgroundImage = function(game, width, height) {
    this._image.anchor.x = 0.5;
    this._image.x = game.width/2;
    this._image.width = width;
    this._image.height = height;
    return this._image;
}

Image.prototype.changeToPauseButton = function(game, signal) {
    Linkable.setPermanentLink(this._image, SignalDispatcher, this, signal);
}

//Changes cursor image on mouseover
Image.prototype.changeCursorImage = function(game, cursorImageSrc) {
    this._image.events.onInputOver.add(function(){
    game.canvas.style.cursor = cursorImageSrc;
    }, this);

    this._image.events.onInputOut.add(function(){
    game.canvas.style.cursor = "default";
    }, this);
}

Image.prototype.makeDraggable = function(game, hoverImageSrc, lockHorizontal, lockVertical, boundsX, boundsY, boundsWidth, boundsHeight) {

    //Enables drag interaction on the horizontal axis
    this._image.inputEnabled = true;
    if(boundsX !== undefined && boundsX !== undefined) {
        var dragBounds = new Phaser.Rectangle(boundsX, boundsY, boundsWidth, boundsHeight);
        this._image.input.boundsRect = dragBounds;
    }
    this._image.input.draggable = true;
    this._image.input.allowVerticalDrag = !lockVertical;
    this._image.input.allowHorizontalDrag = !lockHorizontal;
    this._image.x = -this._image.width/2;
    //Changes mouseover image
    this.changeCursorImage(game, 'url("./Images/UI/hand_2.png"), auto');
}

Image.prototype.getPhaserImage = function() {
    return this._image;
}

Image.prototype.fadeOut = function(game) {
    Linkable.fadeOut(game, this._image, true);
}

function SignalDispatcher(signal, scene) {
    if(scene)
        signal.dispatch(scene);
    else
        signal.dispatch();
}

function PauseScene(game) {
    console.log(game.paused);
    if(!game.paused) {
        game.input.onDown.add(Unpause, self);
    }
    game.paused = true;;

    function Unpause() {
        game.paused = false;
    }
}

function DebugRect(x, y, width, height, game) {
    var bounds = new Phaser.Rectangle(x, y, width, height);
    var graphics = game.add.graphics(bounds.x, bounds.y);
    graphics.beginFill(0x000077);
    graphics.drawRect(0, 0, bounds.width, bounds.height);
}

module.exports = Image;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Linkable = __webpack_require__(2);
const PADDING = 10;

var TextTypeEnum = {
    Thoughts: 'TEXT_THOUGHTS',
    MeaningfulChoices: 'TEXT_MEANINGFUL_CHOICES',
    MeaninglessChoices: 'TEXT_MEANINGLESS_CHOICES',
    Subtitle: 'TEXT_SUBTITLE'
}

var Text = function(content, xPos, yPos, properties) {
    this._xPos = xPos;
    this._yPos = yPos;
    this._content = content;
    this._properties = properties;
    this._text = null;
}

Text.prototype.setDefaultProperties = function() {
    this._text.align = 'left';
    this._text.font = 'Arial';
    this._text.fontSize =30;
    this._text.stroke = '#ffffff';
    this._text.strokeThickness = 1;
    this._text.padding.set(10, 0);
}

Text.prototype.setAdditionalProperties = function() {
    if(this._properties.lineSpacing) {
        this._text.lineSpacing = this._properties.lineSpacing;
    }
    if(this._properties.shadow) {
        var shadow = this._properties.shadow;
        this._text.setShadow(shadow[0], shadow[1], shadow[2], shadow[3]);
    }
}

Text.prototype.addToGame = function(game, group) {
    this._text = game.add.text(this._xPos, this._yPos, this._content, this._properties);
    this.setAdditionalProperties();
    group.add(this._text);
    //this.setDefaultProperties();
}
//arg1 can be: xTo, targetScene, endFilterSignal
//arg2 can be: yTo, changeSceneSignal
//arg3 can be: filter
Text.prototype.changeText = function(game, enumType, arg1, arg2, arg3, arg4, arg5) {
    switch(enumType) {
        case TextTypeEnum.Thoughts:
            this.changeToThoughts(game, arg1, arg2, arg3);
            break;
        case TextTypeEnum.MeaningfulChoices:
            this.changeToMeaningfulChoices(game, arg1, arg2, arg3, arg4, arg5);
            break;
        case TextTypeEnum.MeaninglessChoices:
            this.changeToMeaninglessChoices(game, arg1, arg2, arg3, arg4);
            break;
        case TextTypeEnum.Subtitle:
            this.changeToSubtitle(game);
            break;
        default:
            console.warn("Invalid Text Type.");
    }
}

Text.prototype.changeToThoughts = function(game, xTo, yTo, filter) {
    this._text.anchor.setTo(0.5);
    this._text.alpha = 0;
    this.addInterpolationTween(game, xTo, yTo);
    Linkable.fadeIn(game, this._text);
}

Text.prototype.changeToMeaningfulChoices = function(game, targetScene, changeSceneSignal, boundsY, boundsWidth, boundsHeight) {
    this._text.anchor.x = 0.5
    this._text.x = game.width/2;
    this._text.alpha = 0;
    this._text.inputEnabled = true;
    //this._text.boundsAlignH = "center";
    this._text.boundsAlignV = "middle";
    this._text.setTextBounds(0, boundsY, boundsWidth, boundsHeight);
    //this._text.y = 0;
    //this._text.x = 0;

    Linkable.fadeIn(game, this._text);
    Linkable.setLink(this._text.events, ChangeScene, this, changeSceneSignal, targetScene);
}

Text.prototype.changeToMeaninglessChoices = function(game, endInteractionSignal, boundsY, boundsWidth, boundsHeight) {
    this._text.anchor.x = 0.5
    this._text.x = game.width/2;
    this._text.alpha = 0;
    this._text.inputEnabled = true;
    //this._text.boundsAlignH = "center";
    this._text.setTextBounds(0, boundsY, boundsWidth, boundsHeight);
    this._text.boundsAlignV = "middle";
    //this._text.y = 0;
    //this._text.x = 0;
    Linkable.fadeIn(game, this._text);
    Linkable.setLink(this._text.events, EndInteraction, this, endInteractionSignal, this);
}

Text.prototype.changeToSubtitle = function(game) {
    this._text.anchor.x = 0.5
    this._text.x = game.width/2;
}

Text.prototype.addInterpolationTween = function(game, xTo, yTo) {
    var points = {x: [ this._xPos,  this._xPos + (xTo- this._xPos)/2,  xTo-(xTo- this._xPos)/8, xTo], y: [ this._yPos,  this._yPos-10, yTo-10, yTo]};
    return game.add.tween(this._text).to({x: points.x, y: points.y}, 1000, Phaser.Easing.Quadratic.Out, true, 0 , 0).interpolation(function(v, k){
            return Phaser.Math.bezierInterpolation(v, k);
        });
}

Text.prototype.fadeOut = function(game) {
    Linkable.fadeOut(game, this._text, true);
}

Text.prototype.disableInput = function(game) {
    this._text.inputEnabled = false;
}

Text.prototype.destroy = function() {
    this._text.destroy();
}
/*
Text.prototype.changeScene = function() {
    this._signal.dispatch(this._targetScene);
}

Text.prototype.endInteraction = function() {
    this._signal.dispatch(this);
}
*/
Text.prototype.getPhaserText = function() {
    return this._text;
}

Text.prototype.getHeight = function() {
    return this._text.height;
}

Text.prototype.setY = function(val) {
    this._text.y = val;
}

function ChangeScene(signal, scene) {
    signal.dispatch(scene);
}

function EndInteraction(signal, text) {
    signal.dispatch(text);
}

module.exports = Text;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Filter = __webpack_require__(13);
var _instance = null;
var _game = null;
var _startSceneKey = 'startScene';
var _data = null;
var _videos = null;
var _images = null;
var _scenes = null;
var _subs = null;
var _style = null;

function loadVideos(videos) {
    console.log("Loading videos");
    for (var key in _videos) {
        _game.load.video(key, _videos[key]);
    }
}

function loadImages(images) {
    console.log("Loading images");
    for (var key in images) {
        _game.load.image(key, images[key]);
    }
}

function loadSubs(subs) {
    console.log("Loading subs");
    for (var key in subs) {
        console.log(key);
        _game.load.text(key, subs[key]);
    }
}

module.exports = {
    init: function(game) {
        if(_instance !== null)
            return _instance;
        _instance = this;
    //    Filter.init(game);
        _game = game;
        _data = _game.cache.getJSON('data');
        _style = _game.cache.getJSON('style');
        _images = _data.images;
        _videos = _data.videos;
        _scenes = _data.scenes;
        _subs = _data.subtitles;
        return _instance;
    },
    preload: function() {
    //    Filter.preload();
        console.log("Loading resources");
        loadImages(_images);
        loadSubs(_subs);
    //    loadVideos(videos);

    },
    create: function() {
    //    Filter.create();
    },
    /*
    getBlur: function() {
        return Filter.getBlur();
    },
    getBlurNone: function() {
        return Filter.getBlurNone();
    },
    getBlurFilter: function() {
        return Filter;
    },
    */
    getScene: function(name) {
        return _scenes[name];
    },
    getStyle: function() {
        return _style;
    },
    getVideoSrc: function() {
        return _videos;
    },
    getStartSceneKey: function() {
        return _startSceneKey;
    }
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _game = null;
var _icons = [];
var Filter = __webpack_require__(13),
    Thoughts = __webpack_require__(21),
    Choices = __webpack_require__(12),
    Image = __webpack_require__(6);

const buttonImageKeyEnum = 'IMAGE_BUTTON_THOUGHT';

function CreateThoughtIcon(iconKey, coords, thoughts, choices) {
    var button = new Image(coords[0], coords[1], iconKey);
    button.addImageToGame(_game, buttonImageKeyEnum, _game.mediaGroup);
    button.changeImage(_game, buttonImageKeyEnum, ButtonPressed);

    _icons.push(button);
    function ButtonPressed() {
        console.log(thoughts);
        Thoughts.create(thoughts, coords);
        Choices.create(choices);
    }
}

function CreateExploratoryIcons(key, coords, targetScene, type, reference) {
    var button = new Image(coords[0], coords[1], key);
    button.addImageToGame(_game, type, _game.mediaGroup);
    button.changeImage(_game, type, _game.global.gameManager.getChangeSceneSignal(), targetScene);
    _icons.push(button.getPhaserImage());
}

function EndInteraction() {
    _icons.forEach(function(icon) {
        if(icon.alive)
            icon.fadeOut(_game);
    });
}

module.exports = {
    init: function(game) {
        if(_instance !== null)
            return _instance;
        Thoughts.init(game);
        Choices.init(game);
        _game = game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    createThoughtIcon: function(iconKey, coords, thoughts, choices) {
        _icons = [];
        CreateThoughtIcon(iconKey, coords, thoughts, choices);
    },
    createExploratoryIcons: function(icons) {
        _icons = [];
        for(var i=0; i<icons.size; i++) {
            CreateExploratoryIcons(icons.key[i], icons.coords[i], icons.targetScene[i], icons.type[i]);
        }
        return _icons;
    },
    endInteraction: function() {
        EndInteraction();
        Thoughts.endInteraction();
    }
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Text = __webpack_require__(7);

var _instance = null;
var _game = null;
var _textSlots = [null, null];

const SUBTITLE_Y_POS = 650;
const SUBTITLE_SPACING = 5;

function CreateSubs(video, subs) {
	var srt = _game.cache.getText(subs);
	var parsedSrt = fromSrt(srt, true);
	console.log(parsedSrt);
	AddSubEvents(parsedSrt, video);
}

function AddSubEvents(parsedSrt, video) {
	parsedSrt.forEach(function(sub) {
		//console.log(sub.startTime);
		video.addEventListener("timeupdate", show, false);

		function show() {
			if(video.currentTime >= sub.startTime){
           		video.removeEventListener("timeupdate", show);
	            var text = new Text(sub.text, 0, -500, _game.global.style.subtitleTextProperties);
	            text.addToGame(_game, _game.mediaGroup);
	            text.changeText(_game, 'TEXT_SUBTITLE');	            
	            var slotIndex = FindSubtitleSlot(text);
	            AddDestroyEvent(video, sub, text, slotIndex);
	            //console.log("added sub");
	        }
		}		
	});
}

function AddDestroyEvent(video, sub, text, slotIndex) {
	video.addEventListener("timeupdate", destroy, false);

	function destroy() {
		if(video.currentTime >= sub.endTime){
       		video.removeEventListener("timeupdate", destroy); 
            text.destroy();
            _textSlots[slotIndex] = null;
            //console.log("destroyed sub");
        }
	}
}

function FindSubtitleSlot(text) {
	if(!_textSlots[0]) {
		_textSlots[0] = text;
		text.setY(SUBTITLE_Y_POS);
		return 0;
	}
	else if(!_textSlots[1]) {
		_textSlots[1] = text;

		text.setY(SUBTITLE_Y_POS - text.getHeight() - SUBTITLE_SPACING);
		return 1;
	}
	else
		console.warn("Max number of concurrent subtitles reached.");
}

function createSubText() {

}

function fromSrt(data, ms) {
    var useMs = ms ? true : false;

    data = data.replace(/\r/g, '');
    var regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
    data = data.split(regex);
    data.shift();

    var items = [];
    for (var i = 0; i < data.length; i += 4) {
        items.push({
            id: data[i].trim(),
            startTime: useMs ? timeMs(data[i + 1].trim()) : data[i + 1].trim(),
            endTime: useMs ? timeMs(data[i + 2].trim()) : data[i + 2].trim(),
            text: data[i + 3].trim()
        });
    }

    return items;
};

function timeMs(val) {
    var regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/;
    var parts = regex.exec(val);

    if (parts === null) {
        return 0;
    }

    for (var i = 1; i < 5; i++) {
        parts[i] = parseInt(parts[i], 10);
        if (isNaN(parts[i])) parts[i] = 0;
    }

    // hours + minutes + seconds + ms
    return parts[1] * 3600 + parts[2] * 60 + parts[3] + parts[4]/1000;
};


module.exports = {
	init: function (game) {
		if(_instance)
			return _instace;
		_instance = this;
		_game = game;
		return _instance;
	},
	create: function(video, subs) {
		CreateSubs(video, subs);
	}
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Resources = __webpack_require__(8),
    Group = __webpack_require__(3),
    Transition = __webpack_require__(0),
    UI = __webpack_require__(1),
    Video = __webpack_require__(4),
    MenuState = __webpack_require__(25),
    LocationState = __webpack_require__(24),
    InteractState = __webpack_require__(15),
    FlashbackState = __webpack_require__(23),
    MovieState = __webpack_require__(26),
    Subtitle = __webpack_require__(10);

var _stateManagerInstance = null;
var _transitionSignal = null;
var _game = null;

var StateEnum = {
    MenuState: 'MenuState',
    InteractState: 'InteractState',
    FlashbackState: 'FlashbackState',
    MovieState: 'MovieState',
    LocationState: 'LocationState'
}

function ChangeScene(scene) {
    var nextScene = Resources.getScene(scene);
    if(nextScene === null)
        console.warn("Scene: " + scene + "is undefined.");
    console.log("Changing scene to: " + nextScene.stateType);
    switch(nextScene.stateType) {
        case StateEnum.MenuState:
            _stateManagerInstance.start(nextScene.stateType, true, false, nextScene);
            break;
        case StateEnum.InteractState:
            _stateManagerInstance.start(nextScene.stateType, true, false, nextScene);
            break;
        case StateEnum.FlashbackState:
            _stateManagerInstance.start(nextScene.stateType, true, false, nextScene);
            break;
        case StateEnum.MovieState:
            _stateManagerInstance.start(nextScene.stateType, true, false, nextScene);
            break;
        case StateEnum.LocationState:
            _stateManagerInstance.start(nextScene.stateType, true, false, nextScene);
            break;
        default:
            console.warn("Invalid State.");
    }
}

function AddAllStates() {
    _stateManagerInstance.add(StateEnum.MenuState, MenuState);
    _stateManagerInstance.add(StateEnum.LocationState, LocationState);
    _stateManagerInstance.add(StateEnum.InteractState, InteractState);
    _stateManagerInstance.add(StateEnum.FlashbackState, FlashbackState);
    _stateManagerInstance.add(StateEnum.MovieState, MovieState);
}

function ChangePlayerName() {
    return function() {
        this.game.playerName = MenuState.getPlayerName();_input[0].getInput().text;
        console.log("this.game.playerName");
    };
}

module.exports = {
    init: function() {
        console.log("Initializing StateManager");
        if(_stateManagerInstance !== null)
            return _instance;
        _stateManagerInstance = this.game.state;
        _game = this.game;
        Group.init(_game);        
        Subtitle.init(this.game);
        Transition.init(_game);
        AddAllStates();
        UI.init(_game);
        return _stateManagerInstance;
    },
    preload: function() {
    },
    create: function() {
        Video.stop();
        _game.global.gameManager.getChangeSceneSignal().dispatch(Resources.getStartSceneKey());
    },
    changeScene: function(scene) {
        _game.mediaGroup.removeAll();
        ChangeScene(scene);
    }
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//initializes once
var _instance = null;
var _game = null;
var _text = [];
var _choiceBg = [];
var Text = __webpack_require__(7),
    Image = __webpack_require__(6);

const choiceBgKeyEnum = 'IMAGE_CHOICE_BACKGROUND';


function CreateBg(y, width, height) {
    var choiceBg = new Image(0, y, 'choiceBg');
    choiceBg.addImageToGame(_game, choiceBgKeyEnum, _game.mediaGroup);
    choiceBg.changeImage(_game, choiceBgKeyEnum, width, height);
    return choiceBg;
}

function CreateChoices(choices) {
    if(choices.targetScene)
        CreateMeaningfulChoices(choices, _game.global.gameManager.getChangeSceneSignal());
    else
        CreateMeaninglessChoices(choices);
}

function CreateMeaningfulChoices(info) {
    resetElements();
    for(var i=0; i < info.size; i++) {
        var bgImg = CreateBg(info.y[i], info.bounds[i][0], info.bounds[i][1]);
        _choiceBg.push(bgImg);
        _text.push(new Text(info.content[i], 0, 0, _game.global.style.choicesTextProperties));
        _text[i].index = i;
        _text[i].addToGame(_game, _game.mediaGroup);
        _text[i].changeText(_game, 'TEXT_MEANINGFUL_CHOICES', info.targetScene[i], _game.global.gameManager.getChangeSceneSignal(),
            bgImg.getPhaserImage().y, bgImg.getPhaserImage().width, bgImg.getPhaserImage().height);
    };
}

function CreateMeaninglessChoices(info) {
    resetElements();
    for(var i=0; i < info.size; i++) {
        var bgImg = CreateBg(info.y[i], info.bounds[i][0], info.bounds[i][1]);
        _choiceBg.push(bgImg);
        _text.push(new Text(info.content[i], 0, 0, _game.global.style.choicesTextProperties));
        _text[i].index = i;
        _text[i].addToGame(_game, _game.mediaGroup);
        _text[i].changeText(_game, 'TEXT_MEANINGLESS_CHOICES', _game.global.gameManager.getEndInteractionSignal(),
            bgImg.getPhaserImage().y, bgImg.getPhaserImage().width, bgImg.getPhaserImage().height);
    };
}

function FadeChoicesExcept(choiceText){
    _text.forEach(function(text) {
        if(text.index != choiceText.index) {
            text.disableInput();
            text.fadeOut(_game);
        }
    });
    _choiceBg.forEach(function(choiceBg) {
        choiceBg.fadeOut(_game);
    });
}

function FadeChoiceAfterDelay(choiceText) {
    _game.time.events.add(Phaser.Timer.SECOND*1, fadeChoice, this);

    function fadeChoice(){
        choiceText.fadeOut(_game);
    }
}

function resetElements() {
    _text = [];
    _choiceBg = [];
}

module.exports = {
    init: function(game) {
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function(choices) {
        CreateChoices(choices);
    },
    endInteraction: function(lingeringChoice) {
        FadeChoicesExcept(lingeringChoice);
        FadeChoiceAfterDelay(lingeringChoice);
    }
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var _instance = null,
    _game = null,
    _blur = null,
    _blurNone = null;


function createBlurFilter(x_amt, y_amt) {
    var blurX = _game.add.filter('BlurX');
    var blurY = _game.add.filter('BlurY');
    blurX.blur = x_amt;
    blurY.blur = y_amt;
    _blur = [blurX, blurY];
    var blurX_none = _game.add.filter('BlurX');
    var blurY_none = _game.add.filter('BlurY');
    blurX_none.blur = 0;
    blurY_none.blur = 0;
    _blurNone = [blurX_none, blurY_none];
}

module.exports = {
    init: function(game) {
        if(_instance !== null) {
            return _instance;
        }
        _game = game;
        _instance = this;
        return _instance;
    },
    preload: function() {
        _game.load.script('filterX', 'js/Lib/BlurX.js');
        _game.load.script('filterY', 'js/Lib/BlurY.js');
    },
    create: function() {
        createBlurFilter(5, 5);
    },
    getBlur: function() {
        return _blur;
    },
    getBlurNone: function() {
        return _blurNone;
    }
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//Dependency: choiceText


//initializes once
var _instance = null;
var _game = null;
var _text = [];
var _choiceFont = null;
var _bgImage = null;
var _group = null;
var Text = __webpack_require__(7),
    Image = __webpack_require__(6);

const bgImageKeyEnum = 'IMAGE_BACKGROUND';

function createBgImage(key, draggable) {
    _bgImage = new Image(0, 0, key);
    _bgImage.addImageToGame(_game, bgImageKeyEnum, _game.mediaGroup);
    _bgImage.changeImage(_game, bgImageKeyEnum, draggable);
}

function dragStart() {
}

function dragUpdate() {
    _group.x = _bgImage.getPhaserImage().x;
    _group.y = _bgImage.getPhaserImage().y;
}

function dragStop() {

}

module.exports = {
    init: function(game) {
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function(bgKey, draggable) {
        createBgImage(bgKey, draggable);
        return _bgImage.getPhaserImage();
    //    createIcons(icons, draggable, _bgImage);
    },
    assignFollowIcons: function(icons) {
        _group = _game.add.group();
        icons.forEach(function(element) {
            _group.add(element);
        });

        _bgImage.getPhaserImage().events.onDragStart.add(dragStart);
        _bgImage.getPhaserImage().events.onDragUpdate.add(dragUpdate);
        _group.x = _bgImage.getPhaserImage().x;
        _group.y = _bgImage.getPhaserImage().y;
    }
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Group = __webpack_require__(3),
    UI = __webpack_require__(1),
    Video = __webpack_require__(4),
    Transition = __webpack_require__(0),
    Icons = __webpack_require__(9),
    State = __webpack_require__(5),
    Choices = __webpack_require__(12),
    Subtitles = __webpack_require__(10);
    
var _stateInfo = null;
var _instance = null;
var _momentCount = null;

function CreateThought() {
    Icons.endInteraction();
    var thoughtBubbles = _stateInfo.getThoughtBubble(_momentCount);
    if(thoughtBubbles) {
        for(var i=0; i<thoughtBubbles.size; i++) {
            console.log("Thought bubble: ");
            console.log(thoughtBubbles.thoughts[i]);
            Icons.createThoughtIcon(thoughtBubbles.thoughtIconKey[i], thoughtBubbles.coords[i], thoughtBubbles.thoughts[i], thoughtBubbles.choices[i]);
        }
    }
    else {
        console.log("Choices: " + _momentCount);
        var choices = _stateInfo.getChoices(_momentCount);
        Choices.create(choices);
    }
    _momentCount++;
}

function EndInteraction(lingeringChoice) {
    Icons.endInteraction();
    Choices.endInteraction(lingeringChoice);
    Video.endFilter();
}

function GetTimeStamps() {
    var moments = _stateInfo.getChoiceMoments();
    var timeStamps = [];
    console.log("Interaction Times")
    for(var i=0; i<moments.size; i++) {
        timeStamps.push(moments.choiceMomentsProperties[i].timeStamp);
        console.log(moments.choiceMomentsProperties[i].timeStamp);
    }
    return timeStamps;
}

module.exports = {
    init: function(scene) {
        if(_stateInfo) {
            _stateInfo.setStateScene(scene);
            console.log(scene);
        }
        Video.init(this.game);
        Icons.init(this.game);
        if(_instance !== null)
            return _instance;
        _stateInfo = new State(scene);
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        Group.initializeGroups();
        _momentCount = 0;
        var timeStamps = GetTimeStamps();
        Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransitionInfo().fadeOut,
            _stateInfo.getVideoFilter(), _stateInfo.getNextScenes(), _stateInfo.getMovieSubKey(), timeStamps);
        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
        UI.create();
    },
    createThought: function() {
        CreateThought();
    },
    endInteraction: function(lingeringChoice) {
        EndInteraction(lingeringChoice);
    }
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

//Dependency: None
var _instance = null
var _game = null;

WebFontConfig = {
    //Load fonts before creation, timer delay. Can be improved  in implementation.
    active: function() { _game.time.events.add(Phaser.Timer.SECOND, delayedCreate, this); },

    google: {
      families: ['Kadwa', 'Merienda One'],
    }
};

function delayedCreate() {
    createGlobalVars();
    initGameGroups();
    _game.state.start("preload");
}

function createGlobalVars() {
    _game.global = {
        playerName: null
    }
}

function initGameGroups() {
    _game.mediaGroup = _game.add.group();
    _game.uiGroup = _game.add.group();
}

module.exports = {
    init: function() {
        console.log("Boot State");
        if( _instance !== null)
            return _instance;
        _game = this.game;
        return _instance;
    },
    preload: function() {
        _game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        _game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    create: function() {
    }
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Resources = __webpack_require__(8);
var GameManager = __webpack_require__(19),
    _instance = null,
    _game = null;

module.exports = {
    init: function() {
        if( _instance !== null)
            return _instance;
        _game = this.game;
        Resources.init(_game);
        _game.global.gameManager = new GameManager();
        return _instance;
    },
    preload: function() {
        Resources.preload();
    },
    create: function() {
        Resources.create();
        _game.global.gameManager.initSignals();
        _game.global.style = Resources.getStyle();
        _game.state.start("stateManager");
    }
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var InputTypeEnum = {
    NameInput: 'INPUT_TEXT',
    Choices: 'TEXT_CHOICES'
}
var Linkable = __webpack_require__(2);

var Input = function(content, xPos, yPos, properties) {
    this._xPos = xPos;
    this._yPos = yPos;
    this._content = content;
    this._properties = properties;
    this._input = null;
}

Input.prototype.setDefaultProperties = function() {
    this._input.font = '18px Roboto';
}

Input.prototype.addToGame = function(game) {
    this._input = game.add.inputField(this._xPos, this._yPos, this._properties);
    this.setDefaultProperties();
}

Input.prototype.getInput = function() {
    return this._input;
}


module.exports = Input;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _game = null;
var StateManager = __webpack_require__(11),
    InteractState = __webpack_require__(15),
    Transition = __webpack_require__(0),
    UI = __webpack_require__(1);

var GameManager = function() {
    if(_instance === null)
        _instance = this;

    this._changeSceneSignal = null;

    this._fadeInTransitionSignal = null;
    this._fadeOutTransitionSignal = null;

    this._triggerInteractionSignal = null;
    this._endInteractionSignal = null;

    this._pauseSignal = null;

    return _instance;
}

GameManager.prototype.initSignals = function() {
    this._changeSceneSignal = new Phaser.Signal();
    this._changeSceneSignal.add(StateManager.changeScene, this);

    this._fadeInTransitionSignal = new Phaser.Signal();
    this._fadeInTransitionSignal.add(Transition.fadeInTransition, this);
    this._fadeOutTransitionSignal = new Phaser.Signal();
    this._fadeOutTransitionSignal.add(Transition.fadeOutTransition, this);

    this._triggerInteractionSignal = new Phaser.Signal();
    this._triggerInteractionSignal.add(InteractState.createThought, this);
    this._endInteractionSignal = new Phaser.Signal();
    this._endInteractionSignal.add(InteractState.endInteraction, this)

    this._pauseSignal = new Phaser.Signal();
    this._pauseSignal.add(UI.pause, this);
}

GameManager.prototype.getChangeSceneSignal = function() {
    return this._changeSceneSignal;
}

GameManager.prototype.getFadeInTransitionSignal = function() {
    return this._fadeInTransitionSignal;
}

GameManager.prototype.getFadeOutTransitionSignal = function() {
    return this._fadeOutTransitionSignal;
}

GameManager.prototype.getTriggerInteractionSignal = function() {
    return this._triggerInteractionSignal;
}

GameManager.prototype.getEndInteractionSignal = function() {
    return this._endInteractionSignal;
}

GameManager.prototype.getPauseSignal = function() {
    return this._pauseSignal;
}

module.exports = GameManager;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _game = null;
var _input = null;
var Input = __webpack_require__(18);

module.exports = {
    init: function(game) {
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function(input) {
        _input = [];
        for(var i=0; i<input.size; i++) {
            _input.push(new Input(input.name[i], input.coords[i][0], input.coords[i][1], input.properties[i]));
            _input[i].addToGame(_game);
        }
        return _input;
    }
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Initialized once
var Text = __webpack_require__(7),
    _instance = null,
    _game = null,
    _text = [];

module.exports = {
    init: function(game) {
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function(info, coords) {
        _text = [];
        for(var i=0; i < info.size; i++) {
            _text.push(new Text(info.content[i], coords[0], coords[1], _game.global.style.thoughtsTextProperties));
            _text[i].addToGame(_game, _game.mediaGroup);
            _text[i].changeText(_game, 'TEXT_THOUGHTS', info.destination[i][0], info.destination[i][1]);
        };
    },
    endInteraction: function() {
        _text.forEach(function(text) {
            text.fadeOut(_game);
        });
    }
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Linkable = __webpack_require__(2);

var _instance = null;
var _game = null;
var _video = null;
var _videoHTML = null;
var _bitmapCanvas = null;
var _bitmapSprite = null;
var _canvas = null;
var _context = null;
var _framebuffer = null;
var _effect = null;
var _filter = null;
var _fadeOutSignal = null;

const REFRESH_TIME_MS = 10;
const FADE_IN_TIME_MS = 2000;

function InitializeBitmapOverlay(game) {
    _bitmapCanvas = game.add.bitmapData(game.width, game.height);
    _bitmapSprite = game.add.sprite(game.width/2, game.height/2, _bitmapCanvas);
    game.mediaGroup.add(_bitmapSprite);
    _bitmapSprite.alpha = 0;
    _bitmapSprite.anchor.setTo(0.5);
    _context = _bitmapCanvas.context;
}

function StartFilterFadeIn(signal) {
    Linkable.fadeIn(_game, _bitmapSprite, FADE_IN_TIME_MS, signal);
    Linkable.zoomIn(_game, _bitmapSprite, 1.05, _game.width, _game.height);
    _video.stop();
}

function EndFilter() {
    Linkable.fadeOut(_game, _bitmapSprite, false);
}

function CreateVideoFilter() {
     //   _game.time.reset();
        Render();
    //_game.time.events.repeat(10, 1, render, this);

};

function Render() {
    if(!_video.playing)
        return;
    RenderFrame();
    _game.time.events.repeat(REFRESH_TIME_MS, 1, Render, this);
    /*
    setTimeout(function() {
        render();
    }, 10)
    */
};

function RenderFrame() {
    if(_bitmapSprite.alpha == 0)
        return;
    _context.drawImage(_videoHTML, 0, 0, _video.width,
        _video.height, 0, 0, _game.width, _game.height);
    var data = _context.getImageData(0, 0, _game.width, _game.height);
    var effect;
    _filter.forEach(function(filter) {
        if(filter[0] in JSManipulate) {
            _effect = JSManipulate[filter[0]];
            if(filter[1])
                _effect.filter(data, filter[1]);
            else
                _effect.filter(data, _effect.defaultValues);
        }
    });
    _context.putImageData(data, 0, 0);
    return;
};

function stopVideo() {
    if(_video !== null)
        _video.stop();
}

module.exports = {
    init: function(game, video) {
        console.log("Filter initialized");

        if(_instance !== null)
            return _instance;

        _instance = this;
        _game = game;
        _video = video;
        _videoHTML = _video.video;
        _canvas = game.canvas;

        _framebuffer = document.createElement("canvas");
        _framebuffer.width = _game.width;
        _framebuffer.height = _game.height;
        _framebuffer.context = _framebuffer.getContext("2d");
        return _instance;
    },
    create: function(filter) {
        _filter = filter;
        InitializeBitmapOverlay(_game);
        CreateVideoFilter();
    },
    startFilterFade: function(signal) {
        StartFilterFadeIn(signal);
    },
    endFilter: function() {
        EndFilter();
    },
    stop: function() {
        _video.stop();
    }
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _stateInfo = null;
var Group = __webpack_require__(3),
    UI = __webpack_require__(1),
    Video = __webpack_require__(4),
    Transition = __webpack_require__(0),
    State = __webpack_require__(5);

module.exports = {
    init: function(scene, signal) {
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);
        Video.init(this.game, signal);
        if(_instance !== null)
            return _instance;
        _stateInfo = new State(scene);
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        Group.initializeGroups();
        Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransitionInfo().fadeOut, _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
        UI.create();
    }
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _stateInfo = null;
var Transition = __webpack_require__(0),
    Group = __webpack_require__(3),
    State = __webpack_require__(5),
    UI = __webpack_require__(1),
    MovingBackground = __webpack_require__(14),
    Icons = __webpack_require__(9);

module.exports = {
    init: function(scene) {
        Group.initializeGroups();
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);
        if(_instance !== null)
            return _instance;
        _stateInfo = new State(scene);
        _instance = this;
        MovingBackground.init(this.game);
        Icons.init(this.game);
        return _instance;
    },
    preload: function() {
    },
    create: function() {
    //    Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransition().fadeOut, Transition.getFadeOutSignal(), _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
        MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
        var icons = Icons.createExploratoryIcons(_stateInfo.getIconsInfo());
        if(_stateInfo.getDraggable())
            MovingBackground.assignFollowIcons(icons);
        UI.create();
        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
    }
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _stateInfo = null;
var _changeSceneSignal = null;
var _input = [];
var Input = __webpack_require__(20);
var Transition = __webpack_require__(0);
var State = __webpack_require__(5);
var MovingBackground = __webpack_require__(14);
var Icons = __webpack_require__(9);


function setPlayerName(game) {
    if(_input[0])
        return function() {game.global.playerName = _input[0].getInput().text._text;};
    else {
        "Input not eneabled.";
    }
}

function updatePlayerNameCallback(game) {
    game.state.onShutDownCallback = setPlayerName(game);
}

module.exports = {
    init: function(scene, signal) {
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);
        if(_instance !== null)
            return _instance;
        _instance = this;
        _stateInfo = new State(scene);
        _changeSceneSignal = signal;
        MovingBackground.init(this.game);
        Icons.init(this.game, _changeSceneSignal);
        Input.init(this.game);
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        _input = [];
        updatePlayerNameCallback(this.game);
        //Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransition().fadeOut, Transition.getFadeOutSignal(), _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
        MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
        Icons.createExploratoryIcons(_stateInfo.getIconsInfo());
        //_input = Input.create(_stateInfo.getInputInfo());
        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
    },
    update: function() {
        _input.forEach(function(element) {
            element.getInput().update();
        });
    }
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _stateInfo = null;
var Group = __webpack_require__(3),
    UI = __webpack_require__(1),
    Video = __webpack_require__(4),
    Transition = __webpack_require__(0),
    State = __webpack_require__(5);

module.exports = {
    init: function(scene, signal) {
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);
        Video.init(this.game, signal);
        if(_instance !== null)
            return _instance;
        _stateInfo = new State(scene);
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        Group.initializeGroups();
        Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransitionInfo().fadeOut, _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
        UI.create();
    }
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Boot = __webpack_require__(16),
    Preload = __webpack_require__(17),
    StateManager = __webpack_require__(11),
    ResourceLoader = __webpack_require__(8);
    
function initGame(Boot, Preload, StateManager, ResourceLoader) {
    var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { init: init, preload: preload, create: create, update: update });

    function init() {
        console.log("Game initialized.");
        game.canvas.className += "center";
        // game.add.plugin(PhaserInput.Plugin);
        game.state.add("boot", Boot);
        game.state.add("preload", Preload);
        game.state.add("stateManager", StateManager);
    }

    function preload () {
        game.load.json('data', 'json/Data.json');
        game.load.json('style', 'json/Style.json');
    }

    function create() {
        game.state.start("boot");
    }

    function update() {

    }
}

initGame(Boot, Preload, StateManager, ResourceLoader);


/***/ })
/******/ ]);