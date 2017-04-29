/***************************************************************
Handles information image viewing interaction.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const Text = require('./Text'),
    Image = require('./Image'),
    Graphic = require('./Graphics'),
    Utility = require('./Utility');

var _instance = null;
var _game = null;

//Helper variables
var _currImage = null;
var _heightFraction = null;

//Graphic object variables
var _overlayGraphicScrollBar = null;
var _overlayGraphicNoScrollBar = null;
var _overlayCloseButton = null;
var _overlayText = null;
var _scrollbarBg = null;
var _scrollbarDraggable = null;

//Calculate scrollbar position helper variables
var _effectiveScrollBarHeight = 0;
var _effectiveImageHeight = 0;


/***************************************************************
Creates the overlay graphic, cross button and help text.
***************************************************************/
function CreateInfoOverlay() {    
    CreateOverlayGraphic();
    CreateOverlayCrossButton();
    CreateOverlayHelperText();
}

/***************************************************************
Creates all overlay graphic elements.
***************************************************************/
function CreateOverlayGraphic() {  
    CreateBlackOverlays();
    CreateScrollBarBgGraphic();
    CreateScrollBarImage();
}

/***************************************************************
Creates black overlays.
***************************************************************/
function CreateBlackOverlays() {
    //Black overlay for images that require scrollbar
    _overlayGraphicScrollBar = new Graphic(0, 0, Graphic.getEnum().Overlay);
    _overlayGraphicScrollBar.addGraphicToGame(_game);
    _overlayGraphicScrollBar.changeGraphic(_game, true);

    //Black overlay for images that does not require scrollbar
    _overlayGraphicNoScrollBar = new Graphic(0, 0, Graphic.getEnum().Overlay);
    _overlayGraphicNoScrollBar.addGraphicToGame(_game);
    _overlayGraphicNoScrollBar.changeGraphic(_game, false);
}

/***************************************************************
Creates background graphic for scrollbar container.
***************************************************************/
function CreateScrollBarBgGraphic() {
    _scrollbarBg = new Graphic(0, 0, Graphic.getEnum().ScrollBarBackground);
    var rectangle = Graphic.createRectangle(_game.global.constants.SCROLLBAR_POS[0], _game.global.constants.SCROLLBAR_POS[1],
        _game.global.constants.SCROLLBAR_DIM[0], _game.global.constants.SCROLLBAR_DIM[1], 0x153b65, 0.8, 
        _game.global.constants.SCROLLBAR_STROKEWIDTH, 0xffffff);
    _scrollbarBg.addGraphicToGame(_game);
    _scrollbarBg.changeGraphic(_game, rectangle);
}

/***************************************************************
Creates draggable scrollbar image.
***************************************************************/
function CreateScrollBarImage() {
    _scrollbarDraggable = new Image(_game.global.constants.SCROLLBAR_POS[0] + _game.global.constants.SCROLLBAR_DIM[0]/2
        , _game.global.constants.SCROLLBAR_POS[1], _game.global.mapping.overlayScrollBarImageKey, Image.getEnum().OverlayScrollBar);
    _scrollbarDraggable.addImageToGame(_game, _game.uiGroup);
    _scrollbarDraggable.changeImage(_game, _game.global.constants.SCROLLBAR_DIM[0]);
}

/***************************************************************
Creates cross button for overlay
***************************************************************/
function CreateOverlayCrossButton() {
    _overlayCloseButton = new Image(50, 50, _game.global.mapping.overlayCloseButtonImageKey, Image.getEnum().OverlayCloseImage);
    _overlayCloseButton.addImageToGame(_game, _game.uiGroup);
    _overlayCloseButton.changeImage(_game);
}

/***************************************************************
Creates helper text for images that require draggin/scollbar
***************************************************************/
function CreateOverlayHelperText() {
    _overlayText = new Text('Drag the image below to scroll', _game.world.centerX, 25, Text.getEnum().InfoOverlayText, 
        _game.global.style.questionTextProperties);
    _overlayText.addTextToGame(_game, _game.uiGroup);
    _overlayText.changeText(_game);
}

