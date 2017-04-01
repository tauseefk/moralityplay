"use strict";

const Linkable = require('./Linkable'),
    Animation = require('./Animation');

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
    _bitmapSprite.anchor.setTo(0.5, 0.5);
    _context = _bitmapCanvas.context;
}

function StartFilterFadeIn(signal) {    
    var linkable = new Linkable(_game, _bitmapSprite, signal);
    linkable.addOnClickAnimation(Animation.fade(_game, _bitmapSprite, 1, false));
    linkable.addOnClickAnimation(Animation.scale(_game, _bitmapSprite, false, _game.width, _game.height));
    linkable.onTrigger();
    _video.stop();
}

function EndFilter() {
    //var linkable = new Linkable(_game, _game.global.gameManager.getToggleUISignal());
    //linkable.addAnimation(Animation.fade(_game, _bitmapSprite, 0, false));
    Animation.fade(_game, _bitmapSprite, 0, true);
    //linkable.onTrigger();
    //linkable.triggerSignal(true);
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
    },
    getPaused: function() {
        return _video.paused;
    }
}
