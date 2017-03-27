"use strict";

var ImageTypeEnum = {
        Info: 'IMAGE_BUTTON_INFO',
        SceneChange: 'IMAGE_BUTTON_SCENECHANGE',
        Thought: 'IMAGE_BUTTON_THOUGHT',
        Transition: 'IMAGE_TRANSITION',
        Background: 'IMAGE_BACKGROUND',
        Static: 'IMAGE_STATIC'
    },
    Linkable = require('./Linkable');

//Image constructor
var Graphic = function(xPos, yPos) {
    this._xPos = xPos;
    this._yPos = yPos;
}

Image.prototype.addGraphicsToGame = function(game, fill) {
    this._graphics = game.add.graphics(this._xPos, this._yPos);

}

Image.prototype.addButtonToGame = function(game) {
    this._image = game.add.button(this._xPos, this._yPos, this._key);
}

Image.prototype.setImage = function(key) {
    this._key = key;
}

//Assigns image change function depending on enum
//arg1 can be boolean: draggable, function: button callback, targetScene
//arg2 can be signal
Image.prototype.changeImage = function (game, enumType, arg1, arg2) {
    switch(enumType) {
        case ImageTypeEnum.Background:
            this.changeToBgImage(game, arg1);
            break;
        case ImageTypeEnum.Thought:
            this.changeToThoughtIcon(game, arg1);
            break;
        case ImageTypeEnum.SceneChange:
            this.changeToSceneChangeImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.Static:
            this.changeToStaticImage(game, arg1, arg2);
            break;
        default:
            console.warn("Invalid Image Type.");
    }
}

//Changes image to a horizontally draggable image
//Scales and sets a rectangle container for Bg image to pan around
Image.prototype.changeToBgImage = function(game, draggable) {

    //Scales Bg image to fit game height, maintains Bg image aspect ratio
    var scale = game.height/this._image.height;
    this._image.height = Math.floor(this._image.height*scale);
    this._image.width = Math.floor(this._image.width*scale);

    //Initializes container for bg image to be dragged around

    if(draggable) {
        this.makeDraggable(game, 'stub', false, true, -this._image.width+game.width, 0, this._image.width*2-game.width, this._image.height)
    }
}

Image.prototype.changeToThoughtIcon = function(game, callbackFunc) {
    this.addLinkProperties(game, callbackFunc);
}

Image.prototype.changeToSceneChangeImage = function(game, targetScene, signal) {
    Linkable.SetLinkProperties(game, true, true, this._image, this._image, changeScene, targetScene, signal);
}

Image.prototype.changeToStaticImage = function(game, targetScene, signal) {
    return this._image;
}

Image.prototype.changeToChoiceBgImage = function(game, width, height) {

}

//Changes cursor image on mouseover
Image.prototype.changeCursorImage = function(game, cursorImageSrc) {
    this._image.events.onInputOver.add(function(){
    game.canvas.style.cursor = cursorImageSrc;
    }, this);

    this._image.events.onInputOut.add(function(){
    game.canvas.style.cursor = "default";
    }, this);
}

Image.prototype.makeDraggable = function(game, hoverImageSrc, lockHorizontal, lockVertical, boundsX, boundsY, boundsWidth, boundsHeight) {

    //Enables drag interaction on the horizontal axis
    this._image.inputEnabled = true;
    if(boundsX !== undefined && boundsX !== undefined) {
        var dragBounds = new Phaser.Rectangle(boundsX, boundsY, boundsWidth, boundsHeight);
        this._image.input.boundsRect = dragBounds;
    }
    this._image.input.draggable = true;
    this._image.input.allowVerticalDrag = !lockVertical;
    this._image.input.allowHorizontalDrag = !lockHorizontal;

    //Changes mouseover image
    this.changeCursorImage(game, 'url("./Images/UI/hand_2.png"), auto');
}

Image.prototype.addLinkProperties = function(game, callbackFunc) {
    Linkable.SetLinkProperties(game, true, true, this._image, this._image, callbackFunc);
}

Image.prototype.getPhaserImage = function() {
    return this._image;
}

Image.prototype.fadeOut = function(game) {
    Linkable.fadeOut(game, this._image, true);
}

function changeScene(scene, signal) {
    signal.dispatch(scene);
}

function DebugRect(x, y, width, height, game) {
    var bounds = new Phaser.Rectangle(x, y, width, height);
    var graphics = game.add.graphics(bounds.x, bounds.y);
    graphics.beginFill(0x000077);
    graphics.drawRect(0, 0, bounds.width, bounds.height);
}

module.exports = Graphic;
