"use strict";

const Linkable = require('./Linkable');

var GraphicTypeEnum = {
    Overlay: 'GRAPHIC_INFO_OVERLAY',
    ScrollBarBackground: 'GRAPHIC_SCROLLBAR_BG'
}

//Image constructor
var Graphic = function(xPos, yPos, type) {
    this._xPos = xPos;
    this._yPos = yPos;
    this._type = type;
}

Graphic.prototype.addGraphicToGame = function(game, group) {
    this._graphic = game.add.graphics(this._xPos, this._yPos); 
    if(group) {
        group.add(this._graphic);
    }
    else {
        switch(this._type) {
            case GraphicTypeEnum.Overlay:
            case GraphicTypeEnum.ScrollBarBackground:
                game.uiGroup.add(this._graphic);
                break;
            default:
                console.warn("Invalid graphic type not added to group:" + this._type);
        }
    }
}

Graphic.prototype.changeGraphic = function (game, arg1, arg2, arg3, arg4, arg5) {
    switch(this._type) {
        case GraphicTypeEnum.Overlay:            
            this.changeToInfoOverlayGraphic(game, arg1, arg2);
            break;
        case GraphicTypeEnum.ScrollBarBackground:
            this.changeToScrollBarBackgroundGraphic(game, arg1);
            break;
        default:
            console.warn("Invalid Graphic Type.");
    }
}

Graphic.prototype.changeToInfoOverlayGraphic = function(game, margin, scrollbarEnabled) {
    this._graphic = game.add.graphics(this._xPos, this._yPos);    
    this._graphic.beginFill(0x000000, 0.6);
    this._graphic.inputEnabled = true;

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
    game.uiGroup.add(this._graphic);


    this._link = new Linkable(game, this._graphic.events, game.global.gameManager.getHideDisplayedImageSignal());
    this._link2 = new Linkable(game, this._graphic.events, game.global.gameManager.getHideInfoOverlaySignal());
    this._link.setAsButton(false);
    this._link2.setAsButton(false);
}
Graphic.prototype.drawRect = function(game, x, y, width, height, color, opacity, strokeWidth, lineColor) {
    if(!color)
        color = 0x000000;
    if(!opacity)
        opacity = 1;
    if(!lineColor)
        lineColor = 0x000000;

    this._graphic = game.add.graphics(this._xPos, this._yPos);
    game.uiGroup.add(this._graphic);
    this._graphic.beginFill(color, opacity);
    if(strokeWidth) {
        this._graphic.lineStyle(strokeWidth, lineColor);
    }
    this._graphic.drawRect(x, y, width, height);
    
    this._graphic.endFill();
}

Graphic.prototype.changeToScrollBarBackgroundGraphic = function(game, rectangle) {
    this._graphic.beginFill(rectangle.color, rectangle.opacity);
    this._graphic.lineStyle(rectangle.strokeWidth, rectangle.lineColor);

    this._graphic.drawRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    
    this._graphic.endFill();
    this._graphic.visible = false;
}

Graphic.prototype.setVisible = function(value) {
    this._graphic.visible = value;
}

Graphic.prototype.getGraphic = function() {
    return this._graphic;
}

Graphic.createRectangle = function(x, y, width, height, color, opacity, strokeWidth, lineColor, strokeOpacity) {
    var rectangle = {};
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

Graphic.getEnum = function() {
    return GraphicTypeEnum;
}

module.exports = Graphic;
