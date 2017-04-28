/***************************************************************
Handles animation of game objects.
Static functions takes in the game object and applies animation to it.
Author: Christopher Weidya
***************************************************************/

"use strict";

const FADE_TIME_DEFAULT = 700;
const SCALE_TIME_DEFAULT = 300;
const BOB_DELAY_INTERVAL = 700;

/***************************************************************
Animation constructor
***************************************************************/
var Animation = function() {
}

/***************************************************************
Adds scaling animaton for object.
***************************************************************/
Animation.scale = function(game, object, autoStart, targetWidth, targetHeight, timeTaken) {
    if(!timeTaken)
        timeTaken = SCALE_TIME_DEFAULT;

    var tween = game.add.tween(object).to({width:targetWidth, height:targetHeight}, timeTaken, 
        Phaser.Easing.Linear.None, autoStart, 0, 0);

    return tween;
}

/***************************************************************
Adds fade in/out animation for object.
***************************************************************/
Animation.fade = function(game, object, value, autoStart, timeTaken) {
    if(!timeTaken)
        timeTaken = FADE_TIME_DEFAULT;
    var tween = game.add.tween(object).to({alpha:value}, timeTaken, Phaser.Easing.Linear.None, autoStart, 0, 0, false);

    return tween;
}

/***************************************************************
Adds bobbing up and down animation for object.
***************************************************************/
Animation.bob = function(game, object, autoStart, value) {
    if(!value)
        value = -5;
    value = value.toString();

    var tween = game.add.tween(object).to({y:value}, 200, Phaser.Easing.Quadratic.InOut, autoStart, 0, -1, true);
    tween.repeatDelay(BOB_DELAY_INTERVAL);
    
    return tween;
}

module.exports = Animation;
