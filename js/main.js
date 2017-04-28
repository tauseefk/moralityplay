/***************************************************************
Game startup.
The experience runs on Phaser v2.6.2
Author: Christopher Weidya
****************************************************************/

"use strict";

//Dependencies
const Boot = require('./States/boot'),
    Preload = require('./States/preload'),
    StateManager = require('./States/StateManager'),
    ResourceLoader = require('./Modules/resourceLoader');
    
function initGame(Boot, Preload, StateManager, ResourceLoader) {
    var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { init: init, preload: preload, create: create, update: update });

    /***************************************************************
    Creates initializing states
    ****************************************************************/
    function init() {
        console.log("Game initialized.");
        game.canvas.className += "center";
        game.state.add("boot", Boot);
        game.state.add("preload", Preload);
        game.state.add("stateManager", StateManager);
    }

    /***************************************************************
    Loads Json Files and loading images
    ****************************************************************/
    function preload () {
        game.load.json('data', 'json/Data.json');
        game.load.json('style', 'json/Style.json');
        game.load.image('progressSceneBackground', './Images/Loading/progress_bg.png');
        game.load.image('progressBarFillFg', './Images/Loading/progressbar.png');
        game.load.image('progressBarFillBg', './Images/Loading/progressbar_bg.png');
        game.load.image('progressBarFrame', './Images/Loading/progressbar_frame.png');
        game.load.image('progressBarText', './Images/Loading/progressbar_text.png');
    }

    /***************************************************************
    Starts boot state
    ****************************************************************/
    function create() {
        game.state.start("boot");
    }

    function update() {

    }
}

initGame(Boot, Preload, StateManager, ResourceLoader);
