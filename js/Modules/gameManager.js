"use strict";

const ConnectionChecker = require('./connectionChecker'),
    StateManager = require('../States/StateManager'),
    InteractState = require('../States/interactState'),
    LocationState = require('../States/locationState'),
    Icons = require('./iconsLoader'),
    Choices = require('./choiceLoader'),
    Thoughts = require('./thoughtsLoader'),
    Transition = require('./transition'),
    UI = require('./uiLoader'),
    Video = require('./videoLoader'),
    Linkable = require('./Linkable');

var _instance = null;
var _game = null;

var GameManager = function() {
    if(_instance !== null)
        return _instance;
    
    _instance = this;

    this._changeSceneSignal = null;

    this._fadeInTransitionSignal = null;
    this._fadeOutTransitionSignal = null;

    this._triggerInteractionSignal = null;
    this._endInteractionSignal = null;

    this._videoSeekSignal = null;

    this._createThoughtsSignal = null;
    this._createChoicesSignal = null;
    this._createThoughtsAndChoicesSignal = null;

    this._displayImageSignal = null;
    this._hideDisplayedImageSignal = null;

    this._showUISignal = null;
    this._hideUISignal = null;
    this._showInfoOverlaySignal = null;
    this._hideInfoOverlaySignal = null;
    this._pauseSignal = null;
    this._playSignal = null;
    this._toggleSubtitleSignal = null;

    this._goToLinkSignal = null;

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
    this._triggerInteractionSignal.add(InteractState.createInteractionElements, this);
    this._endInteractionSignal = new Phaser.Signal();
    this._endInteractionSignal.add(InteractState.endInteraction, this);

    this._videoSeekSignal = new Phaser.Signal();
    this._videoSeekSignal.add(Video.seekTo, this);

    this._createThoughtsSignal = new Phaser.Signal();
    this._createThoughtsSignal.add(Thoughts.create, this);
    this._createChoicesSignal = new Phaser.Signal();
    this._createChoicesSignal.add(Choices.create, this);

    this._displayImageSignal = new Phaser.Signal();
    this._displayImageSignal.add(LocationState.displayImage, this);
    this._hideDisplayedImageSignal = new Phaser.Signal();
    this._hideDisplayedImageSignal.add(LocationState.hideDisplayedImage, this);

    this._showUISignal = new Phaser.Signal();
    this._showUISignal.add(UI.showUI, this);
    this._hideUISignal = new Phaser.Signal();
    this._hideUISignal.add(UI.hideUI, this);
    this._showInfoOverlaySignal = new Phaser.Signal();
    this._showInfoOverlaySignal.add(UI.showInfoOverlay, this);    
    this._hideInfoOverlaySignal = new Phaser.Signal();
    this._hideInfoOverlaySignal.add(UI.hideInfoOverlay, this);
    this._pauseSignal = new Phaser.Signal();
    this._pauseSignal.add(UI.pause, this);    
    this._playSignal = new Phaser.Signal();
    this._playSignal.add(UI.play, this);
    this._toggleSubtitleSignal = new Phaser.Signal();
    this._toggleSubtitleSignal.add(Video.toggleSubtitle, this);

    this._createThoughtsAndChoicesSignal = new Phaser.Signal();
    this._createThoughtsAndChoicesSignal.add(Icons.createThoughtsAndChoices, this);

    this._goToLinkSignal = new Phaser.Signal();
    this._goToLinkSignal.add(Linkable.goToLink, this);
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

GameManager.prototype.getVideoSeekSignal = function() {
    return this._videoSeekSignal;
}

GameManager.prototype.getCreateThoughtsSignal = function() {
    return this._createThoughtsSignal;
}

GameManager.prototype.getCreateChoicesSignal = function() {
    return this._createChoicesSignal;
}

GameManager.prototype.getCreateThoughtsAndChoicesSignal = function() {
    return this._createThoughtsAndChoicesSignal;
}

GameManager.prototype.getDisplayImageSignal = function() {
    return this._displayImageSignal;
}

GameManager.prototype.getHideDisplayedImageSignal = function() {
    return this._hideDisplayedImageSignal;
}

GameManager.prototype.getShowUISignal = function() {
    return this._showUISignal;
}

GameManager.prototype.getHideUISignal = function() {
    return this._hideUISignal;
}

GameManager.prototype.getShowInfoOverlaySignal = function() {
    return this._showInfoOverlaySignal;
}

GameManager.prototype.getHideInfoOverlaySignal = function() {
    return this._hideInfoOverlaySignal;
}

GameManager.prototype.getPauseSignal = function() {
    return this._pauseSignal;
}

GameManager.prototype.getPlaySignal = function() {
    return this._playSignal;
}

GameManager.prototype.getToggleSubtitleSignal = function() {
    return this._toggleSubtitleSignal;
}

GameManager.prototype.getGoToLinkSignal = function() {
    return this._goToLinkSignal;
}

module.exports = GameManager;
