
define(['Modules/resourceLoader', 'Modules/transition', 'Modules/videoLoader', 'States/menuState', 'States/locationState', 'States/interactState', 'States/flashbackState', 'States/movieState'], function(Resources, Transition, Video, MenuState, LocationState, InteractState, FlashbackState, MovieState)  {
    "use strict";

    var _instance = null;
    var _sceneChangeSignal = null;
    var _transitionSignal = null;
    var _game = null;

    var StateEnum = {
        MenuState: 'MenuState',
        InteractState: 'InteractState',
        FlashbackState: 'FlashbackState',
        MovieState: 'MovieState',
        LocationState: 'LocationState'
    }

    function changeScene(scene) {
        console.log(scene);
   //     Transition.fadeIn();
        var nextScene = Resources.getScene(scene);
        if(nextScene === null)
            console.warn("Scene: " + scene + "is undefined.");
        console.log("Changing scene to: " + nextScene.stateType);
        switch(nextScene.stateType) {
            case StateEnum.MenuState:                
                _game.state.start(nextScene.stateType, true, false, nextScene, _sceneChangeSignal);
                break;
            case StateEnum.InteractState:
                _game.state.start(nextScene.stateType, true, false, nextScene, _sceneChangeSignal);
                break;
            case StateEnum.FlashbackState:
                _game.state.start(nextScene.stateType, true, false, nextScene, _sceneChangeSignal);
                break;
            case StateEnum.MovieState:
                _game.state.start(nextScene.stateType, true, false, nextScene, _sceneChangeSignal);
                break;
            case StateEnum.LocationState:
                _game.state.start(nextScene.stateType, true, false, nextScene, _sceneChangeSignal);
                break;
            default:
                console.warn("Invalid State.");
        }
    }

    function startTransition() {
        Transition.fadeIn();
    }

    function addAllStates() {
        _game.state.add(StateEnum.MenuState, MenuState);
        _game.state.add(StateEnum.LocationState, LocationState);
        _game.state.add(StateEnum.InteractState, InteractState);
        _game.state.add(StateEnum.FlashbackState, FlashbackState);
        _game.state.add(StateEnum.MovieState, MovieState);
    }

    return {
        init: function() {
            console.log("Initializing StateManager");
            if(_instance !== null)
                return _instance;
            _instance = this;
            _game = this.game;
            _sceneChangeSignal = new Phaser.Signal();
            _sceneChangeSignal.add(changeScene, this);
            Transition.init(_game, _sceneChangeSignal);
            addAllStates();
            return _instance;
        },
        preload: function() {            
        },
        create: function() {
            Video.stop();
            changeScene(Resources.getStartSceneKey());
        }
    }
    
});