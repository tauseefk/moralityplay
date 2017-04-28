'use strict';

$(document).ready(function() {
  $('.j-userInfoSubmit').on('click', function(e) {
    var _serverUrl = 'http://mocking-birds.etc.cmu.edu/';
    var _updateUserInfoUrl = 'updateUserInfo';
    var _userInfo = {
      age: document.forms['userDataForm'].elements.age.value,
      race: document.forms['userDataForm'].elements.race.value,
      gender: document.forms['userDataForm'].elements.gender.value
    };

    e.preventDefault();
    axios.post(_serverUrl + _updateUserInfoUrl, _userInfo)
    .then(toggleUserInfoForm('hide'))
    .then(toggleCharts('show'))
    .then(userAnalytics.getInteractionResults)
    .then(createChart)
    .catch(console.error.bind(this));
  });
});

function createChart(data) {
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
        text: 'User Interactions',
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
