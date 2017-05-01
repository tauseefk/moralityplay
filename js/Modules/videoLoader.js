/***************************************************************
Handles playing of video and manages it in experience.
Currently, video is streamed and its source is changed constantly.
Hence, users only have to tap once on phones to start.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const VideoFilter = require('./videoFilterLoader'),
    Linkable = require('./Objects/Linkable'),
    Subtitle = require('./subtitleLoader');

var _instance = null;
var _game = null;

var _video = null
var _videoTexture = null;
var _videoFilter = null;
var _interactionTimeStamps = null;

var _loopEventEnabled = false;
var _pausedByGame = false;

var _firstVideo = true;

/***************************************************************
Switches video sources and adds events on specified timestamps.
***************************************************************/
function CreateVideo(src, doFadeOut, nextScene, sub, interactionTimeStamps) {
    _video = _video.changeSource(src, false);
    AddVideoAndFilter(doFadeOut, sub, nextScene);
    if(_interactionTimeStamps)
        AddNextInteractionEvent();
}

/***************************************************************
Checks video load progress.
Unused.
***************************************************************/
function CheckProgress() {
    var percentLoaded = parseInt(_video.video.buffered.end(0) / _video.video.duration * 100);
    console.log(percentLoaded);
}

/***************************************************************
Gets next timestamp and starts event.
***************************************************************/
function AddNextInteractionEvent() {
    var timestamp = _interactionTimeStamps.shift();
    if(timestamp)
        checkVideoDuration(timestamp);
}

/***************************************************************
Adds video to game.
On video load after source swap, sets video parameters.
***************************************************************/
function AddVideoAndFilter(doFadeOut, sub, nextScene) {
    _videoTexture = _video.addToWorld(0, 0, 0, 0);
    _game.mediaGroup.add(_videoTexture);
    _video.onChangeSource.addOnce(OnVideoLoad, this);

    function OnVideoLoad() {
        VideoTextureClick(_videoTexture);
        HandleVideoEnd(nextScene);
        if(sub)
            Subtitle.create(_video.video, sub);
        if(_videoFilter != null && _videoFilter != 'none') {
            VideoFilter.createOverlay(_videoFilter);
        }
    }
}

/***************************************************************
Loops video if no next scene is specified.
***************************************************************/
function HandleVideoEnd(nextScene) {
    if(!nextScene)
        _video.loop = true;
    else {
        _video.loop = false;
        _video.onComplete.addOnce(ChangeScene(nextScene), this);
    }
}

/***************************************************************
Triggers interaction moment when timestamp is reached.
***************************************************************/
function TriggerMoment() {
    console.log(_video.video.duration);
    console.log(_video.video.currentTime);
    //Ensure game is not paused to pause scenario properly
    _game.global.gameManager.getPlaySignal().dispatch();
    _video.video.pause();
    _pausedByGame = true;
    _game.global.gameManager.getHideUISignal().dispatch();
    VideoFilter.startFilterFade(_game.global.gameManager.getTriggerInteractionSignal());
}

/***************************************************************
Slight zoom in animation when filter starts.
***************************************************************/
function VideoZoom() {
    Linkable.zoomIn(_game, _video, 1.5);
}

/*
//Timeupdate is less sensitive.
function checkVideoDuration(time) {
    _video.video.addEventListener("timeupdate", function trigger() {        
        if(_video.video.currentTime >= time){
            _video.video.removeEventListener("timeupdate", trigger);
            TriggerMoment();
            AddInteractionEvents();
        }
    }, false);
}
*/

/***************************************************************
Creates a self removing event that activates when video reaches specified timestamp.
***************************************************************/
function checkVideoDuration(time) {
    var interval = setInterval(function() {
        if(_video.video.currentTime >= time) {
            clearInterval(interval);
            TriggerMoment();
            AddNextInteractionEvent();
        }
    }, _game.global.constants.VIDEO_CHECK_INTERVAL);
}

/***************************************************************
Changes game scene.
***************************************************************/
function ChangeScene(nextScene) {
   return function() {
        _game.global.gameManager.getChangeSceneSignal().dispatch(nextScene);
    }
}

/***************************************************************
Seeks to specified time in video.
Currently unused.
***************************************************************/
function SeekTo(time) {    
    _video.video.currentTime = time;
    _game.global.gameManager.getShowUISignal().dispatch();
    _instance.play(false);
}

/***************************************************************
Manual video looping.
Currently unused.
***************************************************************/
function LoopVideo() {
    _loopEventEnabled = true;
    _video.video.addEventListener("timeupdate", function loop() {        
        if(_video.video.currentTime >= _video.video.duration - 0.5){
            _video.video.currentTime = 0.5;
            console.log('looped');
        }
    }, false);
}

/***************************************************************
Android click to play workaround.
***************************************************************/
function VideoTextureClick(texture) {
    if(_firstVideo) {
        _videoTexture.inputEnabled = true;
        _videoTexture.input.useHandCursor = true;
        _videoTexture.events.onInputUp.addOnce(function() {
            _video.play();
        }, this);
        _firstVideo = false;
    }
    else {
        _video.play();
    }
}

module.exports = {
    init: function(game) {
        console.log("Video initialized");
        //stopVideo();
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        _video = _game.add.video('start', 'emptyVideo');
        _video.video.setAttribute('playsinline', 'playsinline');
        VideoFilter.init(game, _video);
        return _instance;
    },
    create: function(src, doFadeOut, videoFilter, nextScene, sub, interactionTimeStamps) {
        if(src) {
            _videoFilter = videoFilter;
            _interactionTimeStamps = interactionTimeStamps;
            CreateVideo(src, doFadeOut, nextScene, sub, interactionTimeStamps);
        }
        else {
            console.warn("Undefined movie source.");
        }
    },
    stop: function() {
        if(_video)
            _video.stop();
    },
    play: function(pausedByGame) {
        if(pausedByGame == false)
            _pausedByGame = pausedByGame;
        if(_video)
            _video.play();
    },
    seekTo: function(time) {
        SeekTo(time);
    },
    paused: function() {
        if(_video)
            return _video.video.paused;
    },
    isPausedByGame: function() {
        return _pausedByGame;
    },
    endFilter: function(targetScene) {        
        if(!targetScene) { 
            this.play(false);
            _game.global.gameManager.getShowUISignal().dispatch();
        }
        VideoFilter.endFilter();
    },
    clearFilterBg:function() {
        VideoFilter.clearBg();
    },
    resetVideoVariables() {        
        _interactionTimeStamps = null;
        _pausedByGame = false;
    }
}
