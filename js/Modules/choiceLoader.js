//Dependency: choiceText

define(['Modules/Text'], function(Text) {
    "use strict";

    //initializes once
    var _instance = null;
    var _game = null;
    var _text = [];
    var _choiceFont = null;

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
        create: function(info, signal) {
            for(var i=0; i < info.size; i++) {
                _text.push(new Text(info.content[i], info.coords[i][0], info.coords[i][1], info.textProperties));
                _text[i].addToGame(_game);
                _text[i].changeText( _game, 'TEXT_CHOICES', info.targetScene[i], signal);
            };            
        }
    }

});
