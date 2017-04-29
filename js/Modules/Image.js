/***************************************************************
Wraps Phaser image.
All images/buttons/sprites in game is transformed and displayed from here.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const Linkable = require('./Linkable'),
    Animation = require('./Animation'),
    Graphic = require('./Graphics'),
    Utility = require('./Utility');

//Types of images/buttons/sprites in game
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
    OverlayScrollBar: 'IMAGE_SCROLLBAR',
    ExternalLink: 'IMAGE_BUTTON_EXTERNAL_LINK',
    Reload: 'IMAGE_BUTTON_RELOAD',
    Button: 'IMAGE_BUTTON_GENERIC',
    Play: 'IMAGE_BUTTON_PLAY'
}

/***************************************************************
Image constructor. Needs position, key and type.
***************************************************************/
var Image = function(xPos, yPos, key, type) {
    this._type = type;
    this._xPos = xPos;
    this._yPos = yPos;
    this._key = key;
    this._link = null;
}


/***************************************************************
Adds the phaser image/button.sprite to the game.
***************************************************************/
Image.prototype.addImageToGame = function(game, group) {
    switch(this._type) {
        case ImageTypeEnum.Play:
        case ImageTypeEnum.Thought:
        case ImageTypeEnum.SceneChange:
        case ImageTypeEnum.DisplayImage:
        case ImageTypeEnum.ChoiceBackground:
        case ImageTypeEnum.OverlayCloseImage:
        case ImageTypeEnum.ExternalLink:
        case ImageTypeEnum.Reload:
        case ImageTypeEnum.Button:
            this._image = game.add.button(this._xPos, this._yPos, this._key);
            break;
        case ImageTypeEnum.Static:
        case ImageTypeEnum.Background:
        case ImageTypeEnum.InfoImage:
        case ImageTypeEnum.OverlayScrollBar:
            this._image = game.add.image(this._xPos, this._yPos, this._key);
            break;
        case ImageTypeEnum.ThoughtSprite:
            this._image = game.add.sprite(this._xPos, this._yPos, this._key);
            break;
        default:
            console.warn("Invalid image type not added:" + this._type);
    }
    this.addToGroup(game, group);   
}

/***************************************************************
Adds image to group.
***************************************************************/
Image.prototype.addToGroup = function(game, group) {
    if(group)
        group.add(this._image);
    else {
        this.addToDefaultGroup(game);
    }
}

/***************************************************************
Adds to a default predefined Phaser group.
***************************************************************/
Image.prototype.addToDefaultGroup = function(game) {
    switch(this._type) {
        case ImageTypeEnum.Play:
        case ImageTypeEnum.InfoImage:
        case ImageTypeEnum.OverlayScrollBar:
        case ImageTypeEnum.OverlayCloseImage:
        case ImageTypeEnum.Button:
            game.uiGroup.add(this._image);
            break;
        case ImageTypeEnum.Thought:
        case ImageTypeEnum.SceneChange:
        case ImageTypeEnum.DisplayImage:
        case ImageTypeEnum.ChoiceBackground:
        case ImageTypeEnum.ExternalLink:
        case ImageTypeEnum.Reload:
        case ImageTypeEnum.Static:
        case ImageTypeEnum.Background:
        case ImageTypeEnum.ThoughtSprite:
            game.mediaGroup.add(this._image);
            break;
        default:
            console.warn("Invalid image type not added to group:" + this._type);
    }
}

