
define(['Modules/inputLoader', 'Modules/transition', 'States/State', 'Modules/movingObjectLoader', 'Modules/iconsLoader'], function(Input, Transition, State, MovingBackground, Icons)  {
    "use strict";

    var _instance = null;
    var _stateInfo = null;
    var _signal = null;
    var _input = [];

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
            Input.init(this.game);
            return _instance;
        },
        preload: function() {
        },
        create: function() {
            _input = [];
            //Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransition().fadeOut, Transition.getFadeOutSignal(), _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
            MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
            Icons.createMovingIcons(_stateInfo.getIcons());
            _input = Input.create(_stateInfo.getInput());
            console.log(_input[0].getInput(0));
            if(_stateInfo.getTransition().fadeIn)
                Transition.getFadeInSignal().dispatch();
        },
        update: function() {
            _input.forEach(function(element) {

                element.getInput().update();
            });
        }
    }
    
});