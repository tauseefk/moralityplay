"use strict";

//Initialized once
const Text = require('./Text'),
    Image = require('./Image'),
    Graphic = require('./Graphics');

var _instance = null;
var _game = null;

var _currImage = null;
var _heightFraction = null;

var _overlayGraphicScrollBar = null;
var _overlayGraphicNoScrollBar = null;
var _overlayCloseButton = null;
var _overlayText = null;
var _scrollbarBg = null;
var _scrollbarDraggable = null;

const thoughtsTextKeyEnum = 'TEXT_THOUGHTS';
const closeOverlayImageKeyEnum = 'IMAGE_OVERLAY_CLOSE';
const infoOverlayTextKeyEnum= 'TEXT_INFO_OVERLAY';
const SCROLLBAR_IMAGE_KEY = 'scrollBar';
const SCROLLBAR_WHEEL_SENSITIVITY = 10;

var _effectiveScrollBarHeight = 0;
var _effectiveImageHeight = 0;

function CreateInfoOverlay() {    
    CreateOverlayGraphic();
    CreateOverlayCrossButton();
    CreateOverlayHelperText();
}

function CreateOverlayGraphic() {
    _overlayGraphicScrollBar = new Graphic(0, 0, Graphic.getEnum().Overlay);
    _overlayGraphicScrollBar.addGraphicToGame(_game);
    _overlayGraphicScrollBar.changeGraphic(_game, _game.global.constants.INFO_VIEW_MARGIN, true);

    _overlayGraphicNoScrollBar = new Graphic(0, 0, Graphic.getEnum().Overlay);
    _overlayGraphicNoScrollBar.addGraphicToGame(_game);
    _overlayGraphicNoScrollBar.changeGraphic(_game, _game.global.constants.INFO_VIEW_MARGIN, false);

    
    _scrollbarBg = new Graphic(0, 0, Graphic.getEnum().ScrollBarBackground);
    var rectangle = Graphic.createRectangle(_game.global.constants.SCROLLBAR_POS[0], _game.global.constants.SCROLLBAR_POS[1],
        _game.global.constants.SCROLLBAR_DIM[0], _game.global.constants.SCROLLBAR_DIM[1], 0x153b65, 0.8, 
        _game.global.constants.SCROLLBAR_STROKEWIDTH, 0xffffff);
    _scrollbarBg.addGraphicToGame(_game);
    _scrollbarBg.changeGraphic(_game, rectangle);
    //_scrollbarBg.setVisible(false);
    
    /*
    _scrollbarBg = new Graphic(0, 0);
    _scrollbarBg.drawRect(_game, _game.global.constants.SCROLLBAR_POS[0], _game.global.constants.SCROLLBAR_POS[1],
        _game.global.constants.SCROLLBAR_DIM[0], _game.global.constants.SCROLLBAR_DIM[1], 0x153b65, 1, 
        _game.global.constants.SCROLLBAR_STROKEWIDTH, 0xffffff);
    _scrollbarBg.setVisible(false);
        */

    _scrollbarDraggable = new Image(_game.global.constants.SCROLLBAR_POS[0] + _game.global.constants.SCROLLBAR_DIM[0]/2
        , _game.global.constants.SCROLLBAR_POS[1], SCROLLBAR_IMAGE_KEY, Image.getEnum().OverlayScrollBar);
    _scrollbarDraggable.addImageToGame(_game, _game.uiGroup);
    _scrollbarDraggable.changeImage(_game, _game.global.constants.SCROLLBAR_DIM[0]);
}

function CreateOverlayCrossButton() {
    _overlayCloseButton = new Image(50, 50, 'closeButton', closeOverlayImageKeyEnum);
    _overlayCloseButton.addImageToGame(_game, _game.uiGroup);
    _overlayCloseButton.changeImage(_game);
}

function CreateOverlayHelperText() {
    _overlayText = new Text('Drag the image below to scroll', _game.world.centerX, 25, infoOverlayTextKeyEnum, 
        _game.global.style.questionTextProperties);
    _overlayText.addToGame(_game, _game.uiGroup);
    _overlayText.changeText(_game);
}

