/***************************************************************
All game signals go through here.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const StateManager = require('../States/StateManager'),
    InteractState = require('../States/interactState'),
    LocationState = require('../States/locationState'),
    Transition = require('./transition'),
    UI = require('./uiLoader'),
    Video = require('./videoLoader'),
    Linkable = require('./Linkable');

var _instance = null;
var _game = null;

/***************************************************************
Signals declaration. Singleton.
***************************************************************/
var GameManager = function() {
    if(_instance !== null)
        return _instance;    
    _instance = this;

    //Changes game scene
    this._changeSceneSignal = null;

    //Triggers transition effects between scenes
    this._fadeInTransitionSignal = null;
    //Fade out unused currently
    this._fadeOutTransitionSignal = null;

    //Creates thought words
    this._createThoughtsSignal = null;
    //Starts thought/choice moments
    this._triggerInteractionSignal = null;
    //Called when thought/choice moments ends
    this._endInteractionSignal = null;

    //Reveals image hidden by another displayed image
    this._displayImageSignal = null;
    //Hides previously hidden but currently shown image
    this._hideDisplayedImageSignal = null;

    //Seeks to time specified for current video, currently unused
    this._videoSeekSignal = null;

    //Explains itself T.T
    this._showUISignal = null;
    //Explains itself T.T
    this._hideUISignal = null;
    //Shows/hides overlay graphics for displaying information images
    this._showInfoOverlaySignal = null;
    this._hideInfoOverlaySignal = null;
    //Pauses the experience
    this._pauseSignal = null;
    //Resumes the experience
    this._playSignal = null;
    //Explains itself!
    this._toggleSubtitleSignal = null;

    //Links to an external page
    this._goToLinkSignal = null;
    //Reloads page
    this._reloadSignal = null;

    this.initSignals();
    return _instance;
}

/***************************************************************
Allocates functions from corresponding modules to each signal.
***************************************************************/
GameManager.prototype.initSignals = function() {
    //StateManager 
    this._changeSceneSignal = new Phaser.Signal();
    this._changeSceneSignal.add(StateManager.changeScene, this);

    //Transition
    this._fadeInTransitionSignal = new Phaser.Signal();
    this._fadeInTransitionSignal.add(Transition.fadeInTransition, this);
    this._fadeOutTransitionSignal = new Phaser.Signal();
    this._fadeOutTransitionSignal.add(Transition.fadeOutTransition, this);

    //InteractState
    this._createThoughtsSignal = new Phaser.Signal();
    this._createThoughtsSignal.add(InteractState.createThoughts, this);
    this._triggerInteractionSignal = new Phaser.Signal();
    this._triggerInteractionSignal.add(InteractState.createInteractionElements, this);
    this._endInteractionSignal = new Phaser.Signal();
    this._endInteractionSignal.add(InteractState.endInteraction, this);

    //LocationState
    this._displayImageSignal = new Phaser.Signal();
    this._displayImageSignal.add(LocationState.displayImage, this);
    this._hideDisplayedImageSignal = new Phaser.Signal();
    this._hideDisplayedImageSignal.add(LocationState.hideDisplayedImage, this);

    //Video
    this._videoSeekSignal = new Phaser.Signal();
    this._videoSeekSignal.add(Video.seekTo, this);

    //UI
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
    this._toggleSubtitleSignal.add(UI.toggleSubtitle, this);

    //Page related functions
    this._goToLinkSignal = new Phaser.Signal();
    this._goToLinkSignal.add(Linkable.goToLink, this);
    this._reloadSignal = new Phaser.Signal();
    this._reloadSignal.add(Linkable.reload, this);
}

/***************************************************************
Getters
***************************************************************/
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

GameManager.prototype.getReloadSignal = function() {
    return this._reloadSignal;
}

module.exports = GameManager;
