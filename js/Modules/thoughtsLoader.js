//Dependency: thoughtsText

define(['Modules/Text'], function(Text) {
    "use strict";

    //Initialized once
    var _instance = null;
    var _game = null;    
    var _text = [];

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
        create: function(info) {
            for(var i=0; i < info.size; i++) {
                _text.push(new Text(info.content[i], info.sourceCoords[0], info.sourceCoords[1], info.textProperties));
                _text[i].addToGame(_game);
                _text[i].changeText(_game, 'TEXT_THOUGHTS', info.destination[i][0], info.destination[i][1]);
            };
        }
    }

});
