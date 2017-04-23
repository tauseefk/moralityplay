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
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const VideoFilter = __webpack_require__(22),
    Linkable = __webpack_require__(1),
    Subtitle = __webpack_require__(21);

var _instance = null;
var _game = null;
var _video = null
var _videoImage = null;
var _videoFilter = null;
var _interactionTimeStamps = null;

var _loopEventEnabled = false;
var _pausedByGame = false;

const FADEOUT_OFFSET_SECONDS = 5;
const VIDEO_SLOW_PLAYBACK_RATE = 0.2;

function CreateVideo(src, doFadeOut, nextScene, sub, interactionTimeStamps) {
    _video = _video.changeSource(src, false);

//    _video.video.setAttribute('autoplay', 'autoplay');
    AddVideoAndFilter(doFadeOut, sub, nextScene);
    if(_interactionTimeStamps)
        AddInteractionEvents(_interactionTimeStamps);
    //console.log(_video.video.currentTime);
    /*
    if(doFadeOut)
        _game.time.events.add((_video.video.duration-FADEOUT_OFFSET_SECONDS)*1000, fadeOut, this, signal);
    */
    /*
    if(nextScene) {
        _video.onComplete.addOnce(ChangeScene(nextScene), this);
        if(_loopEventEnabled) {
            _video.video.removeEventListener("timeupdate", loop);
            _loopEventEnabled = false;
        }
    }
    else if(!_loopEventEnabled) {
        LoopVideo();
    }
    */
}

function CheckProgress() {
    var percentLoaded = parseInt(_video.video.buffered.end(0) / _video.video.duration * 100);
    console.log(percentLoaded);
}

function AddInteractionEvents() {
    var timestamp = _interactionTimeStamps.shift();
    if(timestamp)
        checkVideoDuration(timestamp);
}

function AddVideoAndFilter(doFadeOut, sub, nextScene) {

    _videoImage = _video.addToWorld(0, 0, 0, 0);
    _game.mediaGroup.add(_videoImage);
    _video.onChangeSource.addOnce(OnVideoLoad, this);

    function OnVideoLoad() {
        _video.play();
        //_instance.clearFilterBg();
        if(!nextScene)
            _video.loop = true;
        else {
            _video.loop = false;
            _video.onComplete.addOnce(ChangeScene(nextScene), this);
        }
        //_video.video.addEventListener('progress', CheckProgress, false);
        if(doFadeOut) {
            //_game.time.events.add((_video.video.duration-FADEOUT_OFFSET_SECONDS)*Phaser.Timer.SECOND, FadeOut, this);
        }
        if(sub)
            Subtitle.create(_video.video, sub);
        if(_videoFilter != null && _videoFilter != 'none') {
            VideoFilter.createOverlay(_videoFilter);
        }
    }
}

function TriggerMoment() {
    console.log(_video.video.duration);
    console.log(_video.video.currentTime);
    //Ensure game is not paused to pause scenario properly
    _game.global.gameManager.getPlaySignal().dispatch();
    _video.video.pause();
    _pausedByGame = true;
    _game.global.gameManager.getHideUISignal().dispatch();
    VideoFilter.startFilterFade(_game.global.gameManager.getTriggerInteractionSignal());
}

function VideoZoom() {
    Linkable.zoomIn(_game, _video, 1.5);
}
/*
function checkVideoDuration(time) {
    _video.video.addEventListener("timeupdate", function trigger() {        
        if(_video.video.currentTime >= time){
            _video.video.removeEventListener("timeupdate", trigger);
            TriggerMoment();
            AddInteractionEvents();
        }
    }, false);
}
*/