function InitializeScrollbar(image) {
    _currImage = image;
    _currImage.setPos(_game.global.constants.INFO_VIEW_MARGIN, _game.global.constants.INFO_VIEW_MARGIN);
    var _heightFraction = _game.global.constants.INFO_VIEW_HEIGHT/_currImage.getHeight();

/*
_heightFraction = _game.global.constants.INFO_VIEW_HEIGHT/_currImage.getHeight();
if(_heightFraction >= 1) {
    console.warn('Images with a wider than 16:9 ratio is unsupported for proper viewing.')
    return;
}
*/
    _scrollbarDraggable.setHeight(_heightFraction*_game.global.constants.SCROLLBAR_DIM[1]);
    _scrollbarDraggable.setY(_game.global.constants.SCROLLBAR_POS[1]);

    _effectiveScrollBarHeight = _game.global.constants.SCROLLBAR_DIM[1] - _scrollbarDraggable.getHeight();
    _effectiveImageHeight = _currImage.getHeight() - _game.global.constants.INFO_VIEW_HEIGHT;


}

function HandleMouseWheel(enable) {
    if(enable) {
        _game.input.mouse.mouseWheelCallback = MouseWheel;
    }
    else {
        _game.input.mouse.mouseWheelCallback = null;
    }

    function MouseWheel(event) {
        var newY;
        var delta = _game.input.mouse.wheelDelta;
        if(delta > 0) {
            newY = _scrollbarDraggable.getY() - SCROLLBAR_WHEEL_SENSITIVITY;
            if(newY < _game.global.constants.INFO_VIEW_MARGIN)
                newY = _game.global.constants.INFO_VIEW_MARGIN;
        }
        else if(delta < 0){
            newY = _scrollbarDraggable.getY() + SCROLLBAR_WHEEL_SENSITIVITY;
            if(newY > _effectiveScrollBarHeight + _game.global.constants.INFO_VIEW_MARGIN)
                newY = _effectiveScrollBarHeight + _game.global.constants.INFO_VIEW_MARGIN;
        }
        _scrollbarDraggable.setY(newY);
        ScrollBarDragUpdate();
        //console.log(_game.input.mouse.wheelDelta);
    }
}

function ScrollBarDragStart() {

}

function ScrollBarDragUpdate() {
    _currImage.setY(_game.global.constants.INFO_VIEW_MARGIN - 
        (_scrollbarDraggable.getY() - _game.global.constants.INFO_VIEW_MARGIN)/_effectiveScrollBarHeight*_effectiveImageHeight);
}

function ImageDragStart() {

}

function ImageDragUpdate() {
    //console.log(_scrollbarDraggable);
    //console.log(_currImage);
    _scrollbarDraggable.setY(_game.global.constants.INFO_VIEW_MARGIN - 
        (_currImage.getY() - _game.global.constants.INFO_VIEW_MARGIN)/_effectiveImageHeight*_effectiveScrollBarHeight);
}

function StartDragUpdate() {
    //_scrollbarDraggable.getPhaserImage().events.onDragStart.add(ScrollBarDragStart);
    _scrollbarDraggable.getPhaserImage().events.onDragUpdate.add(ScrollBarDragUpdate);
    //_currImage.getPhaserImage().events.onDragStart.add(ImageDragStart);
    _currImage.getPhaserImage().events.onDragUpdate.add(ImageDragUpdate);
}

module.exports = {
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
        _overlayCloseButton.setVisible(value);
        if(value) {
            if(image) {
                var scrollBarNeeded = image.checkIfScrollBarNeeded(_game);
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
            }
            _overlayCloseButton.bringToTop();
        }
        else {            
            _overlayText.setVisible(false);
            _scrollbarBg.setVisible(false);
            _scrollbarDraggable.setVisible(false);
            _overlayGraphicScrollBar.setVisible(false);
            _overlayGraphicNoScrollBar.setVisible(false);
            HandleMouseWheel(false);            
        }
    },
    resetThoughtVariables: function() {
        _text = [];
        _currentIndex = 0;        
    }
}
