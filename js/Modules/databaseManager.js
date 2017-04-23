"use strict";

var _instance = null;
var _game = null;
var _dbUrl = "http://mocking-birds.etc.cmu.edu:3000/";
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

DatabaseManager.prototype.setUserId = function(generatedUserId) {
}

DatabaseManager.prototype.createUser = function() {
    if(!useDatabase)
        return;
  axios.get(_dbUrl + _createUserRoute)
  .then(function(res) {
    userId = res.data;
  })
  .then(console.log.bind(this))
  .catch(console.error.bind(this));
}

DatabaseManager.prototype.sendInteractionData = function(currentSceneName, tag) {
    if(!useDatabase)
        return;
    if(tag != undefined && tag != null) {
      var userInteractionData = {
        id: userId,
        sceneName: currentSceneName,
        interactionType: tag
      };
      // var url = createUserInteractionUrl(_dbUrl, _userInteractionRoute, userInteractionData);
      // fetch(url)
      // .then(console.log.bind(this));
      axios.post(_dbUrl + _userInteractionRoute, userInteractionData)
      .then(console.log.bind(this))
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
