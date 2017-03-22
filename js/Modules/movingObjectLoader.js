//Dependency: choiceText

define(['Modules/Text', 'Modules/Image'], function(Text, Image) {
    "use strict";

    //initializes once
    var _instance = null;
    var _game = null;
    var _text = [];
    var _choiceFont = null;
    var _bgImage = null;
    var _group = null;

    const bgImageKeyEnum = 'IMAGE_BACKGROUND';

    function createBgImage(key, draggable) {
        _bgImage = new Image(0, 0, key);
        _bgImage.addImageToGame(_game, bgImageKeyEnum, _game.mediaGroup);
        _bgImage.changeImage(_game, bgImageKeyEnum, draggable);
    }
    
    function dragStart() {        
    }

    function dragUpdate() {
        _group.x = _bgImage.getPhaserImage().x;
        _group.y = _bgImage.getPhaserImage().y;
    }

    function dragStop() {

    }
    
    return {
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
            createBgImage(bgKey, draggable);
            return _bgImage.getPhaserImage();
        //    createIcons(icons, draggable, _bgImage);
        },
        assignFollowIcons: function(icons) {
            _group = _game.add.group();
            icons.forEach(function(element) {
                _group.add(element);
            });

            _bgImage.getPhaserImage().events.onDragStart.add(dragStart);
            _bgImage.getPhaserImage().events.onDragUpdate.add(dragUpdate);            
            _group.x = _bgImage.getPhaserImage().x;
            _group.y = _bgImage.getPhaserImage().y;
        }
    }

});
