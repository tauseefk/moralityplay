/***************************************************************
Unused. Intended to blur text.
***************************************************************/
const _instance = null,
    _game = null,
    _blur = null,
    _blurNone = null;


function createBlurFilter(x_amt, y_amt) {
    var blurX = _game.add.filter('BlurX');
    var blurY = _game.add.filter('BlurY');
    blurX.blur = x_amt;
    blurY.blur = y_amt;
    _blur = [blurX, blurY];
    var blurX_none = _game.add.filter('BlurX');
    var blurY_none = _game.add.filter('BlurY');
    blurX_none.blur = 0;
    blurY_none.blur = 0;
    _blurNone = [blurX_none, blurY_none];
}

module.exports = {
    init: function(game) {
        if(_instance !== null) {
            return _instance;
        }
        _game = game;
        _instance = this;
        return _instance;
    },
    preload: function() {
        _game.load.script('filterX', 'js/Lib/BlurX.js');
        _game.load.script('filterY', 'js/Lib/BlurY.js');
    },
    create: function() {
        createBlurFilter(5, 5);
    },
    getBlur: function() {
        return _blur;
    },
    getBlurNone: function() {
        return _blurNone;
    }
}
