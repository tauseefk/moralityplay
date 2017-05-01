/***************************************************************
Manu scene
Author: Christopher Weidya
***************************************************************/
"use strict";

const Group = require('../Modules/groupLoader'),
    Input = require('../Modules/inputLoader'),
    Transition = require('../Modules/transition'),
    State = require('./State'),
    Background = require('../Modules/backgroundLoader'),
    Video = require('../Modules/videoLoader'),
    Icons = require('../Modules/iconsLoader');

var _instance = null;
var _stateInfo = null;
var _game = null;
var _input = [];

//Unused, for phaser input extension.
function setPlayerName(game) {
    if(_input[0])
        return function() {game.global.playerName = _input[0].getInput().text._text;};
    else {
        "Input not eneabled.";
    }
}

//Unused, for phaser input extension.
function updatePlayerNameCallback(game) {
    game.state.onShutDownCallback = setPlayerName(game);
}

module.exports = {
    init: function(scene) {
        //Sets new scene information
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);

        //Initializes game variables
        Group.initializeGroups();

        //Intitalize singleton variables
        if(_instance !== null)
            return _instance;
        Background.init(this.game);
        Icons.init(this.game);
        Input.init(this.game);
        _game = this.game;
        _instance = this;
        _stateInfo = new State(scene);
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        //Unused input reset
        _input = [];

        //Creates video or background image depending on source
        var videoSrc = _stateInfo.getMovieSrc(_game.global.quality);
        if(videoSrc)
            Video.create(videoSrc, _stateInfo.getTransitionInfo().fadeOut, _stateInfo.getVideoFilter());
        else
            Background.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());

        //Create Icons
        Icons.createClickableIcons(_stateInfo.getIconsInfo());

        //Executes when scene is of this name
        if(_game.global.currentSceneName === _game.global.mapping.postEndingSceneName)
            $('#userInfoModal').modal('show');

        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
    },
    shutdown: function() {
        Icons.destroy();
    },
    //Unused, for phaser input extension
    update: function() {
        _input.forEach(function(element) {
            element.getInput().update();
        });
    }
}
