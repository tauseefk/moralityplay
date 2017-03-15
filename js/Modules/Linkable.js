//Dependency: Nonde

define(function() {
    "use strict";

    var _filterFadeSignal = null;
    const FADE_SPEED = 700;

    //Linkable constructor
    var Linkable = function(xPos, yPos, key, properties) {
        this._xPos = xPos;
        this._yPos = yPos;
        this._properties = properties;
        this._key = key;
        this._image = null;
    }

    Linkable.SetLinkProperties = function(game, fadeIn, fadeOut, object, event, callbackFunc, targetScene, signal) {
        
        if(fadeIn) {
            game.add.tween(object).to({alpha:1}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);  
        }

        if(fadeOut) {
            var objectFadeOut = game.add.tween(object).to({alpha:0}, FADE_SPEED, Phaser.Easing.Linear.None, false, 0, 0, false);
            objectFadeOut.onComplete.add(DisableButton, this);
        }
        event.onInputUp.addOnce(ButtonPressed, this);

        function ButtonPressed() {
            if(fadeOut)
                objectFadeOut.start();
            else
                DisableButton();
        }

        function DisableButton() {
            if(callbackFunc)   
                callbackFunc(targetScene, signal);
            object.destroy();
        }
    }

    Linkable.fadeIn = function(game, object) {
        game.add.tween(object).to({alpha:1}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);
    }

    Linkable.fadeOut = function(game, object, destroy) {
        var tween = game.add.tween(object).to({alpha:0}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);
        tween.onComplete.add(Disable, this);

        function Disable() {
            if(destroy)
                object.destroy();
        }
    }


    return Linkable;
});
