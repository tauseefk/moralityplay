"use strict";

var _instance = null;
var _game = null;

var DatabaseManager = function() {
    if(_instance !== null)
        return _instance;
    _instance = this;
    return _instance;
}

DatabaseManager.prototype.sendInteractionData = function(currentSceneName, tag) {
    console.log("Stub sending to database: " + currentSceneName + " " + tag);
}

module.exports = DatabaseManager;