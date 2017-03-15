//Dependency: Nonde

define(['Modules/filter'], function(Filter) {
    "use strict";

    var _instance = null;
    var _game = null;
    var _graphics = null;

    function drawUI() {
        _graphics = _game.add.graphics(0, 0);
        drawName();
    }

    function drawName() {
        _game.add.text(0, 0, 'Chris', {})
        _graphics.beginFill(0x000000);
        _graphics.drawRoundedRect(0, 0, 300, 200, 10);
        console.log("dsd");
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
            //drawUI();
        }
    }

});
