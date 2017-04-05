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


