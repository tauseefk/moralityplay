//Dependency: None
var _instance = null
var _game = null;

WebFontConfig = {
    //Load fonts before creation, timer delay. Can be improved  in implementation.
    active: function() { _game.time.events.add(Phaser.Timer.SECOND, delayedCreate, this); },

    google: {
      families: ['Kadwa', 'Merienda One'],
    }
};

function delayedCreate() {
    createGlobalVars();
    initGameGroups();
    _game.stage.backgroundColor = "#ffffff";
    _game.state.start("preload");
}

function createGlobalVars() {
    _game.global = {
        playerName: null
    }
}

function initGameGroups() {
    _game.mediaGroup = _game.add.group();
    _game.uiGroup = _game.add.group();
}

module.exports = {
    init: function() {
        console.log("Boot State");
        if( _instance !== null)
            return _instance;
        _game = this.game;
        return _instance;
    },
    preload: function() {
        _game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        _game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    create: function() {
    }
}
