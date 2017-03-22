//Dependency: Nonde

define(['Modules/Image'], function(Image) {
    "use strict";

    var _instance = null;
    var _game = null;
    var _graphics = null;
    var _pauseImage = null;

    const pauseButtonImageKeyEnum = 'PAUSE_BUTTON';

    function drawUI() {
        _graphics = _game.add.graphics(0, 0);
        drawName();
    }

    function drawName() {
        _game.add.text(0, 0, 'Chris', {})
        _graphics.beginFill(0x000000);
        _graphics.drawRoundedRect(0, 0, 300, 200, 10);
    }

    function drawPauseButton() {
        if(_pauseImage)
            _pauseImage.addImageToGame(_game, pauseButtonImageKeyEnum, _game.uiGroup);
        _pauseImage = new Image(10, 10, 'thoughtIcon');
        _pauseImage.addImageToGame(_game, pauseButtonImageKeyEnum, _game.uiGroup);
    }

    function gradientMaker(color1, color2) {
    }

    return {
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
        }
    }

});
