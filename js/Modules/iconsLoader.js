define(['Modules/filter', 'Modules/thoughtsLoader', 'Modules/choiceLoader', 'Modules/Image'], function(Filter, Thoughts, Choices, Image) {
    "use strict";

    var _instance = null;
    var _game = null;
    var _icons = [];

    const buttonImageKeyEnum = 'IMAGE_BUTTON_THOUGHT';
    
    function CreateThoughtIcon(iconKey, coords, thoughts, choices) {
        var button = new Image(coords[0], coords[1], iconKey);
        button.addImageToGame(_game, buttonImageKeyEnum, _game.mediaGroup);
        button.changeImage(_game, buttonImageKeyEnum, ButtonPressed);

        _icons.push(button);
        function ButtonPressed() {
            Thoughts.create(thoughts, coords);
            Choices.create(choices);
        }        
    }

    function CreateExploratoryIcons(key, coords, targetScene, type, reference) {
        var button = new Image(coords[0], coords[1], key);
        button.addImageToGame(_game, type, _game.mediaGroup);
        button.changeImage(_game, type, _game.global.gameManager.getChangeSceneSignal(), targetScene);
        _icons.push(button.getPhaserImage());
    }

    function EndInteraction() {
        _icons.forEach(function(icon) {
            if(icon.alive)
                icon.fadeOut(_game);
        });
    }

    return {
        init: function(game) {
            if(_instance !== null)
                return _instance;
            Thoughts.init(game);        
            Choices.init(game);
            _game = game;
            _instance = this;
            return _instance;
        },
        preload: function() {
        },
        createThoughtIcon: function(iconKey, coords, thoughts, choices) {
            _icons = [];
            CreateThoughtIcon(iconKey, coords, thoughts, choices);
        },
        createExploratoryIcons: function(icons) {
            _icons = [];
            for(var i=0; i<icons.size; i++) {
                CreateExploratoryIcons(icons.key[i], icons.coords[i], icons.targetScene[i], icons.type[i]);
            }
            return _icons;
        },
        endInteraction: function() {
            EndInteraction();
            Thoughts.endInteraction();
        }
    }

});
