/***************************************************************
Loads resources including images, sprites, sound.
Since videos are streamed, it's not loaded here.
***************************************************************/

"use_strict";

//Dependencies
const Resources = require('../Modules/resourceLoader');

var _instance = null,
    _game = null;

/***************************************************************
Draws loading visuals.
***************************************************************/
function CreateLoadingVisuals() {
    var text = _game.add.text(_game.world.centerX, _game.world.centerY - 50, "Loading assets...");
    text.anchor.setTo(0.5, 0.5);

    var preloadImage = _game.add.sprite(_game.world.centerX, _game.world.centerY, 'progressBar');
    preloadImage.anchor.setTo(0.5, 0.5);
    _game.load.setPreloadSprite(preloadImage);
}

module.exports = {
    init: function() {
        //Singleton initialization
        if( _instance !== null)
            return _instance;
        _game = this.game;
        Resources.init(_game);
        return _instance;
    },
    preload: function() {
        CreateLoadingVisuals();
        //Load game assets
        Resources.preload();
    },
    create: function() {
        //Gets UI information
        _game.global.style = Resources.getStyle();
        _game.state.start("stateManager");
    }
}
