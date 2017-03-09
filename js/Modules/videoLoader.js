define(['Modules/videoFilterLoader'], function(VideoFilter) {
    "use strict";

    var _instance = null;
    var _game = null;
    var _video = null
    var _videoFilter = null;
    var _changeSceneSignal = null;
    const FADEOUT_OFFSET_SECONDS = 5;

    function createVideo(src, doFadeOut, signal, nextScenes) {

        _video = _video.changeSource(src);
        _video.play();
    //    _video.video.setAttribute('autoplay', 'autoplay');
        
        addVideoOrFilter();
      
        if(doFadeOut)            
            _game.time.events.add((_video.video.duration-FADEOUT_OFFSET_SECONDS)*1000, fadeOut, this, signal);

        _video.onComplete.addOnce(changeScene(nextScenes), this);
    }

    function addVideoOrFilter() {
        if(_videoFilter != null && _videoFilter != 'none') {            
            VideoFilter.init(_game, _video);
            _video.onChangeSource.addOnce(startFilter, this);
        }
        else {
            _video.addToWorld(0, 0, 0, 0);
        }
    }

    function startFilter() {        
        VideoFilter.create(_videoFilter);
    }
    
    function fadeOut(signal) {
        signal.dispatch();
    }

    function changeScene(nextScenes) {
       return function() {
            if(typeof(nextScenes) === 'string'); {
                _changeSceneSignal.dispatch(nextScenes);
            }
        }
    }

    function stopVideo() {
        if(_video !== null)
            _video.stop();
    }

    return {
        init: function(game, signal) {
            console.log("Video initialized");
            //stopVideo();
            if(_instance !== null) 
                return _instance;                
            _changeSceneSignal = signal;  
            _game = game;
            _instance = this;            
            _video = _game.add.video('start', 'emptyVideo');
            _video.video.setAttribute('playsinline', 'playsinline');  
            return _instance;
        },
        preload: function(videos) {
            load(videos);
        },
        create: function(src, doFadeOut, fadeSignal, videoFilter, scenes) {
            _videoFilter = videoFilter;
            createVideo(src, doFadeOut, fadeSignal, scenes);
        },
        stop: function() {
            if(_video)
                _video.stop();
        },
        changeSource: function() {

        },
        test: function() {
            console.log(_test);
            _test++;
        }
    }
    return _instance;
});
