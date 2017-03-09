
define(['Modules/videoLoader', 'Modules/transition', 'States/State'], function(Video, Transition, State)  {
    "use strict";

    var _instance = null;
    var _stateInfo = null;

    return {
        init: function(scene, signal) { 
            if(_stateInfo === null)
                _stateInfo = new State();
            _stateInfo.setStateScene(scene);
            Video.init(this.game, signal);            
            if(_instance !== null)
                return _instance;
            _instance = this;
            return _instance;
        },
        preload: function() {
        },
        create: function() {     
            Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransition().fadeOut, Transition.getFadeOutSignal(), _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());     
            if(_stateInfo.getTransition().fadeIn)
                Transition.getFadeInSignal().dispatch();
        }
    }
    
});