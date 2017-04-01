"use strict";

const Text = require('./Text'),
    Image = require('./Image');

//initializes once
var _instance = null;
var _game = null;

var _text = [];
var _choiceBg = [];
var _thoughtsTriggerNeeded = 0;
var _thoughtsTriggeredCount = 0;

const choiceBgKeyEnum = 'IMAGE_CHOICE_BACKGROUND';
const meaningfulTextKeyEnum = 'TEXT_MEANINGFUL_CHOICES';
const meaninglessTextKeyEnum = 'TEXT_MEANINGLESS_CHOICES';

const FADE_DELAY = 1;
const MAX_CHOICE = 2;

function CreateBg(x, y, width, height) {
    var choiceBg = new Image(x, y, 'choiceBg', choiceBgKeyEnum);
    choiceBg.addImageToGame(_game, _game.mediaGroup);
    choiceBg.changeImage(_game, width, height, x);
    return choiceBg;
}

function CreateChoices(choices, thoughtsTriggerNeeded) {
    //_thoughtsTriggerNeeded = thoughtsTriggerNeeded;
    if(choices.targetScene)
        CreateMeaningfulChoices(choices);
    else
        CreateMeaninglessChoices(choices);
}

function CreateMeaningfulChoices(info) {
    resetElements();

    for(var i=0; i < info.size; i++) {
        var bgImg = CreateBg(GetXPos(info.size, i), info.y[i], info.bounds[i][0], info.bounds[i][1], i);
        _choiceBg.push(bgImg);

        _text.push(new Text(info.content[i], GetXPos(info.size, i), 0, meaningfulTextKeyEnum, _game.global.style.choicesTextProperties));
        _text[i].index = i;
        _text[i].addToGame(_game, _game.mediaGroup);
        _text[i].changeText(_game, info.targetScene[i], _game.global.gameManager.getEndInteractionSignal(),
            bgImg.getPhaserImage().y, i);
    };
}

function CreateMeaninglessChoices(info) {
    resetElements();
    for(var i=0; i < info.size; i++) {
        var bgImg = CreateBg(GetXPos(info.size, i), info.y[i], info.bounds[i][0], info.bounds[i][1]);
        _choiceBg.push(bgImg);

        _text.push(new Text(info.content[i], GetXPos(info.size, i), 0, meaninglessTextKeyEnum, _game.global.style.choicesTextProperties));
        _text[i].index = i;
        _text[i].addToGame(_game, _game.mediaGroup);
        _text[i].changeText(_game, _game.global.gameManager.getEndInteractionSignal(),
            bgImg.getPhaserImage().y, i);
    }
}

function RevealChoices() {
    console.log("revealed.");
    _choiceBg.forEach(function(bg) {
        bg.fadeIn(_game);
    });
    _text.forEach(function(text) {
        text.fadeIn(_game, true);
    });
}

function GetXPos(size, index) {
    if(size == 1)
        return _game.width/2;
    if(size == MAX_CHOICE) {
        if(index == 0)
            return _game.width/4;
        if(index == 1)
            return _game.width/4*3;
    }
    console.warn("1 or 2 choices allowed.");
    return null;
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
    _thoughtsTriggerNeeded = 0;
    _thoughtsTriggeredCount = 0;
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
    create: function(choices, thoughtsTriggerNeeded) {
        CreateChoices(choices, thoughtsTriggerNeeded);
    },
    endInteraction: function(lingeringChoice, targetScene) {
        FadeChoicesExcept(lingeringChoice);
        FadeChoiceAfterDelay(lingeringChoice, targetScene);
    },
    revealChoices: function() {
        //_thoughtsTriggeredCount++;
        //if(_thoughtsTriggeredCount >= _thoughtsTriggerNeeded) {
            RevealChoices();
        //}
    }
}
