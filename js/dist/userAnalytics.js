;
var userAnalytics = (function(axios) {
  /***
    * Plain JavaScript module to analyze user action data from the database.
    * @author Md Tauseef
    * @param axios: axios module for ajax requests
    *
    */
  'use strict';
  var _serverUrl = 'http://mocking-birds.etc.cmu.edu/';
  var _getUserActions = 'userActions';

  /***
    * Utility to flatten multi dimensional array by one dimension.
    *
    */
  Array.prototype.concatAll = function() {
    var results = [];
    this.forEach(function(subArray) {
      if (Array.isArray(subArray))
        subArray.forEach((item) => results.push(item))
      else
        throw new Error('Its not two dimensional array;');
    });

    return results;
  };

  /***
    * Getting positive interactions for users that finished the experience.
    *
    */
  function _getInteractionResults() {
    return axios.get(_serverUrl + _getUserActions)
    .then(function(res) {
      return res.data;
    })
    .then(_countPositiveInteractions)
    .then(_filterPositiveInteractionData)
    .catch(console.error.bind(this));
  }

  function _filterPositiveInteractionData(_positiveInteractions) {
    return {
      allPositives: _positiveInteractions.filter(function(positiveCount) {
        return positiveCount === 3;
      }).length,
      twoPositives: _positiveInteractions.filter(function(positiveCount) {
        return positiveCount === 2;
      }).length,
      onePositive: _positiveInteractions.filter(function(positiveCount) {
        return positiveCount === 1;
      }).length
    }
  }

  function _getSceneBasedInteractionData() {
    return axios.get(_serverUrl + _getUserActions)
    .then(function(res) {
      return res.data;
    })
    .then(function(userData){
      var finishedExperienceData = userData.filter(_isExperienceFinished);
      return [
        {
          sceneName: 'an1',
          positives: finishedExperienceData
                .map(_countInteractionsForScene('an1'))
                .concatAll()
                .reduce(_countPositives, 0),
          total: finishedExperienceData.length,
          title: 'bake sale'
        },
        {
          sceneName: 'li1',
          positives: finishedExperienceData
                .map(_countInteractionsForScene('li1'))
                .concatAll()
                .reduce(_countPositives, 0),
          total: finishedExperienceData.length,
          title: 'study group'
        },
        {
          sceneName: 'MK1',
          positives: finishedExperienceData
                .map(_countInteractionsForScene('MK1'))
                .concatAll()
                .reduce(_countPositives, 0),
          total: finishedExperienceData.length,
          title: 'lunch'
        }
      ]
    })
    .catch(console.error.bind(this));
  }

  /***
    * Getting positive interactions for users that finished the experience.
    *
    */
  function _countPositiveInteractions(userData) {
    return userData.filter(function(data) {
      return data.actions.length === 3;
    })
    .map(function(data) {
      return data.actions
      .map(function(action) {
        return action.interactionType;
      })
      .reduce(_countPositives, 0);
    });
  }

  /***
    * Filter factory to count interactions based on scene
    *
    */
  function _countInteractionsForScene(sceneName) {
    return function(finishedExperienceData) {
      return finishedExperienceData.actions
      .filter(_userDataForScene(sceneName))
      .map(function(action) {
        return action.interactionType;
      });
    };
  }

  function _isExperienceFinished(data) {
    return data.actions.length === 3;
  }

  function _countPositives(acc, current) {
    if(current === 'positive') {
      return acc + 1;
    } else {
      return acc;
    }
  }

  /***
    * Filter factory to get actions based on scene
    *
    */
  var _userDataForScene = function(sceneName){
    return function(action) {
      return action.sceneName === sceneName; //'an1', li1, MK1
    }
  }

  axios
  /***
    * Exposed API for user analytics
    *
    */
  return {
    getInteractionResults: _getInteractionResults,
    getSceneBasedInteractionResults: _getSceneBasedInteractionData
  }

})(axios);
