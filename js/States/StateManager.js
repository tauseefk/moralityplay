
define(['Modules/resourceLoader', 'Modules/groupLoader', 'Modules/transition', 'Modules/uiLoader', 'Modules/videoLoader', 'States/menuState', 'States/locationState', 'States/interactState', 'States/flashbackState', 'States/movieState'], 
    function(Resources, Group, Transition, UI, Video, MenuState, LocationState, InteractState, FlashbackState, MovieState)  {
    "use strict";

    var _stateManagerInstance = null;
    var _transitionSignal = null;
    var _game = null;

    var StateEnum = {
        MenuState: 'MenuState',
        InteractState: 'InteractState',
        FlashbackState: 'FlashbackState',
        MovieState: 'MovieState',
        LocationState: 'LocationState'
    }

    function ChangeScene(scene) {
        var nextScene = Resources.getScene(scene);
        if(nextScene === null)
            console.warn("Scene: " + scene + "is undefined.");
        console.log("Changing scene to: " + nextScene.stateType);
        switch(nextScene.stateType) {
            case StateEnum.MenuState:                
                _stateManagerInstance.start(nextScene.stateType, true, false, nextScene);
                break;
            case StateEnum.InteractState:
                _stateManagerInstance.start(nextScene.stateType, true, false, nextScene);
                break;
            case StateEnum.FlashbackState:
                _stateManagerInstance.start(nextScene.stateType, true, false, nextScene);
                break;
            case StateEnum.MovieState:
                _stateManagerInstance.start(nextScene.stateType, true, false, nextScene);
                break;
            case StateEnum.LocationState:
                _stateManagerInstance.start(nextScene.stateType, true, false, nextScene);
                break;
            default:
                console.warn("Invalid State.");
        }
    }

    function AddAllStates() {
        _stateManagerInstance.add(StateEnum.MenuState, MenuState);
        _stateManagerInstance.add(StateEnum.LocationState, LocationState);
        _stateManagerInstance.add(StateEnum.InteractState, InteractState);
        _stateManagerInstance.add(StateEnum.FlashbackState, FlashbackState);
        _stateManagerInstance.add(StateEnum.MovieState, MovieState);
    }

    function ChangePlayerName() {
        return function() {
            this.game.playerName = MenuState.getPlayerName();_input[0].getInput().text;
            console.log("this.game.playerName");
        };
    }

    return {
        init: function() {
            console.log("Initializing StateManager");
            if(_stateManagerInstance !== null)
                return _instance;
            _stateManagerInstance = this.game.state;
            _game = this.game;
            Group.init(_game);
            Transition.init(_game);
            AddAllStates();
            UI.init(_game);
            return _stateManagerInstance;
        },
        preload: function() {            
        },
        create: function() {
            Video.stop();
            _game.global.gameManager.getChangeSceneSignal().dispatch(Resources.getStartSceneKey());
        },
        changeScene: function(scene) {
            _game.mediaGroup.removeAll();
            ChangeScene(scene);
        }
    }
    
});