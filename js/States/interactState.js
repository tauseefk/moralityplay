
define(['Modules/videoLoader', 'Modules/transition', 'Modules/iconsLoader', 'States/State'], function(Video, Transition, Icons, State)  {
    "use strict";

    var _stateInfo = null;
    var _instance = null;
    var _momentCount = null;

    function CreateThought() {
        Icons.endInteraction();
        var thoughtBubbles = _stateInfo.getThoughtBubble(_momentCount++);
            console.log(thoughtBubbles);
        for(var i=0; i<thoughtBubbles.size; i++) {
            Icons.createThoughtIcon(thoughtBubbles.thoughtIconKey[i], thoughtBubbles.coords[i], thoughtBubbles.thoughts[i], thoughtBubbles.choices[i]);
        }
    }

    function EndInteraction() {
        Icons.endInteraction();
        Video.endFilter();
    }

    function GetTimeStamps() {
        var moments = _stateInfo.getChoiceMoments();
        var timeStamps = [];
        for(var i=0; i<moments.size; i++) {
            timeStamps.push(moments.choiceMomentsProperties[i].timeStamp);
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
            _momentCount = 0;
            var timeStamps = GetTimeStamps();
            Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransitionInfo().fadeOut, 
                _stateInfo.getVideoFilter(), _stateInfo.getNextScenes(), timeStamps);
            if(_stateInfo.getTransitionInfo().fadeIn)
                this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
        },
        createThought: function() {
            CreateThought();
        },
        endInteraction: function() {
            EndInteraction();
        }
    }
    
});