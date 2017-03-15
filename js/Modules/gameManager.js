
define(['States/StateManager', 'States/interactState', 'Modules/transition'], function(StateManager, InteractState, Transition)  {
    "use strict";

    var _instance = null;
    var _game = null;

    var GameManager = function() {
        if(_instance === null)
            _instance = this;

        this._changeSceneSignal = null;

        this._fadeInTransitionSignal = null;
        this._fadeOutTransitionSignal = null;

        this._triggerInteractionSignal = null;
        this._endInteractionSignal = null;

        return _instance;
    }    

    GameManager.prototype.initSignals = function() {        
        this._changeSceneSignal = new Phaser.Signal();
        this._changeSceneSignal.add(StateManager.changeScene, this);

        this._fadeInTransitionSignal = new Phaser.Signal();
        this._fadeInTransitionSignal.add(Transition.fadeInTransition, this);
        this._fadeOutTransitionSignal = new Phaser.Signal();
        this._fadeOutTransitionSignal.add(Transition.fadeOutTransition, this);

        this._triggerInteractionSignal = new Phaser.Signal();
        this._triggerInteractionSignal.add(InteractState.createThought, this);
        this._endInteractionSignal = new Phaser.Signal();
        this._endInteractionSignal.add(InteractState.endInteraction, this)
    }

    GameManager.prototype.getChangeSceneSignal = function() {
        return this._changeSceneSignal;
    }

    GameManager.prototype.getFadeInTransitionSignal = function() {
        return this._fadeInTransitionSignal;
    }

    GameManager.prototype.getFadeOutTransitionSignal = function() {
        return this._fadeOutTransitionSignal;
    }

    GameManager.prototype.getTriggerInteractionSignal = function() {
        return this._triggerInteractionSignal;
    }

    GameManager.prototype.getEndInteractionSignal = function() {
        return this._endInteractionSignal;
    }

    return GameManager;
    
});