"use strict";

//Linkable constructor
var Utility = function() {
}

Utility.checkIfScrollBarNeeded = function(game, image) {
    var displayDimensionRatio = game.global.constants.INFO_VIEW_WIDTH/game.global.constants.INFO_VIEW_HEIGHT;
    var imageDimensionRatio = image.width/image.height;
    if(imageDimensionRatio > displayDimensionRatio)
        return false;
    else
        return true;
}

module.exports = Utility;
