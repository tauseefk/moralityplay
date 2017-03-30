"use strict";

const Text = require('./Text'),
    Image = require('./Image');

//initializes once
var _instance = null;
var _game = null;
var _text = [];
var _choiceBg = [];

const choiceBgKeyEnum = 'IMAGE_CHOICE_BACKGROUND';
const meaningfulTextKeyEnum = 'TEXT_MEANINGFUL_CHOICES';
const meaninglessTextKeyEnum = 'TEXT_MEANINGLESS_CHOICES';

const FADE_DELAY = 1;
const MAX_CHOICE = 2;

function CreateBg(y, width, height, index) {
    var choiceBg = new Image(0, y, 'choiceBg', choiceBgKeyEnum);
    choiceBg.addImageToGame(_game, _game.mediaGroup);
    choiceBg.changeImage(_game, width, height, index);
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

    for(var i=0; i < MAX_CHOICE; i++) {
        var bgImg = CreateBg(info.y[i], info.bounds[i][0], info.bounds[i][1], i);
        _choiceBg.push(bgImg);

        _text.push(new Text(info.content[i], 0, 0, meaningfulTextKeyEnum, _game.global.style.choicesTextProperties));
        _text[i].index = i;
        _text[i].addToGame(_game, _game.mediaGroup);
        _text[i].changeText(_game, info.targetScene[i], _game.global.gameManager.getEndInteractionSignal(),
            bgImg.getPhaserImage().y, i);
    };
}

function CreateMeaninglessChoices(info) {
    resetElements();

    for(var i=0; i < MAX_CHOICE; i++) {
        var bgImg = CreateBg(info.y[i], info.bounds[i][0], info.bounds[i][1], i);
        _choiceBg.push(bgImg);

        _text.push(new Text(info.content[i], 0, 0, meaninglessTextKeyEnum, _game.global.style.choicesTextProperties));
        _text[i].index = i;
        _text[i].addToGame(_game, _game.mediaGroup);
        _text[i].changeText(_game, _game.global.gameManager.getEndInteractionSignal(),
            bgImg.getPhaserImage().y, i);
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

function FadeChoiceAfterDelay(choiceText, targetScene) {
    _game.time.events.add(Phaser.Timer.SECOND*FADE_DELAY, fadeChoice, this);

    function fadeChoice(){
        if(targetScene)
            choiceText.fadeOut(_game, _game.global.gameManager.getChangeSceneSignal(), targetScene);
        else
            choiceText.fadeOut(_game);
    }
}

function resetElements() {
    _text = [];
    _choiceBg = [];
}

module.exports = {
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
    endInteraction: function(lingeringChoice, targetScene) {
        FadeChoicesExcept(lingeringChoice);
        FadeChoiceAfterDelay(lingeringChoice, targetScene);
    }
}
