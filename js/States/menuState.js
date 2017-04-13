"use strict";

const Group = require('../Modules/groupLoader'), 
    Input = require('../Modules/inputLoader'),
    Transition = require('../Modules/transition'),
    State = require('./State'),
    MovingBackground = require('../Modules/movingObjectLoader'),
    Icons = require('../Modules/iconsLoader');

var _instance = null;
var _stateInfo = null;
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
        this.game.global.soundManager.init();
        MovingBackground.init(this.game);
        Icons.init(this.game);
        Input.init(this.game);
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
        //Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransition().fadeOut, Transition.getFadeOutSignal(), _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
        MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
        Icons.createExploratoryIcons(_stateInfo.getIconsInfo(), false);
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
