/***************************************************************
Phaser Graphics wrapper created here.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const Linkable = require('./Linkable'),
    Animation = require('./Animation');

/***************************************************************
Enum for different types of graphics.
***************************************************************/
var GraphicTypeEnum = {
    Overlay: 'GRAPHIC_INFO_OVERLAY',
    ScrollBarBackground: 'GRAPHIC_SCROLLBAR_BG',
    Transition: 'GRAPHIC_TRANSITION',
    Rectangle: 'GRAPHIC_RECTANGLE'
}

/***************************************************************
Graphic constructor. Takes in position and type of graphic.
***************************************************************/
var Graphic = function(xPos, yPos, type) {
    this._xPos = xPos;
    this._yPos = yPos;
    this._type = type;
}

/***************************************************************
Adds graphic to game and a Phaser group.
***************************************************************/
Graphic.prototype.addGraphicToGame = function(game, group) {
    this._graphic = game.add.graphics(this._xPos, this._yPos); 
    this.addToGroup(game, group);
}

/***************************************************************
Adds graphic to group.
***************************************************************/
Graphic.prototype.addToGroup = function(game, group) {
    if(group)
        group.add(this._graphic);
    else {
        this.addToDefaultGroup(game);
    }
}

/***************************************************************
Adds to a default predefined Phaser group.
***************************************************************/
Graphic.prototype.addToDefaultGroup = function(game) {
    switch(this._type) {
        case GraphicTypeEnum.Overlay:
        case GraphicTypeEnum.ScrollBarBackground:
        case GraphicTypeEnum.Transition:
            game.uiGroup.add(this._graphic);
            break;
        case GraphicTypeEnum.Rectangle:
            game.mediaGroup.add(this._graphic);
            break;
        default:
            console.warn("Invalid graphic type not added to group:" + this._type);
    }
}


/***************************************************************
Changes graphic to the specified type in constructor.
***************************************************************/
Graphic.prototype.changeGraphic = function (game, arg1, arg2, arg3, arg4, arg5) {
    switch(this._type) {
        case GraphicTypeEnum.Overlay:            
            this.changeToInfoOverlayGraphic(game, arg1, arg2);
            break;
        case GraphicTypeEnum.ScrollBarBackground:
            this.changeToScrollBarBackgroundGraphic(game, arg1);
            break;
        case GraphicTypeEnum.Transition:
            this.changeToTransitionGraphic(game, arg1, arg2);
            break;
        case GraphicTypeEnum.Rectangle:
            this.changeToRectangle(game, arg1);
            break;
        default:
            console.warn("Invalid Graphic Type.");
    }
}

/***************************************************************
Puts a black overlay when viewing images.
For images that require scrollbar, a hacky 4 black rectangle graphic is drawn
in order to block player input from selecting the graphic. 
This is because although image is maskable by phaser, input is not.
For images without need for scrolling, a black rectangle overlay is drawn.
***************************************************************/
Graphic.prototype.changeToInfoOverlayGraphic = function(game, scrollbarEnabled) {
    var margin =  game.global.constants.INFO_VIEW_MARGIN;
    this._graphic.beginFill(game.global.constants.INFO_OVERLAY_COLOR, 
        game.global.constants.INFO_OVERLAY_OPACITY);
    this._graphic.inputEnabled = true;

    //Draws rectangles based on having scrollbar or not
    if(scrollbarEnabled) {
        this._graphic.drawRect(0, 0, margin, game.height);
        this._graphic.drawRect(game.width-margin, 0, margin, game.height);
        this._graphic.drawRect(margin, 0, game.width-(margin<<1), margin);
        this._graphic.drawRect(margin, game.height-margin, game.width-(margin<<1), margin);   
        this._graphic.input.priorityID = 1;
        this._graphic.input.useHandCursor = true;
    }
    else {
        this._graphic.drawRect(0, 0, game.width, game.height);
    }

    this._graphic.endFill();
    this._graphic.visible = false;

    //Clicking on overlay hides the displayed image and the overlay
    var link = new Linkable(game, this._graphic.events, game.global.gameManager.getHideDisplayedImageSignal());
    link.setAsButton(false);
    var link2 = new Linkable(game, this._graphic.events, game.global.gameManager.getHideInfoOverlaySignal());
    link2.setAsButton(false);
}

/***************************************************************
Background rectangle graphic of scrollbar.
***************************************************************/
Graphic.prototype.changeToScrollBarBackgroundGraphic = function(game, rectangle) {
    this._graphic.beginFill(rectangle.color, rectangle.opacity);
    this._graphic.lineStyle(rectangle.strokeWidth, rectangle.lineColor);
    this._graphic.drawRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);    
    this._graphic.endFill();
    this._graphic.visible = false;
}

/***************************************************************
Draws fade in/out graphics between scenes.
Fade out currently not used/implemented well.
***************************************************************/
Graphic.prototype.changeToTransitionGraphic = function(game, rectangle, val) {
    this._graphic.beginFill(rectangle.color, rectangle.opacity);
    this._graphic.drawRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);    
    this._graphic.endFill();
    this._graphic.alpha = val;
    Animation.fade(game, this._graphic, 1-val, true);
}

/***************************************************************
Generic rectangle graphic.
***************************************************************/
Graphic.prototype.changeToRectangle = function(game, rectangle) {
    this._graphic.beginFill(rectangle.color, rectangle.opacity);
    if(rectangle.strokeWidth) {
        this._graphic.lineStyle(rectangle.strokeWidth, rectangle.lineColor, rectangle.strokeOpacity);
    }
    this._graphic.drawRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);    
    this._graphic.endFill();
}

/***************************************************************
Sets visibility of graphic.
***************************************************************/
Graphic.prototype.setVisible = function(value) {
    this._graphic.visible = value;
}

/***************************************************************
Gets Phaser graphic out of this graphic wrapper.
***************************************************************/
Graphic.prototype.getGraphic = function() {
    return this._graphic;
}

/***************************************************************
Creates rectangle object containing rectangle properties.
***************************************************************/
Graphic.createRectangle = function(x, y, width, height, color, opacity, strokeWidth, lineColor, strokeOpacity) {
    var rectangle = {};

    //Rectangle fill properties
    rectangle.x = x;
    rectangle.y = y;
    rectangle.width = width;
    rectangle.height = height;
    if(!color)
        color = 0x000000;
    rectangle.color = color;
    if(!opacity)
        opacity = 1.0;
    rectangle.opacity = opacity;

    //Rectangle stroke properties
    if(strokeWidth) {
        rectangle.strokeWidth = strokeWidth;
        if(!lineColor)
            lineColor = 0x000000;
        rectangle.lineColor = lineColor
        if(!strokeOpacity)
            strokeOpacity = 1.0;
        rectangle.strokeOpacity = strokeOpacity;
    }

    return rectangle;
}

/***************************************************************
Returns list of graphic types available.
***************************************************************/
Graphic.getEnum = function() {
    return GraphicTypeEnum;
}

module.exports = Graphic;
