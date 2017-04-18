"use strict";

var State = function(scene) {
  this._scene = scene;
};

State.prototype.setStateScene = function(scene) {
  this._scene = scene;
};

State.prototype.getMovieKey = function() {
  return this._scene.movieKey;
}

State.prototype.getChoiceMoments = function() {
  return this._scene.choiceMoments;
}

State.prototype.getThoughtBubble = function(index) {
  return this._scene.choiceMoments.choiceMomentsProperties[index].thoughtBubbles;
}

State.prototype.getChoices = function(index){
  return this._scene.choiceMoments.choiceMomentsProperties[index].choices;
}

State.prototype.getChoicesFromThoughtMoment = function(index){
  return this._scene.choiceMoments.choiceMomentsProperties[index].thoughtBubbles.choices;
}
/*
State.prototype.getThoughtsInfo = function() {
  return this._scene.thoughts;
}
State.prototype.getChoicesInfo = function() {
  return this._scene.choices;
}
State.prototype.getThoughtIconKey = function() {
  return this._scene.thoughtIconKey;
}*/

State.prototype.getBgImageKey = function() {
  return this._scene.bgImageKey;
}

State.prototype.getIconsInfo = function() {
  return this._scene.icons;
}

State.prototype.getLinkedIconsInfo = function() {
  return this._scene.linkedIcons;
}

State.prototype.getInputInfo = function() {
  return this._scene.input;
}

State.prototype.getSrcList = function() {
  if(!this._scene.movieReqs || !this._scene.movieSrcArr) 
    return false;
  else {
    return [this._scene.movieReqs, this._scene.movieSrcArr];
  }
}

State.prototype.getMovieSrc = function(definition, index) {
  if(typeof(index) == 'number') {    
    if(definition == 'HD')
      return this._scene.movieSrcArr[index][0];
    else if(definition == 'SD')       
      return this._scene.movieSrcArr[index][1];
  }
  else {
    if(definition == 'HD')
      return this._scene.movieSrcHD;
    else if(definition == 'SD')
      return this._scene.movieSrcSD;
  }
}

State.prototype.getSceneReqs = function() {
  return this._scene.sceneReqs;
}

State.prototype.getSceneTargetNames = function() {
  return this._scene.sceneTargetNames;
}

State.prototype.getMovieSubKey = function() {
  return this._scene.sub;
}

State.prototype.getBackgroundMusic = function() {
  return this._scene.backgroundMusic;
}

State.prototype.getTransitionInfo = function() {
  return this._scene.transition;
}

State.prototype.getVideoFilter = function() {
  return this._scene.videoFilter;
}

State.prototype.getNextScenes = function() {
  return this._scene.nextScene;
}

State.prototype.getDraggable = function() {
  return this._scene.draggable;
}
/*
State.prototype.getEndingScene = function(visitedScenes) {
  if(!this._scene.endingScenes)
    return false;
  else {

  }
  return this._scene.
}
*/
module.exports = State;
