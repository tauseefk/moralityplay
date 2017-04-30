/***************************************************************
Creates choice icons during interaction moments.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const Text = require('./Objects/Text'),
    Image = require('./Objects/Image');

const BACKGROUND_IMAGE_KEY = 'choiceBg';

//Singleton variables
var _instance = null;
var _game = null;

//Holds created game objects
var _question = null;
var _text = [];
var _choiceBg = [];

const FADE_DELAY = 1;
const QUESTION_Y_OFFSET = 30;

/***************************************************************
Creates background for choice buttons.
***************************************************************/
function CreateButtonBackground(x, y, width, height, phaserText, target, tag) {
    var choiceBg = new Image(x, y, BACKGROUND_IMAGE_KEY, Image.getEnum().ChoiceBackground);
    choiceBg.addImageToGame(_game, _game.mediaGroup);
    choiceBg.changeImage(_game, width, height, target, phaserText, tag);
    return choiceBg;
}

/***************************************************************
Creates answer texts for choice buttons.
***************************************************************/
function CreateChoicePrompt(question, yPos) {
    _question = new Text(question, 0, yPos, Text.getEnum().Question, _game.global.style.questionTextProperties);
    _question.addTextToGame(_game, _game.mediaGroup);
    _question.changeText(_game, Text.getEnum().Question);
}

/***************************************************************
Creates choice buttons.
***************************************************************/
function CreateChoices(choices) {
    ResetChoicesVariables();
    CreateChoicePrompt(choices.question, choices.y[0] - choices.bounds[0][1]/2 - QUESTION_Y_OFFSET);

    for(var i=0; i < choices.size; i++) {
        CreateAnswers(i, choices);    
        CreateBackgroundImage(i, choices);
        //Aligns choice text to choice background
        _text[i].changeText(_game, _choiceBg[i].getPhaserImage().y, choices.size);
    };
}

/***************************************************************
Creates choice answer text.
***************************************************************/
function CreateAnswers(currIndex, choices) {
    _text.push(new Text(choices.content[currIndex], GetXPos(choices.size, currIndex), 0, 
        Text.getEnum().Choices, _game.global.style.choicesTextProperties));
    _text[currIndex].index = currIndex;
    _text[currIndex].addTextToGame(_game, _game.mediaGroup);
}

/***************************************************************
Creates choice background and passes it corresponding answer text.
***************************************************************/
function CreateBackgroundImage(currIndex, choices) {
    var choiceBackgroundImage;
    if(choices.targetScene)
        choiceBackgroundImage = CreateButtonBackground(GetXPos(choices.size, currIndex), choices.y[currIndex], 
            choices.bounds[currIndex][0], choices.bounds[currIndex][1], _text[currIndex].getPhaserText(), 
            choices.targetScene[currIndex], choices.tag[currIndex]);
    else
        choiceBackgroundImage = CreateButtonBackground(GetXPos(choices.size, currIndex), choices.y[currIndex], 
            choices.bounds[currIndex][0], choices.bounds[currIndex][1], _text[currIndex].getPhaserText());
    choiceBackgroundImage.index = currIndex;
    _choiceBg.push(choiceBackgroundImage);
}

/***************************************************************
Partitions game width depending on number of choices.
Returns x value of middle of each partition.
***************************************************************/
function GetXPos(choiceCount, index) {
    if(choiceCount == 1)
        return _game.world.centerX;
    else if(choiceCount == 2) {
        if(index == 0)
            return _game.width/4;
        if(index == 1)
            return _game.width/4*3;
    }
    else if(choiceCount == 3) {
        if(index == 0)
            return _game.width/6;
        if(index == 1)
            return _game.world.centerX;        
        if(index == 2)
            return _game.width/6*5;
    }
    console.warn("1, 2 or 3 choices allowed.");
    return null;
}

/***************************************************************
Allows selected choice to linger for a while before fading.
Fades out other choices and prompt.
***************************************************************/
function FadeChoicesExcept(index){
    _text.forEach(function(text) {
        if(text.index != index) {
            text.enableInput(false);
            text.fadeOut(_game);
        }
    });

    _choiceBg.forEach(function(choiceBg) {
        if(choiceBg.index != index) {
            choiceBg.enableInput(false);
            choiceBg.fadeOut(_game);
        }
    });

    _question.fadeOut(_game);
}

/***************************************************************
Starts a timer event that fades out selected choice.
Goes to next scene upon fading out, if defined.
***************************************************************/
function FadeChoiceAfterDelay(index, targetScene) {
    _game.time.events.add(Phaser.Timer.SECOND*FADE_DELAY, fadeChoice, this);

    function fadeChoice(){
        _text[index].enableInput(false);
        _choiceBg[index].enableInput(false);
        if(targetScene) {
            _text[index].fadeOut(_game, _game.global.gameManager.getChangeSceneSignal(), targetScene);
        }
        else
            _text[index].fadeOut(_game);
        _choiceBg[index].fadeOut(_game);
    }
}

/***************************************************************
Resets vaiables containing elements.
***************************************************************/
function ResetChoicesVariables() {
    _text = [];
    _choiceBg = [];
    _question = null;
}

module.exports = {
    init: function(game) {
        //Singleton initialization.
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
        FadeChoicesExcept(lingeringChoice.index);
        FadeChoiceAfterDelay(lingeringChoice.index, targetScene);
    },
    resetChoicesVariables: function() {
        ResetChoicesVariables();
    }
}
