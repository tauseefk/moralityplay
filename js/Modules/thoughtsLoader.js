"use strict";

//Initialized once
var Text = require('./Text'),
    _instance = null,
    _game = null,
    _text = [];

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
        _text = [];
        for(var i=0; i < info.size; i++) {
            _text.push(new Text(info.content[i], coords[0], coords[1], _game.global.style.thoughtsTextProperties));
            _text[i].addToGame(_game, _game.mediaGroup);
            _text[i].changeText(_game, 'TEXT_THOUGHTS', info.destination[i][0], info.destination[i][1]);
        };
    },
    endInteraction: function() {
        _text.forEach(function(text) {
            text.fadeOut(_game);
        });
    }
}
