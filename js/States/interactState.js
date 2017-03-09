
define(['Modules/videoLoader', 'Modules/transition', 'Modules/iconsLoader', 'States/State'], function(Video, Transition, Icons, State)  {
    "use strict";

    var _stateInfo = null;
    var _instance = null;

    return {
        init: function(scene, signal) {
            if(_stateInfo !== null)
                _stateInfo.setStateScene(scene);
            Video.init(this.game, signal);
            Icons.init(this.game, signal);
            if(_instance !== null)
                return _instance;
            _stateInfo = new State(scene);
            _instance = this;
            return _instance;
        },
        preload: function() {
      //      Icons.preload();
        },
        create: function() { 
            Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransition().fadeOut, Transition.getFadeOutSignal(), _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
            Icons.create(_stateInfo.getThoughtIconKey(), _stateInfo.getThoughts(), _stateInfo.getChoices());
            if(_stateInfo.getTransition().fadeIn)
                Transition.getFadeInSignal().dispatch();
        }
    }
    
});