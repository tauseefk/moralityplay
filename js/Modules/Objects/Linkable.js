/***************************************************************
Object that creates interactive properties of elements,
such as mouse over animations, sounds, linking, etc.
***************************************************************/
"use strict";

//Dependencies
const Animation = require('./Animation');

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

/***************************************************************
Input up events, sets linkable to behave as button.
***************************************************************/
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

/***************************************************************
Mouse over events.
***************************************************************/
Linkable.prototype.setMouseOver = function() {
    this._event.onInputOver.add(this.playOnMouseOverAnimations, this);
    //this._event.onInputOver.add(this.playSound, this);
}

/***************************************************************
Mouse out events.
***************************************************************/
Linkable.prototype.setMouseOut = function() {
    this._event.onInputOut.add(this.playOnMouseOutAnimations, this);
}

/***************************************************************
Adds animation and sounds to each interaction.
***************************************************************/
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

/***************************************************************
Plays animations corresponding to different mouse events.
***************************************************************/
Linkable.prototype.playOnClickAnimations = function() {
    return Linkable.playAnimations(this._onClickAnimations);
}

Linkable.prototype.playOnMouseOverAnimations = function() {
    return Linkable.playAnimations(this._onMouseOverAnimations);
}

Linkable.prototype.playOnMouseOutAnimations = function() {
    return Linkable.playAnimations(this._onMouseOutAnimations);
}

/***************************************************************
Static function that plays all animation in the array.
***************************************************************/
Linkable.playAnimations = function(animationArr) {
    var tween = null;
    animationArr.forEach(function(animation) {
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

/***************************************************************
Cleanup. Prevents button from being hoverable.
***************************************************************/
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

/***************************************************************
Dispatches assigned signal when clicked.
***************************************************************/
Linkable.prototype.onTrigger = function() {
    var tween = this._linkable.playOnClickAnimations();
    if(tween)
        tween.onComplete.add(this.dispatchSignal, this);
    else
        this.dispatchSignal();
}

/***************************************************************
A default mouseover animation preset.
***************************************************************/
Linkable.prototype.addMouseOverScaleEffect = function(game, object) {
    this._linkable.addMouseOverAnimation(Animation.scale(game, object, false, object.width *1.03, object.height *1.03));
    this._linkable.setMouseOver();    
    this._linkable.addMouseOutAnimation(Animation.scale(game, object, false, object.width, object.height));
    this._linkable.setMouseOut();
}

Linkable.prototype.dispatchSignal = function() {
    this._signal.dispatch(this._arg1, this._arg2, this._arg3);
}

/***************************************************************
External link functionality.
***************************************************************/
Linkable.goToLink = function(link) {
    window.open(link,'_blank');
}

/***************************************************************
Reload functionality.
***************************************************************/
Linkable.reload = function() {
    location.reload();
}

module.exports = Linkable;
