"use strict";

const Resources = require('../Modules/resourceLoader'),
    Group = require('../Modules/groupLoader'),
    Transition = require('../Modules/transition'),
    UI = require('../Modules/uiLoader'),
    Video = require('../Modules/videoLoader'),
    MenuState = require('./menuState'),
    LocationState = require('./locationState'),
    InteractState = require('./interactState'),
    FlashbackState = require('./flashbackState'),
    MovieState = require('./movieState'),
    Subtitle = require('../Modules/subtitleLoader');

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

function ChangeScene(sceneName) {
    var nextScene = Resources.getScene(sceneName);
    if(nextScene === null)
        console.warn("Scene: " + sceneName + "is undefined.");
    if(nextScene)
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

function CheckVisited(sceneName) {
    console.log(sceneName);
    var scene = Resources.getScene(sceneName);
    if(scene.visited && scene.alternateSceneName) {
        Resources.setVisitedScene(sceneName);
        scene = Resources.getScene(scene.alternateSceneName);
    }
    return scene;
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

function SceneTestCase() {
    _game.global.visitedScenes['MK3bad'] = true;
    _game.global.visitedScenes['indian2bad'] = true;
    _game.global.visitedScenes['asian2bad'] = true;
    console.log(_game.global.visitedScenes);
}

module.exports = {
    init: function() {
        console.log("Initializing StateManager");
        if(_stateManagerInstance !== null)
            return _instance;
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
        Video.stop();
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
