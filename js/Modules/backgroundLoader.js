/***************************************************************
Creates draggable backgrounds and icons that follow drag movement.
***************************************************************/
"use strict";

//Dependencies
const Text = require('./Text'),
    Image = require('./Image');

var _instance = null;
var _game = null;
var _text = [];
var _choiceFont = null;
var _bgImage = null;
var _group = null;

const bgImageKeyEnum = 'IMAGE_BACKGROUND';

/***************************************************************
Creates background image.
***************************************************************/
function createBgImage(key, draggable) {
    _bgImage = new Image(0, 0, key, bgImageKeyEnum);
    _bgImage.addImageToGame(_game, _game.mediaGroup);
    _bgImage.changeImage(_game, draggable);
}

function dragStart() {
}

/***************************************************************
Icons follow dragged background position.
***************************************************************/
function dragUpdate() {
    _group.x = _bgImage.getPhaserImage().x;
    _group.y = _bgImage.getPhaserImage().y;
}

function dragStop() {
}

module.exports = {
    init: function(game) {
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function(bgKey, draggable) {
        if(bgKey)
            createBgImage(bgKey, draggable);
    //    return _bgImage.getPhaserImage();
    //    createIcons(icons, draggable, _bgImage);
    },
    assignFollowIcons: function(icons) {
        _group = _game.add.group();
        _game.mediaGroup.add(_group);
        icons.forEach(function(icon) {
            _group.add(icon.getPhaserImage());
        });

        _bgImage.getPhaserImage().events.onDragStart.add(dragStart);
        _bgImage.getPhaserImage().events.onDragUpdate.add(dragUpdate);
        _group.x = _bgImage.getPhaserImage().x;
        _group.y = _bgImage.getPhaserImage().y;
    }
}