function checkVideoDuration(time) {
    var interval = setInterval(function() {
        if(_video.video.currentTime >= time) {
            clearInterval(interval);
            TriggerMoment();
            AddInteractionEvents();
        }
    },100);
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

function SeekTo(time) {    
    _video.video.currentTime = time;
    _game.global.gameManager.getShowUISignal().dispatch();
    _instance.play(false);
}

function LoopVideo() {
    _loopEventEnabled = true;
    _video.video.addEventListener("timeupdate", function loop() {        
        if(_video.video.currentTime >= _video.video.duration - 0.5){
            _video.video.currentTime = 0.5;
            console.log('looped');
        }
    }, false);
}

module.exports = {
    init: function(game) {
        console.log("Video initialized");
        //stopVideo();
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        _video = _game.add.video('start', 'emptyVideo');
        _video.video.setAttribute('playsinline', 'playsinline');
        VideoFilter.init(game, _video);
        return _instance;
    },
    create: function(src, doFadeOut, videoFilter, nextScene, sub, interactionTimeStamps) {
        if(src) {
            _videoFilter = videoFilter;
            _interactionTimeStamps = interactionTimeStamps;
            CreateVideo(src, doFadeOut, nextScene, sub, interactionTimeStamps);
        }
        else {
            console.warn("Undefined movie source.");
        }
    },
    stop: function() {
        if(_video)
            _video.stop();
    },
    play: function(pausedByGame) {
        if(pausedByGame == false)
            _pausedByGame = pausedByGame;
        if(_video)
            _video.play();
    },
    seekTo: function(time) {
        SeekTo(time);
    },
    paused: function() {
        if(_video)
            return _video.video.paused;
    },
    isPausedByGame: function() {
        return _pausedByGame;
    },
    endFilter: function(targetScene) {        
        if(!targetScene) { 
            this.play(false);
            _game.global.gameManager.getShowUISignal().dispatch();
        }
        VideoFilter.endFilter(targetScene);
    },
    clearFilterBg:function() {
        VideoFilter.clearBg();
    },
    toggleSubtitle: function() {
        Subtitle.toggleSubtitle();
    },
    resetVideoVariables() {        
        _interactionTimeStamps = null;
        _pausedByGame = false;
    }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Animation = __webpack_require__(9);

const FADE_SPEED = 700;
const MOUSEOVER_SPEED = 300;

//Linkable constructor
var Linkable = function(game, event, signal, arg1, arg2, arg3) {
    this._game = game;
    this._linkable = this;
    this._event = event;
    this._signal = signal;
    this._arg1 = arg1;
    this._arg2 = arg2;
    this._arg3 = arg3;
    this._onClickAnimations = [];
    this._onMouseOverAnimations = [];
    this._onMouseOutAnimations = [];
    this._sound = [];
}

Linkable.prototype.setAsButton = function(once) {
    if(once) {
        this._event.onInputUp.addOnce(this.onTrigger, this);
        this._event.onInputUp.addOnce(this.removeInput, this);
    }
    else {        
        this._event.onInputUp.add(this.onTrigger, this);
    }
    this._event.onInputUp.add(this.playSound, this);
}

Linkable.prototype.setMouseOver = function() {
    this._event.onInputOver.add(this.playOnMouseOverAnimations, this);
    this._event.onInputOver.add(this.playSound, this);
}

Linkable.prototype.setMouseOut = function() {
    this._event.onInputOut.add(this.playOnMouseOutAnimations, this);
}

Linkable.prototype.addOnClickAnimation = function(tween) {
    this._onClickAnimations.push(tween);
}

Linkable.prototype.addMouseOverAnimation = function(tween) {
    this._onMouseOverAnimations.push(tween);
}

Linkable.prototype.addMouseOutAnimation = function(tween) {
    this._onMouseOutAnimations.push(tween);
}

Linkable.prototype.addSound = function(soundKey) {
    this._sound.push(soundKey);
}

Linkable.prototype.playOnClickAnimations = function() {    
    var tween = null;
    this._onClickAnimations.forEach(function(animation) {
        tween = animation.start();
    });
    return tween;
}

Linkable.prototype.playOnMouseOverAnimations = function() {    
    var tween = null;
    this._onMouseOverAnimations.forEach(function(animation) {
        animation.reverse = false;
        tween = animation.start();
    });
    return tween;
}

Linkable.prototype.playOnMouseOutAnimations = function() {    
    var tween = null;
    this._onMouseOutAnimations.forEach(function(animation) {
        tween = animation.start();
    });
    return tween;
}

Linkable.prototype.playSound = function() {
    var game = this._game;
    this._sound.forEach(function(sound) {
        game.global.soundManager.playSound(sound);
    });
}

Linkable.prototype.removeInput = function() {
    if(this._event.inputEnabled)
        this._event.inputEnabled = false;
    else if(this._event.parent && this._event.parent.inputEnabled) {
        this._event.parent.inputEnabled = false;
    }
    if(this._event.input) {
        this._event.input.useHandCursor = false;
    } 
}

Linkable.prototype.onTrigger = function() {
    var tween = this._linkable.playOnClickAnimations();
    if(tween)
        tween.onComplete.add(this.dispatchSignal, this);
    else
        this.dispatchSignal();
}

Linkable.prototype.addMouseOverScaleEffect = function(game, object) {
    this._linkable.addMouseOverAnimation(Animation.scale(game, object, false, object.width *1.05, object.height *1.05, MOUSEOVER_SPEED));
    this._linkable.setMouseOver();    
    this._linkable.addMouseOutAnimation(Animation.scale(game, object, false, object.width, object.height, MOUSEOVER_SPEED));
    this._linkable.setMouseOut();
}

Linkable.prototype.dispatchSignal = function() {
    this._signal.dispatch(this._arg1, this._arg2, this._arg3);
}

Linkable.goToLink = function(link) {
    window.open(link,'_blank');
}

module.exports = Linkable;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Linkable = __webpack_require__(1),
    Animation = __webpack_require__(9);

const PADDING = 10;

var TextTypeEnum = {
    Thoughts: 'TEXT_THOUGHTS',
    MeaningfulChoices: 'TEXT_MEANINGFUL_CHOICES',
    MeaninglessChoices: 'TEXT_MEANINGLESS_CHOICES',    
    Question: 'TEXT_QUESTION',
    Subtitle: 'TEXT_SUBTITLE',
    InfoOverlayText: 'TEXT_INFO_OVERLAY'
}

var Text = function(content, xPos, yPos, type, properties) {
    this._type = type;
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
Text.prototype.changeText = function(game, arg1, arg2, arg3, arg4, arg5, arg6) {
    switch(this._type) {
        case TextTypeEnum.Thoughts:
            this.changeToThoughts(game, arg1, arg2, arg3);
            break;
        case TextTypeEnum.MeaningfulChoices:
            this.changeToMeaningfulChoices(game, arg1, arg2, arg3, arg4, arg5, arg6);
            break;
        case TextTypeEnum.MeaninglessChoices:
            this.changeToMeaninglessChoices(game, arg1, arg2, arg3, arg4, arg5);
            break;
        case TextTypeEnum.Question:
            this.changeToQuestion(game);
            break;
        case TextTypeEnum.InfoOverlayText:
            this.changeToInfoOverlayText(game);
            break;
        case TextTypeEnum.Subtitle:
            this.changeToSubtitle(game, arg1);
            break;
        default:
            console.warn("Invalid Text Type.");
    }
}

Text.prototype.changeToThoughts = function(game, xTo, yTo, filter) {
    this._text.anchor.setTo(0.5);
    this._text.alpha = 0;
    this.addInterpolationTween(game, xTo, yTo);    
    Animation.fade(game, this._text, 1, true);
}

Text.prototype.changeToMeaningfulChoices = function(game, boundsY, totalChoices) {
    /*
    if(totalChoices > 2)
        this._text.fontSize -= 5;
    if(totalChoices > 1)
        this._text.fontSize -= 5;
    */
    this._text.anchor.set(0.5, 0.5);
    this._text.y = boundsY;
    this._text.alpha = 0;
    this.fadeIn(game);
    //this._text.inputEnabled = false;
    //this._text.input.useHandCursor = true;
    //this._text.boundsAlignV = "middle";
    //this._text.setTextBounds(0, boundsY, boundsWidth, boundsHeight);
    /*
    this._link = new Linkable(game, this._text.events, endInteractionSignal, this, targetScene);
    this._link.setAsButton(true);    
    this._link.addMouseOverScaleEffect(game, this._text);
    */
    //Animation.fade(game, this._text, 1, true);
}

Text.prototype.changeToMeaninglessChoices = function(game, boundsY, totalChoices) {
    /*
    if(totalChoices > 2)
        this._text.fontSize -= 5;
    if(totalChoices > 1)
        this._text.fontSize -= 5;
    */
    this._text.anchor.set(0.5, 0.5);
    this._text.y = boundsY;
    this._text.alpha = 0;
    this.fadeIn(game);
    //this._text.inputEnabled = false;
    //this._text.input.useHandCursor = true;
    //this._text.setTextBounds(0, boundsY, boundsWidth, boundsHeight);
    //this._text.boundsAlignV = "middle";
    /*
    this._link = new Linkable(game, this._text.events, endInteractionSignal, this);
    this._link.setAsButton(true);
    this._link.addMouseOverScaleEffect(game, this._text);
    */
    //Animation.fade(game, this._text, 1, true);
}

Text.prototype.changeToQuestion = function(game) {
    this._text.anchor.set(0.5, 0.5);
    this._text.x = game.width/2;    
    this._text.alpha = 0;
    Animation.fade(game, this._text, 1, true);
}

Text.prototype.changeToInfoOverlayText = function(game) {    
    this._text.anchor.set(0.5, 0.5);
    this._text.x = game.width/2;
    this.setVisible(false);
}

Text.prototype.changeToSubtitle = function(game, isVisible) {
    this._text.anchor.x = 0.5
    this._text.x = game.width/2;
    this.setVisible(isVisible);
}

Text.prototype.addInterpolationTween = function(game, xTo, yTo) {
    var points = {x: [ this._xPos,  this._xPos + (xTo- this._xPos)/2,  xTo-(xTo- this._xPos)/8, xTo], y: [ this._yPos,  this._yPos-10, yTo-10, yTo]};
    return game.add.tween(this._text).to({x: points.x, y: points.y}, 1000, Phaser.Easing.Quadratic.Out, true, 0 , 0).interpolation(function(v, k){
            return Phaser.Math.bezierInterpolation(v, k);
        });
}

Text.prototype.fadeOut = function(game, chainSignal, arg1) {
    if(chainSignal) {
        this._link = new Linkable(game, this._text.events, chainSignal, arg1);
        this._link.addOnClickAnimation(Animation.fade(game, this._text, 0, true));
        this._link.onTrigger();
    }
    else {
        Animation.fade(game, this._text, 0, true);
    }
}

Text.prototype.fadeIn = function(game, enableInput) {
    if(enableInput) {
        this._text.inputEnabled = true;
        this._text.input.useHandCursor = true;
    }
    Animation.fade(game, this._text, 1, true);
}

Text.prototype.disableInput = function(game) {
    this._text.inputEnabled = false;
}

Text.prototype.destroy = function() {
    this._text.destroy();
}

Text.prototype.getPhaserText = function() {
    return this._text;
}

Text.prototype.getHeight = function() {
    return this._text.height;
}

Text.prototype.setVisible = function(isVisible) {
    this._text.visible = isVisible;
}

Text.prototype.setY = function(val) {
    this._text.y = val;
}

Text.getEnum = function() {
    return TextTypeEnum;
}

module.exports = Text;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const VideoFilter = __webpack_require__(22);

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
		VideoFilter.clearBg();
		fade(true);
	},
	fadeOutTransition: function() {
		fade(false);
	}
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//Dependency: Nonde


const Image = __webpack_require__(5),
    Text = __webpack_require__(2),
    Graphic = __webpack_require__(10),
    Video = __webpack_require__(0),
    ImageViewer = __webpack_require__(28);

var _instance = null;
var _game = null;
var _graphics = null;
var _pauseImage = null;
var _playImage = null;
var _toggleSubtitleImage = null;
var _pausedByEngine = false;

var _overlayGraphic = null;
var _overlayCloseButton = null;
var _overlayText = null;

var _uiVisible = true;

const pauseButtonImageKeyEnum = 'IMAGE_BUTTON_PAUSE';
const playButtonImageKeyEnum = 'IMAGE_BUTTON_PLAY';
const toggleSubtitleButtonImageKeyEnum = 'IMAGE_BUTTON_TOGGLE_SUBTITLE';

function DrawPauseButton() {
    if(!_pauseImage)
        _pauseImage = new Image(10, 10, 'pauseButton', pauseButtonImageKeyEnum);
    _pauseImage.addImageToGame(_game, _game.uiGroup);
    _pauseImage.changeImage(_game, _game.global.gameManager.getPauseSignal());
}

function DrawToggleSubtitleButton() {
    if(!_toggleSubtitleImage)        
        _toggleSubtitleImage = new Image(10, 100, 'subtitleButton', toggleSubtitleButtonImageKeyEnum);    
    _toggleSubtitleImage.addImageToGame(_game, _game.uiGroup);
    _toggleSubtitleImage.changeImage(_game, _game.global.gameManager.getToggleSubtitleSignal());
}

function DrawPlayButton() {
    if(!_playImage)
        _playImage = new Image(_game.world.centerX, _game.world.centerY, 'playButton', playButtonImageKeyEnum);
    _playImage.addImageToGame(_game, _game.uiGroup);
    _playImage.changeImage(_game);
    _playImage.setVisible(false);
}

function Pause() {
    if(!Video.paused()) {
        _game.paused = true;
        Video.stop();
        if(_graphics) {
            _graphics.visible = true;
        }
        if(_playImage) {
            _playImage.setVisible(true);
        }
        _game.input.onDown.addOnce(Play, self);
    }
}

function Play() {
    if(!Video.isPausedByGame()) {
        Video.play();
        _game.paused = false;
        _graphics.visible = false;
        _playImage.setVisible(false);
    }
}

function ToggleUI() {
    _uiVisible = !_uiVisible;
    _pauseImage.setVisible(_uiVisible);
    //_toggleSubtitleImage.setVisible(_uiVisible);
}

function HideUI() {
    _uiVisible = false;
    _pauseImage.setVisible(_uiVisible);
    //_toggleSubtitleImage.setVisible(_uiVisible);
}

function ShowUI() {
    _uiVisible = true;
    _pauseImage.setVisible(_uiVisible);
    //_toggleSubtitleImage.setVisible(_uiVisible);
}

function DrawPauseOverlay() {
    _graphics = _game.add.graphics(0, 0);
    _graphics.beginFill(0x000000, 0.8);
    _graphics.drawRect(0, 0, _game.width, _game.height);
    _graphics.endFill();
    _graphics.visible = false;
    _game.uiGroup.add(_graphics);
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
        ImageViewer.init(game);
        _instance = this;
        _game = game;
        return _instance;
    },
    preload: function() {
    },
    create: function(drawPause, drawSubtitleToggle) {
        _uiVisible = true;
        if(drawSubtitleToggle)
            //DrawToggleSubtitleButton();
        if(drawPause) {
            DrawPauseButton();
            DrawPauseOverlay();
            DrawPlayButton();
        }
    },
    pause: function(byGame) {
        Pause(byGame);
    },
    play: function() {
        Play();
    },
    toggleUI: function() {
        ToggleUI();
    },
    showUI: function() {
        ShowUI();
    },
    hideUI: function() {
        HideUI();
    },
    createInfoOverlay() {
        ImageViewer.createOverlay();
    },
    showInfoOverlay(image) {
        ImageViewer.setVisible(true, image);
    },
    hideInfoOverlay() {
        ImageViewer.setVisible(false);
    }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Linkable = __webpack_require__(1),
    Animation = __webpack_require__(9),
    Graphic = __webpack_require__(10);

var ImageTypeEnum = {
    Static: 'IMAGE_STATIC',
    ThoughtSprite: 'IMAGE_SPRITE_THOUGHT',
    SceneChange: 'IMAGE_BUTTON_SCENECHANGE',
    DisplayImage: 'IMAGE_BUTTON_DISPLAY_IMAGE',
    InfoImage: 'IMAGE_INFO',
    Thought: 'IMAGE_BUTTON_THOUGHT',
    Transition: 'IMAGE_TRANSITION',
    Background: 'IMAGE_BACKGROUND',
    ChoiceBackground: 'IMAGE_CHOICE_BACKGROUND',
    OverlayCloseImage: 'IMAGE_OVERLAY_CLOSE',
    OverlayScrollBar: 'IMAGE_SCROLLBAR',
    ExternalLink: 'IMAGE_BUTTON_EXTERNAL_LINK',
    Pause: 'IMAGE_BUTTON_PAUSE',
    Play: 'IMAGE_BUTTON_PLAY',
    ToggleSubtitle: 'IMAGE_BUTTON_TOGGLE_SUBTITLE'
}

//Image constructor
var Image = function(xPos, yPos, key, type, properties) {
    this._type = type;
    this._xPos = xPos;
    this._yPos = yPos;
    this._properties = properties;
    this._key = key;
    this._link = null;
    this._image = this;
}

Image.prototype.addImageToGame = function(game, group) {
    switch(this._type) {
        case ImageTypeEnum.Pause:
        case ImageTypeEnum.Play:
        case ImageTypeEnum.Thought:
        case ImageTypeEnum.SceneChange:
        case ImageTypeEnum.DisplayImage:
        case ImageTypeEnum.ToggleSubtitle:
        case ImageTypeEnum.ChoiceBackground:
        case ImageTypeEnum.OverlayCloseImage:
        case ImageTypeEnum.ExternalLink:
            this._image = game.add.button(this._xPos, this._yPos, this._key);
            break;
        case ImageTypeEnum.Static:
        case ImageTypeEnum.Background:
        case ImageTypeEnum.InfoImage:
        case ImageTypeEnum.OverlayScrollBar:
            this._image = game.add.image(this._xPos, this._yPos, this._key);
            break;
        case ImageTypeEnum.ThoughtSprite:
            this._image = game.add.sprite(this._xPos, this._yPos, this._key);
            break;
        default:
            console.warn("Invalid image type not added:" + this._type);
    }
    group.add(this._image);
}

//Assigns image change function depending on enum
Image.prototype.changeImage = function (game, arg1, arg2, arg3, arg4, arg5) {
    switch(this._type) {
        case ImageTypeEnum.Static:            
            this.changeToStaticImage(game, arg1);
            break;
        case ImageTypeEnum.Background:
            this.changeToBgImage(game, arg1);
            break;
        case ImageTypeEnum.Thought:
            this.changeToThoughtIcon(game, arg1, arg2, arg3);
            break;
        case ImageTypeEnum.SceneChange:
            this.changeToSceneChangeImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.DisplayImage:
            this.changeToDisplayImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.InfoImage:
            this.changeToInfoImage(game, arg1, arg2, arg3);
            break;
        case ImageTypeEnum.ChoiceBackground:
            this.changeToChoiceBackgroundImage(game, arg1, arg2, arg3, arg4, arg5);
            break;
        case ImageTypeEnum.OverlayCloseImage:
            this.changeToOverlayCloseImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.OverlayScrollBar:
            this.changeToOverlayScrollBar(game, arg1, arg2);
            break;
        case ImageTypeEnum.ExternalLink:
            this.changeToExternalLinkImage(game, arg1);
            break;
        case ImageTypeEnum.Pause:
            this.changeToPauseButton(game, arg1);
            break;
        case ImageTypeEnum.Play:
            this.changeToPlayButton(game);
            break;
        case ImageTypeEnum.ToggleSubtitle:
            this.changeToPauseButton(game, arg1);
            break;
        case ImageTypeEnum.ThoughtSprite:
            this.changeToThoughtSprite(game, arg1, arg2, arg3);
            break;
        default:
            console.warn("Invalid Image Type.");
    }
}

Image.prototype.changeToStaticImage = function(game) {
    this._image.anchor.setTo(0.5, 0.5);
}

Image.prototype.changeToThoughtSprite = function(game, thoughts, coords, choices) {
    //this._image.width = 100;
    //this._image.height = 100;
    this._image.anchor.setTo(0.5, 0.5);
    this._image.animations.add('think');
    this._image.animations.play('think', 4, false);
    this._image.inputEnabled = true;
    this._image.input.useHandCursor = true;
    this._link = new Linkable(game, this._image.events, game.global.gameManager.getCreateThoughtsAndChoicesSignal(), thoughts, coords, choices);
    this._link.addOnClickAnimation(Animation.fade(game, this._image, 0, false));
    this._link.addOnClickAnimation(Animation.scale(game, this._image, false));
    this._link.setAsButton(true);
    Animation.bob(game, this._image, true);
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
        this.makeDraggable(game, false, true, -this._image.width+game.width, 0, this._image.width*2-game.width, this._image.height);
    }
}

Image.prototype.changeToThoughtIcon = function(game, thoughts, coords) {
    this._image.width = 100;
    this._image.height = 100;
    this._image.anchor.setTo(0.5, 0.5);
    this._link = new Linkable(game, this._image, game.global.gameManager.getCreateThoughtsAndChoicesSignal(), thoughts, coords, choices);
    this._link.addOnClickAnimation(Animation.fade(game, this._image, 0, false));
    this._link.addOnClickAnimation(Animation.scale(game, this._image, false));
    this._link.setAsButton(true);
    Animation.bob(game, this._image, true);
}

Image.prototype.changeToSceneChangeImage = function(game, targetScene) {
    this._target = targetScene;
    this._image.anchor.setTo(0.5, 0.5);
    this._link = new Linkable(game, this._image, game.global.gameManager.getChangeSceneSignal(), targetScene);
    this._link.setAsButton(true);    
    this._link.addMouseOverScaleEffect(game, this._image);
    Animation.bob(game, this._image, true, -1);
}

Image.prototype.changeToDisplayImage = function(game, target, clickedIndex) {
    this._target = target;
    this._image.anchor.setTo(0.5, 0.5);
    this._link = new Linkable(game, this._image, game.global.gameManager.getDisplayImageSignal(), target, clickedIndex);
    this._link.setAsButton(false);
    this._link.addMouseOverScaleEffect(game, this._image);
    Animation.bob(game, this._image, true);
    //this._link.addOnClickAnimation(Animation.fade(game, this._image, 0,false, null, null, true));
 //   this._link.addSound('testSound');
}

Image.prototype.changeToInfoImage = function(game, target) {
    var MARGIN = game.global.constants.INFO_VIEW_MARGIN;
    var DISPLAY_WIDTH = game.global.constants.INFO_VIEW_WIDTH;    
    var DISPLAY_HEIGHT = game.global.constants.INFO_VIEW_HEIGHT;
    var SCALE = DISPLAY_WIDTH/this._image.width;
    this._image.height = Math.floor(this._image.height*SCALE);
    this._image.width = Math.floor(this._image.width*SCALE);
    this._image.x = MARGIN;
    this._image.y = MARGIN;

    this._mask = game.add.graphics(0, 0);
    //game.mediaGroup.add(this._mask);
    this._mask.beginFill(0xffffff);
    this._mask.drawRect(MARGIN, MARGIN, DISPLAY_WIDTH, game.global.constants.INFO_VIEW_HEIGHT);
    this._mask.endFill();
    this._image.mask = this._mask;

    this.makeDraggable(game, true, false, MARGIN, -this._image.height+DISPLAY_HEIGHT+MARGIN, 
        DISPLAY_WIDTH, this._image.height*2-DISPLAY_HEIGHT);
    
}

Image.prototype.changeToChoiceBackgroundImage = function(game, width, height, target, phaserText, tag) {
    this._image.alpha = 0;
    this._image.anchor.set(0.5, 0.5);
    this._image.width = width;
    this._image.height = height;

    this._link = new Linkable(game, this._image, game.global.gameManager.getEndInteractionSignal(), this, target, tag);
    this._link.setAsButton(true);        
    this._link.addMouseOverScaleEffect(game, this._image);
    this._link.addMouseOverScaleEffect(game, phaserText);

    phaserText.bringToTop();
    this._image.input.priorityID = 1;

    this.fadeIn(game);
    
    //Animation.fade(game, this._image, 1, true);
    return this._image;
}

Image.prototype.changeToOverlayCloseImage = function(game) {
    this.setVisible(false);
    this._image.anchor.set(0.5, 0.5);

    //this._image.width = 50;
    //his._image.height = 50;

    this._link = new Linkable(game, this._image, game.global.gameManager.getHideDisplayedImageSignal());
    this._link.setAsButton(false);        
    this._link2 = new Linkable(game, this._image, game.global.gameManager.getHideInfoOverlaySignal());
    this._link2.setAsButton(false);    
    this._link.addMouseOverScaleEffect(game, this._image);
}

Image.prototype.changeToOverlayScrollBar = function(game, width) {
    this.setVisible(false);
    this._image.width = width-2;
    this._image.anchor.set(0.5, 0);
    this.makeDraggable(game, true, false, game.global.constants.SCROLLBAR_POS[0], game.global.constants.SCROLLBAR_POS[1],
        game.global.constants.SCROLLBAR_DIM[0]+5, game.global.constants.SCROLLBAR_DIM[1]);

    //this._link = new Linkable(game, this._image, game.global.gameManager.getHideDisplayedImageSignal());
    //this._link.setAsButton(false);        
    //this._link2 = new Linkable(game, this._image, game.global.gameManager.getHideInfoOverlaySignal());
    //this._link2.setAsButton(false);    
    //this._link.addMouseOverScaleEffect(game, this._image);
}

Image.prototype.changeToExternalLinkImage = function(game, target) {
    this._image.anchor.set(0.5, 0.5);
    this._link = new Linkable(game, this._image, game.global.gameManager.getGoToLinkSignal(), target);
    this._link.setAsButton(true);
    this._link.addMouseOverScaleEffect(game, this._image);
}

Image.prototype.changeToPauseButton = function(game, signal) {
    this._link = new Linkable(game, this._image, signal);
    this._link.setAsButton(false);
}

Image.prototype.changeToPlayButton = function(game) {
    this._image.anchor.setTo(0.5, 0.5);
    this._image.height = 300;
    this._image.width = 300;
    //this._link = new Linkable(this._image, signal);
    //this._link.setAsButton(false);
}

Image.prototype.changeToToggleSubtitleButton = function(game, signal) {
    this._link = new Linkable(game, this._image, signal);
    this._link.setAsButton(false);
}

Image.prototype.createBgGraphics = function(game, margin) {
    this._graphic = new Graphic(0, 0);
    this._graphic.createOverlayBg(game, margin);
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

Image.prototype.makeDraggable = function(game, lockHorizontal, lockVertical, boundsX, boundsY, boundsWidth, boundsHeight) {

    //Enables drag interaction on the horizontal axis
    this._image.inputEnabled = true;
    if(boundsX !== undefined && boundsX !== undefined) {
        var dragBounds = new Phaser.Rectangle(boundsX, boundsY, boundsWidth, boundsHeight);
        this._image.input.boundsRect = dragBounds;
    }
    this._image.input.draggable = true;
    this._image.input.allowVerticalDrag = !lockVertical;
    this._image.input.allowHorizontalDrag = !lockHorizontal;
    //Changes mouseover image
    this.changeCursorImage(game, 'url("./Images/UI/hand_2.png"), auto');
}

Image.prototype.destroy = function() {
    this._image.destroy();
}

Image.prototype.getPhaserImage = function() {
    return this._image;
}

Image.prototype.getHeight = function() {
    return this._image.height;
}

Image.prototype.getY = function() {
    return this._image.y;
}

Image.prototype.getType = function() {
    return this._type;
}

Image.prototype.getTarget = function() {
    return this._target;
}

Image.prototype.disableInput = function() {
    this._image.inputEnabled = false;
}

Image.prototype.setX = function(x){
    this._image.x = x;
}

Image.prototype.setY = function(y){
    this._image.y = y;
}

Image.prototype.setPos = function(x, y) {
    this.setX(x);
    this.setY(y);
}

Image.prototype.setHeight = function(height) {
    this._image.height = height;
}

Image.prototype.setVisible = function(isVisible) {
    this._image.visible = isVisible;
    if(this._chainImages) {
        this._chainImages.forEach(function(image) {
            image.setVisible(isVisible);
        });
    }
}

Image.prototype.setImage = function(key) {
    this._key = key;
}

Image.prototype.fadeOut = function(game, chainSignal, arg1) {
    if(chainSignal) {
        this._link = new Linkable(game, this._image, chainSignal, arg1);
        this._link.addOnClickAnimation(Animation.fade(game, this._image, 0, true));
        this._link.onTrigger();
    }
    else {
        Animation.fade(game, this._image, 0, true);
    }
}

Image.prototype.fadeIn = function(game) {    
    Animation.fade(game, this._image, 1, true);
}

Image.getEnum = function() {
    return ImageTypeEnum;
}

function DebugRect(x, y, width, height, game) {
    var bounds = new Phaser.Rectangle(x, y, width, height);
    var graphics = game.add.graphics(bounds.x, bounds.y);
    graphics.beginFill(0x000077);
    graphics.drawRect(0, 0, bounds.width, bounds.height);
    graphics.endFill();
}

module.exports = Image;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _game = null;

function InitializeGroups() {        
    _game.mediaGroup = _game.add.group();
    _game.uiGroup = _game.add.group();
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
    initializeGroups: function() {
        InitializeGroups();
    }
}




/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Filter = __webpack_require__(20),
    Thoughts = __webpack_require__(13),
    Choices = __webpack_require__(12),
    Image = __webpack_require__(5),
    Text = __webpack_require__(2),
    Graphic = __webpack_require__(10),
    SceneParser = __webpack_require__(16);

var _instance = null;
var _game = null;
var _icons = [];
var _linkedIcons = [];
var _clickedIconIndex = null;
var _displayedIconIndex = null;

const buttonThoughtImageKeyEnum = 'IMAGE_BUTTON_THOUGHT',
    buttonThoughtSpriteKeyEnum = 'IMAGE_SPRITE_THOUGHT',
    sceneChangeImageKeyEnum = 'IMAGE_BUTTON_SCENECHANGE',
    infoImageKeyEnum = 'IMAGE_INFO',
    questionTextEnum = 'TEXT_QUESTION';

function CreateThoughtIcon(iconKey, coords, thoughts) {
    var button = new Image(coords[0], coords[1], iconKey, buttonThoughtSpriteKeyEnum);
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, thoughts, coords);
    _icons.push(button);
}

function CreateExploratoryIcons(icons) {
    for(var i=0; i<icons.size; i++) {
        CreateExploratoryIcon(icons.key[i], icons.coords[i], icons.targetImageIndexOrScene[i], icons.type[i], i);
    }
    HideLockedIcons(icons.lockedByScenes);
    ShowUnlockedIcons(icons.unlockedByScenes);
}

function CreateExploratoryIcon(key, coords, target, type, index) {
    var button = new Image(coords[0], coords[1], key, type);    
    _icons.push(button);
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, target, index);
}

