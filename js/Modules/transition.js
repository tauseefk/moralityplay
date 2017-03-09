define(function() {
	"use strict";
	
	var _instance = null;
	var _game = null;
	var _rectGraphic = null;
	var _fadeInSignal = null;
	var _fadeOutSignal = null;
	const TRANSITION_COLOR = 0xFFFFFF;


	function fade(isFadeIn, color) {
		var val = 0;
		if(isFadeIn)
			val = 1;
		_rectGraphic = _game.add.graphics(0, 0);
		_rectGraphic.beginFill(TRANSITION_COLOR, 1);
		_rectGraphic.drawRect(0, 0, _game.width, _game.height);
		_rectGraphic.endFill();
		_rectGraphic.alpha = val;
		_game.world.bringToTop(_rectGraphic);
        startFade(_rectGraphic, isFadeIn);
	}

	function startFade(obj, isFadeIn) {
		var val = 1;
		if(isFadeIn)
			val = 0;
		var fadeTween = _game.add.tween(obj).to({alpha:val}, 1000, Phaser.Easing.Linear.None, true);  
	}

	//Not used
	function destroyGraphic() {
		_game.world.remove(_rectGraphic);
	}

	return {
		init: function(game) {
			if(_instance !== null)
				return _instance;
			_instance = this;
			_game = game;
			_fadeInSignal = new Phaser.Signal();
			_fadeInSignal.add(fade, this, 0, true);
			_fadeOutSignal = new Phaser.Signal();
			_fadeOutSignal.add(fade, this, 0, false);		
			return _instance;
		},
		getFadeInSignal: function() {
			return _fadeInSignal;
		},
		getFadeOutSignal: function() {
			return _fadeOutSignal;
		}
	}

});