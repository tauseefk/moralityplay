//Dependency: Nonde
"use strict";

const Image = require('./Image'),
    Text = require('./Text'),
    Graphic = require('./Graphics'),
    Video = require('./videoLoader'),
    ImageViewer = require('./imageViewer'),
    Subtitle = require('./subtitleLoader');

var _instance = null;
var _game = null;
var _graphics = null;
var _pauseImage = null;
var _playImage = null;
var _subtitleImage = null;
var _subtitleDisabledImage = null;
var _pausedByEngine = false;

var _overlayGraphic = null;
var _overlayCloseButton = null;
var _overlayText = null;

var _uiVisible = true;
var _subsVisible = true;

const pauseButtonImageKeyEnum = 'IMAGE_BUTTON_PAUSE';
const playButtonImageKeyEnum = 'IMAGE_BUTTON_PLAY';
const toggleSubtitleButtonImageKeyEnum = 'IMAGE_BUTTON_TOGGLE_SUBTITLE';

function DrawPauseButton() {
    if(!_pauseImage)
        _pauseImage = new Image(10, 10, _game.global.mapping.pauseButtonImageKey, Image.getEnum().Button);
    _pauseImage.addImageToGame(_game, _game.uiGroup);
    _pauseImage.changeImage(_game, _game.global.gameManager.getPauseSignal());
}

function DrawSubtitleButtons() {
    if(!_subtitleImage)        
        _subtitleImage = new Image(10, 100, _game.global.mapping.subtitleButtonImageKey, Image.getEnum().Button);    
    _subtitleImage.addImageToGame(_game, _game.uiGroup);
    _subtitleImage.changeImage(_game, _game.global.gameManager.getToggleSubtitleSignal());

    if(!_subtitleDisabledImage)        
        _subtitleDisabledImage = new Image(10, 100, _game.global.mapping.subtitleDisabledButtonImageKey, Image.getEnum().Button);    
    _subtitleDisabledImage.addImageToGame(_game, _game.uiGroup);
    _subtitleDisabledImage.changeImage(_game, _game.global.gameManager.getToggleSubtitleSignal());

    if(Subtitle.getSubtitleVisible())
        _subtitleDisabledImage.setVisible(false);
    else        
        _subtitleImage.setVisible(false);
}

function DrawPlayButton() {
    if(!_playImage)
        _playImage = new Image(_game.world.centerX, _game.world.centerY, 'playButton', playButtonImageKeyEnum);
    _playImage.addImageToGame(_game, _game.uiGroup);
    _playImage.changeImage(_game);
    _playImage.setVisible(false);
}

function Pause() {
    if(!Video.paused()) {
        _game.paused = true;
        Video.stop();
        if(_graphics) {
            _graphics.setVisible(true);;
        }
        if(_playImage) {
            _playImage.setVisible(true);
        }
        _game.input.onDown.addOnce(Play, self);
    }
}

function Play() {
    if(!Video.isPausedByGame()) {
        Video.play();
        _game.paused = false;
        _graphics.setVisible(false);
        _playImage.setVisible(false);
    }
}

function HideUI() {
    _uiVisible = false;
    _pauseImage.setVisible(_uiVisible);
    _subtitleImage.setVisible(_uiVisible);
    _subtitleDisabledImage.setVisible(_uiVisible);
}

function ShowUI() {
    _uiVisible = true;
    _pauseImage.setVisible(_uiVisible);
    if(Subtitle.getSubtitleVisible())
        _subtitleImage.setVisible(_uiVisible);
    else        
        _subtitleDisabledImage.setVisible(_uiVisible);
}

function DrawPauseOverlay() {
    _graphics = new Graphic(0, 0, Graphic.getEnum().Rectangle);
    var rectangle = Graphic.createRectangle(0, 0, _game.width, _game.height, 0x000000, 0.8);
    _graphics.addGraphicToGame(_game);
    _graphics.changeGraphic(_game, rectangle);
    _graphics.setVisible(false);
    _game.uiGroup.add(_graphics.getGraphic());
}

function drawUI() {
    _graphics = _game.add.graphics(0, 0);
    drawName();
}

function drawName() {
    _game.add.text(0, 0, 'Chris', {})
    _graphics.beginFill(0x000000);
    _graphics.drawRoundedRect(0, 0, _game.width, _game.height, 10);
}

module.exports = {
    init: function(game) {
        if(_instance !== null)
            return _instance;
        Subtitle.init(game);
        ImageViewer.init(game);
        _instance = this;
        _game = game;
        return _instance;
    },
    preload: function() {
    },
    create: function(drawPause, drawSubtitles) {
        _uiVisible = true;
        if(drawSubtitles)
            DrawSubtitleButtons();
        if(drawPause) {
            DrawPauseButton();
            DrawPauseOverlay();
            DrawPlayButton();
        }
    },
    pause: function(byGame) {
        Pause(byGame);
    },
    play: function() {
        Play();
    },
    showUI: function() {
        ShowUI();
    },
    hideUI: function() {
        HideUI();
    },
    toggleSubtitle: function() {
        _subsVisible = Subtitle.toggleSubtitle();
        if(_subsVisible) {
            _subtitleImage.setVisible(true);            
            _subtitleDisabledImage.setVisible(false);
        }
        else {
            _subtitleImage.setVisible(false);            
            _subtitleDisabledImage.setVisible(true);
        }
    },    
    createInfoOverlay() {
        ImageViewer.createOverlay();
    },
    showInfoOverlay(image) {
        ImageViewer.setVisible(true, image);
    },
    hideInfoOverlay() {
        ImageViewer.setVisible(false);
    }
}