function CreateLinkedIcons(linkedIcons) {
    for(var i=0; i<linkedIcons.size; i++) {
        CreateLinkedIcon(linkedIcons.key[i], linkedIcons.coords[i], linkedIcons.targetImageIndexOrScene[i], linkedIcons.type[i]);
    } 
    HideLinkedIcons();
}

function CreateLinkedIcon(key, coords, target, type) {
    var image = new Image(coords[0], coords[1], key, type);
    image.addImageToGame(_game, _game.mediaGroup);
    image.changeImage(_game, target);
    _linkedIcons.push(image);
}

function HideLockedIcons(locked) {
    if(locked) {
        for(var i=0; i<locked.length; i++){
            var scenesArr = locked[i];
            if(SceneParser.OneSceneVisited(_game, scenesArr)) {
                _icons[i].setVisible(false);
            }
        };
    }
    else 
        console.log("No locked buttons in this scene.")
}

function ShowUnlockedIcons(conditionsForIconIndexArr) {
    if(conditionsForIconIndexArr) {
        for(var i=0; i<conditionsForIconIndexArr.length; i++) {
            var currIconUnlockConditions = conditionsForIconIndexArr[i];
            if(currIconUnlockConditions) {
                if(SceneParser.VisitAtLeastOnceOfEach(_game, currIconUnlockConditions)) {
                    _icons[i].setVisible(true);
                }
                else {
                    _icons[i].setVisible(false);
                }
            }
        }
    }
}

function EndInteraction() {
    _icons.forEach(function(icon) {
        icon.fadeOut(_game);
    });
}

function HideLinkedIcons() {
    _linkedIcons.forEach(function(icon) {
        icon.setVisible(false);
    });
}

