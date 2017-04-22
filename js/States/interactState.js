/***************************************************************
State for interactive video scenes.
***************************************************************/

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
    Background = require('../Modules/backgroundLoader');

var _stateInfo = null;
var _instance = null;
var _game = null;
var _interactionCount = null;

/****************************************************************
Creates interactive icons when game enters interaction mode, waits for player's input.
****************************************************************/
function CreateInteractionElements() {
    CreateThoughtBubbles();
    CreateChoices();
}

/****************************************************************
Creates thought bubbles, if any.
****************************************************************/
function CreateThoughtBubbles() {    
    var thoughtBubbles = _stateInfo.getThoughtBubble(_interactionCount);
    if(thoughtBubbles) {
        for(var i=0; i<thoughtBubbles.size; i++) {
            Icons.createThoughtIcon(thoughtBubbles.thoughtIconKey[i], thoughtBubbles.coords[i], thoughtBubbles.thoughts[i]);
        }      
    }
}

/****************************************************************
Creates question, choice buttons and choice texts.
****************************************************************/
function CreateChoices() {
    var choices = null;

    choices = _stateInfo.getChoices(_interactionCount);
    Choices.create(choices);

    _interactionCount++;
}

/****************************************************************
Removes interactive elements and resumes video after user input.
Sends interaction choice data to database.
****************************************************************/
function EndInteraction(lingeringChoice, targetScene, tag) {    
    _game.global.databaseManager.sendInteractionData(_game.global.currentSceneName, tag);
    Icons.endInteraction();
    Choices.endInteraction(lingeringChoice, targetScene);
    Thoughts.endInteraction();
    Video.endFilter(targetScene);
}

module.exports = {
    init: function(scene) {
        //Sets new scene info
        if(_stateInfo) {
            _stateInfo.setStateScene(scene);
        }

        //Initializes game and state variables
        _interactionCount = 0;
        Group.initializeGroups(); 

        //Singleton initialization 
        if(_instance !== null)
            return _instance;
        Icons.init(this.game);          
        Thoughts.init(this.game);
        Choices.init(this.game);
        Background.init(this.game);
        Video.init(this.game);
        _game = this.game;
        _stateInfo = new State(scene);
        _instance = this;
        return _instance;
    },
    create: function() {
        _game.global.soundManager.stopBackgroundMusic();

        Background.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());

        Video.create(_stateInfo.getMovieSrc(_game.global.quality), _stateInfo.getTransitionInfo().fadeOut,
            _stateInfo.getVideoFilter(), _stateInfo.getNextScenes(), _stateInfo.getMovieSubKey(), _stateInfo.getTimestamps());

        if(_stateInfo.getTransitionInfo().fadeIn)
            this.game.global.gameManager.getFadeInTransitionSignal().dispatch();

        UI.create(true, true);
    },
    shutdown: function() {
        Icons.destroy();
        Video.resetVideoVariables();
        Thoughts.resetThoughtVariables();
        Choices.resetChoicesVariables();
    },
    createInteractionElements: function() {
        CreateInteractionElements();
    },
    endInteraction: function(lingeringChoice, targetScene, tag) {
        EndInteraction(lingeringChoice, targetScene, tag);
    }
}
