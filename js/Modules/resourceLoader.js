//Dependency: Nonde

define(['Modules/filter'], function(Filter) {
    "use strict";

    var _instance = null;
    var _game = null;
    var _startSceneKey = 'startScene';
    var _data = null;
    var _videos = null;
    var _images = null;
    var _scenes = null;
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

    return {
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
            return _instance;
        },
        preload: function() {   
        //    Filter.preload();  
            console.log("Loading resources");
            loadImages(_images);

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

});
