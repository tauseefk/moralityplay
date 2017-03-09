//Dependency: Nonde

define(function() {
    "use strict";

    var LinkableTypeEnum = {
        Info: 'IMAGE_BUTTON_INFO',
        SceneChange: 'IMAGE_BUTTON_SCENECHANGE',
        Thought: 'IMAGE_BUTTON_THOUGHT',
        Transition: 'IMAGE_TRANSITION',
        Background: 'IMAGE_BACKGROUND'
    }

    //Image constructor
    var Linkable = function(xPos, yPos, key, properties) {
        this._xPos = xPos;
        this._yPos = yPos;
        this._properties = properties;
        this._key = key;
        this._image = null;
    }


    Linkable.SetLinkProperties = function(game, fadeIn, fadeOut, object, event, callbackFunc, targetScene, signal) {
        
        if(fadeIn) {
            game.add.tween(object).to({alpha:1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);  
        }

        if(fadeOut) {
            var objectFadeOut = game.add.tween(object).to({alpha:0}, 500, Phaser.Easing.Linear.None, false, 0, 0, false);
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
            callbackFunc(targetScene, signal);
            object.destroy();
        }
    }


    return Linkable;
});