/***************************************************************
Sets up scrollbar image for scrolling.
***************************************************************/
function InitializeScrollbar(image) {
    //Sets position of viewed image
    _currImage = image;
    _currImage.setPos(_game.global.constants.INFO_VIEW_MARGIN, _game.global.constants.INFO_VIEW_MARGIN);

    //Scales scrollbar depending on viewed image height
    var _heightFraction = _game.global.constants.INFO_VIEW_HEIGHT/_currImage.getHeight();
    _scrollbarDraggable.setHeight(_heightFraction*_game.global.constants.SCROLLBAR_DIM[1]);

    //Resets position of scrollbar
    _scrollbarDraggable.setY(_game.global.constants.SCROLLBAR_POS[1]);

    //Gets range of y values that the scrollbar should take for scrolling
    _effectiveScrollBarHeight = _game.global.constants.SCROLLBAR_DIM[1] - _scrollbarDraggable.getHeight();
    _effectiveImageHeight = _currImage.getHeight() - _game.global.constants.INFO_VIEW_HEIGHT;
}

/***************************************************************
Enables mousewheel for scrolling.
***************************************************************/
function HandleMouseWheel(enable) {
    if(enable) {
        _game.input.mouse.mouseWheelCallback = MouseWheel;
    }
    else {
        _game.input.mouse.mouseWheelCallback = null;
    }

    //maps mousewheel to scrollbar height
    function MouseWheel(event) {
        var newY;
        var delta = _game.input.mouse.wheelDelta;
        if(delta > 0) {
            newY = _scrollbarDraggable.getY() - _game.global.constants.SCROLLBAR_WHEEL_SENSITIVITY;
            if(newY < _game.global.constants.INFO_VIEW_MARGIN)
                newY = _game.global.constants.INFO_VIEW_MARGIN;
        }
        else if(delta < 0){
            newY = _scrollbarDraggable.getY() + _game.global.constants.SCROLLBAR_WHEEL_SENSITIVITY;
            if(newY > _effectiveScrollBarHeight + _game.global.constants.INFO_VIEW_MARGIN)
                newY = _effectiveScrollBarHeight + _game.global.constants.INFO_VIEW_MARGIN;
        }
        _scrollbarDraggable.setY(newY);
        ScrollBarDragUpdate();
    }
}

/***************************************************************
When scrollbar is dragged, updates image position.
***************************************************************/
function ScrollBarDragUpdate() {
    _currImage.setY(_game.global.constants.INFO_VIEW_MARGIN - 
        (_scrollbarDraggable.getY() - _game.global.constants.INFO_VIEW_MARGIN)/_effectiveScrollBarHeight*_effectiveImageHeight);
}

/***************************************************************
When image is dragged, updates scrollbar position.
***************************************************************/
function ImageDragUpdate() {
    _scrollbarDraggable.setY(_game.global.constants.INFO_VIEW_MARGIN - 
        (_currImage.getY() - _game.global.constants.INFO_VIEW_MARGIN)/_effectiveImageHeight*_effectiveScrollBarHeight);
}

/***************************************************************
Starts drag events
***************************************************************/
function StartDragUpdate() {
    _scrollbarDraggable.getPhaserImage().events.onDragUpdate.add(ScrollBarDragUpdate);
    _currImage.getPhaserImage().events.onDragUpdate.add(ImageDragUpdate);
}

/***************************************************************
Decides which elements to set visible depending on scrollbar requirement.
***************************************************************/
function SetVisible(value, image) {
    if(value && image) {
        _overlayCloseButton.setVisible(true);
        var scrollBarNeeded = Utility.checkIfScrollBarNeeded(_game, image.getPhaserImage());
        if(scrollBarNeeded) {
            this.initializeScrollbar(image);
            _overlayText.setVisible(true);
            _overlayGraphicScrollBar.setVisible(true);
            _scrollbarBg.setVisible(true);
            _scrollbarDraggable.setVisible(true);
            HandleMouseWheel(true);
        }
        else {
            _overlayGraphicNoScrollBar.setVisible(true);
        }
        image.bringToTop();
        _overlayCloseButton.bringToTop();
    }
    else {
        _overlayCloseButton.setVisible(false);
        _overlayText.setVisible(false);
        _scrollbarBg.setVisible(false);
        _scrollbarDraggable.setVisible(false);
        _overlayGraphicScrollBar.setVisible(false);
        _overlayGraphicNoScrollBar.setVisible(false);
        HandleMouseWheel(false);            
    }
}

module.exports = {
    //Singleton initialization
    init: function(game) {
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    createOverlay: function() {
        CreateInfoOverlay();
    },
    initializeScrollbar: function(image) {
        InitializeScrollbar(image);
        StartDragUpdate();
    },
    setVisible: function(value, image) {
        SetVisible.call(this, value, image);
    }
}
