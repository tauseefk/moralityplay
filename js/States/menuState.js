
define(['Modules/inputLoader', 'Modules/transition', 'States/State', 'Modules/movingObjectLoader', 'Modules/iconsLoader'], function(Input, Transition, State, MovingBackground, Icons)  {
    "use strict";

    var _instance = null;
    var _stateInfo = null;
    var _changeSceneSignal = null;
    var _input = [];

    function setPlayerName(game) {
        if(_input[0])
            return function() {game.global.playerName = _input[0].getInput().text._text;};
        else {
            "Input not eneabled.";
        }
    }

    function updatePlayerNameCallback(game) {
        game.state.onShutDownCallback = setPlayerName(game);
    }

    return {
        init: function(scene, signal) { 
            if(_stateInfo !== null)
                _stateInfo.setStateScene(scene);         
            if(_instance !== null)
                return _instance;            
            _instance = this;            
            _stateInfo = new State(scene);
            _changeSceneSignal = signal;
            MovingBackground.init(this.game);
            Icons.init(this.game, _changeSceneSignal);
            Input.init(this.game);
            return _instance;
        },
        preload: function() {
        },
        create: function() {
            _input = [];
            updatePlayerNameCallback(this.game); 
            //Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransition().fadeOut, Transition.getFadeOutSignal(), _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
            MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
            Icons.createExploratoryIcons(_stateInfo.getIconsInfo());
            //_input = Input.create(_stateInfo.getInputInfo());
            if(_stateInfo.getTransitionInfo().fadeIn)
                this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
        },
        update: function() {
            _input.forEach(function(element) {
                element.getInput().update();
            });
        }
    }
    
});