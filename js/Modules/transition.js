/***************************************************************
In charge of creating fade in/out transitions between scenes.
Currently fade out is not implemented.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const Graphic = require('./Objects/Graphics'),
	VideoFilter = require('./videoFilterLoader');

var _instance = null;
var _game = null;
var _rectGraphic = null;

/***************************************************************
Fades in a generated graphic.
***************************************************************/
function fade(isFadeIn) {
	var val = 0;
	if(isFadeIn)
		val = 1;
	_rectGraphic = new Graphic(0, 0, Graphic.getEnum().Transition);
	var rectangle = Graphic.createRectangle(0, 0, _game.width, _game.height, _game.global.constants.TRANSITION_COLOR);
	_rectGraphic.addGraphicToGame(_game);
	_rectGraphic.changeGraphic(_game, rectangle, val);
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
	//Unused
	fadeOutTransition: function() {
		fade(false);
	}
}
