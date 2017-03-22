//Dependency: choiceText

define(['Modules/Text', 'Modules/Image'], function(Text, Image) {
    "use strict";

    //initializes once
    var _instance = null;
    var _game = null;
    var _text = [];
    var _choiceBg = [];

    const choiceBgKeyEnum = 'IMAGE_CHOICE_BACKGROUND';

    function resetElements() {
        _text = [];
        _choiceBg = [];
    }

    function CreateBg(y, width, height) {
        var choiceBg = new Image(0, y, 'choiceBg');
        choiceBg.addImageToGame(_game, choiceBgKeyEnum, _game.mediaGroup);
        choiceBg.changeImage(_game, choiceBgKeyEnum, width, height);
        return choiceBg;
    }

    function CreateChoices(choices) {
        if(choices.targetScene)
            CreateMeaningfulChoices(choices, _game.global.gameManager.getChangeSceneSignal());
        else
            CreateMeaninglessChoices(choices);
    }

    function CreateMeaningfulChoices(info) {
        resetElements();
        for(var i=0; i < info.size; i++) {
            var bgImg = CreateBg(info.y[i], info.bounds[i][0], info.bounds[i][1]);
            _choiceBg.push(bgImg);
            _text.push(new Text(info.content[i], 0, 0, _game.global.style.choicesTextProperties));
            _text[i].index = i;
            _text[i].addToGame(_game, _game.mediaGroup);
            _text[i].changeText(_game, 'TEXT_MEANINGFUL_CHOICES', info.targetScene[i], _game.global.gameManager.getChangeSceneSignal(), 
                bgImg.getPhaserImage().y, bgImg.getPhaserImage().width, bgImg.getPhaserImage().height);
        };
    }

    function CreateMeaninglessChoices(info) {
        resetElements();
        for(var i=0; i < info.size; i++) {
            var bgImg = CreateBg(info.y[i], info.bounds[i][0], info.bounds[i][1]);
            _choiceBg.push(bgImg);
            _text.push(new Text(info.content[i], 0, 0, _game.global.style.choicesTextProperties));
            _text[i].index = i;
            _text[i].addToGame(_game, _game.mediaGroup);
            _text[i].changeText(_game, 'TEXT_MEANINGLESS_CHOICES', _game.global.gameManager.getEndInteractionSignal(), 
                bgImg.getPhaserImage().y, bgImg.getPhaserImage().width, bgImg.getPhaserImage().height);
        };       
    }

    function FadeChoicesExcept(choiceText){  
        _text.forEach(function(text) {
            if(text.index != choiceText.index) {
                text.disableInput();
                text.fadeOut(_game);
            }
        });
        _choiceBg.forEach(function(choiceBg) {
            choiceBg.fadeOut(_game);
        });
    }

    function FadeChoiceAfterDelay(choiceText) {
        _game.time.events.add(Phaser.Timer.SECOND*1, fadeChoice, this);

        function fadeChoice(){
            choiceText.fadeOut(_game);
        }
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
        create: function(choices) {
            CreateChoices(choices);
        },
        endInteraction: function(lingeringChoice) {
            FadeChoicesExcept(lingeringChoice);
            FadeChoiceAfterDelay(lingeringChoice);
        }
    }

});
