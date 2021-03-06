/***************************************************************
Routes setup for the experience.
Author: Md Tauseef
****************************************************************/

var userActionsModel = require('./Models/userActionsModel.js');

/***
  * Main route for the experience.
  * Renders the homepage and the game canvas.
  *
  */
exports.game = function (req, res) {
  let html =
    '<!DOCTYPE html>'
    + '<html>'
    + '<head>'
    + '<title>Mind Field</title>'
    + '<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0">'
    + '<meta charset="UTF-8">'
    + '<meta name="apple-mobile-web-app-capable" content="yes">'
    + '<meta name="description" content="Mind Field is an interactive film that aims to highlight different scenarios of microagression and stereotype threat in a college environment. The decisions you make affect the people you meet.">'
    + '<meta name="keywords" content="interactive, experience, web, film, carnegie mellon, CMU, CMU ETC, student project, racism">'
    + '<meta property="fb:app_id" content="1046151882152788" />'
    + '<meta property="og:type" content="article" />'
    + '<meta property="og:url" content="http://mocking-birds.etc.cmu.edu/" />'
    + '<meta property="og:title" content="Mind Field" />'
    + '<meta property="og:description" content="Mind Field is an interactive film that aims to highlight different scenarios of microagression and stereotype threat in a college environment. The decisions you make affect the people you meet." />'
    + '<meta property="og:image" content="http://mocking-birds.etc.cmu.edu/Images/Splash/facebook_share.jpeg" />'
    + '<link rel="icon" href="favicon.ico" type="image/x-icon" />'
    + '<link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">'
    + '<link rel="stylesheet" type="text/css" href="/css/main.css">'
    + '<link rel="manifest" href="/manifest.json">'
    + '</head>'
    + '<body class="bg-dark">'
    + '<div id="app">'
    + '<article>'
    + '<div class="layoutSingleColumn u-margin-header">'
    + '</div>'
    + '</article>'
    + '</div>'
    + '<div class="modal fade" id="userInfoModal" role="dialog">'
    + '<div class="modal-dialog">'

    //  <!-- Modal content-->
    + '<div class="modal-content bg-page-mockingbirds">'
    + '<button type="button" class="close opacity-08 color-light" data-dismiss="modal">&times;</button>'
    + '<div class="container-fluid margin-top-small">'
    + '<div class="row">'
    + '<div class="col-xs-4">'
    + '<canvas class="chart-user-analysis hide" id="userAnalysisChart1" width="400" height="400"></canvas>'
    + '</div>'
    + '<div class="col-xs-4">'
    + '<canvas class="chart-user-analysis hide" id="userAnalysisChart2" width="400" height="400"></canvas>'
    + '</div>'
    + '<div class="col-xs-4">'
    + '<canvas class="chart-user-analysis hide" id="userAnalysisChart3" width="400" height="400"></canvas>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '<div class="modal-body center overlay form-user-info">'
    + '<form id="userDataForm" class="color-invert">'
    + '<select class="form-control outline-mockingbirds bg-mockingbirds margin-vertical-small color-light" id="race" name="Race">'
    + '<option value="">Select your ethnicity</option>'
    + '<option value="Hispanic or Latino">Hispanic or Latino</option>'
    + '<option value="American Indian or Alaskan Native">American Indian or Alaskan Native</option>'
    + '<option value="asian">Asian</option>'
    + '<option value="African American">African American</option>'
    + '<option value="White">White</option>'
    + '<option value="Two or more races">Two or more races</option>'
    + '</select>'
    + '<select class="form-control outline-mockingbirds bg-mockingbirds margin-vertical-small color-light" id="gender" name="Gender">'
    + '<option value="">Gender</option>'
    + '<option value="male">Male</option>'
    + '<option value="female">Female</option>'
    + '<option value="non-bonary">Non-binary</option>'
    + '</select>'
    + '<select class="form-control outline-mockingbirds bg-mockingbirds margin-vertical-small color-light" id="age" name="Age">'
    + '<option value="">Choose your age group</option>'
    + '<option value="below 18">Below 18 years</option>'
    + '<option value="18-25">18-25 years</option>'
    + '<option value="25-40">25-40 years</option>'
    + '<option value="above 40">Above 40 years</option>'
    + '</select>'
    + '<button class="j-userInfoSubmit margin-vertical-small btn btn-primary btn-pill center" type="submit">Submit</button>'
    + '</form>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'
    //  +'<div class="banner-orientation bg-mockingbirds full-size">'
    //    +'<div class="center">'
    //     +'Please rotate your device to landscape mode.'
    //    +'</div>'
    //  +'</div>'
    + '<script src="/js/phaser.min.js"></script>'
    + '<script src="/js/Lib/jsmanipulate.min.js"></script>'
    + '<script src="https://cdnjs.cloudflare.com/ajax/libs/screenfull.js/3.2.0/screenfull.min.js"></script>'
    + '<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.16.1/axios.min.js"></script>'
    + '<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>'
    + '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>'
    + '<script src="/js/dist/userAnalytics.js"></script>'
    + '<script src="/js/dist/userInfoForm.js"></script>'
    + '<script src="/js/Lib/bootstrap.min.js"></script>'
    + '<script src="/js/dist/bundle.js"></script>'
    + '<script>'
    + 'if (screenfull.enabled) {screenfull.request();}'
    + '</script>'
    + '</body>'
    + '</html>';
  res.send(html);
}

/***************************************************************
Database interaction routes
****************************************************************/

/***
  * Create a user entry in the database and return the user id
  *
  */
exports.createUser = function (req, res) {
  userActionsModel.addUserToDatabase()
    .then(function (response) {
      res.send(JSON.stringify(response));
    })
    .catch(console.error.bind(this));
}

/***
  * Add user action to the user in the database
  *
  */
exports.addUserAction = function (req, res) {
  var userAction = {
    sceneName: req.body.sceneName,
    interactionType: req.body.interactionType
  }
  userActionsModel.addUserActionForUserId(req.body.id, userAction);
  res.send("user action added!");
}

/***
  * Update user's age, race, and gender information in the database
  *
  */
exports.updateUserInfo = function (req, res) {
  var userInfo = {
    age: req.body.age,
    race: req.body.race,
    gender: req.body.gender
  }
  userActionsModel.updateUserInfoById(req.body.id, userInfo)
    .then(function () {
      res.send("User info updated!");
    })
    .catch(console.error.bind(this));
}

/***
  * Fetch data for user interactions
  *
  */
exports.getUserActions = function (req, res) {
  userActionsModel.getUserActionsTable()
    .then(function (collection) {
      collection.find({})
        .toArray(function (err, items) {
          if (err) {
            res.send(err);
          } else {
            res.send(items);
          }
        })
    });
}

/***
  * XXX: Depricated
  *
  */
exports.generateDummyData = function (req, res) {
  userActionsModel.addDummyData();
  res.send("added dummy data!");
}
