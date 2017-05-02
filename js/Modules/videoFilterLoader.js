/***************************************************************
Draws bitmap overlays/underlays from video.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const Linkable = require('./Objects/Linkable'),
    Animation = require('./Objects/Animation');

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

/***************************************************************
Initializes bitmap overlay that will hold the video effect.
***************************************************************/
function InitializeBitmapOverlay(game) {
    _bitmapCanvas = game.add.bitmapData(game.width, game.height);
    _bitmapSprite = game.add.sprite(game.width/2, game.height/2, _bitmapCanvas);
    game.mediaGroup.add(_bitmapSprite);
    _bitmapSprite.alpha = 0;
    _bitmapSprite.anchor.setTo(0.5, 0.5);
    _context = _bitmapCanvas.context;
}

/***************************************************************
Initializes bitmap background that will capture video frame.
***************************************************************/
function InitializeBitmapBg(game){    
    _frameHolderBitmapCanvas = game.add.bitmapData(game.width, game.height);
    _frameHolderBitmapSprite = game.add.sprite(game.width/2, game.height/2, _frameHolderBitmapCanvas);
    _frameHolderBitmapSprite = game.stage.addChildAt(_frameHolderBitmapSprite, 0);
    _frameHolderBitmapSprite.anchor.setTo(0.5, 0.5);
    _contextBitmap = _frameHolderBitmapCanvas.context;
}

/***************************************************************
Fades in bitmap overlay during interaction moments.
***************************************************************/
function StartFilterFadeIn(signal) {
    var linkable = new Linkable(_game, _bitmapSprite, signal);
    linkable.addOnClickAnimation(Animation.fade(_game, _bitmapSprite, 1, false));
    linkable.addOnClickAnimation(Animation.scale(_game, _bitmapSprite, false, _game.width, _game.height));
    linkable.onTrigger();
}

/***************************************************************
Fades out bitmap overlay at the end of interaction moments.
***************************************************************/
function EndFilter() {
    Animation.fade(_game, _bitmapSprite, 0, true);
}

/***************************************************************
Starts rendering of video filter.
***************************************************************/
function CreateVideoFilter() {
    Render();
};

/***************************************************************
Sets repeating function that draws on the bitmap overlay.
***************************************************************/
function Render() {
    _game.time.events.repeat(_game.global.constants.FILTER_REFRESH_INTERVAL, 1, Render, this);
    if(_bitmapSprite.alpha > 0 && _bitmapSprite.alpha < 1) {
        RenderFrame();
    }
    /*
    setTimeout(function() {
        render();
    }, 10)
    */
};

/***************************************************************
Applies the special effect on the bitmap overlay.
Relies of JSManipulate library to perform effect.
***************************************************************/
function RenderFrame() {
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

        //Gets html video elements and game canvas
        _instance = this;
        _game = game;
        _video = video;
        _videoHTML = _video.video;
        _canvas = game.canvas;

        InitializeBitmapBg(_game);

        //Creates html canvas to store bitmap data
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
    endFilter: function() {
        EndFilter();
    }
}
