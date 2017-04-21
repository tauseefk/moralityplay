"use strict";

const Group = require('../Modules/groupLoader'), 
    Input = require('../Modules/inputLoader'),
    Transition = require('../Modules/transition'),
    State = require('./State'),
    MovingBackground = require('../Modules/movingObjectLoader'),
    Video = require('../Modules/videoLoader'),
    Icons = require('../Modules/iconsLoader');

var _instance = null;
var _stateInfo = null;
var _game = null;
var _input = [];

function setPlayerName(game) {
    if(_input[0])
        return function() {game.global.playerName = _input[0].getInput().text._text;};
    else {
        "Input not eneabled.";
    }
}

function updatePlayerNameCallback(game) {
    game.state.onShutDownCallback = setPlayerName(game);
}

module.exports = {
    init: function(scene) {
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);        
        //this.game.global.soundManager.init();
        MovingBackground.init(this.game);
        Icons.init(this.game);
        Input.init(this.game);
        _game = this.game;
        if(_instance !== null)
            return _instance;
        _instance = this;
        _stateInfo = new State(scene);
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        _input = [];
        Group.initializeGroups();
        //updatePlayerNameCallback(this.game);
        var videoSrc = _stateInfo.getMovieSrc(_game.global.quality);
        if(videoSrc)
            Video.create(_stateInfo.getMovieSrc(_game.global.quality),  _stateInfo.getTransitionInfo().fadeOut, _stateInfo.getVideoFilter());
        else
            MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
        Icons.createExploratoryIcons(_stateInfo.getIconsInfo());
        //_input = Input.create(_stateInfo.getInputInfo());
        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
    },
    update: function() {
        _input.forEach(function(element) {
            element.getInput().update();
        });
    }
}
