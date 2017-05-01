;
var userInfoActions = (function (document, $) {
  /***
    * Plain JavaScript module to render user action analytics
    * after the user fills the information form.
    * @author Md Tauseef
    *
    * @param document: HTML document for the page
    * @param $: jQuery for handling bootstrap Modal
    *
    */
  'use strict';

  $(document).ready(function() {

    var userId = null;
    /***
      * Click handler for user information form.
      * It fetches the data from the server, hides the form, and renders the chart.
      * @param e(vent): click event for the submit button.
      *
      */
    $('.j-userInfoSubmit').on('click', function(e) {
      var _serverUrl = 'http://mocking-birds.etc.cmu.edu/';
      var _updateUserInfoUrl = 'updateUserInfo';
      var _userInfo = {
        age: document.forms['userDataForm'].elements.age.value,
        race: document.forms['userDataForm'].elements.race.value,
        gender: document.forms['userDataForm'].elements.gender.value,
        id: userInfoActions.userId
      };
      e.preventDefault();
      axios.post(_serverUrl + _updateUserInfoUrl, _userInfo)
      .then(toggleUserInfoForm('hide'))
      .then(toggleCharts('show'))
      .then(userAnalytics.getInteractionResults)
      .then(createPositiveInteractionsChart)
      .catch(console.error.bind(this));
    });
  });

  /***
    * Creates the chart for positive interactions.
    * @param data: data to populate the charts.
    *
    */
  function createPositiveInteractionsChart(data) {
    var ctx = document.getElementById("userAnalysisChart");
    var data = {
      labels: [
        "All positives",
        "Two positives",
        "One positive"
      ],
      datasets: [
        {
          data: [data.allPositives, data.twoPositives, data.onePositive],
          backgroundColor: [
            "#FFA276",
            "#56B0AE",
            "#C6DFE6"
          ],
          hoverBackgroundColor: [
            "#FFA276",
            "#56B0AE",
            "#C6DFE6"
          ]
        }]
      };
      var userAnalysisChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
          title: {
            display: true,
            text: 'User interactions for all scenarios',
            fontColor: "#FFF",
            fontSize: 18
          },
          legend: {
            labels: {
              fontColor: "#FFF"
            }
          }
        }
      });
    }

    /***
      * Utility function factory to hide/show an element.
      * @param el: the element to be toggled
      * @return anonymous fn that takes a string 'show' or 'hide' to
      * toggle the element.
      *
      */
    function toggleElement(el) {
      return function(toggle) {
        if(toggle == 'show') {
          if(el.classList.contains('hide')) {
            el.classList.remove('hide');
          }
        } else {
          el.classList.add('hide');
        }
      }
    }

    var toggleCharts = toggleElement(document.getElementById("userAnalysisChart"));
    var toggleUserInfoForm = toggleElement(document.querySelector(".form-user-info"));

    /***
      * Setter for userId
      * @param id: user's id
      *
      */
    function setUserId(id) {
      this.userId = this.userId || id;
    }

    return {
      setUserId: setUserId
    }
})(document, $)
