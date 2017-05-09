/***************************************************************
In charge of creating fade in/out transitions between scenes.
Currently fade out is not implemented.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const Image = require('./Objects/Image'),
    Text = require('./Objects/Text'),
    Graphic = require('./Objects/Graphics'),
    Video = require('./videoLoader'),
    ImageViewer = require('./imageViewer'),
    Subtitle = require('./subtitleLoader');

var _instance = null;
var _game = null;

var _graphicOverlay = null;
var _pauseImage = null;
var _playImage = null;
var _subtitleImage = null;
var _subtitleDisabledImage = null;

var _uiVisible = true;
var _subsVisible = true;

/***************************************************************
Draws pause UI image button.
***************************************************************/
function DrawPauseButton() {
    if(!_pauseImage)
        _pauseImage = new Image(10, 10, _game.global.mapping.pauseButtonImageKey, Image.getEnum().Button);
    _pauseImage.addImageToGame(_game, _game.uiGroup);
    _pauseImage.changeImage(_game, _game.global.gameManager.getPauseSignal());
}

/***************************************************************
Draws both subtitle images, for on/off.
***************************************************************/
function DrawSubtitleButtons() {
    if(!_subtitleImage)
        _subtitleImage = new Image(10, 100, _game.global.mapping.subtitleButtonImageKey, Image.getEnum().Button);
    _subtitleImage.addImageToGame(_game, _game.uiGroup);
    _subtitleImage.changeImage(_game, _game.global.gameManager.getToggleSubtitleSignal());

    if(!_subtitleDisabledImage)
        _subtitleDisabledImage = new Image(10, 100, _game.global.mapping.subtitleDisabledButtonImageKey, Image.getEnum().Button);
    _subtitleDisabledImage.addImageToGame(_game, _game.uiGroup);
    _subtitleDisabledImage.changeImage(_game, _game.global.gameManager.getToggleSubtitleSignal());

    //Gets visibility status from subtitle loader
    if(Subtitle.getSubtitleVisible())
        _subtitleDisabledImage.setVisible(false);
    else
        _subtitleImage.setVisible(false);
}

/***************************************************************
Draws play UI image button.
***************************************************************/
function DrawPlayButton() {
    if(!_playImage)
        _playImage = new Image(_game.world.centerX, _game.world.centerY,  _game.global.mapping.playButtonImageKey, Image.getEnum().Play);
    _playImage.addImageToGame(_game, _game.uiGroup);
    _playImage.changeImage(_game);
    _playImage.setVisible(false);
}

/***************************************************************
Pauses game, checks whether video is already paused before firing.
***************************************************************/
function Pause() {
    if(!Video.paused()) {
        _game.paused = true;
        Video.stop();
        if(_graphicOverlay) {
            _graphicOverlay.setVisible(true);;
        }
        if(_playImage) {
            _playImage.setVisible(true);
        }
        //Adds event to resume game
        _game.input.onDown.addOnce(Play, self);
    }
}

/***************************************************************
Checks that the video is paused by the UI before unpausing.
Prevents conflict when video is paused by engine during interaction moment.
***************************************************************/
function Play() {
    if(!Video.isPausedByGame()) {
        Video.play();
        _game.paused = false;
        _graphicOverlay.setVisible(false);
        _playImage.setVisible(false);
    }
}

/***************************************************************
Hides the UI during interaction moment.
***************************************************************/
function HideUI() {
    _uiVisible = false;
    _pauseImage.setVisible(_uiVisible);
    _subtitleImage.setVisible(_uiVisible);
    _subtitleDisabledImage.setVisible(_uiVisible);
    Subtitle.hideSubtitleForMoment();
}

/***************************************************************
Shows the UI.
***************************************************************/
function ShowUI() {
    _uiVisible = true;
    _pauseImage.setVisible(_uiVisible);
    if(Subtitle.getSubtitleVisible())
        _subtitleImage.setVisible(_uiVisible);
    else
        _subtitleDisabledImage.setVisible(_uiVisible);
}

/***************************************************************
Draws semi-transparent black overlay when game is paused.
***************************************************************/
function DrawPauseOverlay() {
    _graphicOverlay = new Graphic(0, 0, Graphic.getEnum().Rectangle);
    var rectangle = Graphic.createRectangle(0, 0, _game.width, _game.height, 0x000000, 0.8);
    _graphicOverlay.addGraphicToGame(_game);
    _graphicOverlay.changeGraphic(_game, rectangle);
    _graphicOverlay.setVisible(false);
    _game.uiGroup.add(_graphicOverlay.getGraphic());
}

/*
//Unused, intended for nameplates.
function drawUI() {
    _graphicOverlay = _game.add.graphics(0, 0);
    drawName();
}

function drawName() {
    _game.add.text(0, 0, 'Chris', {})
    _graphicOverlay.beginFill(0x000000);
    _graphicOverlay.drawRoundedRect(0, 0, _game.width, _game.height, 10);
}
*/

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
    createInfoOverlay: function() {
        ImageViewer.createOverlay();
    },
    showInfoOverlay: function(image) {
        ImageViewer.setVisible(true, image);
    },
    hideInfoOverlay: function() {
        ImageViewer.setVisible(false);
    }
}