/***************************************************************
Changes the image to the specified type.
***************************************************************/
Image.prototype.changeImage = function (game, arg1, arg2, arg3, arg4, arg5) {
    switch(this._type) {
        case ImageTypeEnum.Static:            
            this.changeToStaticImage(game);
            break;
        case ImageTypeEnum.Background:
            this.changeToBgImage(game, arg1);
            break;
        case ImageTypeEnum.Thought:
            this.changeToThoughtIcon(game, arg1, arg2);
            break;
        case ImageTypeEnum.ThoughtSprite:
            this.changeToThoughtSprite(game, arg1, arg2, arg3);
            break;
        case ImageTypeEnum.SceneChange:
            this.changeToSceneChangeImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.DisplayImage:
            this.changeToDisplayImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.InfoImage:
            this.changeToInfoImage(game, arg1);
            break;
        case ImageTypeEnum.ChoiceBackground:
            this.changeToChoiceBackgroundImage(game, arg1, arg2, arg3, arg4, arg5);
            break;
        case ImageTypeEnum.OverlayCloseImage:
            this.changeToOverlayCloseImage(game, arg1, arg2);
            break;
        case ImageTypeEnum.OverlayScrollBar:
            this.changeToOverlayScrollBar(game, arg1, arg2);
            break;
        case ImageTypeEnum.ExternalLink:
            this.changeToExternalLinkImage(game, arg1);
            break;
        case ImageTypeEnum.Reload:
            this.changeToReloadImage(game, arg1);
            break;
        case ImageTypeEnum.Play:
            this.changeToPlayButton(game);
            break;
        case ImageTypeEnum.Button:
            this.changeToGenericButton(game, arg1);
            break;
        default:
            console.warn("Invalid Image Type.");
    }
}

/***************************************************************
A generic static phaser image.
***************************************************************/
Image.prototype.changeToStaticImage = function(game) {
    this._image.anchor.setTo(0.5, 0.5);
}

/***************************************************************
Changes image to a horizontally draggable image.
Scales and sets a rectangle container for Bg image to pan around.
Currently unused.
***************************************************************/
Image.prototype.changeToBgImage = function(game, draggable) {
    //Scales Bg image to fit game height, maintains Bg image aspect ratio
    var scale = game.height/this._image.height;
    this._image.height = Math.floor(this._image.height*scale);
    this._image.width = Math.floor(this._image.width*scale);
    //Initializes container for bg image to be dragged around

    if(draggable) {
        this.makeDraggable(game, false, true, -this._image.width+game.width, 0, this._image.width*2-game.width, this._image.height).bind(this);
    }
}

/***************************************************************
Changes image to a static thought bubble image.
Currently unused.
***************************************************************/
Image.prototype.changeToThoughtIcon = function(game, thoughts, coords) {
    //Display properties
    this._image.width = 100;
    this._image.height = 100;
    this._image.anchor.setTo(0.5, 0.5);

    //Interactive properties
    this._link = new Linkable(game, this._image, game.global.gameManager.getCreateThoughtsSignal(), thoughts, coords, choices);
    this._link.addOnClickAnimation(Animation.fade(game, this._image, 0, false));
    this._link.setAsButton(true);
    Animation.bob(game, this._image, true);
}

/***************************************************************
Changes image to a spritesheet thought bubble image.
***************************************************************/
Image.prototype.changeToThoughtSprite = function(game, thoughts, coords, choices) {
    //Display properties
    this._image.anchor.setTo(0.5, 0.5);
    this._image.animations.add('think');
    this._image.animations.play('think', 8, true);

    //Interactive properties
    this.enableInput(true);
    this._image.input.useHandCursor = true;
    this._link = new Linkable(game, this._image.events, game.global.gameManager.getCreateThoughtsSignal(), thoughts, coords, choices);
    this._link.addOnClickAnimation(Animation.fade(game, this._image, 0, false));
    this._link.addMouseOverScaleEffect(game, this._image);
    this._link.setAsButton(true);
    Animation.bob(game, this._image, true);
}

/***************************************************************
This image changes game scene when clicked.
***************************************************************/
Image.prototype.changeToSceneChangeImage = function(game, targetScene) {
    //Display properties
    this._image.anchor.setTo(0.5, 0.5);

    //Interaction properties
    this._link = new Linkable(game, this._image, game.global.gameManager.getChangeSceneSignal(), targetScene);
    this._link.setAsButton(true);    
    this._link.addSound(game.global.mapping.buttonClickSound);
    this._link.addMouseOverScaleEffect(game, this._image);
    Animation.bob(game, this._image, true, -1);
}

