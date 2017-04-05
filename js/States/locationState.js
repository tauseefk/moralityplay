"use strict";

var _instance = null;
var _stateInfo = null;

const Transition = require('../Modules/transition'),
    Group = require('../Modules/groupLoader'),
    State = require('./State'),
    UI = require('../Modules/uiLoader'),
    MovingBackground = require('../Modules/movingObjectLoader'),
    Icons = require('../Modules/iconsLoader'),
    Text = require('../Modules/Text');

module.exports = {
    init: function(scene) {
        this.game.global.soundManager.init();
        Group.initializeGroups();        
        MovingBackground.init(this.game);
        Icons.init(this.game);
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);
        if(_instance !== null)
            return _instance;
        _stateInfo = new State(scene);
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
    //    this.game.global.soundManager.playBackgroundMusic('littleRootMusic');
    //    Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransition().fadeOut, Transition.getFadeOutSignal(), _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
        MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
        var icons = Icons.createExploratoryIcons(_stateInfo.getIconsInfo(), true);
        if(_stateInfo.getDraggable())
            MovingBackground.assignFollowIcons(icons);
        //UI.create(true, false);
        var text = new Text('Click and drag to navigate', 430, 640, 'TEXT_MEANINGFUL_CHOICES', this.game.global.style.choicesTextProperties);
        text.addToGame(this.game, this.game.mediaGroup);
        text.fadeIn(this.game);
        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
    },
    shutdown: function() {
        Icons.destroy();        
        this.game.global.soundManager.stopBackgroundMusic();
    },
    displayImage: function(index, hideSameType) {
        Icons.displayIcon(index, hideSameType);
    }
}
