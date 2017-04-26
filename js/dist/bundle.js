/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var bind = __webpack_require__(28);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is a Node Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Node Buffer, otherwise false
 */
function isBuffer(val) {
  return ((typeof Buffer !== 'undefined') && (Buffer.isBuffer) && (Buffer.isBuffer(val)));
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62).Buffer))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const VideoFilter = __webpack_require__(23),
    Linkable = __webpack_require__(2),
    Subtitle = __webpack_require__(17);

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
    resetVideoVariables() {        
        _interactionTimeStamps = null;
        _pausedByGame = false;
    }
}


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Linkable = __webpack_require__(2),
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const VideoFilter = __webpack_require__(23);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//Dependency: Nonde


const Image = __webpack_require__(6),
    Text = __webpack_require__(3),
    Graphic = __webpack_require__(10),
    Video = __webpack_require__(1),
    ImageViewer = __webpack_require__(36),
    Subtitle = __webpack_require__(17);

var _instance = null;
var _game = null;
var _graphics = null;
var _pauseImage = null;
var _playImage = null;
var _subtitleImage = null;
var _subtitleDisabledImage = null;
var _pausedByEngine = false;

var _overlayGraphic = null;
var _overlayCloseButton = null;
var _overlayText = null;

var _uiVisible = true;
var _subsVisible = true;

const pauseButtonImageKeyEnum = 'IMAGE_BUTTON_PAUSE';
const playButtonImageKeyEnum = 'IMAGE_BUTTON_PLAY';
const toggleSubtitleButtonImageKeyEnum = 'IMAGE_BUTTON_TOGGLE_SUBTITLE';

function DrawPauseButton() {
    if(!_pauseImage)
        _pauseImage = new Image(10, 10, 'pauseButton', pauseButtonImageKeyEnum);
    _pauseImage.addImageToGame(_game, _game.uiGroup);
    _pauseImage.changeImage(_game, _game.global.gameManager.getPauseSignal());
}

