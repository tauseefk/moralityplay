"use strict";

const Filter = require('./filter'),
    Thoughts = require('./thoughtsLoader'),
    Choices = require('./choiceLoader'),
    Image = require('./Image');

var _instance = null;
var _game = null;
var _icons = [];
var _linkedIcons = [];

const buttonThoughtImageKeyEnum = 'IMAGE_BUTTON_THOUGHT',
    buttonThoughtSpriteKeyEnum = 'IMAGE_SPRITE_THOUGHT',
    sceneChangeImageKeyEnum = 'IMAGE_BUTTON_SCENECHANGE';

function CreateThoughtIcon(iconKey, coords, thoughts) {
    var button = new Image(coords[0], coords[1], iconKey, buttonThoughtSpriteKeyEnum);
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, _game.global.gameManager.getCreateThoughtsAndChoicesSignal(), thoughts, coords);
    _icons.push(button);
}

function CreateExploratoryIcons(icons, hideSceneChangeIcons) {
    for(var i=0; i<icons.size; i++) {
        CreateExploratoryIcon(icons.key[i], icons.coords[i], icons.targetImageIndexOrScene[i], icons.type[i]);
    }
    HideLockedIcons(icons.lockedByScenes);
    ShowUnlockedIcons(icons.unlockedByScenes);
}

function CreateExploratoryIcon(key, coords, target, type) {
    var button = new Image(coords[0], coords[1], key, type);
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, target);
    _icons.push(button);
}

function CreateLinkedIcons(linkedIcons) {
    for(var i=0; i<linkedIcons.size; i++) {
        CreateLinkedIcon(linkedIcons.key[i], linkedIcons.coords[i], linkedIcons.targetImageIndexOrScene[i], linkedIcons.type[i]);
    } 
    HideIconType(sceneChangeImageKeyEnum);
}

function CreateLinkedIcon(key, coords, target, type) {
    var button = new Image(coords[0], coords[1], key, type);
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, target);
    _linkedIcons.push(button);
}

function HideLockedIcons(locked) {
    if(locked) {
        for(var i=0; i<locked.length; i++){
            var scenesArr = locked[i];
            if(OneSceneVisited(scenesArr)) {
                _icons[i].setVisible(false);
            }
        };
    }
    else 
        console.log("No locked buttons in this scene.")
}

function ShowUnlockedIcons(conditionsForIconIndexArr) {
    if(conditionsForIconIndexArr) {
        for(var i=0; i<conditionsForIconIndexArr.length; i++) {
            var currIconUnlockConditions = conditionsForIconIndexArr[i];
            if(currIconUnlockConditions) {
                if(VisitAtLeastOnceOfEach(currIconUnlockConditions)) {
                    _icons[i].setVisible(true);
                }
                else {
                    _icons[i].setVisible(false);
                }
            }
        }
    }
}

function VisitAtLeastOnceOfEach(sceneSetArray) {
    var unlocked = true;
    for(var j=0; j<sceneSetArray.length; j++) {
        unlocked &= OneSceneVisited(sceneSetArray[j]);
    }
    return unlocked;
}

function OneSceneVisited(sceneArr) {
    if(sceneArr){
        for(var i=0; i<sceneArr.length; i++) {
            if(_game.global.visitedScenes[sceneArr[i]]) {
                return true;
            }
        }
    }
    return false;
}

function EndInteraction() {
    _icons.forEach(function(icon) {
        icon.fadeOut(_game);
    });
}

function HideIconType(iconType) {
    _linkedIcons.forEach(function(icon) {
        icon.setVisible(false);
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
    createExploratoryIcons: function(icons, hideSceneChangeIcons) {
        CreateExploratoryIcons(icons, hideSceneChangeIcons);
        return _icons;
    },
    createNavigationIcons: function(icons, linkedIcons) {  
        if(linkedIcons)  
            CreateLinkedIcons(linkedIcons);  
        CreateExploratoryIcons(icons);
    },
    endInteraction: function() {
        EndInteraction();
    },
    displayIcon: function(index, hideSameType) {
        if(hideSameType)
            HideIconType(_linkedIcons[index].getType());
        _linkedIcons[index].setVisible(true);
    },
    createThoughtsAndChoices: function(thoughts, coords) {
        _game.global.gameManager.getCreateThoughtsSignal().dispatch(thoughts, coords);
    },
    destroy: function() {
        _icons.forEach(function(icon) {
            icon.destroy();
        });
        _icons = [];
        _linkedIcons.forEach(function(icon) {
            icon.destroy();
        });
        _linkedIcons = [];
    }
}
