//Dependency: Nonde

define(['Modules/Linkable'], function(Linkable) {
    "use strict";

    var TextTypeEnum = {
        Thoughts: 'TEXT_THOUGHTS',
        MeaningfulChoices: 'TEXT_MEANINGFUL_CHOICES',
        MeaninglessChoices: 'TEXT_MEANINGLESS_CHOICES'
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

    Text.prototype.addToGame = function(game) {
        this._text = game.add.text(this._xPos, this._yPos, this._content, this._properties);
        //this.setDefaultProperties();
    }
    //arg1 can be: xTo, targetScene, endFilterSignal
    //arg2 can be: yTo, changeSceneSignal
    //arg3 can be: filter
    Text.prototype.changeText = function(game, enumType, arg1, arg2, arg3) {
        switch(enumType) {
            case TextTypeEnum.Thoughts:
                this.changeToThoughts(game, arg1, arg2, arg3);
                break;
            case TextTypeEnum.MeaningfulChoices:
                this.changeToMeaningfulChoices(game, arg1, arg2);
                break;
            case TextTypeEnum.MeaninglessChoices:
                this.changeToMeaninglessChoices(game, arg1);
                break;
            default:
                console.warn("Invalid Text Type.");
        }
    }

    Text.prototype.changeToThoughts = function(game, xTo, yTo, filter) {
        this._text.anchor.setTo(0.5);
        this._text.alpha = 0;
        this.addInterpolationTween(game, xTo, yTo);
        Linkable.SetLinkProperties(game, true, false, this._text, this._text.events);
    }

    Text.prototype.changeToMeaningfulChoices = function(game, targetScene, changeSceneSignal) {
        this._text.alpha = 0;
        this._text.inputEnabled = true;
        Linkable.SetLinkProperties(game, true, false, this._text, this._text.events, ChangeScene, targetScene, changeSceneSignal);
    }

    Text.prototype.changeToMeaninglessChoices = function(game, endInteractionSignal) {      
        this._text.alpha = 0;
        this._text.inputEnabled = true;
        Linkable.SetLinkProperties(game, true, true, this._text, this._text.events, EndInteraction, endInteractionSignal);
    }

    Text.prototype.addInterpolationTween = function(game, xTo, yTo) {
        var points = {x: [ this._xPos,  this._xPos + (xTo- this._xPos)/2,  xTo-(xTo- this._xPos)/8, xTo], y: [ this._yPos,  this._yPos-10, yTo-10, yTo]}; 
        return game.add.tween(this._text).to({x: points.x, y: points.y}, 1000, Phaser.Easing.Quadratic.Out, true, 0 , 0).interpolation(function(v, k){
                return Phaser.Math.bezierInterpolation(v, k);
            });
    }

    Text.prototype.fadeOut = function(game) {
        Linkable.fadeOut(game, this._text, true);
    }

    function ChangeScene(scene, signal) {
        signal.dispatch(scene);
    }

    function EndInteraction(signal) {
        signal.dispatch();
    }

    return Text;
});
