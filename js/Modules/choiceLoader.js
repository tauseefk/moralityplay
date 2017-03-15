//Dependency: choiceText

define(['Modules/Text'], function(Text) {
    "use strict";

    //initializes once
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
        createMeaningfulChoices: function(info) {
            for(var i=0; i < info.size; i++) {
                _text.push(new Text(info.content[i], info.coords[i][0], info.coords[i][1], _game.global.style.choicesTextProperties));
                _text[i].addToGame(_game);
                _text[i].changeText( _game, 'TEXT_MEANINGFUL_CHOICES', info.targetScene[i], _game.global.gameManager.getChangeSceneSignal());
            };
        },
        createMeaninglessChoices: function(info) {
            for(var i=0; i < info.size; i++) {
                _text.push(new Text(info.content[i], info.coords[i][0], info.coords[i][1], _game.global.style.choicesTextProperties));
                _text[i].addToGame(_game);
                _text[i].changeText( _game, 'TEXT_MEANINGLESS_CHOICES', _game.global.gameManager.getEndInteractionSignal());
            };
        },
        endInteraction: function() {
            _text.forEach(function(text) {
                text.fadeOut(_game);
            });
        }
    }

});
