"use strict";

const Animation = require('./Animation');

const FADE_SPEED = 700;
const MOUSEOVER_SPEED = 300;

//Linkable constructor
var Linkable = function(game, event, signal, arg1, arg2, arg3) {
    this._game = game;
    this._linkable = this;
    this._event = event;
    this._signal = signal;
    this._arg1 = arg1;
    this._arg2 = arg2;
    this._arg3 = arg3;
    this._onClickAnimations = [];
    this._onMouseOverAnimations = [];
    this._onMouseOutAnimations = [];
    this._sound = [];
}

Linkable.prototype.setAsButton = function(once) {
    if(once) {
        this._event.onInputUp.addOnce(this.onTrigger, this);
        this._event.onInputUp.addOnce(this.removeInput, this);
    }
    else {        
        this._event.onInputUp.add(this.onTrigger, this);
    }
    this._event.onInputUp.add(this.playSound, this);
}

Linkable.prototype.setMouseOver = function() {
    this._event.onInputOver.add(this.playOnMouseOverAnimations, this);
    this._event.onInputOver.add(this.playSound, this);
}

Linkable.prototype.setMouseOut = function() {
    this._event.onInputOut.add(this.playOnMouseOutAnimations, this);
}

Linkable.prototype.addOnClickAnimation = function(tween) {
    this._onClickAnimations.push(tween);
}

Linkable.prototype.addMouseOverAnimation = function(tween) {
    this._onMouseOverAnimations.push(tween);
}

Linkable.prototype.addMouseOutAnimation = function(tween) {
    this._onMouseOutAnimations.push(tween);
}

Linkable.prototype.addSound = function(soundKey) {
    this._sound.push(soundKey);
}

Linkable.prototype.playOnClickAnimations = function() {    
    var tween = null;
    this._onClickAnimations.forEach(function(animation) {
        tween = animation.start();
    });
    return tween;
}

Linkable.prototype.playOnMouseOverAnimations = function() {    
    var tween = null;
    this._onMouseOverAnimations.forEach(function(animation) {
        animation.reverse = false;
        tween = animation.start();
    });
    return tween;
}

Linkable.prototype.playOnMouseOutAnimations = function() {    
    var tween = null;
    this._onMouseOutAnimations.forEach(function(animation) {
        tween = animation.start();
    });
    return tween;
}

Linkable.prototype.playSound = function() {
    var game = this._game;
    this._sound.forEach(function(sound) {
        game.global.soundManager.playSound(sound);
    });
}

Linkable.prototype.removeInput = function() {
    if(this._event.inputEnabled)
        this._event.inputEnabled = false;
    else if(this._event.parent && this._event.parent.inputEnabled) {
        this._event.parent.inputEnabled = false;
    }
    if(this._event.input) {
        this._event.input.useHandCursor = false;
    } 
}

Linkable.prototype.onTrigger = function() {
    var tween = this._linkable.playOnClickAnimations();
    if(tween)
        tween.onComplete.add(this.dispatchSignal, this);
    else
        this.dispatchSignal();
}

Linkable.prototype.addMouseOverScaleEffect = function(game, object) {
    this._linkable.addMouseOverAnimation(Animation.scale(game, object, false, object.width *1.03, object.height *1.03, MOUSEOVER_SPEED));
    this._linkable.setMouseOver();    
    this._linkable.addMouseOutAnimation(Animation.scale(game, object, false, object.width, object.height, MOUSEOVER_SPEED));
    this._linkable.setMouseOut();
}

Linkable.prototype.dispatchSignal = function() {
    this._signal.dispatch(this._arg1, this._arg2, this._arg3);
}

Linkable.goToLink = function(link) {
    window.open(link,'_blank');
}

module.exports = Linkable;
