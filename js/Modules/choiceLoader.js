"use strict";

const Text = require('./Text'),
    Image = require('./Image');

//initializes once
var _instance = null;
var _game = null;

var _text = [];
var _question = null;
var _choiceBg = [];
var _thoughtsTriggerNeeded = 0;
var _thoughtsTriggeredCount = 0;

const choiceBgKeyEnum = 'IMAGE_CHOICE_BACKGROUND';
const meaningfulTextKeyEnum = 'TEXT_MEANINGFUL_CHOICES';
const meaninglessTextKeyEnum = 'TEXT_MEANINGLESS_CHOICES';
const questionTextKeyEnum = 'TEXT_QUESTION';

const FADE_DELAY = 1;

function CreateBg(x, y, width, height, target) {
    var choiceBg = new Image(x, y, 'choiceBg', choiceBgKeyEnum);
    choiceBg.addImageToGame(_game, _game.mediaGroup);
    choiceBg.changeImage(_game, width, height, target);
    return choiceBg;
}

function CreateChoiceQuestion(question, y) {
    _question = new Text(question, 0, y, questionTextKeyEnum, _game.global.style.questionTextProperties);
    _question.addToGame(_game, _game.mediaGroup);
    _question.changeText(_game, questionTextKeyEnum);
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
    CreateChoiceQuestion(info.question, info.y[0] - info.bounds[0][1]/2 - 30);

    for(var i=0; i < info.size; i++) {
        var bgImg = CreateBg(GetXPos(info.size, i), info.y[i], info.bounds[i][0], info.bounds[i][1], info.targetScene[i]);

        bgImg.index = i;
        _choiceBg.push(bgImg);

        _text.push(new Text(info.content[i], GetXPos(info.size, i), 0, meaningfulTextKeyEnum, _game.global.style.choicesTextProperties));
        _text[i].index = i;
        _text[i].addToGame(_game, _game.mediaGroup);
        _text[i].changeText(_game, info.targetScene[i], _game.global.gameManager.getEndInteractionSignal(), bgImg.getPhaserImage().y, info.size);
    };
}

function CreateMeaninglessChoices(info) {
    resetElements();
    CreateChoiceQuestion(info.question, info.y[0] - info.bounds[0][1]/2 - 30);

    for(var i=0; i < info.size; i++) {
        var bgImg = CreateBg(GetXPos(info.size, i), info.y[i], info.bounds[i][0], info.bounds[i][1]);

        bgImg.index = i;
        _choiceBg.push(bgImg);

        _text.push(new Text(info.content[i], GetXPos(info.size, i), 0, meaninglessTextKeyEnum, _game.global.style.choicesTextProperties));
        _text[i].index = i;
        _text[i].addToGame(_game, _game.mediaGroup);
        _text[i].changeText(_game, _game.global.gameManager.getEndInteractionSignal(), bgImg.getPhaserImage().y, info.size);
    }
}

function RevealChoices() {
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
    if(size == 2) {
        if(index == 0)
            return _game.width/4;
        if(index == 1)
            return _game.width/4*3;
    }
    if(size == 3) {
        if(index == 0)
            return _game.width/6;
        if(index == 1)
            return _game.width/2;        
        if(index == 2)
            return _game.width/6*5;
    }
    console.warn("1, 2 or 3 choices allowed.");
    return null;
}

function FadeChoicesExcept(index){
    _text.forEach(function(text) {
        if(text.index != index) {
            text.disableInput();
            text.fadeOut(_game);
        }
    });

    _choiceBg.forEach(function(choiceBg) {
        if(choiceBg.index != index) {
            choiceBg.disableInput();
            choiceBg.fadeOut(_game);
        }
    });
    _question.fadeOut(_game);
}

function FadeChoiceAfterDelay(index, targetScene) {
    _game.time.events.add(Phaser.Timer.SECOND*FADE_DELAY, fadeChoice, this);

    function fadeChoice(){
        _text[index].disableInput();
        _choiceBg[index].disableInput();
        if(targetScene)
            _text[index].fadeOut(_game, _game.global.gameManager.getChangeSceneSignal(), targetScene);
        else
            _text[index].fadeOut(_game);
        _choiceBg[index].fadeOut(_game);
    }
}

function resetElements() {
    _text = [];
    _choiceBg = [];
    _question = null;
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
        FadeChoicesExcept(lingeringChoice.index);
        FadeChoiceAfterDelay(lingeringChoice.index, targetScene);
    },
    revealChoices: function() {
        //_thoughtsTriggeredCount++;
        //if(_thoughtsTriggeredCount >= _thoughtsTriggerNeeded) {
            RevealChoices();
        //}
    }
}
