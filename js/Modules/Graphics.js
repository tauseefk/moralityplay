//Dependency: Nonde

define(['Modules/Linkable'], function(Linkable) {
    "use strict";

    var ImageTypeEnum = {
        Info: 'IMAGE_BUTTON_INFO',
        SceneChange: 'IMAGE_BUTTON_SCENECHANGE',
        Thought: 'IMAGE_BUTTON_THOUGHT',
        Transition: 'IMAGE_TRANSITION',
        Background: 'IMAGE_BACKGROUND',
        Static: 'IMAGE_STATIC'
    }

    //Image constructor
    var Graphic = function(xPos, yPos) {
        this._xPos = xPos;
        this._yPos = yPos;
    }

    return Graphic;
});