/***************************************************************
This image reveals another image when clicked.
***************************************************************/
Image.prototype.changeToDisplayImage = function(game, target, clickedIndex) {
    //Display properties
    this._image.anchor.setTo(0.5, 0.5);

    //Interaction properties
    this._link = new Linkable(game, this._image, game.global.gameManager.getDisplayImageSignal(), target, clickedIndex);
    this._link.setAsButton(false);
    this._link.addMouseOverScaleEffect(game, this._image);
    Animation.bob(game, this._image, true);
}

/***************************************************************
Information image.
***************************************************************/
Image.prototype.changeToInfoImage = function(game, target) {
    //Display properties
    var MARGIN = game.global.constants.INFO_VIEW_MARGIN;
    var DISPLAY_WIDTH = game.global.constants.INFO_VIEW_WIDTH;    
    var DISPLAY_HEIGHT = game.global.constants.INFO_VIEW_HEIGHT;
    var SCALE = DISPLAY_WIDTH/this._image.width;
    this._image.height = Math.floor(this._image.height*SCALE);
    this._image.width = Math.floor(this._image.width*SCALE);
    this._image.x = MARGIN;

    //Changes depending on scrollbar needed
    if(Utility.checkIfScrollBarNeeded(game, this._image)) {    
        this._image.y = MARGIN;    
        this._mask = new Graphic(0, 0, Graphic.getEnum().Rectangle);
        this._mask.addGraphicToGame(game, game.uiGroup);
        var rectangle = Graphic.createRectangle(MARGIN, MARGIN, DISPLAY_WIDTH, game.global.constants.INFO_VIEW_HEIGHT);
        this._mask.changeGraphic(game, rectangle);
        this._image.mask = this._mask.getGraphic();

        //Interaction properties
        this.makeDraggable(game, true, false, MARGIN, -this._image.height+DISPLAY_HEIGHT+MARGIN, 
            DISPLAY_WIDTH, this._image.height*2-DISPLAY_HEIGHT);
    }
    else{
        this._image.y = game.world.centerY;
        this._image.anchor.setTo(0, 0.5);
    }    
}

/***************************************************************
Changes image to the background of choice buttons.
Handles input and animation of text on it as well.
***************************************************************/
Image.prototype.changeToChoiceBackgroundImage = function(game, width, height, target, phaserText, tag) {
    //Display properties
    this._image.alpha = 0;
    this._image.anchor.set(0.5, 0.5);
    this._image.width = width;
    this._image.height = height;
    phaserText.bringToTop();

    //Interaction properties
    this._link = new Linkable(game, this._image, game.global.gameManager.getEndInteractionSignal(), this, target, tag);
    this._link.setAsButton(true);        
    this._link.addMouseOverScaleEffect(game, this._image);
    this._link.addMouseOverScaleEffect(game, phaserText);
    this._link.addSound(game.global.mapping.buttonClickSound);
    this._image.input.priorityID = 1;

    this.fadeIn(game);    
    //Animation.fade(game, this._image, 1, true);
    return this._image;
}

/***************************************************************
Changes image to the close button of the overlay
***************************************************************/
Image.prototype.changeToOverlayCloseImage = function(game) {
    //Display properties
    this.setVisible(false);
    this._image.anchor.set(0.5, 0.5);

    //Interaction properties
    this._link = new Linkable(game, this._image, game.global.gameManager.getHideDisplayedImageSignal());
    this._link.setAsButton(false);
    this._link.addMouseOverScaleEffect(game, this._image);
    this._link.addSound(game.global.mapping.buttonClickSound);
    this._link2 = new Linkable(game, this._image, game.global.gameManager.getHideInfoOverlaySignal());
    this._link2.setAsButton(false);    
}

/***************************************************************
Changes image to the interactable scrollbar
***************************************************************/
Image.prototype.changeToOverlayScrollBar = function(game, width) {
    //Display properties
    this.setVisible(false);
    this._image.width = width-2;
    this._image.anchor.set(0.5, 0);

    //Interaction properties
    this.makeDraggable.call(this, game, true, false, game.global.constants.SCROLLBAR_POS[0], game.global.constants.SCROLLBAR_POS[1],
        game.global.constants.SCROLLBAR_DIM[0]+5, game.global.constants.SCROLLBAR_DIM[1]);
}

