/***************************************************************
Loads resources including images, sprites, sound.
Since videos are streamed, it's not loaded here.
Author: Christopher Weidya
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
    //var text = _game.add.text(_game.world.centerX, _game.world.centerY - 50, "Loading assets...");
    //text.anchor.setTo(0.5, 0.5);
    var background = _game.add.image(0, 0, 'progressSceneBackground');
    var progressBarBackground = _game.add.image(_game.world.centerX, _game.world.centerY, 'progressBarFillBg');
    progressBarBackground.anchor.setTo(0.5,0.5);
    var progressBarFrame = _game.add.image(_game.world.centerX, _game.world.centerY, 'progressBarFrame');
    progressBarFrame.anchor.setTo(0.5,0.5);
    var progressBarText = _game.add.image(_game.world.centerX, _game.world.centerY+80, 'progressBarText');
    progressBarText.anchor.setTo(0.5,0.5);

    var preloadImage = _game.add.sprite((_game.width-progressBarBackground.width)/2, 
        (_game.height-progressBarBackground.height)/2, 'progressBarFillFg');
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
        _game.global.mapping = Resources.getMapping();
        _game.state.start("stateManager");
    }
}
