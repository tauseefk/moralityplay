define(['Modules/videoFilterLoader'], function(VideoFilter) {
    "use strict";

    var _instance = null;
    var _game = null;
    var _video = null
    var _videoFilter = null;
    var _interactionTimeStamps = null;
    const FADEOUT_OFFSET_SECONDS = 5;
    const VIDEO_SLOW_PLAYBACK_RATE = 0.2;

    function CreateVideo(src, doFadeOut, nextScenes, interactionTimeStamps) {
        _video = _video.changeSource(src, doFadeOut);
        _video.play();
    //    _video.video.setAttribute('autoplay', 'autoplay');
        AddVideoOrFilter(doFadeOut);
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

    function AddVideoOrFilter(doFadeOut) {
        _video.addToWorld(0, 0, 0, 0);
        _video.onChangeSource.addOnce(OnVideoLoad, this);

        function OnVideoLoad() {
            
            if(doFadeOut) {
                //_game.time.events.add((_video.video.duration-FADEOUT_OFFSET_SECONDS)*Phaser.Timer.SECOND, FadeOut, this);
            }

            if(_videoFilter != null && _videoFilter != 'none') {            
                VideoFilter.init(_game, _video);            
                VideoFilter.create(_videoFilter);
            } 

        }
    }

    function TriggerMoment() {
        console.log(_video.video.duration);
        console.log(_video.video.currentTime);
        VideoFilter.startFilterFade(_game);
        //ReducePlaybackSpeed();
        _game.global.gameManager.getTriggerInteractionSignal().dispatch();
    }

    function checkVideoDuration(time) {
      var interval = setInterval(function(){
        if(_video.video.currentTime >= time){
            clearInterval(interval);
            TriggerMoment();
            AddInteractionEvents();
        }
      },500);
    }

    function ReducePlaybackSpeed() {
         _video.playbackRate = VIDEO_SLOW_PLAYBACK_RATE;
    }

    function ResumePlaybackSpeed() {   
        _video.play();
        //_game.time.resume();
        //_video.playbackRate = 1;
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

    return {
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
        preload: function(videos) {
            load(videos);
        },
        create: function(src, doFadeOut, videoFilter, scenes, interactionTimeStamps, interactionSignal) {
            _videoFilter = videoFilter;
            _interactionTimeStamps = interactionTimeStamps;
            CreateVideo(src, doFadeOut, scenes, interactionTimeStamps, interactionSignal);
        },
        stop: function() {
            if(_video)
                _video.stop();
        },
        endFilter() {
            ResumePlaybackSpeed();
            VideoFilter.endFilter();
        }
    }
    return _instance;
});
