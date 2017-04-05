const Resources = require('../Modules/resourceLoader');

var _instance = null,
    _game = null;

module.exports = {
    init: function() {
        if( _instance !== null)
            return _instance;
        _game = this.game;
        Resources.init(_game);
        return _instance;
    },
    preload: function() {
        var preloadImage = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'progressBar');
        preloadImage.anchor.setTo(0.5, 0.5);
        this.game.load.setPreloadSprite(preloadImage);
        Resources.preload();
    },
    create: function() {
        _game.global.style = Resources.getStyle();
        _game.state.start("stateManager");
    }
}
