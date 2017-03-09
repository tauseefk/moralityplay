
define(['Modules/transition', 'States/State', 'Modules/movingObjectLoader', 'Modules/iconsLoader'], function(Transition, State, MovingBackground, Icons)  {
    "use strict";

    var _instance = null;
    var _stateInfo = null;
    var _signal = null;

    return {
        init: function(scene, signal) { 
            if(_stateInfo !== null)
                _stateInfo.setStateScene(scene);         
            if(_instance !== null)
                return _instance;
            _stateInfo = new State(scene);
            _signal = signal;            
            _instance = this;
            MovingBackground.init(this.game);
            Icons.init(this.game, signal);
            return _instance;
        },
        preload: function() {
        },
        create: function() {
        //    Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransition().fadeOut, Transition.getFadeOutSignal(), _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
            MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
            var icons = Icons.createMovingIcons(_stateInfo.getIcons());
            if(_stateInfo.getDraggable())
                MovingBackground.assignFollowIcons(icons);
            if(_stateInfo.getTransition().fadeIn)
                Transition.getFadeInSignal().dispatch();
        }
    }
    
});