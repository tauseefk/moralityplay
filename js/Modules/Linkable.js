"use strict";


const FADE_SPEED = 700;

//Linkable constructor
var Linkable = function(event, signal, arg1, arg2, arg3) {
    this._linkable = this;
    this._event = event;
    this._signal = signal;
    this._arg1 = arg1;
    this._arg2 = arg2;
    this._arg3 = arg3;
    this._animations = [];
}

Linkable.prototype.setAsButton = function(once) {
    if(once) {
        this._event.onInputUp.addOnce(this.onTrigger, this);
        this._event.onInputUp.addOnce(this.removeInput, this);
    }
    else {        
        this._event.onInputUp.add(this.onTrigger, this);
    }
}

Linkable.prototype.addAnimation = function(tween) {
    this._animations.push(tween);
}

Linkable.prototype.playAnimations = function() {    
    var tween = null;
    this._animations.forEach(function(animation) {
        tween = animation.start();
    });
    return tween;
}

Linkable.prototype.removeInput = function() {
    if(this._event.inputEnabled)
        this._event.inputEnabled = false;
}

Linkable.prototype.onTrigger = function() {
    var tween = this._linkable.playAnimations();
    if(tween)
        tween.onComplete.add(this.dispatchSignal, this);
    else
        this.dispatchSignal();
}

Linkable.prototype.dispatchSignal = function() {
    this._signal.dispatch(this._arg1, this._arg2, this._arg3);
}


module.exports = Linkable;
