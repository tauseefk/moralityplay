define(['Modules/filter', 'Modules/thoughtsLoader', 'Modules/choiceLoader', 'Modules/Image'], function(Filter, Thoughts, Choices, Image) {
    "use strict";

    var _instance = null;
    var _game = null;
    var _icons = [];
    
    function CreateThoughtIcon(iconKey, coords, thoughts, choices) {
        var button = new Image(coords[0], coords[1], iconKey);
        button.addButtonToGame(_game);
        button.changeImage(_game, 'IMAGE_BUTTON_THOUGHT', ButtonPressed);

        _icons.push(button);
        function ButtonPressed() {
            Thoughts.create(thoughts, coords);
            if(choices.targetScene)
                Choices.createMeaningfulChoices(choices, _game.global.gameManager.getChangeSceneSignal());
            else
                Choices.createMeaninglessChoices(choices);
        }        
    }

    function CreateExploratoryIcons(key, coords, targetScene, type, reference) {
        var button = new Image(coords[0], coords[1], key);
        button.addButtonToGame(_game);
        button.changeImage(_game, type, targetScene, _game.global.gameManager.getChangeSceneSignal());
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
            Choices.endInteraction();
            Thoughts.endInteraction();
        }
    }

});
