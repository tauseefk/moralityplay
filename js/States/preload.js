const Resources = require('../Modules/resourceLoader');

var _instance = null,
    _game = null;

function CreateLoadingVisuals() {
    var text = _game.add.text(_game.world.centerX, _game.world.centerY - 50, "Loading assets...");
    text.anchor.setTo(0.5, 0.5);

    var preloadImage = _game.add.sprite(_game.world.centerX, _game.world.centerY, 'progressBar');
    preloadImage.anchor.setTo(0.5, 0.5);
    _game.load.setPreloadSprite(preloadImage);
}

module.exports = {
    init: function() {
        if( _instance !== null)
            return _instance;
        _game = this.game;
        Resources.init(_game);
        return _instance;
    },
    preload: function() {
        CreateLoadingVisuals();
        Resources.preload();
    },
    create: function() {
        _game.global.style = Resources.getStyle();
        _game.state.start("stateManager");
    }
}
