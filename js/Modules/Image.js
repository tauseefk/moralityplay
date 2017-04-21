"use strict";

const Linkable = require('./Linkable'),
    Animation = require('./Animation'),
    Graphic = require('./Graphics');

var ImageTypeEnum = {
    Static: 'IMAGE_STATIC',
    ThoughtSprite: 'IMAGE_SPRITE_THOUGHT',
    SceneChange: 'IMAGE_BUTTON_SCENECHANGE',
    DisplayImage: 'IMAGE_BUTTON_DISPLAY_IMAGE',
    InfoImage: 'IMAGE_INFO',
    Thought: 'IMAGE_BUTTON_THOUGHT',
    Transition: 'IMAGE_TRANSITION',
    Background: 'IMAGE_BACKGROUND',
    ChoiceBackground: 'IMAGE_CHOICE_BACKGROUND',
    OverlayCloseImage: 'IMAGE_OVERLAY_CLOSE',
    ExternalLink: 'IMAGE_BUTTON_EXTERNAL_LINK',
    Pause: 'IMAGE_BUTTON_PAUSE',
    Play: 'IMAGE_BUTTON_PLAY',
    ToggleSubtitle: 'IMAGE_BUTTON_TOGGLE_SUBTITLE'
}

//Image constructor
var Image = function(xPos, yPos, key, type, properties) {
    this._type = type;
    this._xPos = xPos;
    this._yPos = yPos;
    this._properties = properties;
    this._key = key;
    this._link = null;
    this._image = this;
}

Image.prototype.addImageToGame = function(game, group) {
    switch(this._type) {
        case ImageTypeEnum.Pause:
        case ImageTypeEnum.Play:
        case ImageTypeEnum.Thought:
        case ImageTypeEnum.SceneChange:
        case ImageTypeEnum.DisplayImage:
        case ImageTypeEnum.ToggleSubtitle:
        case ImageTypeEnum.ChoiceBackground:
        case ImageTypeEnum.OverlayCloseImage:
        case ImageTypeEnum.ExternalLink:
            this._image = game.add.button(this._xPos, this._yPos, this._key);
            break;
        case ImageTypeEnum.Static:
        case ImageTypeEnum.Background:
        case ImageTypeEnum.InfoImage:
            this._image = game.add.image(this._xPos, this._yPos, this._key);
            break;
        case ImageTypeEnum.ThoughtSprite:
            this._image = game.add.sprite(this._xPos, this._yPos, this._key);
            break;
        default:
            console.warn("Invalid image type not added.");
    }
    group.add(this._image);
}

//Assigns image change function depending on enum
Image.prototype.changeImage = function (game, arg1, arg2, arg3, arg4, arg5) {
    switch(this._type) {
        case ImageTypeEnum.Static:            
            this.changeToStaticImage(game, arg1);
            break;
        case ImageTypeEnum.Background:
            this.changeToBgImage(game, arg1);
            break;
        case ImageTypeEnum.Thought:
            this.changeToThoughtIcon(game, arg1, arg2, arg3);
            break;
        case ImageTypeEnum.SceneChange:
            this.changeToSceneChangeImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.DisplayImage:
            this.changeToDisplayImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.InfoImage:
            this.changeToInfoImage(game, arg1, arg2, arg3);
            break;
        case ImageTypeEnum.ChoiceBackground:
            this.changeToChoiceBackgroundImage(game, arg1, arg2, arg3, arg4, arg5);
            break;
        case ImageTypeEnum.OverlayCloseImage:
            this.changeToOverlayCloseImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.ExternalLink:
            this.changeToExternalLinkImage(game, arg1);
            break;
        case ImageTypeEnum.Pause:
            this.changeToPauseButton(game, arg1);
            break;
        case ImageTypeEnum.Play:
            this.changeToPlayButton(game);
            break;
        case ImageTypeEnum.ToggleSubtitle:
            this.changeToPauseButton(game, arg1);
            break;
        case ImageTypeEnum.ThoughtSprite:
            this.changeToThoughtSprite(game, arg1, arg2, arg3);
            break;
        default:
            console.warn("Invalid Image Type.");
    }
}

