define(['Modules/filter', 'Modules/thoughtsLoader', 'Modules/choiceLoader', 'Modules/Image'], function(Filter, Thoughts, Choices, Image) {
    "use strict";

    var _instance = null;
    var _game = null;
    var _signal = null;
    var _icons = null;

    //arg1 can be thoughts
    //arg2 can be choices
    function createIcon(iconKey, thoughts, choices) {        
        _icons = [];
        var button = new Image(thoughts.sourceCoords[0], thoughts.sourceCoords[1], iconKey);
        button.addButtonToGame(_game);
        button.changeImage(_game, 'IMAGE_BUTTON_THOUGHT', buttonPressed);

        _icons.push(button);
        function buttonPressed() {
            createThoughtsAndChoices(thoughts, choices, _signal);
        }        
    }

    function createIcons(key, coords, targetScene, type, reference) {
        var button = new Image(coords[0], coords[1], key);
        button.addButtonToGame(_game);
        button.changeImage(_game, type, targetScene, _signal);
        _icons.push(button.getPhaserImage());
    }

    function createThoughtsAndChoices(thoughts, choices, signal) {
        createThoughts(thoughts);
        createChoices(choices, signal);
    }

    function createThoughts(thoughts) {
        Thoughts.create(thoughts);
    }

    function createChoices(choices, signal) {
        Choices.create(choices, signal);
    }

    return {
        init: function(game, signal) {            
            _signal = signal;
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
        create: function(icons, thoughts, choices) {
            _icons = [];
            createIcon(icons, thoughts, choices);
        },
        createMovingIcons: function(icons) {
            _icons = [];
            for(var i=0; i<icons.size; i++) {
                createIcons(icons.key[i], icons.coords[i], icons.targetScene[i], icons.type[i]);
            }
            return _icons;
        }
    }

});
