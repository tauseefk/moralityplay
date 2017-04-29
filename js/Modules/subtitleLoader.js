/***************************************************************
Handles the showing of subtitles on screen.
Author: Christopher Weidya
***************************************************************/
"use strict";

//Dependencies
const Text = require('./Text');

var _instance = null;
var _game = null;

var _textSlots = [null];
var _subtitleVisible = false;

/***************************************************************
Creates subtitles from srt files.
***************************************************************/
function CreateSubs(video, subs) {
	var srt = _game.cache.getText(subs);
	var parsedSrt = fromSrt(srt, true);
	AddSubEvents(parsedSrt, video);
}

/***************************************************************
Adds subtitle events to show when video hits certain time.
***************************************************************/
function AddSubEvents(parsedSrt, video) {
	parsedSrt.forEach(function(sub) {
		video.addEventListener("timeupdate", show, false);

		function show() {
			if(video.currentTime >= sub.startTime){
           		video.removeEventListener("timeupdate", show);
           		//Adds text out of screen view. Will be realigned later depending on slots given
	            var text = new Text(sub.text, 0, -500, Text.getEnum().Subtitle, _game.global.style.subtitleTextProperties);
	            text.addToGame(_game, _game.mediaGroup);
	            text.changeText(_game, _subtitleVisible);
	            var slotIndex = FindSubtitleSlot(text);
	            //Adds destroy event to destroy created text
	            AddDestroyEvent(video, sub, text, slotIndex);
	        }
		}		
	});
}

/***************************************************************
Creates destroy event based on end time.
***************************************************************/
function AddDestroyEvent(video, sub, text, slotIndex) {
	video.addEventListener("timeupdate", destroy, false);

	function destroy() {
		if(video.currentTime >= sub.endTime){
			//console.log("destroyed");
       		video.removeEventListener("timeupdate", destroy); 
            text.destroy();
            _textSlots[slotIndex] = null;
        }
	}
}

/***************************************************************
Finds an empty slot for the subtitle.
Current slot is 1 due to feedback.
***************************************************************/
function FindSubtitleSlot(text) {
	//Forces previous subtitle to not be visible if a new subtitle enters.
	if(_textSlots[0])
		_textSlots[0].setVisible(false);
	_textSlots[0] = text;
	text.setY(_game.global.constants.SUBTITLE_Y_POS);
	return 0;
}

/*
//Unused. For 2 subtitle slots.
function FindSubtitleSlot(text) {
	if(!_textSlots[0]) {
	
	if(_textSlots[0])
		_textSlots[0].setVisible(false);
	_textSlots[0] = text;
	text.setY(_game.global.constants.SUBTITLE_Y_POS);
	return 0;
	}
	else if(!_textSlots[1]) {
		_textSlots[1] = text;
		text.setY(SUBTITLE_Y_POS - text.getHeight() - _game.global.constants.SUBTITLE_SPACING);
		return 1;
	}
	else
		console.warn("Max number of concurrent subtitles reached." + text);
}
*/

/***************************************************************
Toggles visibility of subtitle in slot.
***************************************************************/
function ToggleSubtitle() {
	_subtitleVisible = !_subtitleVisible;
	_textSlots.forEach(function(slot) {
		if(slot)
			slot.setVisible(_subtitleVisible);
	});
	return _subtitleVisible;
}

/***************************************************************
Parses srt file and returns data object.
Taken from: https://www.npmjs.com/package/subtitles-parser
***************************************************************/
function fromSrt(data, ms) {
    var useMs = ms ? true : false;

    data = data.replace(/\r/g, '');
    var regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
    data = data.split(regex);
    data.shift();

    var items = [];
    for (var i = 0; i < data.length; i += 4) {
        items.push({
            id: data[i].trim(),
            startTime: useMs ? timeMs(data[i + 1].trim()) : data[i + 1].trim(),
            endTime: useMs ? timeMs(data[i + 2].trim()) : data[i + 2].trim(),
            text: data[i + 3].trim()
        });
    }

    return items;
};

/***************************************************************
Gets the time in ms from the srt time.
Taken from: https://www.npmjs.com/package/subtitles-parser
***************************************************************/
function timeMs(val) {
    var regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/;
    var parts = regex.exec(val);

    if (parts === null) {
        return 0;
    }

    for (var i = 1; i < 5; i++) {
        parts[i] = parseInt(parts[i], 10);
        if (isNaN(parts[i])) parts[i] = 0;
    }

    // hours + minutes + seconds + ms
    return parts[1] * 3600 + parts[2] * 60 + parts[3] + parts[4]/1000;
};

module.exports = {
	//Singleton initialization
	init: function (game) {
		if(_instance)
			return _instance;
		_instance = this;
		_game = game;
		return _instance;
	},
	create: function(video, subs) {
		CreateSubs(video, subs);
	},
	toggleSubtitle: function() {
		return ToggleSubtitle();
	},
	getSubtitleVisible: function() {
		return _subtitleVisible;
	}
}
