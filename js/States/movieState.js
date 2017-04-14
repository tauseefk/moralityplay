"use strict";

const Group = require('../Modules/groupLoader'),
    UI = require('../Modules/uiLoader'),
    Video = require('../Modules/videoLoader'),
    Transition = require('../Modules/transition'),
    State = require('./State'),
    MovingBackground = require('../Modules/movingObjectLoader');

var _instance = null;
var _game = null;
var _stateInfo = null;

module.exports = {
    init: function(scene, signal) {
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);
        Video.init(this.game, signal);
        MovingBackground.init(this.game);
        if(_instance !== null)
            return _instance;
        _stateInfo = new State(scene);
        _game = this.game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        Group.initializeGroups();
        if(_stateInfo.getBgImageKey())
            MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
        var movieSrc = _stateInfo.getMovieSrc(_game.global.quality);
        Video.create(movieSrc, _stateInfo.getTransitionInfo().fadeOut, _stateInfo.getVideoFilter(), _stateInfo.getNextScenes(), _stateInfo.getMovieSubKey());
        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
        UI.create(true, true);
    }
}
