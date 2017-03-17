//Dependency: choiceText

define(['Modules/Text', 'Modules/Image'], function(Text, Image) {
    "use strict";

    //initializes once
    var _instance = null;
    var _game = null;
    var _text = [];
    var _choiceBg = [];

    function resetElements() {
        _text = [];
        _choiceBg = [];
    }
    function createBg(y, width, height) {
        var choiceBg = new Image(0, y, 'choiceBg');
        choiceBg.addImageToGame(_game);
        choiceBg.changeImage(_game, 'IMAGE_CHOICE_BACKGROUND', width, height);
        return choiceBg;
    }

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
            resetElements();
            for(var i=0; i < info.size; i++) {
                var bgImg = createBg(info.y[i], info.bounds[i][0], info.bounds[i][1]);
                _choiceBg.push(bgImg);
                _text.push(new Text(info.content[i], 0, 0, _game.global.style.choicesTextProperties));
                _text[i].addToGame(_game);
                _text[i].changeText(_game, 'TEXT_MEANINGFUL_CHOICES', info.targetScene[i], _game.global.gameManager.getChangeSceneSignal(), 
                    bgImg.getPhaserImage().y, bgImg.getPhaserImage().width, bgImg.getPhaserImage().height);
            };
        },
        createMeaninglessChoices: function(info) {
            resetElements();
            for(var i=0; i < info.size; i++) {
                var bgImg = createBg(info.y[i], info.bounds[i][0], info.bounds[i][1]);                
                _choiceBg.push(bgImg);
                _text.push(new Text(info.content[i], 0, 0, _game.global.style.choicesTextProperties));
                _text[i].addToGame(_game);
                _text[i].changeText(_game, 'TEXT_MEANINGLESS_CHOICES', _game.global.gameManager.getEndInteractionSignal(), 
                    bgImg.getPhaserImage().y, bgImg.getPhaserImage().width, bgImg.getPhaserImage().height);
            };
        },
        endInteraction: function() {
            _text.forEach(function(text) {
                text.fadeOut(_game);
            });
            _choiceBg.forEach(function(choiceBg) {
                choiceBg.fadeOut(_game);
            });
        }
    }

});
