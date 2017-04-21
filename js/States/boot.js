/*
Loads game fonts and tests user's connection.
*/

//Dependencies
const ConnectionChecker = require('../Modules/connectionChecker'), 
    GameManager = require('../Modules/gameManager'),
    SoundManager = require('../Modules/soundManager'),
    DatabaseManager = require('../Modules/databaseManager');

var _instance = null
var _game = null;

const connectionTestFileKey = 'littleRootMusic',
    connectionTestFileSrc = './Audio/Music/Pokemon Omega Ruby Alpha Sapphire - Littleroot Town Music (HQ).mp3',
    connectionTestFileType = 'AUDIO',
    connectionTestFileBytes = 2886887;

/*
Loads google webfonts before initialization.
*/
WebFontConfig = {
    //Load fonts before creation, timer delay. Can be improved  in implementation.
    active: function() { _game.time.events.add(Phaser.Timer.SECOND, DelayedCreate, this); },

    google: {
      families: ['Kadwa', 'Merienda One', 'Noto Sans'],
    }
};

/*
Initializes game, sound and database managers.
Performs connection test.
Loads load visuals.
*/
function DelayedCreate() {
    CreateGlobalVars();
    SetGameProperties();
    CreateLoadingVisuals();
    ConnectionChecker.loadFile(connectionTestFileKey, connectionTestFileSrc, connectionTestFileType, connectionTestFileBytes);
    ConnectionChecker.checkConnection();
}

function CreateLoadingVisuals() {
    var text = _game.add.text(_game.world.centerX, _game.world.centerY, "Checking connection...");
    text.anchor.setTo(0.5, 0.5);
}

/*
Sets game bg color and ensures application runs even when out of focus.
*/
function SetGameProperties() {
    _game.stage.disableVisibilityChange = true;
    _game.stage.backgroundColor = "#ffffff";
}

/*
Global managers and variables initialized.
*/
function CreateGlobalVars() {
    //Global variables
    _game.global = {
        playerName: null,
        visitedScenes: {}
    }

    //Global groups
    _game.mediaGroup = _game.add.group();
    _game.uiGroup = _game.add.group();

    //Global managers
    _game.global.gameManager = new GameManager();
    _game.global.gameManager.initSignals();
    _game.global.soundManager = new SoundManager(_game);
    _game.global.soundManager.init();
    _game.global.databaseManager = new DatabaseManager(_game);
}

module.exports = {
    init: function() {
        console.log("Boot State");
        ConnectionChecker.init(this.game);
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
