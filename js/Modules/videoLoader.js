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

const FADEOUT_OFFSET_SECONDS = 5;
const VIDEO_SLOW_PLAYBACK_RATE = 0.2;

function CreateVideo(src, doFadeOut, nextScenes, sub, interactionTimeStamps) {
    _video = _video.changeSource(src, false);
    _video.play();
//    _video.video.setAttribute('autoplay', 'autoplay');
    AddVideoAndFilter(doFadeOut, sub);
    if(_interactionTimeStamps)
        AddInteractionEvents(_interactionTimeStamps);
    //console.log(_video.video.currentTime);
    /*
    if(doFadeOut)
        _game.time.events.add((_video.video.duration-FADEOUT_OFFSET_SECONDS)*1000, fadeOut, this, signal);
    */
    if(nextScenes)
        _video.onComplete.addOnce(ChangeScene(nextScenes), this);
}

function AddInteractionEvents() {
    var timestamp = _interactionTimeStamps.shift();
    if(timestamp)
        checkVideoDuration(timestamp);
}

function AddVideoAndFilter(doFadeOut, sub) {
    _videoImage = _video.addToWorld(0, 0, 0, 0);
    _game.mediaGroup.add(_videoImage);
    _video.onChangeSource.addOnce(OnVideoLoad, this);
    function OnVideoLoad() {
        if(doFadeOut) {
            //_game.time.events.add((_video.video.duration-FADEOUT_OFFSET_SECONDS)*Phaser.Timer.SECOND, FadeOut, this);
        }
        if(sub)
            Subtitle.create(_video.video, sub);
        if(_videoFilter != null && _videoFilter != 'none') {
            VideoFilter.init(_game, _video);
            VideoFilter.create(_videoFilter);
        }
    }
}

function TriggerMoment() {
    console.log(_video.video.duration);
    console.log(_video.video.currentTime);
    VideoFilter.startFilterFade(_game.global.gameManager.getTriggerInteractionSignal());
}

function VideoZoom() {
    Linkable.zoomIn(_game, _video, 1.5);
}

function checkVideoDuration(time) {
    _video.video.addEventListener("timeupdate", function trigger() {        
        if(_video.video.currentTime >= time){
            //clearInterval(interval);
            _video.video.removeEventListener("timeupdate", trigger);
            TriggerMoment();
            AddInteractionEvents();
        }
    }, false);
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

function stopVideo() {
    if(_video !== null)
        _video.stop();
}

module.exports = {
    init: function(game) {
        console.log("Video initialized");
        _interactionTimeStamps = null;
        //stopVideo();
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        _video = _game.add.video('start', 'emptyVideo');
        _video.video.setAttribute('playsinline', 'playsinline');
        return _instance;
    },
    /*
    preload: function(videos) {
        load(videos);
    },
    */
    create: function(src, doFadeOut, videoFilter, scenes, sub, interactionTimeStamps) {
        _videoFilter = videoFilter;
        _interactionTimeStamps = interactionTimeStamps;
        CreateVideo(src, doFadeOut, scenes, sub, interactionTimeStamps);
    },
    stop: function() {
        if(_video)
            _video.stop();
    },
    play: function() {
        if(_video)
            _video.play();
    },
    endFilter() {
        this.play();
        VideoFilter.endFilter();
    },
    toggleSubtitle() {
        Subtitle.toggleSubtitle();
    }
}
