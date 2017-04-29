/***************************************************************
Handles database connection and interaction.
Author: Md Tauseef
***************************************************************/
"use strict";

var _instance = null;
var _game = null;
var _serverUrl = "http://mocking-birds.etc.cmu.edu/";
var _userInteractionRoute = "addUserAction";
var _createUserRoute = "createUser";
var userId = null;

var useDatabase = true;

var DatabaseManager = function() {
    if(_instance !== null)
        return _instance;

    _instance = this;
    this.createUser();
    return _instance;
}

DatabaseManager.prototype.getUserId = function() {
  return this.userId;
}

DatabaseManager.prototype.createUser = function() {
    if(!useDatabase)
        return;
  axios.get(_serverUrl + _createUserRoute)
  .then(function(res) {
    userId = res.data;

    // sets userId in userInfoActions module
    userInfoActions.setUserId(userId);
  })
  .catch(console.error.bind(this));
}

DatabaseManager.prototype.sendInteractionData = function(currentSceneName, tag) {
    if(!useDatabase)
        return;
    if(tag != undefined && tag != null) {
      var _userInteractionData = {
        id: userId,
        sceneName: currentSceneName,
        interactionType: tag
      };
      axios.post(_serverUrl + _userInteractionRoute, _userInteractionData)
      .catch(console.error.bind(this));
    }
}

function createUserInteractionUrl(url, route, data) {
  var tempUrl = url + route;
  var isFirstParam = true;
  for(var key in data) {
    if(data.hasOwnProperty(key)) {
      if(isFirstParam) {
        tempUrl += "?" + key + "=" + data[key];
        isFirstParam = false;
      } else {
        tempUrl += "&" + key + "=" + data[key];
      }
    }
  }
  return tempUrl;
}

module.exports = DatabaseManager;
