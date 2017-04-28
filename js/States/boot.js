/****************************************************************
Loads game fonts and tests user's connection.
Author: Christopher Weidya
****************************************************************/

"use_strict";

//Dependencies
const ConnectionChecker = require('../Modules/connectionChecker'), 
    GameManager = require('../Modules/gameManager'),
    SoundManager = require('../Modules/soundManager'),
    DatabaseManager = require('../Modules/databaseManager');

var _instance = null
var _game = null;

const connectionTestFileKey = 'pooh',
    connectionTestFileSrc = './Images/Loading/pooh.jpg',
    connectionTestFileType = 'IMAGE',
    connectionTestFileBytes = 1576132;

/****************************************************************
Loads google webfonts before initialization.
****************************************************************/
WebFontConfig = {
    //Load fonts before creation, timer delay. Can be improved  in implementation.
    active: function() { _game.time.events.add(Phaser.Timer.SECOND, DelayedCreate, this); },

    google: {
      families: ['Kadwa', 'Merienda One', 'Noto Sans'],
    }
};

/****************************************************************
Initializes game, sound and database managers.
Performs connection test.
Loads load visuals.
****************************************************************/
function DelayedCreate() {
    CreateGlobalVars();
    SetGameProperties();
    CreateLoadingVisuals();
    ConnectionChecker.loadFile(connectionTestFileKey, connectionTestFileSrc, connectionTestFileType, connectionTestFileBytes);
    ConnectionChecker.checkConnection();
}

function CreateLoadingVisuals() {
    var testConnectionImage = _game.add.image(_game.world.centerX, _game.world.centerY, 'connectionTestImage');
    testConnectionImage.anchor.setTo(0.5, 0.5);
}


/****************************************************************
Sets game bg color and ensures application runs even when out of focus.
****************************************************************/
function SetGameProperties() {
    _game.stage.disableVisibilityChange = true;
    _game.stage.backgroundColor = "#ffffff";
}


/****************************************************************
Global managers and variables initialized.
****************************************************************/
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

    //Constants
    _game.global.constants = {};

    //Image information viewing constants
    _game.global.constants.INFO_VIEW_MARGIN = 50; 
    _game.global.constants.INFO_VIEW_HEIGHT = _game.height - _game.global.constants.INFO_VIEW_MARGIN*2;
    _game.global.constants.SCROLLBAR_DIM = [30, _game.global.constants.INFO_VIEW_HEIGHT];    
    _game.global.constants.INFO_VIEW_WIDTH = _game.width - _game.global.constants.INFO_VIEW_MARGIN*2 - _game.global.constants.SCROLLBAR_DIM[0];   
    _game.global.constants.SCROLLBAR_POS = [_game.width - _game.global.constants.INFO_VIEW_MARGIN - _game.global.constants.SCROLLBAR_DIM[0], 
        _game.global.constants.INFO_VIEW_MARGIN];
    _game.global.constants.SCROLLBAR_STROKEWIDTH = 2;
    _game.global.constants.INFO_OVERLAY_COLOR = 0x000000;
    _game.global.constants.INFO_OVERLAY_OPACITY = 0.7;
    _game.global.constants.SCROLLBAR_WHEEL_SENSITIVITY = 10;

}

module.exports = {
    init: function() {
        console.log("Boot State");
        if(_instance !== null)
            return _instance;
        ConnectionChecker.init(this.game);
        _game = this.game;
        return _instance;
    },
    preload: function() {
        //Tries to full screen on browser
        _game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        _game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        _game.load.image('connectionTestImage', './Images/Loading/connectionTestImage.jpg');
    },
    create: function() {
    }
}
