//Dependency: Nonde

define(['Modules/Linkable'], function(Linkable) {
    "use strict";

    var InputTypeEnum = {
        NameInput: 'INPUT_TEXT',
        Choices: 'TEXT_CHOICES'
    }

    var Input = function(content, xPos, yPos, properties) {
        this._xPos = xPos;
        this._yPos = yPos;
        this._content = content;
        this._properties = properties;
        this._input = null;
    }

    Input.prototype.setDefaultProperties = function() {
        this._input.font = '18px Roboto';
    }

    Input.prototype.addToGame = function(game) {
        this._input = game.add.inputField(this._xPos, this._yPos, this._properties);
        this.setDefaultProperties();
    }

    Input.prototype.getInput = function() {
        return this._input;
    }
    

    return Input;
});
