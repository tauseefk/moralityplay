"use strict";

const Group = require('../Modules/groupLoader'),
    UI = require('../Modules/uiLoader'),
    Video = require('../Modules/videoLoader'),
    Transition = require('../Modules/transition'),
    Icons = require('../Modules/iconsLoader'),
    State = require('./State'),
    Choices = require('../Modules/choiceLoader'),
    Thoughts = require('../Modules/thoughtsLoader');

var _stateInfo = null;
var _instance = null;
var _game = null;
var _momentCount = null;

function CreateThought() {
    Icons.endInteraction();

    var thoughtBubbles = _stateInfo.getThoughtBubble(_momentCount);
    var choices = null;

    if(thoughtBubbles) {
        for(var i=0; i<thoughtBubbles.size; i++) {
            console.log("Thought bubble: ");
            console.log(thoughtBubbles.thoughts[i]);
            Icons.createThoughtIcon(thoughtBubbles.thoughtIconKey[i], thoughtBubbles.coords[i], thoughtBubbles.thoughts[i]);
        }

        choices = _stateInfo.getChoicesFromThoughtMoment(_momentCount);
        Choices.create(choices, thoughtBubbles.size);        
    }
    else {
        console.log("Choices: " + _momentCount);
        choices = _stateInfo.getChoices(_momentCount);
        Choices.create(choices);
    }
    _game.global.gameManager.getRevealChoicesSignal().dispatch();
    _momentCount++;
}

function EndInteraction(lingeringChoice, targetScene) {
    Icons.endInteraction();
    Choices.endInteraction(lingeringChoice, targetScene);
    Thoughts.endInteraction();
    if(!targetScene) {
        Video.play();
        _instance.game.global.gameManager.getToggleUISignal().dispatch();
    }
    Video.endFilter();
}

function GetTimeStamps() {
    var moments = _stateInfo.getChoiceMoments();
    var timeStamps = [];
    console.log("Interaction Times")
    for(var i=0; i<moments.size; i++) {
        timeStamps.push(moments.choiceMomentsProperties[i].timeStamp);
        console.log(moments.choiceMomentsProperties[i].timeStamp);
    }
    return timeStamps;
}

module.exports = {
    init: function(scene) {
        if(_stateInfo) {
            _stateInfo.setStateScene(scene);
        }
        Video.init(this.game);
        Icons.init(this.game);        
        Thoughts.init(this.game);
        Choices.init(this.game);
        if(_instance !== null)
            return _instance;
        _game = this.game;
        _stateInfo = new State(scene);
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        Group.initializeGroups();
        _momentCount = 0;
        var timeStamps = GetTimeStamps();
        Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransitionInfo().fadeOut,
            _stateInfo.getVideoFilter(), _stateInfo.getNextScenes(), _stateInfo.getMovieSubKey(), timeStamps);
        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
        UI.create(true, true);
    },
    createThought: function() {
        CreateThought();
    },
    endInteraction: function(lingeringChoice, targetScene) {
        EndInteraction(lingeringChoice, targetScene);
    }
}
