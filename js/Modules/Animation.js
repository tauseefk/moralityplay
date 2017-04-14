"use strict";

const FADE_SPEED = 700;
const SCALE_SPEED = 300;
const SCALE_SIZE = 1.2;

//Animation constructor
var Animation = function() {
}

Animation.scale = function(game, object, autoStart, targetWidth, targetHeight, speed, repeat, reset) {
    if(!repeat)
        repeat = 0;
    if(!speed)
        speed = SCALE_SPEED;

    var tween = game.add.tween(object).to({width:targetWidth, height:targetHeight}, speed, Phaser.Easing.Linear.None, autoStart, 0, repeat);
    if(reset)
        tween.onComplete.add(Reset, this);

    function Reset(width, height) {
        object.width = width;
        object.height = height;
    }

    return tween;
}

Animation.fade = function(game, object, value, autoStart, speed, repeat, destroy) {
    var customSpeed = speed;
    if(!speed)
        customSpeed = FADE_SPEED;
    var tween = game.add.tween(object).to({alpha:value}, customSpeed, Phaser.Easing.Linear.None, autoStart, 0, 0, false);

    if(destroy) {
        tween.onComplete.add(Destroy, this);
    }

    function Destroy() {
        object.destroy();
    }
    
    return tween;
}

Animation.bob = function(game, object, autoStart) {
    var tween = game.add.tween(object).to({y:'-1'}, 200, Phaser.Easing.Quadratic.InOut, autoStart, 0, -1, true);
    tween.repeatDelay(700);
    return tween;
}

module.exports = Animation;
