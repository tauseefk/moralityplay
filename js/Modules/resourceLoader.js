"use strict";
var Filter = require('./filter');
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
