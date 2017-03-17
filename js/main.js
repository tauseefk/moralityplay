
require(['States/boot', 'States/preload', 'States/StateManager', 'Modules/resourceLoader'], function(Boot, Preload, StateManager, ResourceLoader) {
    initGame(Boot, Preload, StateManager, ResourceLoader);
});

function initGame(Boot, Preload, StateManager, ResourceLoader) {
    var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '', { init: init, preload: preload, create: create, update: update });

    function init() {        
        console.log("Game initialized.");
        game.add.plugin(PhaserInput.Plugin);
        game.state.add("boot", Boot);
        game.state.add("preload", Preload);
        game.state.add("stateManager", StateManager);
    }

    function preload () {        
        game.load.json('data', 'json/Data.json');
        game.load.json('style', 'json/Style.json');
    }

    function create() {
        game.state.start("boot");
    }

    function update() {
        
    }

}