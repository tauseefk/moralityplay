/*
State for interactive video scenes.
*/

"use strict";

//Dependencies
const Group = require('../Modules/groupLoader'),
    UI = require('../Modules/uiLoader'),
    Video = require('../Modules/videoLoader'),
    Transition = require('../Modules/transition'),
    Icons = require('../Modules/iconsLoader'),
    State = require('./State'),
    Choices = require('../Modules/choiceLoader'),
    Thoughts = require('../Modules/thoughtsLoader'),
    MovingBackground = require('../Modules/movingObjectLoader');

var _stateInfo = null;
var _instance = null;
var _game = null;
var _momentCount = null;

function CreateInteractionElements() {
    Icons.endInteraction();
    CreateThoughtBubbles();
    CreateChoices();
}

function CreateThoughtBubbles() {    
    var thoughtBubbles = _stateInfo.getThoughtBubble(_momentCount);
    if(thoughtBubbles) {
        for(var i=0; i<thoughtBubbles.size; i++) {
            Icons.createThoughtIcon(thoughtBubbles.thoughtIconKey[i], thoughtBubbles.coords[i], thoughtBubbles.thoughts[i]);
        }      
    }
}

function CreateChoices() {
    var choices = null;

    choices = _stateInfo.getChoices(_momentCount);
    Choices.create(choices);

    _game.global.gameManager.getRevealChoicesSignal().dispatch();
    _momentCount++;
}

function EndInteraction(lingeringChoice, targetScene, tag) {    
    _game.global.databaseManager.sendInteractionData(_game.global.currentSceneName, tag);
    Icons.endInteraction();
    Choices.endInteraction(lingeringChoice, targetScene);
    Thoughts.endInteraction();
    Video.endFilter(targetScene);
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
        MovingBackground.init(this.game);      
        Thoughts.init(this.game);
        Choices.init(this.game);
        if(_instance !== null)
            return _instance;
        _game = this.game;
        _stateInfo = new State(scene);
        _instance = this;
        return _instance;
    },
    create: function() {
        Group.initializeGroups();
        _game.global.soundManager.stopBackgroundMusic();
        if(_stateInfo.getBgImageKey())
            MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
        _momentCount = 0;
        var timeStamps = GetTimeStamps();
        Video.create(_stateInfo.getMovieSrc(_game.global.quality), _stateInfo.getTransitionInfo().fadeOut,
            _stateInfo.getVideoFilter(), _stateInfo.getNextScenes(), _stateInfo.getMovieSubKey(), timeStamps);
        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
        UI.create(true, true);
    },
    createInteractionElements: function() {
        CreateInteractionElements();
    },
    endInteraction: function(lingeringChoice, targetScene, tag) {
        EndInteraction(lingeringChoice, targetScene, tag);
    }
}