function DrawSubtitleButtons() {
    if(!_subtitleImage)        
        _subtitleImage = new Image(10, 100, 'subtitleButton', toggleSubtitleButtonImageKeyEnum);    
    _subtitleImage.addImageToGame(_game, _game.uiGroup);
    _subtitleImage.changeImage(_game, _game.global.gameManager.getToggleSubtitleSignal());

    if(!_subtitleDisabledImage)        
        _subtitleDisabledImage = new Image(10, 100, 'subtitleDisabledButton', toggleSubtitleButtonImageKeyEnum);    
    _subtitleDisabledImage.addImageToGame(_game, _game.uiGroup);
    _subtitleDisabledImage.changeImage(_game, _game.global.gameManager.getToggleSubtitleSignal());

    if(Subtitle.getSubtitleVisible())
        _subtitleDisabledImage.setVisible(false);
    else        
        _subtitleImage.setVisible(false);
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

function HideUI() {
    _uiVisible = false;
    _pauseImage.setVisible(_uiVisible);
    _subtitleImage.setVisible(_uiVisible);
    _subtitleDisabledImage.setVisible(_uiVisible);
}

function ShowUI() {
    _uiVisible = true;
    _pauseImage.setVisible(_uiVisible);
    if(Subtitle.getSubtitleVisible())
        _subtitleImage.setVisible(_uiVisible);
    else        
        _subtitleDisabledImage.setVisible(_uiVisible);
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
        Subtitle.init(game);
        ImageViewer.init(game);
        _instance = this;
        _game = game;
        return _instance;
    },
    preload: function() {
    },
    create: function(drawPause, drawSubtitles) {
        _uiVisible = true;
        if(drawSubtitles)
            DrawSubtitleButtons();
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
    showUI: function() {
        ShowUI();
    },
    hideUI: function() {
        HideUI();
    },
    toggleSubtitle: function() {
        _subsVisible = Subtitle.toggleSubtitle();
        if(_subsVisible) {
            _subtitleImage.setVisible(true);            
            _subtitleDisabledImage.setVisible(false);
        }
        else {
            _subtitleImage.setVisible(false);            
            _subtitleDisabledImage.setVisible(true);
        }
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Linkable = __webpack_require__(2),
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
    if(group) {
        group.add(this._image);
    }
    else {
        switch(this._type) {
            case ImageTypeEnum.Pause:
            case ImageTypeEnum.Play:
            case ImageTypeEnum.InfoImage:
            case ImageTypeEnum.OverlayScrollBar:
            case ImageTypeEnum.ToggleSubtitle:
            case ImageTypeEnum.OverlayCloseImage:
                game.uiGroup.add(this._image);
                break;
            case ImageTypeEnum.Thought:
            case ImageTypeEnum.SceneChange:
            case ImageTypeEnum.DisplayImage:
            case ImageTypeEnum.ChoiceBackground:
            case ImageTypeEnum.ExternalLink:
            case ImageTypeEnum.Static:
            case ImageTypeEnum.Background:
            case ImageTypeEnum.ThoughtSprite:
                game.mediaGroup.add(this._image);
                break;
            default:
                console.warn("Invalid image type not added to group:" + this._type);
        }
    }
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
    this._link = new Linkable(game, this._image.events, game.global.gameManager.getCreateThoughtsSignal(), thoughts, coords, choices);
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
    this._link = new Linkable(game, this._image, game.global.gameManager.getCreateThoughtsSignal(), thoughts, coords, choices);
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

    if(this.checkIfScrollBarNeeded(game)) {    
        this._image.y = MARGIN;    
        this._mask = game.add.graphics(0, 0);
        //game.mediaGroup.add(this._mask);
        this._mask.beginFill(0xffffff);
        this._mask.drawRect(MARGIN, MARGIN, DISPLAY_WIDTH, game.global.constants.INFO_VIEW_HEIGHT);
        this._mask.endFill();
        this._image.mask = this._mask;

        this.makeDraggable(game, true, false, MARGIN, -this._image.height+DISPLAY_HEIGHT+MARGIN, 
            DISPLAY_WIDTH, this._image.height*2-DISPLAY_HEIGHT);
        console.log("here");
    }
    else{
        this._image.y = game.world.centerY;
        this._image.anchor.setTo(0, 0.5);
    }
    
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

Image.prototype.checkIfScrollBarNeeded = function(game) {
    var displayDimensionRatio = game.global.constants.INFO_VIEW_WIDTH/game.global.constants.INFO_VIEW_HEIGHT;
    var imageDimensionRatio = this._image.width/this._image.height;
    if(imageDimensionRatio > displayDimensionRatio)
        return false;
    else
        return true;
}

Image.prototype.destroy = function() {
    this._image.destroy();
}

Image.prototype.getPhaserImage = function() {
    return this._image;
}

Image.prototype.bringToTop = function() {
    this._image.bringToTop();
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
/* 7 */
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


const Linkable = __webpack_require__(2);

var GraphicTypeEnum = {
    Overlay: 'GRAPHIC_INFO_OVERLAY',
    ScrollBarBackground: 'GRAPHIC_SCROLLBAR_BG'
}

//Image constructor
var Graphic = function(xPos, yPos, type) {
    this._xPos = xPos;
    this._yPos = yPos;
    this._type = type;
}

Graphic.prototype.addGraphicToGame = function(game, group) {
    this._graphic = game.add.graphics(this._xPos, this._yPos); 
    if(group) {
        group.add(this._graphic);
    }
    else {
        switch(this._type) {
            case GraphicTypeEnum.Overlay:
            case GraphicTypeEnum.ScrollBarBackground:
                game.uiGroup.add(this._graphic);
                break;
            default:
                console.warn("Invalid graphic type not added to group:" + this._type);
        }
    }
}

Graphic.prototype.changeGraphic = function (game, arg1, arg2, arg3, arg4, arg5) {
    switch(this._type) {
        case GraphicTypeEnum.Overlay:            
            this.changeToInfoOverlayGraphic(game, arg1, arg2);
            break;
        case GraphicTypeEnum.ScrollBarBackground:
            this.changeToScrollBarBackgroundGraphic(game, arg1);
            break;
        default:
            console.warn("Invalid Graphic Type.");
    }
}

Graphic.prototype.changeToInfoOverlayGraphic = function(game, margin, scrollbarEnabled) {
    this._graphic = game.add.graphics(this._xPos, this._yPos);    
    this._graphic.beginFill(0x000000, 0.6);
    this._graphic.inputEnabled = true;

    if(scrollbarEnabled) {
        this._graphic.drawRect(0, 0, margin, game.height);
        this._graphic.drawRect(game.width-margin, 0, margin, game.height);
        this._graphic.drawRect(margin, 0, game.width-(margin<<1), margin);
        this._graphic.drawRect(margin, game.height-margin, game.width-(margin<<1), margin);   
        this._graphic.input.priorityID = 1;
        this._graphic.input.useHandCursor = true;
    }
    else {
        this._graphic.drawRect(0, 0, game.width, game.height);
    }
    this._graphic.endFill();
    this._graphic.visible = false;
    game.uiGroup.add(this._graphic);


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
}

Graphic.prototype.changeToScrollBarBackgroundGraphic = function(game, rectangle) {
    this._graphic.beginFill(rectangle.color, rectangle.opacity);
    this._graphic.lineStyle(rectangle.strokeWidth, rectangle.lineColor);

    this._graphic.drawRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    
    this._graphic.endFill();
    this._graphic.visible = false;
}

Graphic.prototype.setVisible = function(value) {
    this._graphic.visible = value;
}

Graphic.prototype.getGraphic = function() {
    return this._graphic;
}

Graphic.createRectangle = function(x, y, width, height, color, opacity, strokeWidth, lineColor, strokeOpacity) {
    var rectangle = {};
    rectangle.x = x;
    rectangle.y = y;
    rectangle.width = width;
    rectangle.height = height;
    if(!color)
        color = 0x000000;
    rectangle.color = color;
    if(!opacity)
        opacity = 1.0;
    rectangle.opacity = opacity;

    if(strokeWidth) {
        rectangle.strokeWidth = strokeWidth;
        if(!lineColor)
            lineColor = 0x000000;
        rectangle.lineColor = lineColor
        if(!strokeOpacity)
            strokeOpacity = 1.0;
        rectangle.strokeOpacity = strokeOpacity;
    }

    return rectangle;
}

Graphic.getEnum = function() {
    return GraphicTypeEnum;
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
const Text = __webpack_require__(3),
    Image = __webpack_require__(6);

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
    _bgImage.getPhaserImage().events.onDragUpdate.add(dragUpdate);
    _iconGroup.x = _bgImage.getPhaserImage().x;
    _iconGroup.y = _bgImage.getPhaserImage().y;
}

/***************************************************************
Icons follow dragged background position every update.
***************************************************************/
function dragUpdate() {
    _iconGroup.x = _bgImage.getPhaserImage().x;
    _iconGroup.y = _bgImage.getPhaserImage().y;
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


const Filter = __webpack_require__(22),
    Thoughts = __webpack_require__(18),
    Choices = __webpack_require__(16),
    Image = __webpack_require__(6),
    Text = __webpack_require__(3),
    Graphic = __webpack_require__(10),
    SceneParser = __webpack_require__(15);

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
    image.addImageToGame(_game);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Filter = __webpack_require__(22);
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Manages creation and transitions between state types. 
***************************************************************/



//Dependencies
const Resources = __webpack_require__(13),
    Group = __webpack_require__(7),
    Transition = __webpack_require__(4),
    UI = __webpack_require__(5),
    Video = __webpack_require__(1),
    MenuState = __webpack_require__(39),
    LocationState = __webpack_require__(20),
    InteractState = __webpack_require__(19),
    SwitchState = __webpack_require__(41),
    MovieState = __webpack_require__(40),
    Subtitle = __webpack_require__(17);

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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Creates choice icons during interaction moments.
***************************************************************/


//Dependencies
const Text = __webpack_require__(3),
    Image = __webpack_require__(6);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Text = __webpack_require__(3);

var _instance = null;
var _game = null;
var _textSlots = [null];
var _subtitleVisible = false;

const subtitleTextKeyEnum = 'TEXT_SUBTITLE';

const SUBTITLE_Y_POS = 630;
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
			console.log("destroyed");
       		video.removeEventListener("timeupdate", destroy); 
            text.destroy();
            _textSlots[slotIndex] = null;
        }
	}
}

function FindSubtitleSlot(text) {
	//if(!_textSlots[0]) {
		if(_textSlots[0])
			_textSlots[0].setVisible(false);
		_textSlots[0] = text;
		text.setY(SUBTITLE_Y_POS);
		return 0;
	/*}
	else if(!_textSlots[1]) {
		_textSlots[1] = text;
		text.setY(SUBTITLE_Y_POS - text.getHeight() - SUBTITLE_SPACING);
		return 1;
	}*/
	//else
	//	console.warn("Max number of concurrent subtitles reached." + text);
}

function ToggleSubtitle() {
	_subtitleVisible = !_subtitleVisible;
	_textSlots.forEach(function(slot) {
		if(slot)
			slot.setVisible(_subtitleVisible);
	});
	return _subtitleVisible;
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
			return _instance;
		_instance = this;
		_game = game;
		return _instance;
	},
	create: function(video, subs) {
		CreateSubs(video, subs);
	},
	toggleSubtitle: function() {
		return ToggleSubtitle();
	},
	getSubtitleVisible: function() {
		return _subtitleVisible;
	}
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Initialized once
const Text = __webpack_require__(3);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
State for interactive video scenes.
***************************************************************/



//Dependencies
const Group = __webpack_require__(7),
    UI = __webpack_require__(5),
    Video = __webpack_require__(1),
    Transition = __webpack_require__(4),
    Icons = __webpack_require__(12),
    State = __webpack_require__(8),
    Choices = __webpack_require__(16),
    Thoughts = __webpack_require__(18),
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
    createThoughts: function(thoughts, coords) {
        Thoughts.create(thoughts, coords);
    },
    endInteraction: function(lingeringChoice, targetScene, tag) {
        EndInteraction(lingeringChoice, targetScene, tag);
    }
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
State for location scenes.
***************************************************************/



const Transition = __webpack_require__(4),
    Group = __webpack_require__(7),
    State = __webpack_require__(8),
    UI = __webpack_require__(5),
    Background = __webpack_require__(11),
    Icons = __webpack_require__(12),
    Video = __webpack_require__(1);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(58);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(24);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(24);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

/***************************************************************
Unused. Intended to blur text.
***************************************************************/
const _instance = null,
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Linkable = __webpack_require__(2),
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var settle = __webpack_require__(50);
var buildURL = __webpack_require__(53);
var parseHeaders = __webpack_require__(59);
var isURLSameOrigin = __webpack_require__(57);
var createError = __webpack_require__(27);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(52);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(55);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(49);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/****************************************************************
Loads game fonts and tests user's connection.
****************************************************************/

"use_strict";

//Dependencies
const ConnectionChecker = __webpack_require__(33), 
    GameManager = __webpack_require__(35),
    SoundManager = __webpack_require__(38),
    DatabaseManager = __webpack_require__(34);

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
        if(_instance !== null)
            return _instance;
        ConnectionChecker.init(this.game);
        _game = this.game;
        return _instance;
    },
    preload: function() {
        //Tries to full screen on browser
        _game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        _game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        _game.load.image('connectionTestImage', './Images/Loading/connectionTestImage.jpg');
    },
    create: function() {
    }
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/***************************************************************
Loads resources including images, sprites, sound.
Since videos are streamed, it's not loaded here.
***************************************************************/

"use_strict";

//Dependencies
const Resources = __webpack_require__(13);

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
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Checks user's connection
***************************************************************/


//initializes once
var _instance = null;
var _game = null;
var _file = null;
var _bytes = null;
var _timer = null;

const SLOW_DOWNLOAD_THRESHOLD_MBPS = 0.36;

//Type of file for connection test
var FileTypeEnum = {
    Image: 'IMAGE',
    Video: 'VIDEO',
    Audio: 'AUDIO'
}

/***************************************************************
Adds load start and on load complete functions.
Starts load process of selected file and times it.
***************************************************************/
function CheckConnection() {    
    _game.load.onFileComplete.add(LoadComplete, this);
    _game.load.onLoadStart.add(StartLoading, this);    
    _game.load.start();
}

/***************************************************************
Creates timer.
***************************************************************/
function StartLoading() {
    _timer = _game.time.create(true);
    _timer.start();
}

/***************************************************************
Gets connection speed and starts preload state.
***************************************************************/
function LoadComplete() {    
    _timer.stop();
    SetVideoQuality(CalculateConnectionSpeed());  
    _game.load.onFileComplete.remove(LoadComplete, this);

    //Starts preload state
    _game.state.start("preload");
}

/***************************************************************
Calculates connection speed and returns it.
***************************************************************/
function CalculateConnectionSpeed() {
    var elapsedSeconds = (_timer._now - _timer._started)/1000;
    elapsedSeconds += _timer.elapsed/1000;
    var connectionSpeedMbps = _bytes/(elapsedSeconds)/ 1000000;
    return connectionSpeedMbps;
}

/***************************************************************
Decides video quality for the rest of the experience.
***************************************************************/
function SetVideoQuality(speed) {
    if(speed > SLOW_DOWNLOAD_THRESHOLD_MBPS || speed < 0)
        _game.global.quality = 'HD';
    else
        _game.global.quality = 'SD';
    console.log('Connection speed: ' + speed + ' Mb/s. Quality: ' +  _game.global.quality);  
}

/***************************************************************
Prepares selected file for connection test.
***************************************************************/
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

module.exports = {
    init: function(game) {
        //Singleton initialization
        if(_instance !== null)
            return _instance;        
        _file = null;
        _game = game;
        _instance = this;
        return _instance;
    },
    /***************************************************************
    Prepares selected file for connection testing.
    ***************************************************************/
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _game = null;
var _dbUrl = "http://mocking-birds.etc.cmu.edu:3000/";
var _userInteractionRoute = "addUserAction";
var _createUserRoute = "createUser";
var userId = null;
var axios = __webpack_require__(43);

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
All game signals go through here.
***************************************************************/


//Dependencies
const StateManager = __webpack_require__(14),
    InteractState = __webpack_require__(19),
    LocationState = __webpack_require__(20),
    Transition = __webpack_require__(4),
    UI = __webpack_require__(5),
    Video = __webpack_require__(1),
    Linkable = __webpack_require__(2);

var _instance = null;
var _game = null;

/***************************************************************
Signals declaration. Singleton.
***************************************************************/
var GameManager = function() {
    if(_instance !== null)
        return _instance;    
    _instance = this;

    //Changes game scene
    this._changeSceneSignal = null;

    //Triggers transition effects between scenes
    this._fadeInTransitionSignal = null;
    //Fade out unused currently
    this._fadeOutTransitionSignal = null;

    //Creates thought words
    this._createThoughtsSignal = null;
    //Starts thought/choice moments
    this._triggerInteractionSignal = null;
    //Called when thought/choice moments ends
    this._endInteractionSignal = null;

    //Reveals image hidden by another displayed image
    this._displayImageSignal = null;
    //Hides previously hidden but currently shown image
    this._hideDisplayedImageSignal = null;

    //Seeks to time specified for current video, currently unused
    this._videoSeekSignal = null;

    //Explains itself T.T
    this._showUISignal = null;
    //Explains itself T.T
    this._hideUISignal = null;
    //Shows/hides overlay graphics for displaying information images
    this._showInfoOverlaySignal = null;
    this._hideInfoOverlaySignal = null;
    //Pauses the experience
    this._pauseSignal = null;
    //Resumes the experience
    this._playSignal = null;
    //Explains itself!
    this._toggleSubtitleSignal = null;

    //Links to an external page
    this._goToLinkSignal = null;

    return _instance;
}

/***************************************************************
Allocates functions from corresponding modules to each signal.
***************************************************************/
GameManager.prototype.initSignals = function() {
    //StateManager 
    this._changeSceneSignal = new Phaser.Signal();
    this._changeSceneSignal.add(StateManager.changeScene, this);

    //Transition
    this._fadeInTransitionSignal = new Phaser.Signal();
    this._fadeInTransitionSignal.add(Transition.fadeInTransition, this);
    this._fadeOutTransitionSignal = new Phaser.Signal();
    this._fadeOutTransitionSignal.add(Transition.fadeOutTransition, this);

    //InteractState
    this._createThoughtsSignal = new Phaser.Signal();
    this._createThoughtsSignal.add(InteractState.createThoughts, this);
    this._triggerInteractionSignal = new Phaser.Signal();
    this._triggerInteractionSignal.add(InteractState.createInteractionElements, this);
    this._endInteractionSignal = new Phaser.Signal();
    this._endInteractionSignal.add(InteractState.endInteraction, this);

    //LocationState
    this._displayImageSignal = new Phaser.Signal();
    this._displayImageSignal.add(LocationState.displayImage, this);
    this._hideDisplayedImageSignal = new Phaser.Signal();
    this._hideDisplayedImageSignal.add(LocationState.hideDisplayedImage, this);

    //Video
    this._videoSeekSignal = new Phaser.Signal();
    this._videoSeekSignal.add(Video.seekTo, this);

    //UI
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
    this._toggleSubtitleSignal.add(UI.toggleSubtitle, this);

    //Linkable
    this._goToLinkSignal = new Phaser.Signal();
    this._goToLinkSignal.add(Linkable.goToLink, this);
}

/***************************************************************
Getters
***************************************************************/
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Initialized once
const Text = __webpack_require__(3),
    Image = __webpack_require__(6),
    Graphic = __webpack_require__(10);

var _instance = null;
var _game = null;

var _currImage = null;
var _heightFraction = null;

var _overlayGraphicScrollBar = null;
var _overlayGraphicNoScrollBar = null;
var _overlayCloseButton = null;
var _overlayText = null;
var _scrollbarBg = null;
var _scrollbarDraggable = null;

const thoughtsTextKeyEnum = 'TEXT_THOUGHTS';
const closeOverlayImageKeyEnum = 'IMAGE_OVERLAY_CLOSE';
const infoOverlayTextKeyEnum= 'TEXT_INFO_OVERLAY';
const SCROLLBAR_IMAGE_KEY = 'scrollBar';
const SCROLLBAR_WHEEL_SENSITIVITY = 10;

var _effectiveScrollBarHeight = 0;
var _effectiveImageHeight = 0;

function CreateInfoOverlay() {    
    CreateOverlayGraphic();
    CreateOverlayCrossButton();
    CreateOverlayHelperText();
}

function CreateOverlayGraphic() {
    _overlayGraphicScrollBar = new Graphic(0, 0, Graphic.getEnum().Overlay);
    _overlayGraphicScrollBar.addGraphicToGame(_game);
    _overlayGraphicScrollBar.changeGraphic(_game, _game.global.constants.INFO_VIEW_MARGIN, true);

    _overlayGraphicNoScrollBar = new Graphic(0, 0, Graphic.getEnum().Overlay);
    _overlayGraphicNoScrollBar.addGraphicToGame(_game);
    _overlayGraphicNoScrollBar.changeGraphic(_game, _game.global.constants.INFO_VIEW_MARGIN, false);

    
    _scrollbarBg = new Graphic(0, 0, Graphic.getEnum().ScrollBarBackground);
    var rectangle = Graphic.createRectangle(_game.global.constants.SCROLLBAR_POS[0], _game.global.constants.SCROLLBAR_POS[1],
        _game.global.constants.SCROLLBAR_DIM[0], _game.global.constants.SCROLLBAR_DIM[1], 0x153b65, 0.8, 
        _game.global.constants.SCROLLBAR_STROKEWIDTH, 0xffffff);
    _scrollbarBg.addGraphicToGame(_game);
    _scrollbarBg.changeGraphic(_game, rectangle);
    //_scrollbarBg.setVisible(false);
    
    /*
    _scrollbarBg = new Graphic(0, 0);
    _scrollbarBg.drawRect(_game, _game.global.constants.SCROLLBAR_POS[0], _game.global.constants.SCROLLBAR_POS[1],
        _game.global.constants.SCROLLBAR_DIM[0], _game.global.constants.SCROLLBAR_DIM[1], 0x153b65, 1, 
        _game.global.constants.SCROLLBAR_STROKEWIDTH, 0xffffff);
    _scrollbarBg.setVisible(false);
        */

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
    var _heightFraction = _game.global.constants.INFO_VIEW_HEIGHT/_currImage.getHeight();

/*
_heightFraction = _game.global.constants.INFO_VIEW_HEIGHT/_currImage.getHeight();
if(_heightFraction >= 1) {
    console.warn('Images with a wider than 16:9 ratio is unsupported for proper viewing.')
    return;
}
*/
    _scrollbarDraggable.setHeight(_heightFraction*_game.global.constants.SCROLLBAR_DIM[1]);
    _scrollbarDraggable.setY(_game.global.constants.SCROLLBAR_POS[1]);

    _effectiveScrollBarHeight = _game.global.constants.SCROLLBAR_DIM[1] - _scrollbarDraggable.getHeight();
    _effectiveImageHeight = _currImage.getHeight() - _game.global.constants.INFO_VIEW_HEIGHT;


}

function HandleMouseWheel(enable) {
    if(enable) {
        _game.input.mouse.mouseWheelCallback = MouseWheel;
    }
    else {
        _game.input.mouse.mouseWheelCallback = null;
    }

    function MouseWheel(event) {
        var newY;
        var delta = _game.input.mouse.wheelDelta;
        if(delta > 0) {
            newY = _scrollbarDraggable.getY() - SCROLLBAR_WHEEL_SENSITIVITY;
            if(newY < _game.global.constants.INFO_VIEW_MARGIN)
                newY = _game.global.constants.INFO_VIEW_MARGIN;
        }
        else if(delta < 0){
            newY = _scrollbarDraggable.getY() + SCROLLBAR_WHEEL_SENSITIVITY;
            if(newY > _effectiveScrollBarHeight + _game.global.constants.INFO_VIEW_MARGIN)
                newY = _effectiveScrollBarHeight + _game.global.constants.INFO_VIEW_MARGIN;
        }
        _scrollbarDraggable.setY(newY);
        ScrollBarDragUpdate();
        //console.log(_game.input.mouse.wheelDelta);
    }
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
        _overlayCloseButton.setVisible(value);
        if(value) {
            if(image) {
                var scrollBarNeeded = image.checkIfScrollBarNeeded(_game);
                if(scrollBarNeeded) {
                    this.initializeScrollbar(image);
                    _overlayText.setVisible(true);
                    _overlayGraphicScrollBar.setVisible(true);
                    _scrollbarBg.setVisible(true);
                    _scrollbarDraggable.setVisible(true);
                    HandleMouseWheel(true);
                }
                else {
                    _overlayGraphicNoScrollBar.setVisible(true);
                }
                image.bringToTop();
            }
            _overlayCloseButton.bringToTop();
        }
        else {            
            _overlayText.setVisible(false);
            _scrollbarBg.setVisible(false);
            _scrollbarDraggable.setVisible(false);
            _overlayGraphicScrollBar.setVisible(false);
            _overlayGraphicNoScrollBar.setVisible(false);
            HandleMouseWheel(false);            
        }
    },
    resetThoughtVariables: function() {
        _text = [];
        _currentIndex = 0;        
    }
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instance = null;
var _game = null;
var _input = null;
var Input = __webpack_require__(32);

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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const StateManager = __webpack_require__(14),
    InteractState = __webpack_require__(19),
    LocationState = __webpack_require__(20),
    Icons = __webpack_require__(12),
    Choices = __webpack_require__(16),
    Thoughts = __webpack_require__(18),
    Transition = __webpack_require__(4),
    UI = __webpack_require__(5),
    Video = __webpack_require__(1);

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
    if(musicKey &&_bgMusicKey != musicKey) {
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Manu scenes.
***************************************************************/


const Group = __webpack_require__(7), 
    Input = __webpack_require__(37),
    Transition = __webpack_require__(4),
    State = __webpack_require__(8),
    Background = __webpack_require__(11),
    Video = __webpack_require__(1),
    Icons = __webpack_require__(12);

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Movie scene state without interaction.
***************************************************************/


//Dependencies
const Group = __webpack_require__(7),
    UI = __webpack_require__(5),
    Video = __webpack_require__(1),
    State = __webpack_require__(8),
    Background = __webpack_require__(11),
    SceneParser = __webpack_require__(15);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Utility state that selects next scene to go depending on scenes visited.
***************************************************************/



//Dependencies
const State = __webpack_require__(8),
    SceneParser = __webpack_require__(15);

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/***************************************************************
Game startup
****************************************************************/



//Dependencies
const Boot = __webpack_require__(30),
    Preload = __webpack_require__(31),
    StateManager = __webpack_require__(14),
    ResourceLoader = __webpack_require__(13);
    
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


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(44);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(28);
var Axios = __webpack_require__(46);
var defaults = __webpack_require__(21);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(25);
axios.CancelToken = __webpack_require__(45);
axios.isCancel = __webpack_require__(26);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(60);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(25);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(21);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(47);
var dispatchRequest = __webpack_require__(48);
var isAbsoluteURL = __webpack_require__(56);
var combineURLs = __webpack_require__(54);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(51);
var isCancel = __webpack_require__(26);
var defaults = __webpack_require__(21);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(27);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(61)
var ieee754 = __webpack_require__(63)
var isArray = __webpack_require__(64)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)))

/***/ }),
/* 63 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 64 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);