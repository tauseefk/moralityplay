const Resources = require('../Modules/resourceLoader'),
    GameManager = require('../Modules/gameManager'),
    SoundManager = require('../Modules/soundManager');

var _instance = null,
    _game = null;

module.exports = {
    init: function() {
        if( _instance !== null)
            return _instance;
        _game = this.game;
        Resources.init(_game);
        _game.global.gameManager = new GameManager();
        _game.global.soundManager = new SoundManager(this.game);
        return _instance;
    },
    preload: function() {
        Resources.preload();
    },
    create: function() {
        Resources.create();
        _game.global.gameManager.initSignals();
        _game.global.style = Resources.getStyle();
        _game.state.start("stateManager");
    }
}
