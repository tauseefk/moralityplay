"use strict";

//ScenePartser constructor
var SceneParser = function() {
}

SceneParser.VisitAtLeastOnceOfEach = function(game, sceneSetArray) {
    var unlocked = true;
    for(var j=0; j<sceneSetArray.length; j++) {
        unlocked &= SceneParser.OneSceneVisited(game, sceneSetArray[j]);
    }
    return unlocked;
}

SceneParser.OneSceneVisited = function(game, sceneArr) {
    if(sceneArr){
        for(var i=0; i<sceneArr.length; i++) {
            if(game.global.visitedScenes[sceneArr[i]]) {
                return true;
            }
        }
    }
    return false;
}

SceneParser.AllSceneVisited = function(game, sceneArr) {
    if(sceneArr){
    	console.log(sceneArr);
        for(var i=0; i<sceneArr.length; i++) {
            if(!game.global.visitedScenes[sceneArr[i]]) {
            	console.log(sceneArr[i]);
            	console.log(game.global.visitedScenes[sceneArr[i]]);
                return false;
            }
        }
        return true;
    }
    else
    	return false;
}

SceneParser.GetIndexOfVisitedAll = function(game, sceneArr) {
    if(sceneArr){
        for(var i=0; i<sceneArr.length; i++) {
            if(SceneParser.AllSceneVisited(game, sceneArr[i])) {
                return i;
            }
        }
    }
    return false;
}

module.exports = SceneParser;
