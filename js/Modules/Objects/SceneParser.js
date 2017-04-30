/***************************************************************
Helper module that checks for scene lock/unlock conditions.
Author: Christopher Weidya
***************************************************************/
"use strict";

//SceneParser constructor
var SceneParser = function() {
}

/***************************************************************
At least one scene visited in each set. 
***************************************************************/
SceneParser.VisitAtLeastOnceOfEach = function(game, sceneSetArray) {
    var unlocked = true;
    for(var j=0; j<sceneSetArray.length; j++) {
        unlocked &= SceneParser.OneSceneVisited(game, sceneSetArray[j]);
    }
    return unlocked;
}

/***************************************************************
At least one scene visited in this array.
***************************************************************/
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

/***************************************************************
All scenes in the array visited.
***************************************************************/
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

/***************************************************************
Returns the index of the set that has all scenes inside visited.
***************************************************************/
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
