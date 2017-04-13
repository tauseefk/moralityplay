//Dependency: None
const ConnectionChecker = require('../Modules/connectionChecker'), 
    GameManager = require('../Modules/gameManager'),
    SoundManager = require('../Modules/soundManager');

var _instance = null
var _game = null;

const connectionTestFileKey = 'littleRootMusic',
    connectionTestFileSrc = './Audio/Music/Pokemon Omega Ruby Alpha Sapphire - Littleroot Town Music (HQ).mp3',
    connectionTestFileType = 'AUDIO',
    connectionTestFileBytes = 2886887;


WebFontConfig = {
    //Load fonts before creation, timer delay. Can be improved  in implementation.
    active: function() { _game.time.events.add(Phaser.Timer.SECOND, DelayedCreate, this); },

    google: {
      families: ['Kadwa', 'Merienda One', 'Noto Sans'],
    }
};

function DelayedCreate() {

    CreateGlobalVars();
    InitGameGroups();
    SetGameProperties();
    CreateLoadingVisuals();
    ConnectionChecker.loadFile(connectionTestFileKey, connectionTestFileSrc, connectionTestFileType, connectionTestFileBytes);
    ConnectionChecker.checkConnection();
}

function CreateLoadingVisuals() {
    var text = _game.add.text(_game.world.centerX, _game.world.centerY, "Checking connection...");
    text.anchor.setTo(0.5, 0.5);
}

function SetGameProperties() {
    _game.stage.disableVisibilityChange = true;
    _game.stage.backgroundColor = "#ffffff";
}

function CreateGlobalVars() {
    _game.global = {
        playerName: null,
        visitedScenes: {}
    }

    _game.global.gameManager = new GameManager();
    _game.global.gameManager.initSignals();
    _game.global.soundManager = new SoundManager(_game);
}

function InitGameGroups() {
    _game.mediaGroup = _game.add.group();
    _game.uiGroup = _game.add.group();
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
