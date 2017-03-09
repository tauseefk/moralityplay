//Dependency: None

define(['Modules/resourceLoader'], function(Resources) {
    var _instance = null
    var _game = null;

    return {
        init: function() {
            if( _instance !== null)
                return _instance;
            _game = this.game;
            Resources.init(_game);
            return _instance;
        },
        preload: function() {
            Resources.preload();
        },
        create: function() {
            Resources.create();
            _game.state.start("stateManager");
        }
    }

});
