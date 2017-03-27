//Dependency: Nonde
"use strict";

const Image = require('./Image'),
    Video = require('./videoLoader');

var _instance = null;
var _game = null;
var _graphics = null;
var _pauseImage = null;

const pauseButtonImageKeyEnum = 'IMAGE_PAUSE';

function drawPauseButton() {
    if(_pauseImage) {
        _pauseImage.addImageToGame(_game, pauseButtonImageKeyEnum, _game.uiGroup);
        _pauseImage.changeImage(_game, pauseButtonImageKeyEnum, _game.global.gameManager.getPauseSignal());
    }
    else {
        _pauseImage = new Image(10, 10, 'thoughtIcon');
        _pauseImage.addImageToGame(_game, pauseButtonImageKeyEnum, _game.uiGroup);
        _pauseImage.changeImage(_game, pauseButtonImageKeyEnum, _game.global.gameManager.getPauseSignal());
    }
}

function Pause() {
    console.log(_game.paused);
    if(!_game.paused) {
        _game.input.onDown.addOnce(Unpause, self);
        _game.paused = true;
        Video.stop();
        drawRect();
    }

    function Unpause() {

        Video.play();
        _game.paused = false;
        _graphics.destroy();
    }
}

function drawRect() {
    _graphics = _game.add.graphics(0, 0);
    _graphics.beginFill(0x000000, 0.8);
    _graphics.drawRect(0, 0, _game.width, _game.height);
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
        _instance = this;
        _game = game;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        drawPauseButton();
    },
    pause: function() {
        Pause();
    }
}
