/***************************************************************
Wraps Phaser text.
All text in game is transformed and displayed from here.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const Linkable = require('./Linkable'),
    Animation = require('./Animation');

/***************************************************************
Different types of text.
***************************************************************/
var TextTypeEnum = {
    Thoughts: 'TEXT_THOUGHTS',
    Choices: 'TEXT_CHOICES',   
    Question: 'TEXT_QUESTION',
    Subtitle: 'TEXT_SUBTITLE',
    InfoOverlayText: 'TEXT_INFO_OVERLAY'
}

//Text constructor
var Text = function(content, xPos, yPos, type, properties) {
    this._type = type;
    this._xPos = xPos;
    this._yPos = yPos;
    this._content = content;
    this._properties = properties;
    this._text = null;
}

/***************************************************************
Parses properties set in Style.json and applies them.
***************************************************************/
Text.prototype.setAdditionalProperties = function() {
    if(this._properties.lineSpacing) {
        this._text.lineSpacing = this._properties.lineSpacing;
    }
    if(this._properties.shadow) {
        var shadow = this._properties.shadow;
        this._text.setShadow(shadow[0], shadow[1], shadow[2], shadow[3]);
    }
}

/***************************************************************
Adds text to game and applies properties and assigns to the group specified.
***************************************************************/
Text.prototype.addTextToGame = function(game, group) {
    this._text = game.add.text(this._xPos, this._yPos, this._content, this._properties);
    this.setAdditionalProperties();
    group.add(this._text);
}

/***************************************************************
Changes text to the specified type.
***************************************************************/
Text.prototype.changeText = function(game, arg1, arg2, arg3, arg4, arg5, arg6) {
    switch(this._type) {
        case TextTypeEnum.Thoughts:
            this.changeToThoughts(game, arg1, arg2);
            break;
        case TextTypeEnum.Choices:
            this.changeToChoiceText(game, arg1);
            break;
        case TextTypeEnum.Question:
            this.changeToQuestion(game);
            break;
        case TextTypeEnum.InfoOverlayText:
            this.changeToInfoOverlayText(game);
            break;
        case TextTypeEnum.Subtitle:
            this.changeToSubtitle(game, arg1);
            break;
        default:
            console.warn("Invalid Text Type.");
    }
}

/***************************************************************
Text shown after clicking thought bubble.
***************************************************************/
Text.prototype.changeToThoughts = function(game, xTo, yTo) {
    this._text.anchor.setTo(0.5);
    this._text.alpha = 0;
    this.addInterpolationTween(game, xTo, yTo);    
    Animation.fade(game, this._text, 1, true);
}

/***************************************************************
Text displayed in choices.
***************************************************************/
Text.prototype.changeToChoiceText = function(game, boundsY) {
    this._text.anchor.set(0.5, 0.5);
    this._text.y = boundsY;
    this._text.alpha = 0;    
    Animation.fade(game, this._text, 1, true);
}

/***************************************************************
Question/prompt text
***************************************************************/
Text.prototype.changeToQuestion = function(game) {
    this._text.anchor.set(0.5, 0.5);
    this._text.x = game.width/2;    
    this._text.alpha = 0;
    Animation.fade(game, this._text, 1, true);
}

/***************************************************************
Helper text in overlay.
***************************************************************/
Text.prototype.changeToInfoOverlayText = function(game) {    
    this._text.anchor.set(0.5, 0.5);
    this._text.x = game.width/2;
    this.setVisible(false);
}

/***************************************************************
Subtitle text.
***************************************************************/
Text.prototype.changeToSubtitle = function(game, isVisible) {
    this._text.anchor.x = 0.5
    this._text.x = game.width/2;
    this.setVisible(isVisible);
}

/***************************************************************
Allows for text to take a curved path instead of a linear one to its destination.
Many hard coded values. Probably not needed.
***************************************************************/
Text.prototype.addInterpolationTween = function(game, xTo, yTo) {
    var points = {x: [ this._xPos,  this._xPos + (xTo- this._xPos)/2,  xTo-(xTo- this._xPos)/8, xTo], y: [ this._yPos,  this._yPos-10, yTo-10, yTo]};
    return game.add.tween(this._text).to({x: points.x, y: points.y}, 1000, Phaser.Easing.Quadratic.Out, true, 0 , 0).interpolation(function(v, k){
            return Phaser.Math.bezierInterpolation(v, k);
        });
}

/***************************************************************
Fades out text, dispatching a signal at the end if specified.
***************************************************************/
Text.prototype.fadeOut = function(game, chainSignal, arg1) {
    if(chainSignal) {
        this._link = new Linkable(game, this._text.events, chainSignal, arg1);
        this._link.addOnClickAnimation(Animation.fade(game, this._text, 0, true));
        this._link.onTrigger();
    }
    else {
        Animation.fade(game, this._text, 0, true);
    }
}

/***************************************************************
Enables/disables input on text.
***************************************************************/
Text.prototype.enableInput = function(value) {
    this._text.inputEnabled = value;
}

/***************************************************************
Destroys phaser text.
***************************************************************/
Text.prototype.destroy = function() {
    this._text.destroy();
}

/***************************************************************
Getters
***************************************************************/
Text.prototype.getPhaserText = function() {
    return this._text;
}

Text.prototype.getHeight = function() {
    return this._text.height;
}

/***************************************************************
Setters
***************************************************************/
Text.prototype.setVisible = function(isVisible) {
    this._text.visible = isVisible;
}

Text.prototype.setY = function(val) {
    this._text.y = val;
}

/***************************************************************
Returns enum containing all text types.
***************************************************************/
Text.getEnum = function() {
    return TextTypeEnum;
}

module.exports = Text;
