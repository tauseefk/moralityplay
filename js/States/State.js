
define(function()  {
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

    State.prototype.getInputInfo = function() {
      return this._scene.input;
    }

    State.prototype.getMovieSrc = function() {
      return this._scene.movieSrc;
    }

    State.prototype.getTransitionInfo = function() {
      return this._scene.transition;
    }

    State.prototype.getVideoFilter = function() {
      return this._scene.videoFilter;
    }

    State.prototype.getNextScenes = function() {
      return this._scene.nextScenes;
    }

    State.prototype.getDraggable = function() {
      return this._scene.draggable;
    }


    return State;
});