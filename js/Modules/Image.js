//Dependency: Nonde

define(['Modules/Linkable'], function(Linkable) {
    "use strict";

    var ImageTypeEnum = {
        Info: 'IMAGE_BUTTON_INFO',
        SceneChange: 'IMAGE_BUTTON_SCENECHANGE',
        Thought: 'IMAGE_BUTTON_THOUGHT',
        Transition: 'IMAGE_TRANSITION',
        Background: 'IMAGE_BACKGROUND'
    }

    //Image constructor
    var Image = function(xPos, yPos, key, properties) {
        this._xPos = xPos;
        this._yPos = yPos;
        this._properties = properties;
        this._key = key;
        this._image = null;
        /*
        if(type == ImageTypeEnum.Background) {
            this._xTo = arg1;
            this._yTo = arg2;
            this._filter = arg3;
        }
        else if(type == ImageTypeEnum.Transition) {
            this._targetScene = arg1;
            this._signal = arg2;
        }
        */
    }

    Image.prototype.addImageToGame = function(game) {
        this._image = game.add.image(this._xPos, this._yPos, this._key);
    //    this.setDefaultProperties();
    }

    Image.prototype.addButtonToGame = function(game) {
        this._image = game.add.button(this._xPos, this._yPos, this._key);
    }

    Image.prototype.setImage = function(key) {
        this._key = key;
    //    this.setDefaultProperties();
    }

    //Assigns image change function depending on enum
    //arg1 can be boolean: draggable, function: button callback, targetScene
    //arg2 can be signal
    Image.prototype.changeImage = function (game, enumType, arg1, arg2) {
        switch(enumType) {
            case ImageTypeEnum.Background:
                this.changeToBgImage(game, arg1);
                break;
            case ImageTypeEnum.Thought:
                this.changeToThoughtIcon(game, arg1);
                break;
            case ImageTypeEnum.SceneChange:
                this.changeToSceneChangeImage(game, arg1, arg2);
                break;
            default:
                console.warn("Invalid Image Type.");
        }
    }

    //Changes image to a horizontally draggable image
    //Scales and sets a rectangle container for Bg image to pan around
    Image.prototype.changeToBgImage = function(game, draggable) {

        //Scales Bg image to fit game height, maintains Bg image aspect ratio
        var scale = game.height/this._image.height;
        this._image.height = Math.floor(this._image.height*scale);
        this._image.width = Math.floor(this._image.width*scale);

        //Initializes container for bg image to be dragged around

        if(draggable) {
            this.makeDraggable(game, 'stub', false, true, -this._image.width+game.width, 0, this._image.width*2-game.width, this._image.height)
        }
    }

    Image.prototype.changeToThoughtIcon = function(game, callbackFunc) {
        this.addLinkProperties(game, callbackFunc);
    }

    Image.prototype.changeToSceneChangeImage = function(game, targetScene, signal) {
        Linkable.SetLinkProperties(game, true, true, this._image, this._image, changeScene, targetScene, signal);
    }

    //Changes cursor image on mouseover
    Image.prototype.changeCursorImage = function(game, cursorImageSrc) {
        this._image.events.onInputOver.add(function(){
        game.canvas.style.cursor = cursorImageSrc;
        }, this);

        this._image.events.onInputOut.add(function(){
        game.canvas.style.cursor = "default";
        }, this);
    }

    Image.prototype.makeDraggable = function(game, hoverImageSrc, lockHorizontal, lockVertical, boundsX, boundsY, boundsWidth, boundsHeight) {
        
        //Enables drag interaction on the horizontal axis
        this._image.inputEnabled = true;
        if(boundsX !== undefined && boundsX !== undefined) {
            var dragBounds = new Phaser.Rectangle(boundsX, boundsY, boundsWidth, boundsHeight);
            this._image.input.boundsRect = dragBounds;
        }
        this._image.input.draggable = true;
        this._image.input.allowVerticalDrag = !lockVertical;
        this._image.input.allowHorizontalDrag = !lockHorizontal;

        //Changes mouseover image
        this.changeCursorImage(game, 'url("./Images/UI/hand_2.png"), auto');
    }

    Image.prototype.addLinkProperties = function(game, callbackFunc) {        
        Linkable.SetLinkProperties(game, true, true, this._image, this._image, callbackFunc);
    }

    Image.prototype.getPhaserImage = function() {
        return this._image;
    }

    function changeScene(scene, signal) {
        signal.dispatch(scene);
    }

    function DebugRect(x, y, width, height, game) {
        var bounds = new Phaser.Rectangle(x, y, width, height);
        var graphics = game.add.graphics(bounds.x, bounds.y);
        graphics.beginFill(0x000077);
        graphics.drawRect(0, 0, bounds.width, bounds.height);
    }


    /*
    Text.prototype.changeToThoughts = function(game) {
        this.setCustomProperties();
        this._text.anchor.setTo(0.5);
        this._text.alpha = 0;
        this._text.inputEnabled = true;
        this._text.filters = this._filter.getBlur();        
        this._text.setShadow(0, 0, 'rgba(255,255,255,1', 7);
        this.setCustomProperties();
        this.addFadeTween(game);
        this.addInterpolationTween(game);
        this.addMouseOverBlurEvents();
    }

    Text.prototype.changeToChoices = function(game) {        
        this.setCustomProperties();
        this._text.alpha = 0;
        this._text.strokeThickness = 8;
        this._text.inputEnabled = true;
        this.addChangeSceneEvent();
        this.addFadeTween(game);
    }


    Text.prototype.addTweens = function(game) { 
        
    //    var textFocusX = _game.add.tween(_text.filters[0]).to({blur:Filter.getBlurNone()[0].blur}, 1000, Phaser.Easing.Linear.None, false, 0, 0, false);
    //    var textFocusY = _game.add.tween(_text.filters[1]).to({blur:Filter.getBlurNone()[1].blur}, 1000, Phaser.Easing.Linear.None, false, 0, 0, false);
        
    }

    Text.prototype.addChangeSceneEvent = function() {
        this._text.events.onInputUp.addOnce(buttonPressed(this._targetScene), this);
    }

    Text.prototype.addFadeTween = function(game) {        
        return game.add.tween(this._text).to({alpha:1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);   
    }

    Text.prototype.addInterpolationTween = function(game) {
        var points = {x: [ this._xPos,  this._xPos + (this._xTo- this._xPos)/2,  this._xTo-(this._xTo- this._xPos)/8, this._xTo], y: [ this._yPos,  this._yPos-10, this._yTo-10, this._yTo]}; 
        return game.add.tween(this._text).to({x: points.x, y: points.y}, 1000, Phaser.Easing.Quadratic.Out, true, 0 , 0).interpolation(function(v, k){
                return Phaser.Math.bezierInterpolation(v, k);
            });
    }

    Text.prototype.addMouseOverBlurEvents = function() {
        return this._text.events.onInputOver.addOnce(focusText(this._text), this);
    }


    function buttonPressed(scene) {
        return function() {
            this._signal.dispatch(scene);
        }
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

    */
    return Image;
});
