"use strict";

const Filter = require('./filter'),
    Thoughts = require('./thoughtsLoader'),
    Choices = require('./choiceLoader'),
    Image = require('./Image'),
    Text = require('./Text'),
    Graphic = require('./Graphics'),
    SceneParser = require('./SceneParser');

var _instance = null;
var _game = null;
var _icons = [];
var _linkedIcons = [];
var _clickedIconIndex = null;
var _displayedIconIndex = null;

const buttonThoughtImageKeyEnum = 'IMAGE_BUTTON_THOUGHT',
    buttonThoughtSpriteKeyEnum = 'IMAGE_SPRITE_THOUGHT',
    sceneChangeImageKeyEnum = 'IMAGE_BUTTON_SCENECHANGE',
    infoImageKeyEnum = 'IMAGE_INFO',
    questionTextEnum = 'TEXT_QUESTION';

function CreateThoughtIcon(iconKey, coords, thoughts) {
    var button = new Image(coords[0], coords[1], iconKey, buttonThoughtSpriteKeyEnum);
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, thoughts, coords);
    _icons.push(button);
}

function CreateExploratoryIcons(icons) {
    for(var i=0; i<icons.size; i++) {
        CreateExploratoryIcon(icons.key[i], icons.coords[i], icons.targetImageIndexOrScene[i], icons.type[i], i);
    }
    HideLockedIcons(icons.lockedByScenes);
    ShowUnlockedIcons(icons.unlockedByScenes);
}

function CreateExploratoryIcon(key, coords, target, type, index) {
    var button = new Image(coords[0], coords[1], key, type);    
    _icons.push(button);
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, target, index);
}

function CreateLinkedIcons(linkedIcons) {
    for(var i=0; i<linkedIcons.size; i++) {
        CreateLinkedIcon(linkedIcons.key[i], linkedIcons.coords[i], linkedIcons.targetImageIndexOrScene[i], linkedIcons.type[i]);
    } 
    HideLinkedIcons();
}

function CreateLinkedIcon(key, coords, target, type) {
    var image = new Image(coords[0], coords[1], key, type);
    image.addImageToGame(_game, _game.mediaGroup);
    image.changeImage(_game, target);
    _linkedIcons.push(image);
}

function HideLockedIcons(locked) {
    if(locked) {
        for(var i=0; i<locked.length; i++){
            var scenesArr = locked[i];
            if(SceneParser.OneSceneVisited(_game, scenesArr)) {
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
                if(SceneParser.VisitAtLeastOnceOfEach(_game, currIconUnlockConditions)) {
                    _icons[i].setVisible(true);
                }
                else {
                    _icons[i].setVisible(false);
                }
            }
        }
    }
}

function EndInteraction() {
    _icons.forEach(function(icon) {
        icon.fadeOut(_game);
    });
}

function HideLinkedIcons() {
    _linkedIcons.forEach(function(icon) {
        icon.setVisible(false);
    });
}

function ShowIcons() {
    _icons.forEach(function(icon) {
        icon.setVisible(true);
    });
}

function ShowPreviouslyClickedIcon() {
    if(_clickedIconIndex != null)
        _icons[_clickedIconIndex].setVisible(true);
}

function HideDisplayedIcon() {
    if(_displayedIconIndex != null)        
        _linkedIcons[_displayedIconIndex].setVisible(false);
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
        CreateExploratoryIcons(icons);
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
    displayIcon: function(targetIndex, clickedIndex) {
        HideDisplayedIcon();
        ShowPreviouslyClickedIcon();
        _displayedIconIndex = targetIndex;
        _linkedIcons[_displayedIconIndex].getPhaserImage().bringToTop();
        _linkedIcons[_displayedIconIndex].setVisible(true);
        _clickedIconIndex = clickedIndex;
        _icons[_clickedIconIndex].setVisible(false);
        if(_linkedIcons[_displayedIconIndex].getType() == infoImageKeyEnum) {
            _game.global.gameManager.getShowInfoOverlaySignal().dispatch();
        }
    },
    hideDisplayedIcon() {
        HideDisplayedIcon();        
        ShowPreviouslyClickedIcon();
        _displayedIconIndex = null;
        _clickedIconIndex = null;
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
