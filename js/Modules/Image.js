"use strict";

const Linkable = require('./Linkable');

var ImageTypeEnum = {
        SceneChange: 'IMAGE_BUTTON_SCENECHANGE',
        DisplayImage: 'IMAGE_BUTTON_DISPLAY_IMAGE',
        Thought: 'IMAGE_BUTTON_THOUGHT',
        Transition: 'IMAGE_TRANSITION',
        Background: 'IMAGE_BACKGROUND',
        ChoiceBackground: 'IMAGE_CHOICE_BACKGROUND',
        Pause: 'IMAGE_BUTTON_PAUSE',
        ToggleSubtitle: 'IMAGE_BUTTON_TOGGLE_SUBTITLE'
    }

//Image constructor
var Image = function(xPos, yPos, key, type, properties) {
    this._type = type;
    this._xPos = xPos;
    this._yPos = yPos;
    this._properties = properties;
    this._key = key;
    this._image = null;
}

Image.prototype.addImageToGame = function(game, group) {
    switch(this._type) {
        case ImageTypeEnum.Pause:
        case ImageTypeEnum.Thought:
        case ImageTypeEnum.SceneChange:
        case ImageTypeEnum.DisplayImage:
        case ImageTypeEnum.ToggleSubtitle:
            this._image = game.add.button(this._xPos, this._yPos, this._key);
            break;
        case ImageTypeEnum.Background:
        case ImageTypeEnum.ChoiceBackground:
            this._image = game.add.image(this._xPos, this._yPos, this._key);
            break;
        default:
            console.warn("Invalid image type not added.");
    }
    group.add(this._image);
}

Image.prototype.setImage = function(key) {
    this._key = key;
}

//Assigns image change function depending on enum
Image.prototype.changeImage = function (game, arg1, arg2, arg3) {
    switch(this._type) {
        case ImageTypeEnum.Background:
            this.changeToBgImage(game, arg1);
            break;
        case ImageTypeEnum.Thought:
            this.changeToThoughtIcon(game, arg1);
            break;
        case ImageTypeEnum.SceneChange:
            this.changeToSceneChangeImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.DisplayImage:
            this.changeToDisplayImage(game, arg1);
            break;
        case ImageTypeEnum.ChoiceBackground:
            this.changeToChoiceBackgroundImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.Pause:
            this.changeToPauseButton(game, arg1);
            break;
        case ImageTypeEnum.ToggleSubtitle:
            this.changeToPauseButton(game, arg1);
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
    Linkable.setLink(this._image, callbackFunc);
}

Image.prototype.changeToSceneChangeImage = function(game, targetScene) {
    Linkable.setLink(this._image, SignalDispatcher, this, game.global.gameManager.getChangeSceneSignal(), targetScene);
}

Image.prototype.changeToDisplayImage = function(game, target) {
    Linkable.setPermanentLink(this._image, SignalDispatcher, this, game.global.gameManager.getDisplayImageSignal(), target, true);
}

Image.prototype.changeToChoiceBackgroundImage = function(game, width, height) {
    this._image.alpha = 0;
    this._image.anchor.x = 0.5;
    this._image.x = game.width/2;
    this._image.width = width;
    this._image.height = height;
    Linkable.fadeIn(game, this._image);
    return this._image;
}

Image.prototype.changeToPauseButton = function(game, signal) {
    Linkable.setPermanentLink(this._image, SignalDispatcher, this, signal);
}

Image.prototype.changeToToggleSubtitleButton = function(game, signal) {
    Linkable.setPermanentLink(this._image, SignalDispatcher, this, signal);
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
    this._image.x = -this._image.width/2;
    //Changes mouseover image
    this.changeCursorImage(game, 'url("./Images/UI/hand_2.png"), auto');
}

Image.prototype.getPhaserImage = function() {
    return this._image;
}

Image.prototype.getType = function() {
    return this._type;
}

Image.prototype.setVisible = function(isVisible) {
    this._image.visible = isVisible;
}

Image.prototype.fadeOut = function(game) {
    Linkable.fadeOut(game, this._image, true);
}

function SignalDispatcher(signal, arg1, arg2) {
    signal.dispatch(arg1, arg2);
}

function PauseScene(game) {
    console.log(game.paused);
    if(!game.paused) {
        game.input.onDown.add(Unpause, self);
    }
    game.paused = true;;

    function Unpause() {
        game.paused = false;
    }
}

function DebugRect(x, y, width, height, game) {
    var bounds = new Phaser.Rectangle(x, y, width, height);
    var graphics = game.add.graphics(bounds.x, bounds.y);
    graphics.beginFill(0x000077);
    graphics.drawRect(0, 0, bounds.width, bounds.height);
}

module.exports = Image;
