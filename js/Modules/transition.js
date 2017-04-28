"use strict";

const Graphic = require('./Graphics'),
	VideoFilter = require('./videoFilterLoader');

var _instance = null;
var _game = null;
var _rectGraphic = null;
var _fadeInSignal = null;
var _fadeOutSignal = null;
const TRANSITION_COLOR = 0xFFFFFF;

function fade(isFadeIn) {
	var val = 0;
	if(isFadeIn)
		val = 1;
	_rectGraphic = new Graphic(0, 0, Graphic.getEnum().Transition);
	var rectangle = Graphic.createRectangle(0, 0, _game.width, _game.height, TRANSITION_COLOR);
	_rectGraphic.addGraphicToGame(_game);
	_rectGraphic.changeGraphic(_game, rectangle, val);
	//_game.world.bringToTop(_rectGraphic.getGraphic());
	//startFade(_rectGraphic.getGraphic(), isFadeIn);
}

function startFade(obj, isFadeIn) {
	var val = 1;
	if(isFadeIn)
		val = 0;
	var fadeTween = _game.add.tween(obj).to({alpha:val}, 10000, Phaser.Easing.Linear.None, true);
}

//Not used
function destroyGraphic() {
	_game.world.remove(_rectGraphic);
}

module.exports = {
	init: function(game) {
		if(_instance !== null)
			return _instance;
		_instance = this;
		_game = game;
		return _instance;
	},
	fadeInTransition: function() {
		VideoFilter.clearBg();
		fade(true);
	},
	fadeOutTransition: function() {
		fade(false);
	}
}
