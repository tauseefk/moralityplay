//Dependency: None

define(['Modules/resourceLoader', 'Modules/gameManager'], function(Resources, GameManager) {
    var _instance = null
    var _game = null;

    return {
        init: function() {
            if( _instance !== null)
                return _instance;
            _game = this.game;
            Resources.init(_game);
            _game.global.gameManager = new GameManager();
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

});
