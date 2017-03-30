"use strict";

var _instance = null;
var _stateInfo = null;
var Transition = require('../Modules/transition'),
    Group = require('../Modules/groupLoader'),
    State = require('./State'),
    UI = require('../Modules/uiLoader'),
    MovingBackground = require('../Modules/movingObjectLoader'),
    Icons = require('../Modules/iconsLoader');

module.exports = {
    init: function(scene) {
        Group.initializeGroups();
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);
        if(_instance !== null)
            return _instance;
        _stateInfo = new State(scene);
        _instance = this;
        MovingBackground.init(this.game);
        Icons.init(this.game);
        return _instance;
    },
    preload: function() {
    },
    create: function() {
    //    Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransition().fadeOut, Transition.getFadeOutSignal(), _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
        MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
        var icons = Icons.createExploratoryIcons(_stateInfo.getIconsInfo());
        if(_stateInfo.getDraggable())
            MovingBackground.assignFollowIcons(icons);
        UI.create(true, false);
        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
    },
    shutdown: function() {
        Icons.destroy();
    },
    displayImage: function(index, hideSameType) {
        Icons.displayIcon(index, hideSameType);
    }
}
