"use strict";

const FADE_SPEED = 700;
const SCALE_SIZE = 1.05;

//Animation constructor
var Animation = function() {
}

Animation.fadeIn = function(game, object, signal) {    
    var tween = this.fade(game, object, 1, true);
    if(signal)
        tween.onComplete.add(SignalDispatcher);

    function SignalDispatcher(){
        signal.dispatch();
    }
}

Animation.fadeOut = function(game, object, destroy, signal, arg1) {
    var tween = this.fade(game, object, 0, true);
    tween.onComplete.add(Disable, this);

    function Disable() {
        if(destroy)
            object.destroy();
        if(signal)
            signal.dispatch(arg1);
    }
}

Animation.scale = function(game, object, autoStart, targetWidth, targetHeight, speed, repeat, reset) {
    if(!repeat)
        repeat = 0;
    if(!speed)
        speed = FADE_SPEED;

    var tween = game.add.tween(object).to({width:targetWidth, height:targetHeight}, speed, Phaser.Easing.Linear.None, autoStart, 0, repeat);
    if(reset)
        tween.onComplete.add(Reset, this);

    function Reset(width, height) {
        object.width = width;
        object.height = height;
    }

    return tween;
}

Animation.fade = function(game, object, value, autoStart, speed, repeat) {
    var customSpeed = speed;
    if(!speed)
        customSpeed = FADE_SPEED;
    return game.add.tween(object).to({alpha:value}, customSpeed, Phaser.Easing.Linear.None, autoStart, 0, 0, false);
}


module.exports = Animation;
