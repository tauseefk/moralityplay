/***************************************************************
Checks user's connection
***************************************************************/
"use strict";

//initializes once
var _instance = null;
var _game = null;
var _file = null;
var _bytes = null;
var _timer = null;

const SLOW_DOWNLOAD_THRESHOLD_MBPS = 0.36;

//Type of file for connection test
var FileTypeEnum = {
    Image: 'IMAGE',
    Video: 'VIDEO',
    Audio: 'AUDIO'
}

/***************************************************************
Adds load start and on load complete functions.
Starts load process of selected file and times it.
***************************************************************/
function CheckConnection() {    
    _game.load.onFileComplete.add(LoadComplete, this);
    _game.load.onLoadStart.add(StartLoading, this);    
    _game.load.start();
}

/***************************************************************
Creates timer.
***************************************************************/
function StartLoading() {
    _timer = _game.time.create(true);
    _timer.start();
}

/***************************************************************
Gets connection speed and starts preload state.
***************************************************************/
function LoadComplete() {    
    _timer.stop();
    SetVideoQuality(CalculateConnectionSpeed());  
    _game.load.onFileComplete.remove(LoadComplete, this);

    //Starts preload state
    _game.state.start("preload");
}

/***************************************************************
Calculates connection speed and returns it.
***************************************************************/
function CalculateConnectionSpeed() {
    var elapsedSeconds = (_timer._now - _timer._started)/1000;
    elapsedSeconds += _timer.elapsed/1000;
    var connectionSpeedMbps = _bytes/(elapsedSeconds)/ 1000000;
    return connectionSpeedMbps;
}

/***************************************************************
Decides video quality for the rest of the experience.
***************************************************************/
function SetVideoQuality(speed) {
    if(speed > SLOW_DOWNLOAD_THRESHOLD_MBPS || speed < 0)
        _game.global.quality = 'HD';
    else
        _game.global.quality = 'SD';
    console.log('Connection speed: ' + speed + ' Mb/s. Quality: ' +  _game.global.quality);  
}

/***************************************************************
Prepares selected file for connection test.
***************************************************************/
function Load(key, src, type) {
    switch (type) {
        case FileTypeEnum.Image:
            _file = _game.load.image(key, src);
            break;
        case FileTypeEnum.Video:
            _file = _game.load.text(key, src);
            break;
        case FileTypeEnum.Audio:
            _file = _game.load.audio(key, src);
            break;
        default:
            console.warn('Not a valid file type for loading check.');
    }
    return _file;
}

module.exports = {
    init: function(game) {
        //Singleton initialization
        if(_instance !== null)
            return _instance;        
        _file = null;
        _game = game;
        _instance = this;
        return _instance;
    },
    /***************************************************************
    Prepares selected file for connection testing.
    ***************************************************************/
    loadFile: function(key, src, type, bytes) {
        _bytes = bytes;
        if(!_bytes)
            console.warn("Error, file bytes not specified for connection testing.")
        Load(key, src, type);
    },
    checkConnection: function() {
        CheckConnection();
    },
    startPreload() {
        StartPreloadState();
    }
}
