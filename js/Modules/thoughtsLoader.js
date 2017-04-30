/***************************************************************
Creates text that appears after clicking thought bubbles.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const Text = require('./Objects/Text');

var _instance = null;
var _game = null;

var _text = [];
var _currentIndex = 0;

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
            _text.push(new Text(info.content[i], coords[0], coords[1], Text.getEnum().Thoughts, _game.global.style.thoughtsTextProperties));
            _text[_currentIndex].addTextToGame(_game, _game.mediaGroup);
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
