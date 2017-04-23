/***************************************************************
State for location scenes.
***************************************************************/

"use strict";

const Transition = require('../Modules/transition'),
    Group = require('../Modules/groupLoader'),
    State = require('./State'),
    UI = require('../Modules/uiLoader'),
    Background = require('../Modules/backgroundLoader'),
    Icons = require('../Modules/iconsLoader'),
    Video = require('../Modules/videoLoader');

var _instance = null;
var _stateInfo = null;
var _game = null;
var _overlayGraphic = null;

module.exports = {
    init: function(scene) {
        //Sets new scene info
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);

        //Initialize game variables
        Group.initializeGroups();

        //Singleton initialization
        if(_instance !== null)
            return _instance;
        Icons.init(this.game);
        Background.init(this.game);        
        Video.init(this.game);
        _game = this.game;
        _stateInfo = new State(scene);
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        Video.clearFilterBg();

        _game.global.soundManager.playBackgroundMusic(_stateInfo.getBackgroundMusic());

        Background.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());

        Video.create(_stateInfo.getMovieSrc(_game.global.quality), _stateInfo.getTransitionInfo().fadeOut, 
            _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());

        var icons = Icons.createNavigationIcons(_stateInfo.getIconsInfo(), _stateInfo.getLinkedIconsInfo());

        if(_stateInfo.getDraggable())
            Background.attachIconsToBg(icons);

        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();

        UI.createInfoOverlay();
    },
    shutdown: function() {
        Icons.destroy();
        Video.resetVideoVariables();
    },
    displayImage: function(targetIndex, clickedIndex) {
        Icons.displayIcon(targetIndex, clickedIndex);
    },
    hideDisplayedImage: function() {
        Icons.hideDisplayedIcon();
    }
}
