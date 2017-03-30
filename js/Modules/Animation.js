"use strict";

const FADE_SPEED = 700;
const SCALE_SIZE = 1.05;

//Linkable constructor
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

Animation.scale = function(game, object, autoStart, originalWidth, originalHeight) {
    if(originalWidth && originalHeight) {
        object.width = originalWidth;
        object.height = originalHeight;
    }
    return game.add.tween(object).to({width:object.width*SCALE_SIZE, height:object.height*SCALE_SIZE}, FADE_SPEED, Phaser.Easing.Linear.None, autoStart, 0, 0, false);
}


Animation.fade = function(game, object, value, autoStart) {
    return game.add.tween(object).to({alpha:value}, FADE_SPEED, Phaser.Easing.Linear.None, autoStart, 0, 0, false);
}

Animation.mouseOver = function(event, callbackFunc, scope, arg1, arg2, arg3) {
    event.onInputOver.add();
}


module.exports = Animation;
