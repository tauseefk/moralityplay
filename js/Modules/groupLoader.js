/***************************************************************
Phaser groups that are used in the experience is here.
Author: Christopher Weidya
***************************************************************/
"use strict";

var _instance = null;
var _game = null;

/***************************************************************
Adds the groups to game.
***************************************************************/
function InitializeGroups() {        
    _game.mediaGroup = _game.add.group();
    _game.uiGroup = _game.add.group();
}

module.exports = {
    init: function(game) {
        //Singleton initialization
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    initializeGroups: function() {
        InitializeGroups();
    }
}


