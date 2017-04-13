"use strict";

const Transition = require('../Modules/transition'),
    Group = require('../Modules/groupLoader'),
    State = require('./State'),
    UI = require('../Modules/uiLoader'),
    MovingBackground = require('../Modules/movingObjectLoader'),
    Icons = require('../Modules/iconsLoader'),
    Video = require('../Modules/videoLoader'),
    Text = require('../Modules/Text');

var _instance = null;
var _stateInfo = null;
var _game = null;

module.exports = {
    init: function(scene) {
        Group.initializeGroups();        
        MovingBackground.init(this.game);
        Icons.init(this.game);
        Video.init(this.game);
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);
        if(_instance !== null)
            return _instance;
        _game = this.game;
        _stateInfo = new State(scene);
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        _game.global.soundManager.playBackgroundMusic(_stateInfo.getBackgroundMusic());        
        MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
        if(_stateInfo.getMovieSrc(_game.global.quality)) {
            Video.create(_stateInfo.getMovieSrc(_game.global.quality), _stateInfo.getTransitionInfo().fadeOut, _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
        }
        var icons = Icons.createNavigationIcons(_stateInfo.getIconsInfo(), _stateInfo.getLinkedIconsInfo());
        if(_stateInfo.getDraggable())
            MovingBackground.assignFollowIcons(icons);
        //UI.create(true, false);
        //var text = new Text('Click and drag to navigate', 430, 640, 'TEXT_MEANINGFUL_CHOICES', this.game.global.style.choicesTextProperties);
        //text.addToGame(this.game, this.game.mediaGroup);
        //text.fadeIn(this.game);
        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
    },
    shutdown: function() {
        Icons.destroy();        
        _game.global.soundManager.stopBackgroundMusic();
    },
    displayImage: function(index, hideSameType) {
        Icons.displayIcon(index, hideSameType);
    }
}
