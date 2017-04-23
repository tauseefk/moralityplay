"use strict";

//Initialized once
const Text = require('./Text'),
    Image = require('./Image'),
    Graphic = require('./Graphics');

var _instance = null;
var _game = null;

var _currImage = null;
var _heightFraction = null;

var _overlayGraphic = null;
var _overlayCloseButton = null;
var _overlayText = null;
var _scrollbarBg = null;
var _scrollbarDraggable = null;

const thoughtsTextKeyEnum = 'TEXT_THOUGHTS';
const closeOverlayImageKeyEnum = 'IMAGE_OVERLAY_CLOSE';
const infoOverlayTextKeyEnum= 'TEXT_INFO_OVERLAY';
const SCROLLBAR_IMAGE_KEY = 'scrollBar';

var _effectiveScrollBarHeight = 0;
var _effectiveImageHeight = 0;

function CreateInfoOverlay() {    
    CreateOverlayGraphic();
    CreateOverlayCrossButton();
    CreateOverlayHelperText();
}

function CreateOverlayGraphic() {
    _overlayGraphic = new Graphic(0, 0);
    _overlayGraphic.createOverlayBg(_game, _game.global.constants.INFO_VIEW_MARGIN);

    _scrollbarBg = new Graphic(0, 0);
    _scrollbarBg.drawRect(_game, _game.global.constants.SCROLLBAR_POS[0], _game.global.constants.SCROLLBAR_POS[1],
        _game.global.constants.SCROLLBAR_DIM[0], _game.global.constants.SCROLLBAR_DIM[1], 0x153b65, 1, 
        _game.global.constants.SCROLLBAR_STROKEWIDTH, 0xffffff);
    _scrollbarBg.setVisible(false);

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

    _heightFraction = _game.global.constants.INFO_VIEW_HEIGHT/_currImage.getHeight();
    if(_heightFraction >= 1) {
        console.warn('Images with a wider than 16:9 ratio is unsupported for proper viewing.')
        return;
    }

    _scrollbarDraggable.setHeight(_heightFraction*_game.global.constants.SCROLLBAR_DIM[1]);
    _scrollbarDraggable.setY(_game.global.constants.SCROLLBAR_POS[1]);

    _effectiveScrollBarHeight = _game.global.constants.SCROLLBAR_DIM[1] - _scrollbarDraggable.getHeight();
    _effectiveImageHeight = _currImage.getHeight() - _game.global.constants.INFO_VIEW_HEIGHT;
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
        if(value && image)
            this.initializeScrollbar(image);
        _overlayGraphic.setVisible(value);
        _overlayCloseButton.setVisible(value);
        _overlayText.setVisible(value);
        _scrollbarBg.setVisible(value);
        _scrollbarDraggable.setVisible(value);
    },
    resetThoughtVariables: function() {
        _text = [];
        _currentIndex = 0;        
    }
}
