
define(['Modules/groupLoader', 'Modules/uiLoader', 'Modules/videoLoader', 'Modules/transition', 'Modules/iconsLoader', 'States/State', 'Modules/choiceLoader'], 
    function(Group, UI, Video, Transition, Icons, State, Choices)  {
    "use strict";

    var _stateInfo = null;
    var _instance = null;
    var _momentCount = null;

    function CreateThought() {
        Icons.endInteraction();
        var thoughtBubbles = _stateInfo.getThoughtBubble(_momentCount);
        if(thoughtBubbles) {
            for(var i=0; i<thoughtBubbles.size; i++) {
                console.log("Thought bubble: " + _momentCount);
                Icons.createThoughtIcon(thoughtBubbles.thoughtIconKey[i], thoughtBubbles.coords[i], thoughtBubbles.thoughts[i], thoughtBubbles.choices[i]);
            }
        }
        else {
            console.log("Choices: " + _momentCount);
            var choices = _stateInfo.getChoices(_momentCount);
            Choices.create(choices);
        }
        _momentCount++;
    }

    function EndInteraction(lingeringChoice) {
        Icons.endInteraction();
        Choices.endInteraction(lingeringChoice);
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

    return {
        init: function(scene) {
            if(_stateInfo !== null)
                _stateInfo.setStateScene(scene);     
            Video.init(this.game);
            Icons.init(this.game);
            if(_instance !== null)
                return _instance;
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
                _stateInfo.getVideoFilter(), _stateInfo.getNextScenes(), timeStamps);
            if(_stateInfo.getTransitionInfo().fadeIn)
                this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
            UI.create();
        },
        createThought: function() {
            CreateThought();
        },
        endInteraction: function(lingeringChoice) {
            EndInteraction(lingeringChoice);
        }
    }
    
});