
define(['Modules/transition', 'States/State', 'Modules/uiLoader', 'Modules/movingObjectLoader', 'Modules/iconsLoader'], function(Transition, State, UI, MovingBackground, Icons)  {
    "use strict";

    var _instance = null;
    var _stateInfo = null;

    return {
        init: function(scene) { 
            if(_stateInfo !== null)
                _stateInfo.setStateScene(scene);         
            if(_instance !== null)
                return _instance;
            _stateInfo = new State(scene);
            _instance = this;
            UI.init(this.game);
            MovingBackground.init(this.game);
            Icons.init(this.game);
            return _instance;
        },
        preload: function() {
        },
        create: function() {
        //    Video.create(_stateInfo.getMovieSrc(), _stateInfo.getTransition().fadeOut, Transition.getFadeOutSignal(), _stateInfo.getVideoFilter(), _stateInfo.getNextScenes());
            MovingBackground.create(_stateInfo.getBgImageKey(), _stateInfo.getDraggable());
            var icons = Icons.createExploratoryIcons(_stateInfo.getIconsInfo());
            if(_stateInfo.getDraggable())
                MovingBackground.assignFollowIcons(icons);
            UI.create();
            if(_stateInfo.getTransitionInfo().fadeIn)
                this.game.global.gameManager.getFadeInTransitionSignal().dispatch();
        }
    }
    
});