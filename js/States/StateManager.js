/***************************************************************
Manages creation and transitions between state types. 
***************************************************************/

"use strict";

//Dependencies
const Resources = require('../Modules/resourceLoader'),
    Group = require('../Modules/groupLoader'),
    Transition = require('../Modules/transition'),
    UI = require('../Modules/uiLoader'),
    Video = require('../Modules/videoLoader'),
    MenuState = require('./menuState'),
    LocationState = require('./locationState'),
    InteractState = require('./interactState'),
    SwitchState = require('./switchState'),
    MovieState = require('./movieState'),
    Subtitle = require('../Modules/subtitleLoader');

var _stateManagerInstance = null;
var _transitionSignal = null;
var _game = null;

var StateEnum = {
    MenuState: 'MenuState',
    InteractState: 'InteractState',
    SwitchState: 'SwitchState',
    MovieState: 'MovieState',
    LocationState: 'LocationState'
}

/***************************************************************
Changes state according to scene name.
***************************************************************/
function ChangeScene(sceneName) {
    var nextScene = Resources.getScene(sceneName);
    if(nextScene === null)
        console.warn("Scene: " + sceneName + "is undefined.");
    else
        console.log("Changing scene to: " + nextScene.stateType);
    
    switch(nextScene.stateType) {
        case StateEnum.MenuState:
        case StateEnum.InteractState:
        case StateEnum.SwitchState:
        case StateEnum.MovieState:
        case StateEnum.LocationState:
            _stateManagerInstance.start(nextScene.stateType, true, false, nextScene);
            break;
        default:
            console.warn("Invalid State.");
    }
}

/***************************************************************
Adds all state types to manager.
***************************************************************/
function AddAllStates() {
    _stateManagerInstance.add(StateEnum.MenuState, MenuState);
    _stateManagerInstance.add(StateEnum.LocationState, LocationState);
    _stateManagerInstance.add(StateEnum.InteractState, InteractState);
    _stateManagerInstance.add(StateEnum.SwitchState, SwitchState);
    _stateManagerInstance.add(StateEnum.MovieState, MovieState);
}

//Unused, phaser input extension
function ChangePlayerName() {
    return function() {
        this.game.playerName = MenuState.getPlayerName();_input[0].getInput().text;
        console.log("this.game.playerName");
    };
}

/***************************************************************
Test function for ending state switches
***************************************************************/
function SceneTestCase() {
    _game.global.visitedScenes['MK2bad'] = true;
    _game.global.visitedScenes['an2good'] = true;
    _game.global.visitedScenes['li2good'] = true;
    console.log(_game.global.visitedScenes);
}

module.exports = {
    init: function() {
        console.log("Initializing StateManager");

        //Statemanager singleton initialization
        if(_stateManagerInstance !== null)
            return _stateManagerInstance;
        _stateManagerInstance = this.game.state;
        _game = this.game;
        Group.init(_game);
        Subtitle.init(this.game);
        Transition.init(_game);
        AddAllStates();
        UI.init(_game);
        return _stateManagerInstance;
    },
    preload: function() {
    },
    create: function() {
        _game.global.gameManager.getChangeSceneSignal().dispatch(Resources.getStartSceneKey());
    },
    changeScene: function(sceneName) {
        _game.mediaGroup.removeAll();
        _game.global.visitedScenes[sceneName] = true;
        _game.global.currentSceneName = sceneName;
        //SceneTestCase();
        ChangeScene(sceneName);
    }
}
