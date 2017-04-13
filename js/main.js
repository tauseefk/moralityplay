"use strict";

const Boot = require('./States/boot'),
    Preload = require('./States/preload'),
    StateManager = require('./States/StateManager'),
    ResourceLoader = require('./Modules/resourceLoader');
    
function initGame(Boot, Preload, StateManager, ResourceLoader) {
    var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { init: init, preload: preload, create: create, update: update });

    function init() {
        console.log("Game initialized.");
        game.canvas.className += "center";
        game.state.add("boot", Boot);
        game.state.add("preload", Preload);
        game.state.add("stateManager", StateManager);
    }

    function preload () {
        game.load.json('data', 'json/Data.json');
        game.load.json('style', 'json/Style.json');
        game.load.image('progressBar', './Images/Icons/StubIcon.png');
        game.load.image('title', './Images/UI/Title.png');
    }

    function create() {
        game.state.start("boot");
    }

    function update() {

    }
}

initGame(Boot, Preload, StateManager, ResourceLoader);
