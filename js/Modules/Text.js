//Dependency: Nonde

define(['Modules/Linkable'], function(Linkable) {
    "use strict";

    var TextTypeEnum = {
        Thoughts: 'TEXT_THOUGHTS',
        Choices: 'TEXT_CHOICES'
    }

    var Text = function(content, xPos, yPos, properties) {
        this._xPos = xPos;
        this._yPos = yPos;
        this._content = content;
        this._properties = properties;
        this._text = null;
    }

    Text.prototype.setDefaultProperties = function() {
        this._text.align = 'left';
        this._text.font = 'Arial';
        this._text.fontSize =30;
        this._text.stroke = '#ffffff';
        this._text.strokeThickness = 1;
        this._text.padding.set(10, 0);
    }

    Text.prototype.setCustomProperties = function() {
        var property;
        for(property in this._properties) {
            this._text[property] = this._properties[property];
        }
    }

    Text.prototype.addToGame = function(game) {
        this._text = game.add.text(this._xPos, this._yPos, this._content);
        this.setDefaultProperties();
    }
    //arg1 can be: xTo, targetScene
    //arg2 can be: yTo, signal
    //arg3 can be: filter
    Text.prototype.changeText = function(game, enumType, arg1, arg2, arg3) {
        switch(enumType) {
            case TextTypeEnum.Thoughts:
                this.changeToThoughts(game, arg1, arg2, arg3);
                break;
            case TextTypeEnum.Choices:
                this.changeToChoices(game, arg1, arg2);
                break;
            default:
                console.warn("Invalid Text Type.");
        }
    }

    Text.prototype.changeToThoughts = function(game, xTo, yTo, filter) {
        this.setCustomProperties();
        this._text.anchor.setTo(0.5);
        this._text.alpha = 0;
        this._text.inputEnabled = true;
     //   this._text.filters = filter.getBlur();
        this._text.setShadow(0, 0, 'rgba(255,255,255,1', 7);
    //    this.addFadeTween(game);
        this.addInterpolationTween(game, xTo, yTo);
        Linkable.SetLinkProperties(game, true, false, this._text, this._text.events);
  //      this.addMouseOverBlurEvents();
    }

    Text.prototype.changeToChoices = function(game, targetScene, signal) {        
        this.setCustomProperties();
        this._text.alpha = 0;
        //this._text.strokeThickness = 8;
        this._text.inputEnabled = true;
        Linkable.SetLinkProperties(game, true, false, this._text, this._text.events, changeScene, targetScene, signal);
    }


    Text.prototype.addTweens = function(game) { 
        
    //    var textFocusX = _game.add.tween(_text.filters[0]).to({blur:Filter.getBlurNone()[0].blur}, 1000, Phaser.Easing.Linear.None, false, 0, 0, false);
    //    var textFocusY = _game.add.tween(_text.filters[1]).to({blur:Filter.getBlurNone()[1].blur}, 1000, Phaser.Easing.Linear.None, false, 0, 0, false);
        
    }

    Text.prototype.addInterpolationTween = function(game, xTo, yTo) {
        var points = {x: [ this._xPos,  this._xPos + (xTo- this._xPos)/2,  xTo-(xTo- this._xPos)/8, xTo], y: [ this._yPos,  this._yPos-10, yTo-10, yTo]}; 
        return game.add.tween(this._text).to({x: points.x, y: points.y}, 1000, Phaser.Easing.Quadratic.Out, true, 0 , 0).interpolation(function(v, k){
                return Phaser.Math.bezierInterpolation(v, k);
            });
    }

    Text.prototype.addMouseOverBlurEvents = function() {
        return this._text.events.onInputOver.addOnce(focusText(this._text), this);
    }

    function changeScene(scene, signal) {
        signal.dispatch(scene);
    }

    function focusText(text) {
        return function() {
         //   console.log("FIlter: " + this._filter);
         //   text.filters = this._filter._blurNone;
            text.filters = null;
        }
     //   textFadeX.start();
      //  textFadeY.start();
    }

    function blurifyText() {
        _text.filters = Filter.getBlur();
    } 

    return Text;
});
