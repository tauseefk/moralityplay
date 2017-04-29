/***************************************************************
Sound Manager. Handles playing of sounds in scenes.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
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
var _bgMusicKey = null;
var _soundHashSet = null;
var _currTime = 0;

//SoundManager singleton constructor
var SoundManager = function(game) {
    if(_instance !== null)
        return _instance;
    _instance = this;
    _game = game;
    _soundHashSet = {};
    return _instance;
}

/***************************************************************
Plays a sound.
***************************************************************/
SoundManager.prototype.playSound = function(soundKey) {
    if(!_soundHashSet[soundKey]) {
        _soundHashSet[soundKey] = _game.add.audio(soundKey);
    }
    _soundHashSet[soundKey].play();
}

/***************************************************************
Plays background music.
***************************************************************/
SoundManager.prototype.playBackgroundMusic = function(musicKey) {
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

/***************************************************************
Stops background music.
***************************************************************/
SoundManager.prototype.stopBackgroundMusic = function() {
    if(_bgMusic)
        _bgMusic.stop();
}

/***************************************************************
Sets current time of audio.
Unused.
***************************************************************/
SoundManager.prototype.setCurrentTime = function(time) {
    _currTime = time;
}

module.exports = SoundManager;
