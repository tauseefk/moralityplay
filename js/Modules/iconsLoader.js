"use strict";

const Filter = require('./filter'),
    Thoughts = require('./thoughtsLoader'),
    Choices = require('./choiceLoader'),
    Image = require('./Image');

var _instance = null;
var _game = null;
var _icons = [];

const buttonThoughtImageKeyEnum = 'IMAGE_BUTTON_THOUGHT',
    buttonThoughtSpriteKeyEnum = 'IMAGE_SPRITE_THOUGHT',
    sceneChangeImageKeyEnum = 'IMAGE_BUTTON_SCENECHANGE';

function CreateThoughtIcon(iconKey, coords, thoughts) {
    var button = new Image(coords[0], coords[1], iconKey, buttonThoughtSpriteKeyEnum);
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, _game.global.gameManager.getCreateThoughtsAndChoicesSignal(), thoughts, coords);
    _icons.push(button);
}

function CreateExploratoryIcons(key, coords, target, type, reference) {
    var button = new Image(coords[0], coords[1], key, type);
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, target);
    _icons.push(button);
}

function EndInteraction() {
    _icons.forEach(function(icon) {
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
        _icons = [];
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    createThoughtIcon: function(iconKey, coords, thoughts) {
        CreateThoughtIcon(iconKey, coords, thoughts);
    },
    createExploratoryIcons: function(icons) {
        for(var i=0; i<icons.size; i++) {
            CreateExploratoryIcons(icons.key[i], icons.coords[i], icons.targetImageIndexOrScene[i], icons.type[i]);
        }        
        HideIconType(sceneChangeImageKeyEnum);
        return _icons;
    },
    endInteraction: function() {
        EndInteraction();
    },
    displayIcon: function(index, hideSameType) {
        if(hideSameType)
            HideIconType(_icons[index].getType());
        _icons[index].setVisible(true);
    },
    createThoughtsAndChoices: function(thoughts, coords) {
        _game.global.gameManager.getCreateThoughtsSignal().dispatch(thoughts, coords);
    },
    destroy: function() {
        _icons.forEach(function(icon) {
            icon.destroy();
        });
        _icons = [];
    }
}
