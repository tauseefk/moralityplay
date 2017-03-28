"use strict";

const Filter = require('./filter'),
    Thoughts = require('./thoughtsLoader'),
    Choices = require('./choiceLoader'),
    Image = require('./Image');

var _instance = null;
var _game = null;
var _icons = [];

const buttonThoughtImageKeyEnum = 'IMAGE_BUTTON_THOUGHT';
const sceneChangeImageKeyEnum = 'IMAGE_BUTTON_SCENECHANGE';

function CreateThoughtIcon(iconKey, coords, thoughts, choices) {
    var button = new Image(coords[0], coords[1], iconKey, buttonThoughtImageKeyEnum);
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, ButtonPressed);

    _icons.push(button);

    function ButtonPressed() {
        console.log(thoughts);
        Thoughts.create(thoughts, coords);
        Choices.create(choices);
    }
}

function CreateExploratoryIcons(key, coords, target, type, reference) {
    var button = new Image(coords[0], coords[1], key, type);
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, target);
    _icons.push(button);
}

function EndInteraction() {
    _icons.forEach(function(icon) {
        if(icon.getPhaserImage().alive)
            icon.fadeOut(_game);
    });
}

function HideIconType(iconType) {
    _icons.forEach(function(icon) {
        if(icon.getType() == iconType) {
            icon.setVisible(false);
        }
    });
}

module.exports = {
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
            CreateExploratoryIcons(icons.key[i], icons.coords[i], icons.targetImageIndexOrScene[i], icons.type[i]);
        }        
        HideIconType(sceneChangeImageKeyEnum);
        return _icons;
    },
    endInteraction: function() {
        EndInteraction();
        Thoughts.endInteraction();
    },
    displayIcon: function(index, hideSameType) {
        if(hideSameType)
            HideIconType(_icons[index].getType());
        _icons[index].setVisible(true);
    }
}
