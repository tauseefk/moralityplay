
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
    State.prototype.getThoughts = function() {
      return this._scene.thoughts;
    }
    State.prototype.getChoices = function() {
      return this._scene.choices;
    }
    State.prototype.getThoughtIconKey = function() {
      return this._scene.thoughtIconKey;
    }

    State.prototype.getBgImageKey = function() {
      return this._scene.bgImageKey;
    }

    State.prototype.getIcons = function() {
      return this._scene.icons;
    }

    State.prototype.getInput = function() {
      return this._scene.input;
    }

    State.prototype.getMovieSrc = function() {
      return this._scene.movieSrc;
    }

    State.prototype.getTransition = function() {
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