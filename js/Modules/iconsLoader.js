/***************************************************************
Displays icons in scenes.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const Image = require('./Image'),
    SceneParser = require('./SceneParser');

var _instance = null;
var _game = null;
var _icons = [];
var _linkedIcons = [];
var _clickedIconIndex = null;
var _displayedIconIndex = null;

/***************************************************************
Creates thought bubble icons.
***************************************************************/
function CreateThoughtIcon(coords, thoughts) {
    var button = new Image(coords[0], coords[1], _game.global.mapping.thoughtBubbleImageKey, Image.getEnum().ThoughtSprite);
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, thoughts, coords);
    //_icons.push(button);
}

/***************************************************************
Creates clickable icons and sets visibility depending on lock/unlock conditions.
***************************************************************/
function CreateClickableIcons(icons) {
    for(var i=0; i<icons.size; i++) {
        CreateClickableIcon(icons.key[i], icons.coords[i], icons.targetImageIndexOrScene[i], icons.type[i], i);
    }
    HideLockedIcons(icons.lockedByScenes);
    ShowUnlockedIcons(icons.unlockedByScenes);
}

/***************************************************************
Creates a single clickable icon.
***************************************************************/
function CreateClickableIcon(key, coords, target, type, index) {
    var button = new Image(coords[0], coords[1], key, type);    
    button.addImageToGame(_game, _game.mediaGroup);
    button.changeImage(_game, target, index);    
    _icons.push(button);
}

/***************************************************************
Creates icons that are linked by other icons and hides them.
***************************************************************/
function CreateLinkedIcons(linkedIcons) {
    for(var i=0; i<linkedIcons.size; i++) {
        CreateLinkedIcon(linkedIcons.key[i], linkedIcons.coords[i], linkedIcons.targetImageIndexOrScene[i], linkedIcons.type[i]);
    } 
    HideLinkedIcons();
}

/***************************************************************
Creates a single linked icon.
***************************************************************/
function CreateLinkedIcon(key, coords, target, type) {
    var image = new Image(coords[0], coords[1], key, type);
    image.addImageToGame(_game);
    image.changeImage(_game, target);
    _linkedIcons.push(image);
}

/***************************************************************
Hides locked clickable icons.
***************************************************************/
function HideLockedIcons(sceneConditions) {
    if(sceneConditions) {
        for(var i=0; i<sceneConditions.length; i++){
            var currLockConditions = sceneConditions[i];
            if(SceneParser.OneSceneVisited(_game, currLockConditions)) {
                _icons[i].setVisible(false);
            }
        };
    }
    else 
        console.log("No locked buttons in this scene.")
}

/***************************************************************
Shows unlocked clickable icons.
***************************************************************/
function ShowUnlockedIcons(sceneConditions) {
    if(sceneConditions) {
        for(var i=0; i<sceneConditions.length; i++) {
            var currUnlockConditions = sceneConditions[i];
            if(currUnlockConditions) {
                if(SceneParser.VisitAtLeastOnceOfEach(_game, currUnlockConditions)) {
                    _icons[i].setVisible(true);
                }
                else {
                    _icons[i].setVisible(false);
                }
            }
        }
    }
}

/***************************************************************
Called when interaction ends.
Fades away clickable icons.
***************************************************************/
function EndInteraction() {
    _icons.forEach(function(icon) {
        icon.fadeOut(_game);
    });
}

/***************************************************************
By default, all linked icons are hidden.
***************************************************************/
function HideLinkedIcons() {
    _linkedIcons.forEach(function(icon) {
        icon.setVisible(false);
    });
}

/***************************************************************
Displays linked icon.
Remembers the index of clicked icon and displayed icon.
***************************************************************/
function DisplayIcon(targetIndex, clickedIndex) {
    HideDisplayedIcon();
    ShowPreviouslyClickedIcon();

    //Displays linked icon
    _displayedIconIndex = targetIndex;
    _linkedIcons[_displayedIconIndex].bringToTop();
    _linkedIcons[_displayedIconIndex].setVisible(true);

    //Hides clicked icon
    _clickedIconIndex = clickedIndex;
    _icons[_clickedIconIndex].setVisible(false);

    //Triggers overlay if displayed image is an information image
    if(_linkedIcons[_displayedIconIndex].getType() == Image.getEnum().InfoImage) {
        _game.global.gameManager.getShowInfoOverlaySignal().dispatch(_linkedIcons[_displayedIconIndex]);
    }
}

/***************************************************************
Icons linking to another hidden icon will disappear on click.
This function redisplays it when another clickable icon is clicked.
***************************************************************/
function ShowPreviouslyClickedIcon() {
    if(_clickedIconIndex != null)
        _icons[_clickedIconIndex].setVisible(true);
}

/***************************************************************
Hides displayed linked icon.
***************************************************************/
function HideDisplayedIcon() {
    if(_displayedIconIndex != null)        
        _linkedIcons[_displayedIconIndex].setVisible(false);
}

module.exports = {
    init: function(game) {
        //_icons = [];
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    createThoughtIcon: function(coords, thoughts) {
        CreateThoughtIcon(coords, thoughts);
    },
    createClickableIcons: function(icons) {
        CreateClickableIcons(icons);
        return _icons;
    },
    //Location state icons
    createNavigationIcons: function(icons, linkedIcons) {
        if(linkedIcons)  
            CreateLinkedIcons(linkedIcons);
        CreateClickableIcons(icons);
    },
    endInteraction: function() {
        EndInteraction();
    },
    displayIcon: function(targetIndex, clickedIndex) {
        DisplayIcon(targetIndex, clickedIndex)
    },
    hideDisplayedIcon() {
        HideDisplayedIcon();        
        ShowPreviouslyClickedIcon();
        _displayedIconIndex = null;
        _clickedIconIndex = null;
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
