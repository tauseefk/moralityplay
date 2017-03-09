//Dependency: Nonde

define(['Modules/filter'], function(Filter) {
    "use strict";

    var _instance = null;
    var _game = null;
    var _startSceneKey = 'startScene';
    var _data = null;
    var _videos = null;
    var _images = null;
    var _scenes = null;
    /*
    var videos = {
        'pensive1': './Videos/pensive_2.mp4',
        'flashback1': './Videos/Flashback_rough.mp4',
        'start': './Videos/mockup2.mp4'
    }
    var images = {
        'thoughtIcon': './Images/Icons/icon.png',
        'cmu1': './Images/Locations/CMU1.jpg'
    }
    var scenes = {
        'startScene': {
            stateType: 'LocationState',
            draggable: true,
            bgImageKey: 'cmu1',
            videoFilter: 'none',
            transition: {
                fadeIn: true,
                fadeOut: true
            },
            icons: {                
                size: 5,
                type: ['IMAGE_BUTTON_SCENECHANGE',
                    'IMAGE_BUTTON_SCENECHANGE',
                    'IMAGE_BUTTON_SCENECHANGE',
                    'IMAGE_BUTTON_SCENECHANGE',
                    'IMAGE_BUTTON_SCENECHANGE',
                ],
                key: [
                    'thoughtIcon',
                    'thoughtIcon',
                    'thoughtIcon',
                    'thoughtIcon',
                    'thoughtIcon'                    
                ],
                coords: [
                    [100, 100],
                    [500, 880],
                    [800, 260],
                    [1000, 50],
                    [4500, 900]
                ],
                targetScene: [
                    'movie1',
                    'movie1',
                    'movie1',
                    'movie1',
                    'movie1'
                ]
            }
        },
        'movie1' : {
            stateType: 'MovieState',
            movieKey: 'start',
            movieSrc: './Videos/mockup2.mp4',
            transition: {
                fadeIn: true,
                fadeOut: false
            },
            nextScenes: 'pensive1'
        },
        'pensive1': {
            stateType: 'InteractState',
            videoFilter: 'sepia',
            movieKey: 'pensive1',
            movieSrc: './Videos/pensive_2.mp4',
            transition: {
                fadeIn: true,
                fadeOut: true
            },
            thoughtIconKey: 'thoughtIcon',
            nextScenes: 'flashbackScene1',
            thoughts: {
                type: 'TEXT_THOUGHTS',
                sourceCoords: [900, 200],
                textProperties: {
                    fontSize: 30,
                    align: 'center',
                    font: 'Mongolian Baiti'
                },
                size: 3,
                content: [
                    "I will probably fail.",
                    "I just want the test to be over.",
                    "They think I'm good at math \njust because I'm Asian.",
                ],
                destination:[ 
                    [600, 600],
                    [600, 250],
                    [1300, 500]
                ]
            },
            choices: {
                type: 'TEXT_CHOICES',
                textProperties: {
                    fontSize: 40,
                    align: 'left',
                    font: 'Mongolian Baiti'
                },
                size: 3,
                content: [
                    "Is there something else besides math that's bothering you?\n",
                    "Don't worry, you'll do great!\n",
                    "Good luck!\n",
                ],
                coords:[ 
                    [500, 800],
                    [500, 880],
                    [500, 960]
                ],
                targetScene: [
                    'flashbackScene1',
                    'movieScene1',
                    'movieScene1'
                ]
            }
        },
        'flashbackScene1': {
            stateType: 'FlashbackState',
            movieKey: 'flashback1',
            movieSrc: './Videos/Flashback_rough.mp4',
            videoFilter: 'sepia',
            transition: {
                fadeIn: true,
                fadeOut: true
            },
            nextScenes: 'startScene'
        },
        'startScene': {
            stateType: 'LocationState',
            draggable: true,
            bgImageKey: 'cmu1',
            videoFilter: 'none',
            transition: {
                fadeIn: true,
                fadeOut: true
            },
            icons: {                
                size: 5,
                type: ['IMAGE_BUTTON_SCENECHANGE',
                    'IMAGE_BUTTON_SCENECHANGE',
                    'IMAGE_BUTTON_SCENECHANGE',
                    'IMAGE_BUTTON_SCENECHANGE',
                    'IMAGE_BUTTON_SCENECHANGE',
                ],
                key: [
                    'thoughtIcon',
                    'thoughtIcon',
                    'thoughtIcon',
                    'thoughtIcon',
                    'thoughtIcon'                    
                ],
                coords: [
                    [100, 100],
                    [500, 880],
                    [800, 260],
                    [1000, 50],
                    [4500, 900]
                ],
                targetScene: [
                    'movie1',
                    'movie1',
                    'movie1',
                    'movie1',
                    'movie1'
                ]
            }
        },
        'nextScene2' : 'y'
    }

    */

    function loadVideos(videos) {
        console.log("Loading videos");
        for (var key in _videos) {            
            _game.load.video(key, _videos[key]);
        }
    }

    function loadImages(images) {
        console.log("Loading images");
        for (var key in images) {
            _game.load.image(key, images[key]);
        }
    }

    return {
        init: function(game) {
            if(_instance !== null)
                return _instance;
            _instance = this;            
        //    Filter.init(game);
            _game = game;            
            _data = _game.cache.getJSON('data');
            _images = _data.images;
            _videos = _data.videos;
            _scenes = _data.scenes;
            return _instance;
        },
        preload: function() {   
        //    Filter.preload();  
            console.log("Loading resources");
            loadImages(_images);

        //    loadVideos(videos);
            
        },
        create: function() {   
        //    Filter.create();
        },
        /*
        getBlur: function() {
            return Filter.getBlur();
        },
        getBlurNone: function() {
            return Filter.getBlurNone();
        },
        getBlurFilter: function() {
            return Filter;
        },
        */
        getThoughts: function() {
            return _thoughts;
        },
        getChoices: function() {
            return _choices;
        },
        getScene: function(name) {
            return _scenes[name];
        },
        getVideoSrc: function() {
            return _videos;
        },
        getStartSceneKey: function() {
            return _startSceneKey;
        }
    }

});