Image.prototype.changeToStaticImage = function(game) {
    this._image.anchor.setTo(0.5, 0.5);
}

Image.prototype.changeToThoughtSprite = function(game, thoughts, coords, choices) {
    //this._image.width = 100;
    //this._image.height = 100;
    this._image.anchor.setTo(0.5, 0.5);
    this._image.animations.add('think');
    this._image.animations.play('think', 4, false);
    this._image.inputEnabled = true;
    this._image.input.useHandCursor = true;
    this._link = new Linkable(game, this._image.events, game.global.gameManager.getCreateThoughtsAndChoicesSignal(), thoughts, coords, choices);
    this._link.addOnClickAnimation(Animation.fade(game, this._image, 0, false));
    this._link.addOnClickAnimation(Animation.scale(game, this._image, false));
    this._link.setAsButton(true);
    Animation.bob(game, this._image, true);
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
        this.makeDraggable(game, false, true, -this._image.width+game.width, 0, this._image.width*2-game.width, this._image.height);
    }
}

Image.prototype.changeToThoughtIcon = function(game, thoughts, coords) {
    this._image.width = 100;
    this._image.height = 100;
    this._image.anchor.setTo(0.5, 0.5);
    this._link = new Linkable(game, this._image, game.global.gameManager.getCreateThoughtsAndChoicesSignal(), thoughts, coords, choices);
    this._link.addOnClickAnimation(Animation.fade(game, this._image, 0, false));
    this._link.addOnClickAnimation(Animation.scale(game, this._image, false));
    this._link.setAsButton(true);
    Animation.bob(game, this._image, true);
}

Image.prototype.changeToSceneChangeImage = function(game, targetScene) {
    this._target = targetScene;
    this._image.anchor.setTo(0.5, 0.5);
    this._link = new Linkable(game, this._image, game.global.gameManager.getChangeSceneSignal(), targetScene);
    this._link.setAsButton(true);    
    this._link.addMouseOverScaleEffect(game, this._image);
    Animation.bob(game, this._image, true, -1);
}

Image.prototype.changeToDisplayImage = function(game, target, clickedIndex) {
    this._target = target;
    this._image.anchor.setTo(0.5, 0.5);
    this._link = new Linkable(game, this._image, game.global.gameManager.getDisplayImageSignal(), target, clickedIndex);
    this._link.setAsButton(false);
    this._link.addMouseOverScaleEffect(game, this._image);
    Animation.bob(game, this._image, true);
    //this._link.addOnClickAnimation(Animation.fade(game, this._image, 0,false, null, null, true));
 //   this._link.addSound('testSound');
}

Image.prototype.changeToInfoImage = function(game, target) {
    var MARGIN = 50;
    //this._graphic = overlayGraphics;

    var DISPLAY_WIDTH = game.width - (MARGIN<<1);    
    var DISPLAY_HEIGHT = game.height - (MARGIN<<1);
    var SCALE = DISPLAY_WIDTH/this._image.width;
    this._image.height = Math.floor(this._image.height*SCALE);
    this._image.width = Math.floor(this._image.width*SCALE);
    this._image.x = MARGIN;
    this._image.y = MARGIN;

    this._mask = game.add.graphics(0, 0);
    //game.mediaGroup.add(this._mask);
    this._mask.beginFill(0xffffff);
    this._mask.drawRect(MARGIN, MARGIN, DISPLAY_WIDTH, DISPLAY_HEIGHT);
    this._image.mask = this._mask;

    this.makeDraggable(game, true, false, MARGIN, -this._image.height+DISPLAY_HEIGHT+MARGIN, 
        DISPLAY_WIDTH, this._image.height*2-DISPLAY_HEIGHT);
    
}

