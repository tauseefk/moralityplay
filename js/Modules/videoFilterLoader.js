define(['Lib/jsmanipulate.min'], function() {
    "use strict";

    var _instance = null;
    var _game = null;
    var _video = null;
    var _videoHTML = null;
    var _bitmapCanvas = null;
    var _canvas = null;
    var _context = null;
    var _framebuffer = null;
    var _effect = null;
    const REFRESH_TIME_MS = 10;

    function createVideoFilter(filter) {
        if(filter in JSManipulate) {
            _effect = JSManipulate[filter];
            _game.time.reset();
            render();
        //_game.time.events.repeat(10, 1, render, this);
        }
    };

    function render() {
        if(!_video.playing)
            return;
        renderFrame();
        _game.time.events.repeat(REFRESH_TIME_MS, 1, render, this);
        /*
        setTimeout(function() {
            render();
        }, 10)
        */
    };

    function renderFrame() {
        _context.drawImage(_videoHTML, 0, 0, _video.width,
            _video.height, 0, 0, _game.width, _game.height);
        var data = _context.getImageData(0, 0, _game.width, _game.height);
        _effect.filter(data, _effect.defaultValues);
        _context.putImageData(data, 0, 0);
        return;
    };

    function stopVideo() {
        if(_video !== null)
            _video.stop();
    }

    return {
        init: function(game, video) {
            console.log("Filter initialized");
            //Initialize and add filter canvas before loading to ensure proper object layering (icons on top of filter canvas) 
            _bitmapCanvas = game.add.bitmapData(game.width, game.height);  
            game.add.sprite(0, 0, _bitmapCanvas);
            _context = _bitmapCanvas.context;
            if(_instance !== null) 
                return _instance;
            _video = video;
            _videoHTML = _video.video;
            _instance = this;            
            _game = game;
            _canvas = game.canvas;
            _framebuffer = document.createElement("canvas");
            _framebuffer.width = _game.width;
            _framebuffer.height = _game.height;
            _framebuffer.context = _framebuffer.getContext("2d");
            return _instance;
        },
        create: function(filter) {
            createVideoFilter(filter);
        },
        stop: function() {
            _video.stop();
        }
    }
    return _instance;
});
