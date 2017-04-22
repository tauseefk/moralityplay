/***************************************************************
Movie scene state without interaction.
***************************************************************/
"use strict";

//Dependencies
const Group = require('../Modules/groupLoader'),
    UI = require('../Modules/uiLoader'),
    Video = require('../Modules/videoLoader'),
    State = require('./State'),
    Background = require('../Modules/backgroundLoader'),
    SceneParser = require('../Modules/SceneParser');

var _instance = null;
var _game = null;
var _stateInfo = null;

const START_SCENE_NAME = 'startScene';

/***************************************************************
Selects movie source depending on scenes visited.
***************************************************************/
function GetMovieSrc(state) {
    var SrcList = state.getSrcList();
    var index = null;
    if(SrcList) {
        index = SceneParser.GetIndexOfVisitedAll(_game, SrcList[0]);
        if(typeof(index) != 'number')
            console.warn("No valid requirements met for movie source selection.");
        console.log(index);
    }
    return state.getMovieSrc(_game.global.quality, index);
}

module.exports = {
    init: function(scene, signal) {
        //Sets new scene information
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);

        //Initialize game variables
        Group.initializeGroups();

        //Singleton variable initialization
        if(_instance !== null)
            return _instance;
        Video.init(this.game, signal);
        Background.init(this.game);
        _stateInfo = new State(scene);
        _game = this.game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        _game.global.soundManager.stopBackgroundMusic();

        Background.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());

        Video.create(GetMovieSrc(_stateInfo), _stateInfo.getTransitionInfo().fadeOut, 
            _stateInfo.getVideoFilter(), _stateInfo.getNextScenes(), _stateInfo.getMovieSubKey());

        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
        
        if(_game.global.currentSceneName !== START_SCENE_NAME)
            UI.create(true, true);
    }
}
