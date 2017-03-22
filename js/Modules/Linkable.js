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

    Linkable.fadeIn = function(game, object, time, signal) {
        var tween;

        if(time)
            tween = game.add.tween(object).to({alpha:1}, time, Phaser.Easing.Linear.None, true, 0, 0, false);
        else
            tween = game.add.tween(object).to({alpha:1}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);
        
        if(signal)
            tween.onComplete.add(SignalDispatcher);

        function SignalDispatcher(){
            signal.dispatch();
        }
    }

    Linkable.setLink = function(event, callbackFunc, scope, arg1, arg2) {
        event.onInputUp.addOnce(driver, scope);

        function driver() {
            callbackFunc(arg1, arg2);
        }
    }

    Linkable.setPermanentLink = function(event, callbackFunc, scope, arg1, arg2) {
        event.onInputUp.add(driver, scope);

        function driver() {
            callbackFunc(arg1, arg2);
        }
    }

    Linkable.fadeOut = function(game, object, destroy) {
        var tween = game.add.tween(object).to({alpha:0}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);
        tween.onComplete.add(Disable, this);

        function Disable() {
            if(destroy)
                object.destroy();
        }
    }

    Linkable.fadeOutOthers = function(game, object, event, callbackFunc) {
        game.add.tween(object).to({alpha:1}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);
        otherObjArr.forEach(function(element) {
            game.add.tween(element).to({alpha:1}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);
        });

        var objectFadeOut = game.add.tween(object).to({alpha:0}, FADE_SPEED, Phaser.Easing.Linear.None, false, 0, 0, false);
        objectFadeOut.onComplete.add(DisableButton, this);

        game.add.tween(object).to({alpha:1}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false); 

    }

    Linkable.zoomIn = function(game, object, scale, originalWidth, originalHeight) {
        object.width = originalWidth;
        object.height = originalHeight;
        var tween = game.add.tween(object).to({width:object.width*scale, height:object.height*scale}, FADE_SPEED, Phaser.Easing.Linear.None, true, 0, 0, false);
    }


    return Linkable;
});
