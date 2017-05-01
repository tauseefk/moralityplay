;
var userAnalytics = (function(axios) {
  /***
    * Plain JavaScript module to analyze user action data from the database.
    * @author Md Tauseef
    * @param axios: axios module for ajax requests
    *
    */
  'use strict';
  var _serverUrl = "http://mocking-birds.etc.cmu.edu/";
  var _getUserActions = "userActions";

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
      .reduce(function(acc, current) {
        if(current === "positive") {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
    });
  }

  /***
    * Exposed API for user analytics
    *
    */
  return {
    getInteractionResults: _getInteractionResults
  }

})(axios);
