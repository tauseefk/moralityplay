/***************************************************************
Utility object that performs calculations.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Utility constructor
var Utility = function() {
}

/***************************************************************
Checks image dimensions against game dimenstions 
and calculates whether a scrollbar is needed to view image.
***************************************************************/
Utility.checkIfScrollBarNeeded = function(game, image) {
    var displayDimensionRatio = game.global.constants.INFO_VIEW_WIDTH/game.global.constants.INFO_VIEW_HEIGHT;
    var imageDimensionRatio = image.width/image.height;
    if(imageDimensionRatio > displayDimensionRatio)
        return false;
    else
        return true;
}

module.exports = Utility;
