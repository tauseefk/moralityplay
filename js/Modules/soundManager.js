"use strict";

const StateManager = require('../States/StateManager'),
    InteractState = require('../States/interactState'),
    LocationState = require('../States/locationState'),
    Icons = require('./iconsLoader'),
    Choices = require('./choiceLoader'),
    Thoughts = require('./thoughtsLoader'),
    Transition = require('./transition'),
    UI = require('./uiLoader'),
    Video = require('./videoLoader');

var _instance = null;
var _game = null;
var _bgMusic = null;
var _soundHashSet = null;


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
    if(_bgMusic)
        _bgMusic.stop();
    if(!_soundHashSet[musicKey]) 
        _soundHashSet[musicKey] = _game.add.audio(musicKey);
    _bgMusic =_soundHashSet[musicKey];
    _bgMusic.loop = true;
    _bgMusic.play();
}

SoundManager.prototype.stopBackgroundMusic = function() {
    if(_bgMusic)
        _bgMusic.stop();
}

module.exports = SoundManager;
