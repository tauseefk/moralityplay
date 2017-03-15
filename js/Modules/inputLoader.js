define(['Modules/Input'], function(Input) {
    "use strict";

    var _instance = null;
    var _game = null;
    var _input = null;

    return {
        init: function(game) {
            if(_instance !== null)
                return _instance;
            _game = game;
            _instance = this;
            return _instance;
        },
        preload: function() {
        },
        create: function(input) {
            _input = [];
            for(var i=0; i<input.size; i++) {
                _input.push(new Input(input.name[i], input.coords[i][0], input.coords[i][1], input.properties[i]));
                _input[i].addToGame(_game);
            }
            return _input;
        }
    }

});