function ShowIcons() {
    _icons.forEach(function(icon) {
        icon.setVisible(true);
    });
}

function ShowPreviouslyClickedIcon() {
    if(_clickedIconIndex != null)
        _icons[_clickedIconIndex].setVisible(true);
}

function HideDisplayedIcon() {
    if(_displayedIconIndex != null)        
        _linkedIcons[_displayedIconIndex].setVisible(false);
}

module.exports = {
    init: function(game) {
        _icons = [];
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    createThoughtIcon: function(iconKey, coords, thoughts) {
        CreateThoughtIcon(iconKey, coords, thoughts);
    },
    createExploratoryIcons: function(icons) {
        CreateExploratoryIcons(icons);
        return _icons;
    },
    createNavigationIcons: function(icons, linkedIcons) {
        if(linkedIcons)  
            CreateLinkedIcons(linkedIcons);  
        CreateExploratoryIcons(icons);
    },
    endInteraction: function() {
        EndInteraction();
    },
    displayIcon: function(targetIndex, clickedIndex) {
        HideDisplayedIcon();
        ShowPreviouslyClickedIcon();
        _displayedIconIndex = targetIndex;
        _linkedIcons[_displayedIconIndex].getPhaserImage().bringToTop();
        _linkedIcons[_displayedIconIndex].setVisible(true);
        _clickedIconIndex = clickedIndex;
        _icons[_clickedIconIndex].setVisible(false);
        if(_linkedIcons[_displayedIconIndex].getType() == infoImageKeyEnum) {
            _game.global.gameManager.getShowInfoOverlaySignal().dispatch(_linkedIcons[_displayedIconIndex]);
        }
    },
    hideDisplayedIcon() {
        HideDisplayedIcon();        
        ShowPreviouslyClickedIcon();
        _displayedIconIndex = null;
        _clickedIconIndex = null;
    },
    createThoughtsAndChoices: function(thoughts, coords) {
        _game.global.gameManager.getCreateThoughtsSignal().dispatch(thoughts, coords);
    },
    destroy: function() {
        _icons.forEach(function(icon) {
            icon.destroy();
        });
        _icons = [];
        _linkedIcons.forEach(function(icon) {
            icon.destroy();
        });
        _linkedIcons = [];
    }
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
State object, stores scene information.
Getters to obtain scene information.
***************************************************************/



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

State.prototype.getTimestamps = function() {
    var timeStamps = [];
    console.log("Interaction Times:")
    for(var i=0; i<this._scene.choiceMoments.size; i++) {
        timeStamps.push(this._scene.choiceMoments.choiceMomentsProperties[i].timeStamp);
        console.log(this._scene.choiceMoments.choiceMomentsProperties[i].timeStamp);
    }
    return timeStamps;
}

State.prototype.getThoughtBubble = function(index) {
    return this._scene.choiceMoments.choiceMomentsProperties[index].thoughtBubbles;
}

State.prototype.getChoices = function(index){
    return this._scene.choiceMoments.choiceMomentsProperties[index].choices;
}

State.prototype.getBgImageKey = function() {
    return this._scene.bgImageKey;
}

State.prototype.getIconsInfo = function() {
    return this._scene.icons;
}

State.prototype.getLinkedIconsInfo = function() {
    return this._scene.linkedIcons;
}

State.prototype.getInputInfo = function() {
    return this._scene.input;
}

State.prototype.getSrcList = function() {
    if(!this._scene.movieReqs || !this._scene.movieSrcArr) 
        return false;
    else {
        return [this._scene.movieReqs, this._scene.movieSrcArr];
    }
}

State.prototype.getMovieSrc = function(definition, index) {
    if(typeof(index) == 'number') {    
        if(definition == 'HD')
            return this._scene.movieSrcArr[index][0];
        else if(definition == 'SD')       
            return this._scene.movieSrcArr[index][1];
    }
    else {
        if(definition == 'HD')
            return this._scene.movieSrcHD;
        else if(definition == 'SD')
            return this._scene.movieSrcSD;
    }
}

State.prototype.getSceneReqs = function() {
    return this._scene.sceneReqs;
}

State.prototype.getSceneTargetNames = function() {
    return this._scene.sceneTargetNames;
}

State.prototype.getMovieSubKey = function() {
    return this._scene.sub;
}

State.prototype.getBackgroundMusic = function() {
    return this._scene.backgroundMusic;
}

State.prototype.getTransitionInfo = function() {
    return this._scene.transition;
}

State.prototype.getVideoFilter = function() {
    return this._scene.videoFilter;
}

State.prototype.getNextScenes = function() {
    return this._scene.nextScene;
}

State.prototype.getDraggable = function() {
    return this._scene.draggable;
}

module.exports = State;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Handles animation of game objects.
Static functions takes in the game object and applies animation to it.
***************************************************************/



const FADE_TIME_DEFAULT = 700;
const SCALE_TIME_DEFAULT = 300;
const BOB_DELAY_INTERVAL = 700;

/***************************************************************
Animation constructor
***************************************************************/
var Animation = function() {
}

/***************************************************************
Adds scaling animaton for object.
***************************************************************/
Animation.scale = function(game, object, autoStart, targetWidth, targetHeight, timeTaken) {
    if(!timeTaken)
        timeTaken = SCALE_TIME_DEFAULT;

    var tween = game.add.tween(object).to({width:targetWidth, height:targetHeight}, timeTaken, 
        Phaser.Easing.Linear.None, autoStart, 0, 0);

    return tween;
}

/***************************************************************
Adds fade in/out animation for object.
***************************************************************/
Animation.fade = function(game, object, value, autoStart, timeTaken) {
    if(!timeTaken)
        timeTaken = FADE_TIME_DEFAULT;
    var tween = game.add.tween(object).to({alpha:value}, timeTaken, Phaser.Easing.Linear.None, autoStart, 0, 0, false);

    return tween;
}

/***************************************************************
Adds bobbing up and down animation for object.
***************************************************************/
Animation.bob = function(game, object, autoStart, value) {
    if(!value)
        value = -5;
    value = value.toString();

    var tween = game.add.tween(object).to({y:value}, 200, Phaser.Easing.Quadratic.InOut, autoStart, 0, -1, true);
    tween.repeatDelay(BOB_DELAY_INTERVAL);
    
    return tween;
}

module.exports = Animation;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Linkable = __webpack_require__(1);

//Image constructor
var Graphic = function(xPos, yPos) {
    this._xPos = xPos;
    this._yPos = yPos;
}

Graphic.prototype.createOverlayBg = function(game, margin) {
    var offset = 5;
    this._graphic = game.add.graphics(this._xPos, this._yPos);    
    this._graphic.beginFill(0x000000, 0.8);
    this._graphic.drawRect(0, 0, margin, game.height);
    this._graphic.drawRect(game.width-margin, 0, margin, game.height);
    this._graphic.drawRect(margin, 0, game.width-(margin<<1), margin);
    this._graphic.drawRect(margin, game.height-margin, game.width-(margin<<1), margin);
    this._graphic.endFill();
    this._graphic.visible = false;
    game.uiGroup.add(this._graphic);

    this._graphic.inputEnabled = true;   
    this._graphic.input.priorityID = 1;
    this._graphic.input.useHandCursor = true;

    this._link = new Linkable(game, this._graphic.events, game.global.gameManager.getHideDisplayedImageSignal());
    this._link2 = new Linkable(game, this._graphic.events, game.global.gameManager.getHideInfoOverlaySignal());
    this._link.setAsButton(false);
    this._link2.setAsButton(false);
}

Graphic.prototype.drawRect = function(game, x, y, width, height, color, opacity, strokeWidth, lineColor) {
    if(!color)
        color = 0x000000;
    if(!opacity)
        opacity = 1;
    if(!lineColor)
        lineColor = 0x000000;

    this._graphic = game.add.graphics(this._xPos, this._yPos);
    game.uiGroup.add(this._graphic);
    this._graphic.beginFill(color, opacity);
    if(strokeWidth) {
        this._graphic.lineStyle(strokeWidth, lineColor);
    }
    this._graphic.drawRect(x, y, width, height);
    this._graphic.endFill();
    this._graphic.visible = true;
}

Graphic.prototype.setVisible = function(value) {
    this._graphic.visible = value;
}

Graphic.prototype.getGraphic = function() {
    return this._graphic;
}

module.exports = Graphic;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Creates draggable backgrounds and icons that follow drag movement.
***************************************************************/


//Dependencies
const Text = __webpack_require__(2),
    Image = __webpack_require__(5);

var _instance = null;
var _game = null;
var _text = [];
var _choiceFont = null;
var _bgImage = null;
var _iconGroup = null;

const bgImageKeyEnum = 'IMAGE_BACKGROUND';

/***************************************************************
Creates background image.
***************************************************************/
function CreateBgImage(key, draggable) {
    _bgImage = new Image(0, 0, key, bgImageKeyEnum);
    _bgImage.addImageToGame(_game, _game.mediaGroup);
    _bgImage.changeImage(_game, draggable);
}

/***************************************************************
Adds images to group that follows dragged background position.
***************************************************************/
function AddIconsToGroup(icons) {
    _iconGroup = _game.add.group();
    _game.mediaGroup.add(_iconGroup);
    icons.forEach(function(icon) {
        _iconGroup.add(icon.getPhaserImage());
    });
}

/***************************************************************
Initializes drag follow for icon group.
***************************************************************/
function StartDragUpdate() {
    _bgImage.getPhaserImage().events.onDragStart.add(dragStart);
    _bgImage.getPhaserImage().events.onDragUpdate.add(dragUpdate);
    _iconGroup.x = _bgImage.getPhaserImage().x;
    _iconGroup.y = _bgImage.getPhaserImage().y;
}

function dragStart() {
}

/***************************************************************
Icons follow dragged background position every update.
***************************************************************/
function dragUpdate() {
    _iconGroup.x = _bgImage.getPhaserImage().x;
    _iconGroup.y = _bgImage.getPhaserImage().y;
}

function dragStop() {
}

module.exports = {
    init: function(game) {
        //Initialize singleton variables.
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function(bgKey, draggable) {
        if(bgKey)
            CreateBgImage(bgKey, draggable);
    },
    attachIconsToBg: function(icons) {
        AddIconsToGroup(group);
        StartDragUpdate();
    }
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Creates choice icons during interaction moments.
***************************************************************/


//Dependencies
const Text = __webpack_require__(2),
    Image = __webpack_require__(5);

const BACKGROUND_IMAGE_KEY = 'choiceBg';

//Singleton variables
var _instance = null;
var _game = null;

//Holds created game objects
var _question = null;
var _text = [];
var _choiceBg = [];

const FADE_DELAY = 1;
const QUESTION_Y_OFFSET = 30;

/***************************************************************
Creates background for choice buttons.
***************************************************************/
function CreateButtonBackground(x, y, width, height, phaserText, target, tag) {
    var choiceBg = new Image(x, y, BACKGROUND_IMAGE_KEY, Image.getEnum().ChoiceBackground);
    choiceBg.addImageToGame(_game, _game.mediaGroup);
    choiceBg.changeImage(_game, width, height, target, phaserText, tag);
    return choiceBg;
}

/***************************************************************
Creates answer texts for choice buttons.
***************************************************************/
function CreateChoicePrompt(question, yPos) {
    _question = new Text(question, 0, yPos, Text.getEnum().Question, _game.global.style.questionTextProperties);
    _question.addToGame(_game, _game.mediaGroup);
    _question.changeText(_game, Text.getEnum().Question);
}

/***************************************************************
Creates choice buttons.
***************************************************************/
function CreateChoices(choices) {
    ResetChoicesVariables();
    CreateChoicePrompt(choices.question, choices.y[0] - choices.bounds[0][1]/2 - QUESTION_Y_OFFSET);

    for(var i=0; i < choices.size; i++) {
        CreateAnswers(i, choices);    
        CreateBackgroundImage(i, choices);
        //Aligns choice text to choice background
        _text[i].changeText(_game, _choiceBg[i].getPhaserImage().y, choices.size);
    };
}

/***************************************************************
Creates choice answer text.
***************************************************************/
function CreateAnswers(currIndex, choices) {
    _text.push(new Text(choices.content[currIndex], GetXPos(choices.size, currIndex), 0, 
        Text.getEnum().MeaningfulChoices, _game.global.style.choicesTextProperties));
    _text[currIndex].index = currIndex;
    _text[currIndex].addToGame(_game, _game.mediaGroup);
}

/***************************************************************
Creates choice background and passes it corresponding answer text.
***************************************************************/
function CreateBackgroundImage(currIndex, choices) {
    var choiceBackgroundImage;
    if(choices.targetScene)
        choiceBackgroundImage = CreateButtonBackground(GetXPos(choices.size, currIndex), choices.y[currIndex], 
            choices.bounds[currIndex][0], choices.bounds[currIndex][1], _text[currIndex].getPhaserText(), 
            choices.targetScene[currIndex], choices.tag[currIndex]);
    else
        choiceBackgroundImage = CreateButtonBackground(GetXPos(choices.size, currIndex), choices.y[currIndex], 
            choices.bounds[currIndex][0], choices.bounds[currIndex][1], _text[currIndex].getPhaserText());
    choiceBackgroundImage.index = currIndex;
    _choiceBg.push(choiceBackgroundImage);
}

/***************************************************************
Partitions game width depending on number of choices.
Returns x value of middle of each partition.
***************************************************************/
function GetXPos(choiceCount, index) {
    if(choiceCount == 1)
        return _game.world.centerX;
    else if(choiceCount == 2) {
        if(index == 0)
            return _game.width/4;
        if(index == 1)
            return _game.width/4*3;
    }
    else if(choiceCount == 3) {
        if(index == 0)
            return _game.width/6;
        if(index == 1)
            return _game.world.centerX;        
        if(index == 2)
            return _game.width/6*5;
    }
    console.warn("1, 2 or 3 choices allowed.");
    return null;
}

/***************************************************************
Allows selected choice to linger for a while before fading.
Fades out other choices and prompt.
***************************************************************/
function FadeChoicesExcept(index){
    _text.forEach(function(text) {
        if(text.index != index) {
            text.disableInput();
            text.fadeOut(_game);
        }
    });

    _choiceBg.forEach(function(choiceBg) {
        if(choiceBg.index != index) {
            choiceBg.disableInput();
            choiceBg.fadeOut(_game);
        }
    });

    _question.fadeOut(_game);
}

/***************************************************************
Starts a timer event that fades out selected choice.
Goes to next scene upon fading out, if defined.
***************************************************************/
function FadeChoiceAfterDelay(index, targetScene) {
    _game.time.events.add(Phaser.Timer.SECOND*FADE_DELAY, fadeChoice, this);

    function fadeChoice(){
        _text[index].disableInput();
        _choiceBg[index].disableInput();
        if(targetScene) {
            _text[index].fadeOut(_game, _game.global.gameManager.getChangeSceneSignal(), targetScene);
        }
        else
            _text[index].fadeOut(_game);
        _choiceBg[index].fadeOut(_game);
    }
}

/***************************************************************
Resets vaiables containing elements.
***************************************************************/
function ResetChoicesVariables() {
    _text = [];
    _choiceBg = [];
    _question = null;
}

module.exports = {
    init: function(game) {
        //Singleton initialization.
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
    endInteraction: function(lingeringChoice, targetScene) {
        FadeChoicesExcept(lingeringChoice.index);
        FadeChoiceAfterDelay(lingeringChoice.index, targetScene);
    },
    resetChoicesVariables: function() {
        ResetChoicesVariables();
    }
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Initialized once
const Text = __webpack_require__(2);

var _instance = null,
    _game = null,
    _text = [],
    _currentIndex = 0;

const thoughtsTextKeyEnum = 'TEXT_THOUGHTS';

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
        for(var i=0; i < info.size; i++) {
            _text.push(new Text(info.content[i], coords[0], coords[1], thoughtsTextKeyEnum, _game.global.style.thoughtsTextProperties));
            _text[_currentIndex].addToGame(_game, _game.mediaGroup);
            _text[_currentIndex].changeText(_game, info.destination[i][0], info.destination[i][1]);
            _currentIndex++;
        };
    },
    endInteraction: function() {
        _text.forEach(function(text) {
            text.fadeOut(_game);
        });
    },
    resetThoughtVariables: function() {
        _text = [];
        _currentIndex = 0;        
    }
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Filter = __webpack_require__(20);
var _instance = null;
var _game = null;
var _startSceneKey = 'startScene';
var _data = null;
var _videos = null;
var _audio = null;
var _images = null;
var _spritesheets = null;
var _scenes = null;
var _subs = null;
var _style = null;

function loadVideos(videos) {
    console.log("Loading videos");
    for (var key in _videos) {
        _game.load.video(key, _videos[key]);
    }
}

function loadAudio(audio) {
    console.log("Loading audio");
    for (var key in audio) {
        _game.load.audio(key, _audio[key]);
    }
}

function loadImages(images) {
    console.log("Loading images");
    for (var key in images) {
        _game.load.image(key, images[key]);
    }
}

function loadSpritesheets(spritesheet) {
    console.log("Loading spritesheets");
    for (var key in spritesheet) {
        _game.load.spritesheet(key, spritesheet[key][0], spritesheet[key][1], spritesheet[key][2], spritesheet[key][3]);
    }
}

function loadSubs(subs) {
    console.log("Loading subs");
    for (var key in subs) {
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
        _spritesheets = _data.spritesheets;
        _videos = _data.videos;
        _audio = _data.audio;
        _scenes = _data.scenes;
        _subs = _data.subtitles;
        return _instance;
    },
    preload: function() {
    //    Filter.preload();
        console.log("Loading resources");
        loadImages(_images);
        loadSpritesheets(_spritesheets);
        loadAudio(_audio);
        loadSubs(_subs);
    //    loadVideos(videos);

    },
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
    },
    setVisitedScene: function(name) {
        _scenes[name].visited = true;
    }
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Manages creation and transitions between state types. 
***************************************************************/



//Dependencies
const Resources = __webpack_require__(14),
    Group = __webpack_require__(6),
    Transition = __webpack_require__(3),
    UI = __webpack_require__(4),
    Video = __webpack_require__(0),
    MenuState = __webpack_require__(31),
    LocationState = __webpack_require__(18),
    InteractState = __webpack_require__(17),
    SwitchState = __webpack_require__(33),
    MovieState = __webpack_require__(32),
    Subtitle = __webpack_require__(21);

var _stateManagerInstance = null;
var _transitionSignal = null;
var _game = null;

var StateEnum = {
    MenuState: 'MenuState',
    InteractState: 'InteractState',
    SwitchState: 'SwitchState',
    MovieState: 'MovieState',
    LocationState: 'LocationState'
}

/***************************************************************
Changes state according to scene name.
***************************************************************/
function ChangeScene(sceneName) {
    var nextScene = Resources.getScene(sceneName);
    if(nextScene === null)
        console.warn("Scene: " + sceneName + "is undefined.");
    else
        console.log("Changing scene to: " + nextScene.stateType);
    
    switch(nextScene.stateType) {
        case StateEnum.MenuState:
        case StateEnum.InteractState:
        case StateEnum.SwitchState:
        case StateEnum.MovieState:
        case StateEnum.LocationState:
            _stateManagerInstance.start(nextScene.stateType, true, false, nextScene);
            break;
        default:
            console.warn("Invalid State.");
    }
}

/***************************************************************
Adds all state types to manager.
***************************************************************/
function AddAllStates() {
    _stateManagerInstance.add(StateEnum.MenuState, MenuState);
    _stateManagerInstance.add(StateEnum.LocationState, LocationState);
    _stateManagerInstance.add(StateEnum.InteractState, InteractState);
    _stateManagerInstance.add(StateEnum.SwitchState, SwitchState);
    _stateManagerInstance.add(StateEnum.MovieState, MovieState);
}

//Unused, phaser input extension
function ChangePlayerName() {
    return function() {
        this.game.playerName = MenuState.getPlayerName();_input[0].getInput().text;
        console.log("this.game.playerName");
    };
}

/***************************************************************
Test function for ending state switches
***************************************************************/
function SceneTestCase() {
    _game.global.visitedScenes['MK2bad'] = true;
    _game.global.visitedScenes['an2good'] = true;
    _game.global.visitedScenes['li2good'] = true;
    console.log(_game.global.visitedScenes);
}

module.exports = {
    init: function() {
        console.log("Initializing StateManager");

        //Statemanager singleton initialization
        if(_stateManagerInstance !== null)
            return _stateManagerInstance;
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
        _game.global.gameManager.getChangeSceneSignal().dispatch(Resources.getStartSceneKey());
    },
    changeScene: function(sceneName) {
        _game.mediaGroup.removeAll();
        _game.global.visitedScenes[sceneName] = true;
        _game.global.currentSceneName = sceneName;
        //SceneTestCase();
        ChangeScene(sceneName);
    }
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//ScenePartser constructor
var SceneParser = function() {
}

SceneParser.VisitAtLeastOnceOfEach = function(game, sceneSetArray) {
    var unlocked = true;
    for(var j=0; j<sceneSetArray.length; j++) {
        unlocked &= SceneParser.OneSceneVisited(game, sceneSetArray[j]);
    }
    return unlocked;
}

SceneParser.OneSceneVisited = function(game, sceneArr) {
    if(sceneArr){
        for(var i=0; i<sceneArr.length; i++) {
            if(game.global.visitedScenes[sceneArr[i]]) {
                return true;
            }
        }
    }
    return false;
}

SceneParser.AllSceneVisited = function(game, sceneArr) {
    if(sceneArr){
    	console.log(sceneArr);
        for(var i=0; i<sceneArr.length; i++) {
            if(!game.global.visitedScenes[sceneArr[i]]) {
            	console.log(sceneArr[i]);
            	console.log(game.global.visitedScenes[sceneArr[i]]);
                return false;
            }
        }
        return true;
    }
    else
    	return false;
}

SceneParser.GetIndexOfVisitedAll = function(game, sceneArr) {
    if(sceneArr){
        for(var i=0; i<sceneArr.length; i++) {
            if(SceneParser.AllSceneVisited(game, sceneArr[i])) {
                return i;
            }
        }
    }
    return false;
}

module.exports = SceneParser;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
State for interactive video scenes.
***************************************************************/



//Dependencies
const Group = __webpack_require__(6),
    UI = __webpack_require__(4),
    Video = __webpack_require__(0),
    Transition = __webpack_require__(3),
    Icons = __webpack_require__(7),
    State = __webpack_require__(8),
    Choices = __webpack_require__(12),
    Thoughts = __webpack_require__(13),
    Background = __webpack_require__(11);

var _stateInfo = null;
var _instance = null;
var _game = null;
var _interactionCount = null;

/****************************************************************
Creates interactive icons when game enters interaction mode, waits for player's input.
****************************************************************/
function CreateInteractionElements() {
    CreateThoughtBubbles();
    CreateChoices();
}

/****************************************************************
Creates thought bubbles, if any.
****************************************************************/
function CreateThoughtBubbles() {    
    var thoughtBubbles = _stateInfo.getThoughtBubble(_interactionCount);
    if(thoughtBubbles) {
        for(var i=0; i<thoughtBubbles.size; i++) {
            Icons.createThoughtIcon(thoughtBubbles.thoughtIconKey[i], thoughtBubbles.coords[i], thoughtBubbles.thoughts[i]);
        }      
    }
}

/****************************************************************
Creates question, choice buttons and choice texts.
****************************************************************/
function CreateChoices() {
    var choices = null;

    choices = _stateInfo.getChoices(_interactionCount);
    Choices.create(choices);

    _interactionCount++;
}

/****************************************************************
Removes interactive elements and resumes video after user input.
Sends interaction choice data to database.
****************************************************************/
function EndInteraction(lingeringChoice, targetScene, tag) {    
    _game.global.databaseManager.sendInteractionData(_game.global.currentSceneName, tag);
    Icons.endInteraction();
    Choices.endInteraction(lingeringChoice, targetScene);
    Thoughts.endInteraction();
    Video.endFilter(targetScene);
}

module.exports = {
    init: function(scene) {
        //Sets new scene info
        if(_stateInfo) {
            _stateInfo.setStateScene(scene);
        }

        //Initializes game and state variables
        _interactionCount = 0;
        Group.initializeGroups(); 

        //Singleton initialization 
        if(_instance !== null)
            return _instance;
        Icons.init(this.game);          
        Thoughts.init(this.game);
        Choices.init(this.game);
        Background.init(this.game);
        Video.init(this.game);
        _game = this.game;
        _stateInfo = new State(scene);
        _instance = this;
        return _instance;
    },
    create: function() {
        _game.global.soundManager.stopBackgroundMusic();

        Background.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());

        Video.create(_stateInfo.getMovieSrc(_game.global.quality), _stateInfo.getTransitionInfo().fadeOut,
            _stateInfo.getVideoFilter(), _stateInfo.getNextScenes(), _stateInfo.getMovieSubKey(), _stateInfo.getTimestamps());

        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();

        UI.create(true, true);
    },
    shutdown: function() {
        Icons.destroy();
        Video.resetVideoVariables();
        Thoughts.resetThoughtVariables();
        Choices.resetChoicesVariables();
    },
    createInteractionElements: function() {
        CreateInteractionElements();
    },
    endInteraction: function(lingeringChoice, targetScene, tag) {
        EndInteraction(lingeringChoice, targetScene, tag);
    }
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
State for location scenes.
***************************************************************/



const Transition = __webpack_require__(3),
    Group = __webpack_require__(6),
    State = __webpack_require__(8),
    UI = __webpack_require__(4),
    Background = __webpack_require__(11),
    Icons = __webpack_require__(7),
    Video = __webpack_require__(0);

var _instance = null;
var _stateInfo = null;
var _game = null;
var _overlayGraphic = null;

module.exports = {
    init: function(scene) {
        //Sets new scene info
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);

        //Initialize game variables
        Group.initializeGroups();

        //Singleton initialization
        if(_instance !== null)
            return _instance;
        Icons.init(this.game);
        Background.init(this.game);        
        Video.init(this.game);
        _game = this.game;
        _stateInfo = new State(scene);
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        Video.clearFilterBg();

        _game.global.soundManager.playBackgroundMusic(_stateInfo.getBackgroundMusic());

        Background.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());

        Video.create(_stateInfo.getMovieSrc(_game.global.quality), _stateInfo.getTransitionInfo().fadeOut, 
            _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());

        var icons = Icons.createNavigationIcons(_stateInfo.getIconsInfo(), _stateInfo.getLinkedIconsInfo());

        if(_stateInfo.getDraggable())
            Background.attachIconsToBg(icons);

        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();

        UI.createInfoOverlay();
    },
    shutdown: function() {
        Icons.destroy();
        Video.resetVideoVariables();
    },
    displayImage: function(targetIndex, clickedIndex) {
        Icons.displayIcon(targetIndex, clickedIndex);
    },
    hideDisplayedImage: function() {
        Icons.hideDisplayedIcon();
    }
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Creates choice icons during interaction moments.
***************************************************************/


//initializes once
var _instance = null;
var _game = null;
var _file = null;
var _bytes = null;
var _timer = null;

const SLOW_DOWNLOAD_THRESHOLD_MBPS = 0.36;

var FileTypeEnum = {
    Image: 'IMAGE',
    Video: 'VIDEO',
    Audio: 'AUDIO'
}

function CheckConnection() {    
    _game.load.onFileComplete.add(LoadComplete, this);
    _game.load.onLoadStart.add(StartLoading, this);    
    _game.load.start();
}

function StartLoading() {
    _timer = _game.time.create(true);
    _timer.start();
}

function LoadComplete() {    
    _timer.stop();
    var elapsedSeconds = (_timer._now - _timer._started)/1000;
    elapsedSeconds += _timer.elapsed/1000;
    var connectionSpeedMbps = _bytes/(elapsedSeconds)/ 1000000;
    SetVideoQuality(connectionSpeedMbps);  
    _game.load.onFileComplete.remove(LoadComplete, this);
    _game.state.start("preload");
}

function SetVideoQuality(speed) {
    if(speed > SLOW_DOWNLOAD_THRESHOLD_MBPS || speed < 0)
        _game.global.quality = 'HD';
    else
        _game.global.quality = 'SD';
    console.log('Connection speed: ' + speed + ' Mb/s. Quality: ' +  _game.global.quality);  
}

function Load(key, src, type) {
    switch (type) {
        case FileTypeEnum.Image:
            _file = _game.load.image(key, src);
            break;
        case FileTypeEnum.Video:
            _file = _game.load.text(key, src);
            break;
        case FileTypeEnum.Audio:
            _file = _game.load.audio(key, src);
            break;
        default:
            console.warn('Not a valid file type for loading check.');
    }
    return _file;
}

function StartPreloadState() {
    _game.state.start("preload");
}

module.exports = {
    init: function(game) {
        _file = null;
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    addToFiles: function(file) {
        _files.push(file);
    },
    loadFile: function(key, src, type, bytes) {
        _bytes = bytes;
        if(!_bytes)
            console.warn("Error, file bytes not specified for connection testing.")
        Load(key, src, type);
    },
    checkConnection: function() {
        CheckConnection();
    },
    startPreload() {
        StartPreloadState();
    }
}


/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Text = __webpack_require__(2);

var _instance = null;
var _game = null;
var _textSlots = [null, null];
var _subtitleVisible = false;

const subtitleTextKeyEnum = 'TEXT_SUBTITLE';

const SUBTITLE_Y_POS = 650;
const SUBTITLE_SPACING = 5;

function CreateSubs(video, subs) {
	var srt = _game.cache.getText(subs);
	var parsedSrt = fromSrt(srt, true);
	AddSubEvents(parsedSrt, video);
}

function AddSubEvents(parsedSrt, video) {
	parsedSrt.forEach(function(sub) {
		//console.log(sub.startTime);
		video.addEventListener("timeupdate", show, false);

		function show() {
			if(video.currentTime >= sub.startTime){
           		video.removeEventListener("timeupdate", show);
	            var text = new Text(sub.text, 0, -500, subtitleTextKeyEnum, _game.global.style.subtitleTextProperties);
	            text.addToGame(_game, _game.mediaGroup);
	            text.changeText(_game, _subtitleVisible);
	            var slotIndex = FindSubtitleSlot(text);
	            AddDestroyEvent(video, sub, text, slotIndex);
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

function ToggleSubtitle() {
	_subtitleVisible = !_subtitleVisible;
	_textSlots.forEach(function(slot) {
		if(slot)
			slot.setVisible(_subtitleVisible);
	});
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
	},
	toggleSubtitle: function() {
		ToggleSubtitle();
	}
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Linkable = __webpack_require__(1),
    Animation = __webpack_require__(9);

var _instance = null;
var _game = null;

var _video = null;
var _videoHTML = null;
var _bitmapCanvas = null;
var _bitmapSprite = null;
var _context = null;
var _frameHolderBitmapCanvas = null;
var _frameHolderBitmapSprite = null;
var _contextBitmap = null;
var _canvas = null;
var _framebuffer = null;

var _effect = null;
var _filter = null;
var _fadeOutSignal = null;

const REFRESH_TIME_MS = 10;
const FADE_IN_TIME_MS = 2000;

function InitializeBitmapOverlay(game) {
    _bitmapCanvas = game.add.bitmapData(game.width, game.height);
    _bitmapSprite = game.add.sprite(game.width/2, game.height/2, _bitmapCanvas);
    //_bitmapSprite = _bitmapCanvas.addToWorld(game.width/2, game.height/2);
    game.mediaGroup.add(_bitmapSprite);
    _bitmapSprite.alpha = 0;
    _bitmapSprite.anchor.setTo(0.5, 0.5);
    _context = _bitmapCanvas.context;
}

function InitializeBitmapBg(game){    
    _frameHolderBitmapCanvas = game.add.bitmapData(game.width, game.height);
    _frameHolderBitmapSprite = game.add.sprite(game.width/2, game.height/2, _frameHolderBitmapCanvas);
    _frameHolderBitmapSprite = game.stage.addChildAt(_frameHolderBitmapSprite, 0);  
    //console.log(game.stage); 
    //_frameHolderBitmapSprite = _frameHolderBitmapCanvas.addToWorld(0, 0);
    //game.mediaGroup.add(_frameHolderBitmapSprite);    
    //_frameHolderBitmapSprite.alpha = 0;    
    _frameHolderBitmapSprite.anchor.setTo(0.5, 0.5);
    _contextBitmap = _frameHolderBitmapCanvas.context;
}

function StartFilterFadeIn(signal) {
    var linkable = new Linkable(_game, _bitmapSprite, signal);
    linkable.addOnClickAnimation(Animation.fade(_game, _bitmapSprite, 1, false));
    linkable.addOnClickAnimation(Animation.scale(_game, _bitmapSprite, false, _game.width, _game.height));
    linkable.onTrigger();
}

function EndFilter(targetScene) {
    //var linkable = new Linkable(_game, _game.global.gameManager.getToggleUISignal());
    //linkable.addAnimation(Animation.fade(_game, _bitmapSprite, 0, false));
    //if(targetScene)
    //    _frameHolderBitmapSprite.alpha = 0;
    Animation.fade(_game, _bitmapSprite, 0, true);
    //linkable.onTrigger();
    //linkable.triggerSignal(true);
}

function CreateVideoFilter() {
     //   _game.time.reset();
    Render();

    //_contextBitmap.drawImage(_videoHTML, 0, 0, _video.width,
      //  _video.height, 0, 0, _game.width, _game.height);
    //_game.time.events.repeat(10, 1, render, this);
};

function Render() {
    _game.time.events.repeat(REFRESH_TIME_MS, 1, Render, this);
    if(_video.video.paused || _bitmapSprite.alpha > 0) {
        RenderFrame();
    }
    /*
    setTimeout(function() {
        render();
    }, 10)
    */
};

function RenderFrame() {
    //if(_bitmapSprite.alpha == 0)
     //   return;
    _context.drawImage(_videoHTML, 0, 0, _video.width,
        _video.height, 0, 0, _game.width, _game.height);
    var data = _context.getImageData(0, 0, _game.width, _game.height);
    _contextBitmap.putImageData(data, 0, 0);
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

        InitializeBitmapBg(_game);

        _framebuffer = document.createElement("canvas");
        _framebuffer.width = _game.width;
        _framebuffer.height = _game.height;
        _framebuffer.context = _framebuffer.getContext("2d");
        return _instance;
    },
    createOverlay: function(filter) {
        _filter = filter;
        InitializeBitmapOverlay(_game);
        CreateVideoFilter();
    },
    clearBg: function() {
        if(_frameHolderBitmapCanvas)
            _frameHolderBitmapCanvas.clear();
    },
    startFilterFade: function(signal) {
        StartFilterFadeIn(signal);
    },
    endFilter: function(targetScene) {
        EndFilter(targetScene);
    },
    stop: function() {
        _video.stop();
    },
    getPaused: function() {
        return _video.paused;
    }
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/****************************************************************
Loads game fonts and tests user's connection.
****************************************************************/

"use_strict";

//Dependencies
const ConnectionChecker = __webpack_require__(19), 
    GameManager = __webpack_require__(27),
    SoundManager = __webpack_require__(30),
    DatabaseManager = __webpack_require__(26);

var _instance = null
var _game = null;

const connectionTestFileKey = 'pooh',
    connectionTestFileSrc = './Images/Loading/pooh.jpg',
    connectionTestFileType = 'IMAGE',
    connectionTestFileBytes = 1576132;

/****************************************************************
Loads google webfonts before initialization.
****************************************************************/
WebFontConfig = {
    //Load fonts before creation, timer delay. Can be improved  in implementation.
    active: function() { _game.time.events.add(Phaser.Timer.SECOND, DelayedCreate, this); },

    google: {
      families: ['Kadwa', 'Merienda One', 'Noto Sans'],
    }
};

/****************************************************************
Initializes game, sound and database managers.
Performs connection test.
Loads load visuals.
****************************************************************/
function DelayedCreate() {
    CreateGlobalVars();
    SetGameProperties();
    CreateLoadingVisuals();
    ConnectionChecker.loadFile(connectionTestFileKey, connectionTestFileSrc, connectionTestFileType, connectionTestFileBytes);
    ConnectionChecker.checkConnection();
}

function CreateLoadingVisuals() {
    var testConnectionImage = _game.add.image(_game.world.centerX, _game.world.centerY, 'connectionTestImage');
    testConnectionImage.anchor.setTo(0.5, 0.5);
}


/****************************************************************
Sets game bg color and ensures application runs even when out of focus.
****************************************************************/
function SetGameProperties() {
    _game.stage.disableVisibilityChange = true;
    _game.stage.backgroundColor = "#ffffff";
}


/****************************************************************
Global managers and variables initialized.
****************************************************************/
function CreateGlobalVars() {
    //Global variables
    _game.global = {
        playerName: null,
        visitedScenes: {}
    }

    //Global groups
    _game.mediaGroup = _game.add.group();
    _game.uiGroup = _game.add.group();

    //Global managers
    _game.global.gameManager = new GameManager();
    _game.global.gameManager.initSignals();
    _game.global.soundManager = new SoundManager(_game);
    _game.global.soundManager.init();
    _game.global.databaseManager = new DatabaseManager(_game);

    //Constants
    _game.global.constants = {};
    _game.global.constants.INFO_VIEW_MARGIN = 50; 
    _game.global.constants.INFO_VIEW_HEIGHT = _game.height - _game.global.constants.INFO_VIEW_MARGIN*2;
    _game.global.constants.SCROLLBAR_DIM = [30, _game.global.constants.INFO_VIEW_HEIGHT];    
    _game.global.constants.INFO_VIEW_WIDTH = _game.width - _game.global.constants.INFO_VIEW_MARGIN*2 - _game.global.constants.SCROLLBAR_DIM[0];   
    _game.global.constants.SCROLLBAR_POS = [_game.width - _game.global.constants.INFO_VIEW_MARGIN - _game.global.constants.SCROLLBAR_DIM[0], 
        _game.global.constants.INFO_VIEW_MARGIN];
    _game.global.constants.SCROLLBAR_STROKEWIDTH = 2;
}

module.exports = {
    init: function() {
        console.log("Boot State");
        ConnectionChecker.init(this.game);
        if( _instance !== null)
            return _instance;
        _game = this.game;
        return _instance;
    },
    preload: function() {
        _game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        _game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        _game.load.image('connectionTestImage', './Images/Loading/connectionTestImage.jpg');
    },
    create: function() {
    }
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/***************************************************************
Loads resources including images, sprites, sound.
Since videos are streamed, it's not loaded here.
***************************************************************/

"use_strict";

//Dependencies
const Resources = __webpack_require__(14);

var _instance = null,
    _game = null;

/***************************************************************
Draws loading visuals.
***************************************************************/
function CreateLoadingVisuals() {
    //var text = _game.add.text(_game.world.centerX, _game.world.centerY - 50, "Loading assets...");
    //text.anchor.setTo(0.5, 0.5);
    var background = _game.add.image(0, 0, 'progressSceneBackground');
    var progressBarBackground = _game.add.image(_game.world.centerX, _game.world.centerY, 'progressBarFillBg');
    progressBarBackground.anchor.setTo(0.5,0.5);
    var progressBarFrame = _game.add.image(_game.world.centerX, _game.world.centerY, 'progressBarFrame');
    progressBarFrame.anchor.setTo(0.5,0.5);
    var progressBarText = _game.add.image(_game.world.centerX, _game.world.centerY+80, 'progressBarText');
    progressBarText.anchor.setTo(0.5,0.5);

    var preloadImage = _game.add.sprite((_game.width-progressBarBackground.width)/2, 
        (_game.height-progressBarBackground.height)/2, 'progressBarFillFg');
    _game.load.setPreloadSprite(preloadImage);
}

module.exports = {
    init: function() {
        //Singleton initialization
        if( _instance !== null)
            return _instance;
        _game = this.game;
        Resources.init(_game);
        return _instance;
    },
    preload: function() {
        CreateLoadingVisuals();
        //Load game assets
        Resources.preload();
    },
    create: function() {
        //Gets UI information
        _game.global.style = Resources.getStyle();
        _game.state.start("stateManager");
    }
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var InputTypeEnum = {
    NameInput: 'INPUT_TEXT',
    Choices: 'TEXT_CHOICES'
}
var Linkable = __webpack_require__(1);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _game = null;
var _dbUrl = "http://mocking-birds.etc.cmu.edu:3000/";
var _userInteractionRoute = "addUserAction";
var _createUserRoute = "createUser";
var userId = null;

var useDatabase = true;

var DatabaseManager = function() {
    if(_instance !== null)
        return _instance;

    _instance = this;
    this.createUser();
    return _instance;
}

DatabaseManager.prototype.getUserId = function() {
  return this.userId;
}

DatabaseManager.prototype.setUserId = function(generatedUserId) {
}

DatabaseManager.prototype.createUser = function() {
    if(!useDatabase)
        return;
  axios.get(_dbUrl + _createUserRoute)
  .then(function(res) {
    userId = res.data;
  })
  .then(console.log.bind(this))
  .catch(console.error.bind(this));
}

DatabaseManager.prototype.sendInteractionData = function(currentSceneName, tag) {
    if(!useDatabase)
        return;
    if(tag != undefined && tag != null) {
      var userInteractionData = {
        id: userId,
        sceneName: currentSceneName,
        interactionType: tag
      };
      // var url = createUserInteractionUrl(_dbUrl, _userInteractionRoute, userInteractionData);
      // fetch(url)
      // .then(console.log.bind(this));
      axios.post(_dbUrl + _userInteractionRoute, userInteractionData)
      .then(console.log.bind(this))
      .catch(console.error.bind(this));
    }
}

function createUserInteractionUrl(url, route, data) {
  var tempUrl = url + route;
  var isFirstParam = true;
  for(var key in data) {
    if(data.hasOwnProperty(key)) {
      if(isFirstParam) {
        tempUrl += "?" + key + "=" + data[key];
        isFirstParam = false;
      } else {
        tempUrl += "&" + key + "=" + data[key];
      }
    }
  }
  return tempUrl;
}

module.exports = DatabaseManager;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ConnectionChecker = __webpack_require__(19),
    StateManager = __webpack_require__(15),
    InteractState = __webpack_require__(17),
    LocationState = __webpack_require__(18),
    Icons = __webpack_require__(7),
    Choices = __webpack_require__(12),
    Thoughts = __webpack_require__(13),
    Transition = __webpack_require__(3),
    UI = __webpack_require__(4),
    Video = __webpack_require__(0),
    Linkable = __webpack_require__(1);

var _instance = null;
var _game = null;

var GameManager = function() {
    if(_instance !== null)
        return _instance;
    
    _instance = this;

    this._changeSceneSignal = null;

    this._fadeInTransitionSignal = null;
    this._fadeOutTransitionSignal = null;

    this._triggerInteractionSignal = null;
    this._endInteractionSignal = null;

    this._videoSeekSignal = null;

    this._createThoughtsSignal = null;
    this._createChoicesSignal = null;
    this._createThoughtsAndChoicesSignal = null;

    this._displayImageSignal = null;
    this._hideDisplayedImageSignal = null;

    this._showUISignal = null;
    this._hideUISignal = null;
    this._showInfoOverlaySignal = null;
    this._hideInfoOverlaySignal = null;
    this._pauseSignal = null;
    this._playSignal = null;
    this._toggleSubtitleSignal = null;

    this._goToLinkSignal = null;

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
    this._triggerInteractionSignal.add(InteractState.createInteractionElements, this);
    this._endInteractionSignal = new Phaser.Signal();
    this._endInteractionSignal.add(InteractState.endInteraction, this);

    this._videoSeekSignal = new Phaser.Signal();
    this._videoSeekSignal.add(Video.seekTo, this);

    this._createThoughtsSignal = new Phaser.Signal();
    this._createThoughtsSignal.add(Thoughts.create, this);
    this._createChoicesSignal = new Phaser.Signal();
    this._createChoicesSignal.add(Choices.create, this);

    this._displayImageSignal = new Phaser.Signal();
    this._displayImageSignal.add(LocationState.displayImage, this);
    this._hideDisplayedImageSignal = new Phaser.Signal();
    this._hideDisplayedImageSignal.add(LocationState.hideDisplayedImage, this);

    this._showUISignal = new Phaser.Signal();
    this._showUISignal.add(UI.showUI, this);
    this._hideUISignal = new Phaser.Signal();
    this._hideUISignal.add(UI.hideUI, this);
    this._showInfoOverlaySignal = new Phaser.Signal();
    this._showInfoOverlaySignal.add(UI.showInfoOverlay, this);    
    this._hideInfoOverlaySignal = new Phaser.Signal();
    this._hideInfoOverlaySignal.add(UI.hideInfoOverlay, this);
    this._pauseSignal = new Phaser.Signal();
    this._pauseSignal.add(UI.pause, this);    
    this._playSignal = new Phaser.Signal();
    this._playSignal.add(UI.play, this);
    this._toggleSubtitleSignal = new Phaser.Signal();
    this._toggleSubtitleSignal.add(Video.toggleSubtitle, this);

    this._createThoughtsAndChoicesSignal = new Phaser.Signal();
    this._createThoughtsAndChoicesSignal.add(Icons.createThoughtsAndChoices, this);

    this._goToLinkSignal = new Phaser.Signal();
    this._goToLinkSignal.add(Linkable.goToLink, this);
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

GameManager.prototype.getVideoSeekSignal = function() {
    return this._videoSeekSignal;
}

GameManager.prototype.getCreateThoughtsSignal = function() {
    return this._createThoughtsSignal;
}

GameManager.prototype.getCreateChoicesSignal = function() {
    return this._createChoicesSignal;
}

GameManager.prototype.getCreateThoughtsAndChoicesSignal = function() {
    return this._createThoughtsAndChoicesSignal;
}

GameManager.prototype.getDisplayImageSignal = function() {
    return this._displayImageSignal;
}

GameManager.prototype.getHideDisplayedImageSignal = function() {
    return this._hideDisplayedImageSignal;
}

GameManager.prototype.getShowUISignal = function() {
    return this._showUISignal;
}

GameManager.prototype.getHideUISignal = function() {
    return this._hideUISignal;
}

GameManager.prototype.getShowInfoOverlaySignal = function() {
    return this._showInfoOverlaySignal;
}

GameManager.prototype.getHideInfoOverlaySignal = function() {
    return this._hideInfoOverlaySignal;
}

GameManager.prototype.getPauseSignal = function() {
    return this._pauseSignal;
}

GameManager.prototype.getPlaySignal = function() {
    return this._playSignal;
}

GameManager.prototype.getToggleSubtitleSignal = function() {
    return this._toggleSubtitleSignal;
}

GameManager.prototype.getGoToLinkSignal = function() {
    return this._goToLinkSignal;
}

module.exports = GameManager;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Initialized once
const Text = __webpack_require__(2),
    Image = __webpack_require__(5),
    Graphic = __webpack_require__(10);

var _instance = null;
var _game = null;

var _currImage = null;
var _heightFraction = null;

var _overlayGraphic = null;
var _overlayCloseButton = null;
var _overlayText = null;
var _scrollbarBg = null;
var _scrollbarDraggable = null;

const thoughtsTextKeyEnum = 'TEXT_THOUGHTS';
const closeOverlayImageKeyEnum = 'IMAGE_OVERLAY_CLOSE';
const infoOverlayTextKeyEnum= 'TEXT_INFO_OVERLAY';
const SCROLLBAR_IMAGE_KEY = 'scrollBar';

var _effectiveScrollBarHeight = 0;
var _effectiveImageHeight = 0;

function CreateInfoOverlay() {    
    CreateOverlayGraphic();
    CreateOverlayCrossButton();
    CreateOverlayHelperText();
}

function CreateOverlayGraphic() {
    _overlayGraphic = new Graphic(0, 0);
    _overlayGraphic.createOverlayBg(_game, _game.global.constants.INFO_VIEW_MARGIN);

    _scrollbarBg = new Graphic(0, 0);
    _scrollbarBg.drawRect(_game, _game.global.constants.SCROLLBAR_POS[0], _game.global.constants.SCROLLBAR_POS[1],
        _game.global.constants.SCROLLBAR_DIM[0], _game.global.constants.SCROLLBAR_DIM[1], 0x153b65, 1, 
        _game.global.constants.SCROLLBAR_STROKEWIDTH, 0xffffff);
    _scrollbarBg.setVisible(false);

    _scrollbarDraggable = new Image(_game.global.constants.SCROLLBAR_POS[0] + _game.global.constants.SCROLLBAR_DIM[0]/2
        , _game.global.constants.SCROLLBAR_POS[1], SCROLLBAR_IMAGE_KEY, Image.getEnum().OverlayScrollBar);
    _scrollbarDraggable.addImageToGame(_game, _game.uiGroup);
    _scrollbarDraggable.changeImage(_game, _game.global.constants.SCROLLBAR_DIM[0]);
}

function CreateOverlayCrossButton() {
    _overlayCloseButton = new Image(50, 50, 'closeButton', closeOverlayImageKeyEnum);
    _overlayCloseButton.addImageToGame(_game, _game.uiGroup);
    _overlayCloseButton.changeImage(_game);
}

function CreateOverlayHelperText() {
    _overlayText = new Text('Drag the image below to scroll', _game.world.centerX, 25, infoOverlayTextKeyEnum, 
        _game.global.style.questionTextProperties);
    _overlayText.addToGame(_game, _game.uiGroup);
    _overlayText.changeText(_game);
}

function InitializeScrollbar(image) {
    _currImage = image;
    _currImage.setPos(_game.global.constants.INFO_VIEW_MARGIN, _game.global.constants.INFO_VIEW_MARGIN);

    _heightFraction = _game.global.constants.INFO_VIEW_HEIGHT/_currImage.getHeight();
    if(_heightFraction >= 1) {
        console.warn('Images with a wider than 16:9 ratio is unsupported for proper viewing.')
        return;
    }

    _scrollbarDraggable.setHeight(_heightFraction*_game.global.constants.SCROLLBAR_DIM[1]);
    _scrollbarDraggable.setY(_game.global.constants.SCROLLBAR_POS[1]);

    _effectiveScrollBarHeight = _game.global.constants.SCROLLBAR_DIM[1] - _scrollbarDraggable.getHeight();
    _effectiveImageHeight = _currImage.getHeight() - _game.global.constants.INFO_VIEW_HEIGHT;
}

function ScrollBarDragStart() {

}

function ScrollBarDragUpdate() {
    _currImage.setY(_game.global.constants.INFO_VIEW_MARGIN - 
        (_scrollbarDraggable.getY() - _game.global.constants.INFO_VIEW_MARGIN)/_effectiveScrollBarHeight*_effectiveImageHeight);
}

function ImageDragStart() {

}

function ImageDragUpdate() {
    //console.log(_scrollbarDraggable);
    //console.log(_currImage);
    _scrollbarDraggable.setY(_game.global.constants.INFO_VIEW_MARGIN - 
        (_currImage.getY() - _game.global.constants.INFO_VIEW_MARGIN)/_effectiveImageHeight*_effectiveScrollBarHeight);
}

function StartDragUpdate() {
    //_scrollbarDraggable.getPhaserImage().events.onDragStart.add(ScrollBarDragStart);
    _scrollbarDraggable.getPhaserImage().events.onDragUpdate.add(ScrollBarDragUpdate);
    //_currImage.getPhaserImage().events.onDragStart.add(ImageDragStart);
    _currImage.getPhaserImage().events.onDragUpdate.add(ImageDragUpdate);
}

module.exports = {
    init: function(game) {
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    createOverlay: function() {
        CreateInfoOverlay();
    },
    initializeScrollbar: function(image) {
        InitializeScrollbar(image);
        StartDragUpdate();
    },
    setVisible: function(value, image) {
        if(value && image)
            this.initializeScrollbar(image);
        _overlayGraphic.setVisible(value);
        _overlayCloseButton.setVisible(value);
        _overlayText.setVisible(value);
        _scrollbarBg.setVisible(value);
        _scrollbarDraggable.setVisible(value);
    },
    resetThoughtVariables: function() {
        _text = [];
        _currentIndex = 0;        
    }
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _game = null;
var _input = null;
var Input = __webpack_require__(25);

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
            console.log("added");
            _input.push(new Input(input.name[i], input.coords[i][0], input.coords[i][1], input.properties[i]));
            _input[i].addToGame(_game);
        }
        return _input;
    }
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const StateManager = __webpack_require__(15),
    InteractState = __webpack_require__(17),
    LocationState = __webpack_require__(18),
    Icons = __webpack_require__(7),
    Choices = __webpack_require__(12),
    Thoughts = __webpack_require__(13),
    Transition = __webpack_require__(3),
    UI = __webpack_require__(4),
    Video = __webpack_require__(0);

var _instance = null;
var _game = null;
var _bgMusic = null;
var _bgMusicKey = null;
var _soundHashSet = null;
var _currTime = 0;


var SoundManager = function(game) {
    if(_instance !== null)
        return _instance;
    _instance = this;
    _game = game;
    return _instance;
}

SoundManager.prototype.init = function() {
    _soundHashSet = {};
}

SoundManager.prototype.playSound = function(soundKey) {
    if(!_soundHashSet[soundKey]) {
        _soundHashSet[soundKey] = _game.add.audio(soundKey);
    }
    _soundHashSet[soundKey].play();
}

SoundManager.prototype.playBackgroundMusic = function(musicKey) {
  //  if(_bgMusicKey == musicKey) {
   //     _bgMusic = _game.add.audio(musicKey);
  //      _bgMusic.currentTime = _currTime;
 //   }
    //else {
    if(_bgMusicKey != musicKey) {
        if(_bgMusic)
            _bgMusic.stop();
        if(!_soundHashSet[musicKey]) 
            _soundHashSet[musicKey] = _game.add.audio(musicKey);
        _bgMusic =_soundHashSet[musicKey];
        _bgMusicKey = musicKey;
        _bgMusic.loop = true;
        _bgMusic.play(); 

    }
}    

SoundManager.prototype.stopBackgroundMusic = function() {
    if(_bgMusic)
        _bgMusic.stop();
}

SoundManager.prototype.setCurrentTime = function(time) {
    _currTime = time;
}


module.exports = SoundManager;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Manu scenes.
***************************************************************/


const Group = __webpack_require__(6), 
    Input = __webpack_require__(29),
    Transition = __webpack_require__(3),
    State = __webpack_require__(8),
    Background = __webpack_require__(11),
    Video = __webpack_require__(0),
    Icons = __webpack_require__(7);

var _instance = null;
var _stateInfo = null;
var _game = null;
var _input = [];

//Unused, for phaser input extension.
function setPlayerName(game) {
    if(_input[0])
        return function() {game.global.playerName = _input[0].getInput().text._text;};
    else {
        "Input not eneabled.";
    }
}

//Unused, for phaser input extension.
function updatePlayerNameCallback(game) {
    game.state.onShutDownCallback = setPlayerName(game);
}

module.exports = {
    init: function(scene) {
        //Sets new scene information
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);

        //Initializes game variables
        Group.initializeGroups();
                
        //Intitalize singleton variables
        if(_instance !== null)
            return _instance;
        Background.init(this.game);
        Icons.init(this.game);
        Input.init(this.game);
        _game = this.game;
        _instance = this;
        _stateInfo = new State(scene);
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        //Unused input reset
        _input = [];

        //Creates video or background image depending on source
        var videoSrc = _stateInfo.getMovieSrc(_game.global.quality);        
        if(videoSrc)
            Video.create(videoSrc, _stateInfo.getTransitionInfo().fadeOut, _stateInfo.getVideoFilter());
        else
            Background.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());

        Icons.createExploratoryIcons(_stateInfo.getIconsInfo());

        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
    },
    shutdown: function() {
        Icons.destroy();
    },
    //Unused, for phaser input extension
    update: function() {
        _input.forEach(function(element) {
            element.getInput().update();
        });
    }
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Movie scene state without interaction.
***************************************************************/


//Dependencies
const Group = __webpack_require__(6),
    UI = __webpack_require__(4),
    Video = __webpack_require__(0),
    State = __webpack_require__(8),
    Background = __webpack_require__(11),
    SceneParser = __webpack_require__(16);

var _instance = null;
var _game = null;
var _stateInfo = null;

const START_SCENE_NAME = 'startScene';

/***************************************************************
Selects movie source depending on scenes visited.
***************************************************************/
function GetMovieSrc(state) {
    var SrcList = state.getSrcList();
    var index = null;
    if(SrcList) {
        index = SceneParser.GetIndexOfVisitedAll(_game, SrcList[0]);
        if(typeof(index) != 'number')
            console.warn("No valid requirements met for movie source selection.");
        console.log(index);
    }
    return state.getMovieSrc(_game.global.quality, index);
}

module.exports = {
    init: function(scene, signal) {
        //Sets new scene information
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);

        //Initialize game variables
        Group.initializeGroups();

        //Singleton variable initialization
        if(_instance !== null)
            return _instance;
        Video.init(this.game, signal);
        Background.init(this.game);
        _stateInfo = new State(scene);
        _game = this.game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        _game.global.soundManager.stopBackgroundMusic();

        Background.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());

        Video.create(GetMovieSrc(_stateInfo), _stateInfo.getTransitionInfo().fadeOut, 
            _stateInfo.getVideoFilter(), _stateInfo.getNextScenes(), _stateInfo.getMovieSubKey());

        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
        
        if(_game.global.currentSceneName !== START_SCENE_NAME)
            UI.create(true, true);
    }
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Utility state that selects next scene to go depending on scenes visited.
***************************************************************/



//Dependencies
const State = __webpack_require__(8),
    SceneParser = __webpack_require__(16);

var _instance = null;
var _stateInfo = null;
var _game = null;

/***************************************************************
Checks scene requirements against scenes visited and selects scene to go to.
***************************************************************/
function GetSceneNameFromReqs(stateInfo) {
    var sceneReqs = stateInfo.getSceneReqs();    
    var index = null;
    if(sceneReqs) {
        index = SceneParser.GetIndexOfVisitedAll(_game, sceneReqs);
        if(typeof(index) != 'number')
            console.warn("No valid requirements met for movie source selection.");
        console.log(index);
    }
    return stateInfo.getSceneTargetNames()[index];
}

module.exports = {
    init: function(scene, signal) {
        //Singleton variables initialization
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);
        _stateInfo = new State(scene);
        _instance = this;
        _game = this.game;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        var targetSceneName =GetSceneNameFromReqs(_stateInfo);
        _game.global.gameManager.getChangeSceneSignal().dispatch(targetSceneName);
    }
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Game startup
****************************************************************/



//Dependencies
const Boot = __webpack_require__(23),
    Preload = __webpack_require__(24),
    StateManager = __webpack_require__(15),
    ResourceLoader = __webpack_require__(14);
    
function initGame(Boot, Preload, StateManager, ResourceLoader) {
    var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { init: init, preload: preload, create: create, update: update });

    /***************************************************************
    Creates initializing states
    ****************************************************************/
    function init() {
        console.log("Game initialized.");
        game.canvas.className += "center";
        game.state.add("boot", Boot);
        game.state.add("preload", Preload);
        game.state.add("stateManager", StateManager);
    }

    /***************************************************************
    Loads Json Files and loading images
    ****************************************************************/
    function preload () {
        game.load.json('data', 'json/Data.json');
        game.load.json('style', 'json/Style.json');
        game.load.image('progressSceneBackground', './Images/Loading/progress_bg.png');
        game.load.image('progressBarFillFg', './Images/Loading/progressbar.png');
        game.load.image('progressBarFillBg', './Images/Loading/progressbar_bg.png');
        game.load.image('progressBarFrame', './Images/Loading/progressbar_frame.png');
        game.load.image('progressBarText', './Images/Loading/progressbar_text.png');
    }

    /***************************************************************
    Starts boot state
    ****************************************************************/
    function create() {
        game.state.start("boot");
    }

    function update() {

    }
}

initGame(Boot, Preload, StateManager, ResourceLoader);


/***/ })
/******/ ]);