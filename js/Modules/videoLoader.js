"use strict";

const VideoFilter = require('./videoFilterLoader'),
    Linkable = require('./Linkable'),
    Subtitle = require('./subtitleLoader');

var _instance = null;
var _game = null;
var _video = null
var _videoImage = null;
var _videoFilter = null;
var _interactionTimeStamps = null;

var _loopEventEnabled = false;
var _pausedByGame = false;

const FADEOUT_OFFSET_SECONDS = 5;
const VIDEO_SLOW_PLAYBACK_RATE = 0.2;

function CreateVideo(src, doFadeOut, nextScene, sub, interactionTimeStamps) {
    _video = _video.changeSource(src, false);

//    _video.video.setAttribute('autoplay', 'autoplay');
    AddVideoAndFilter(doFadeOut, sub, nextScene);
    if(_interactionTimeStamps)
        AddInteractionEvents(_interactionTimeStamps);
    //console.log(_video.video.currentTime);
    /*
    if(doFadeOut)
        _game.time.events.add((_video.video.duration-FADEOUT_OFFSET_SECONDS)*1000, fadeOut, this, signal);
    */
    /*
    if(nextScene) {
        _video.onComplete.addOnce(ChangeScene(nextScene), this);
        if(_loopEventEnabled) {
            _video.video.removeEventListener("timeupdate", loop);
            _loopEventEnabled = false;
        }
    }
    else if(!_loopEventEnabled) {
        LoopVideo();
    }
    */
}

function CheckProgress() {
    var percentLoaded = parseInt(_video.video.buffered.end(0) / _video.video.duration * 100);
    console.log(percentLoaded);
}

function AddInteractionEvents() {
    var timestamp = _interactionTimeStamps.shift();
    if(timestamp)
        checkVideoDuration(timestamp);
}

function AddVideoAndFilter(doFadeOut, sub, nextScene) {

    _videoImage = _video.addToWorld(0, 0, 0, 0);
    _game.mediaGroup.add(_videoImage);
    _video.onChangeSource.addOnce(OnVideoLoad, this);

    function OnVideoLoad() {
        _video.play();
        //_instance.clearFilterBg();
        if(!nextScene)
            _video.loop = true;
        else {
            _video.loop = false;
            _video.onComplete.addOnce(ChangeScene(nextScene), this);
        }
        //_video.video.addEventListener('progress', CheckProgress, false);
        if(doFadeOut) {
            //_game.time.events.add((_video.video.duration-FADEOUT_OFFSET_SECONDS)*Phaser.Timer.SECOND, FadeOut, this);
        }
        if(sub)
            Subtitle.create(_video.video, sub);
        if(_videoFilter != null && _videoFilter != 'none') {
            VideoFilter.createOverlay(_videoFilter);
        }
    }
}

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

function VideoZoom() {
    Linkable.zoomIn(_game, _video, 1.5);
}
/*
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

function checkVideoDuration(time) {
    var interval = setInterval(function() {
        if(_video.video.currentTime >= time) {
            clearInterval(interval);
            TriggerMoment();
            AddInteractionEvents();
        }
    },100);
}


function FadeOut(signal) {
    _game.global.gameManager.getFadeOutTransitionSignal().dispatch();
}

function ChangeScene(nextScenes) {
   return function() {
        if(typeof(nextScenes) === 'string'); {
            _game.global.gameManager.getChangeSceneSignal().dispatch(nextScenes);
        }
    }
}

function SeekTo(time) {    
    _video.video.currentTime = time;
    _game.global.gameManager.getShowUISignal().dispatch();
    _instance.play(false);
}

function LoopVideo() {
    _loopEventEnabled = true;
    _video.video.addEventListener("timeupdate", function loop() {        
        if(_video.video.currentTime >= _video.video.duration - 0.5){
            _video.video.currentTime = 0.5;
            console.log('looped');
        }
    }, false);
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
        VideoFilter.endFilter(targetScene);
    },
    clearFilterBg:function() {
        VideoFilter.clearBg();
    },
    resetVideoVariables() {        
        _interactionTimeStamps = null;
        _pausedByGame = false;
    }
}
