"use strict";

const State = require('./State'),
    SceneParser = require('../Modules/SceneParser');

var _instance = null;
var _stateInfo = null;
var _game = null;

function GetSceneNameFromReqs(stateInfo) {
    var sceneReqs = stateInfo.getSceneReqs();    
    var index = null;
    if(sceneReqs) {
        index = SceneParser.GetIndexOfVisitedAll(_game, sceneReqs);
        if(typeof(index) != 'number')
            console.warn("No valid requirements met for movie source selection.");
        console.log(index);
    }
    return stateInfo.getSceneTargetNames()[index];
}

module.exports = {
    init: function(scene, signal) {
        if(_stateInfo !== null)
            _stateInfo.setStateScene(scene);
        _stateInfo = new State(scene);
        _instance = this;
        _game = this.game;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        var targetSceneName =GetSceneNameFromReqs(_stateInfo);
        _game.global.gameManager.getChangeSceneSignal().dispatch(targetSceneName);
    }
}