/***************************************************************
This image, when clicked, leads to an external site.
***************************************************************/
Image.prototype.changeToExternalLinkImage = function(game, target) {
    this._image.anchor.set(0.5, 0.5);

    this._link = new Linkable(game, this._image, game.global.gameManager.getGoToLinkSignal(), target);
    this._link.setAsButton(true);
    this._link.addSound(game.global.mapping.buttonClickSound);
    this._link.addMouseOverScaleEffect(game, this._image);
}

/***************************************************************
This image, when clicked, reloads the page.
***************************************************************/
Image.prototype.changeToReloadImage = function(game, target) {
    this._image.anchor.set(0.5, 0.5);

    this._link = new Linkable(game, this._image, game.global.gameManager.getReloadSignal());
    this._link.setAsButton(true);
    this._link.addSound(game.global.mapping.buttonClickSound);
    this._link.addMouseOverScaleEffect(game, this._image);
}

/***************************************************************
Changes image to the play button (when game is paused).
***************************************************************/
Image.prototype.changeToPlayButton = function(game) {
    this._image.anchor.setTo(0.5, 0.5);
    this._image.height = 300;
    this._image.width = 300;
}

/***************************************************************
A generic button that dispatched signal parameter when clicked.
***************************************************************/
Image.prototype.changeToGenericButton = function(game, signal) {    
    this._link = new Linkable(game, this._image, signal);
    this._link.addSound(game.global.mapping.buttonClickSound);
    this._link.setAsButton(false);
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

/***************************************************************
Makes image draggable.
Possible to lock axis.
Possible to set bounding box.
***************************************************************/
Image.prototype.makeDraggable = function(game, lockHorizontal, lockVertical, boundsX, boundsY, boundsWidth, boundsHeight) {
    this.enableInput(true);
    //Sets bounding box for dragged object
    if(boundsX !== undefined && boundsX !== undefined) {
        var dragBounds = new Phaser.Rectangle(boundsX, boundsY, boundsWidth, boundsHeight);
        this._image.input.boundsRect = dragBounds;
    }
    //Locks draggin in certain axes if specified
    this._image.input.draggable = true;
    this._image.input.allowVerticalDrag = !lockVertical;
    this._image.input.allowHorizontalDrag = !lockHorizontal;

    //Changes mouseover image
    this.changeCursorImage(game, 'url("./Images/UI/hand_2.png"), auto');
}

/***************************************************************
Destroys phaser image.
***************************************************************/
Image.prototype.destroy = function() {
    this._image.destroy();
}

/***************************************************************
Brings phaser image to top of group(or game).
***************************************************************/
Image.prototype.bringToTop = function() {
    this._image.bringToTop();
}

/***************************************************************
Returns the phaser image.
***************************************************************/
Image.prototype.getPhaserImage = function() {
    return this._image;
}

/***************************************************************
Returns the phaser image height.
***************************************************************/
Image.prototype.getHeight = function() {
    return this._image.height;
}

/***************************************************************
Returns y position of phaser image.
***************************************************************/
Image.prototype.getY = function() {
    return this._image.y;
}

/***************************************************************
Gets image type based on ImageKeyEnum.
***************************************************************/
Image.prototype.getType = function() {
    return this._type;
}

Image.prototype.enableInput = function(value) {
    this._image.inputEnabled = value;
}

Image.prototype.setX = function(x){
    this._image.x = x;
}

Image.prototype.setY = function(y){
    this._image.y = y;
}

Image.prototype.setPos = function(x, y) {
    this.setX(x);
    this.setY(y);
}

Image.prototype.setHeight = function(height) {
    this._image.height = height;
}

Image.prototype.setVisible = function(isVisible) {
    this._image.visible = isVisible;
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

/***************************************************************
Returns ImageTypeEnum
***************************************************************/
Image.getEnum = function() {
    return ImageTypeEnum;
}

module.exports = Image;
