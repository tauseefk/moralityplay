var userActionsModel = require('./Models/userActionsModel.js');

exports.game = function(req, res) {
  let html =
    '<!DOCTYPE html>'
       +'<html>'
       +'<head>'
       +'<title>Morality Play</title>'
       +'<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0">'
       +'<meta charset="UTF-8">'
       +'<meta name="description" content="Interactive experience">'
       +'<meta name="keywords" content="interactive, experience, web, film">'
       +'<link rel="stylesheet" type="text/css" href="css/main.css">'
       +'</head>'
       +'<body>'
       +'<div id="app">'
       +'<article>'
       +'<div class="layoutSingleColumn u-margin-header">'
       +'</div>'
       +'</article>'
       +'</div>'
       +'<script src="/js/phaser.min.js"></script>'
       +'<script src="/js/Lib/jsmanipulate.min.js"></script>'
       +'<script src="/js/dist/bundle.js"></script>'
       +'</body>'
       +'</html>';
       res.send(html);
}

exports.createUser = function(req, res) {
  userActionsModel.addUserToDatabase()
  .then(function(response) {
    res.send(JSON.stringify(response));
  })
  .catch(console.error.bind(this));
}

exports.addUserAction = function(req, res) {
  console.log(req.body);
  var userAction = {
    sceneName: req.body.sceneName,
    interactionType: req.body.interactionType
  }
  userActionsModel.addUserActionForUserId(req.body.id, userAction);
  console.log(userAction);
  res.send("user action added!");
}

exports.updateUserInfo = function(req, res) {
  var userInfo = {
    age: parseInt(req.query.age),
    race: req.query.race,
    gender: req.query.gender
  }
  userActionsModel.updateUserInfoById(parseInt(req.query.userId), userInfo)
  .then(function() {
    res.send("User info updated!");
  })
  .catch(console.error.bind(this));
  // console.log(userInfo);
  // res.send("user info Updated!");
}

exports.getUserActions = function(req, res) {
  userActionsModel.getUserActionsTable()
  .then(function(collection) {
    collection.find({})
    .toArray(function(err, items) {
      if(err) {
        res.send(err);
      } else {
        res.send(items);
      }
    })
  });
}

exports.generateDummyData = function(req, res) {
  userActionsModel.addDummyData();
  res.send("added dummy data!");
}