Image.prototype.changeToChoiceBackgroundImage = function(game, width, height, target, phaserText, tag) {
    this._image.alpha = 0;
    this._image.anchor.set(0.5, 0.5);
    this._image.width = width;
    this._image.height = height;

    this._link = new Linkable(game, this._image, game.global.gameManager.getEndInteractionSignal(), this, target, tag);
    this._link.setAsButton(true);        
    this._link.addMouseOverScaleEffect(game, this._image);
    this._link.addMouseOverScaleEffect(game, phaserText);

    phaserText.bringToTop();
    this._image.input.priorityID = 1;
    
    //Animation.fade(game, this._image, 1, true);
    return this._image;
}

Image.prototype.changeToOverlayCloseImage = function(game) {
    this.setVisible(false);
    this._image.anchor.set(0.5, 0.5);

    this._link = new Linkable(game, this._image, game.global.gameManager.getHideDisplayedImageSignal());
    this._link.setAsButton(false);        
    this._link2 = new Linkable(game, this._image, game.global.gameManager.getHideInfoOverlaySignal());
    this._link2.setAsButton(false);    
    this._link.addMouseOverScaleEffect(game, this._image);
}

Image.prototype.changeToExternalLinkImage = function(game, target) {
    this._image.anchor.set(0.5, 0.5);
    this._link = new Linkable(game, this._image, game.global.gameManager.getGoToLinkSignal(), target);
    this._link.setAsButton(true);
    this._link.addMouseOverScaleEffect(game, this._image);
}

Image.prototype.changeToPauseButton = function(game, signal) {
    this._link = new Linkable(game, this._image, signal);
    this._link.setAsButton(false);
}

Image.prototype.changeToPlayButton = function(game) {
    this._image.anchor.setTo(0.5, 0.5);
    this._image.height = 300;
    this._image.width = 300;
    //this._link = new Linkable(this._image, signal);
    //this._link.setAsButton(false);
}

Image.prototype.changeToToggleSubtitleButton = function(game, signal) {
    this._link = new Linkable(game, this._image, signal);
    this._link.setAsButton(false);
}

Image.prototype.createBgGraphics = function(game, margin) {
    this._graphic = new Graphic(0, 0);
    this._graphic.createOverlayBg(game, margin);
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

Image.prototype.makeDraggable = function(game, lockHorizontal, lockVertical, boundsX, boundsY, boundsWidth, boundsHeight) {

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

Image.prototype.destroy = function() {
    this._image.destroy();
}

Image.prototype.getPhaserImage = function() {
    return this._image;
}

Image.prototype.getType = function() {
    return this._type;
}

Image.prototype.getTarget = function() {
    return this._target;
}

Image.prototype.disableInput = function() {
    this._image.inputEnabled = false;
}

Image.prototype.setVisible = function(isVisible) {
    this._image.visible = isVisible;
    if(this._chainImages) {
        this._chainImages.forEach(function(image) {
            image.setVisible(isVisible);
        });
    }
}

Image.prototype.setImage = function(key) {
    this._key = key;
}

Image.prototype.fadeOut = function(game, chainSignal, arg1) {
    if(chainSignal) {
        this._link = new Linkable(game, this._image, chainSignal, arg1);
        this._link.addOnClickAnimation(Animation.fade(game, this._image, 0, true));
        this._link.onTrigger();
    }
    else {
        Animation.fade(game, this._image, 0, true);
    }
}

Image.prototype.fadeIn = function(game) {    
    Animation.fade(game, this._image, 1, true);
}

function DebugRect(x, y, width, height, game) {
    var bounds = new Phaser.Rectangle(x, y, width, height);
    var graphics = game.add.graphics(bounds.x, bounds.y);
    graphics.beginFill(0x000077);
    graphics.drawRect(0, 0, bounds.width, bounds.height);
}

module.exports = Image;
