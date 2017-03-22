
define(['Modules/groupLoader', 'Modules/uiLoader', 'Modules/videoLoader', 'Modules/transition', 'States/State'], function(Group, UI, Video, Transition, State)  {
    "use strict";

    var _instance = null;
    var _stateInfo = null;

    return {
        init: function(scene, signal) { 
            if(_stateInfo !== null)
                _stateInfo.setStateScene(scene);
            Video.init(this.game, signal);
            if(_instance !== null)
                return _instance;
            _stateInfo = new State(scene);
            _instance = this;
            return _instance;
        },
        preload: function() {
        },
        create: function() {
            Group.initializeGroups();
            Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransitionInfo().fadeOut, _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());     
            if(_stateInfo.getTransitionInfo().fadeIn)
                this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
            UI.create();
        }
    }
    
});