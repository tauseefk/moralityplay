const express = require('express'),
  app = express(),
  Routes = require('./js/routes.js'),
  cors = require('cors'),
  bodyParser = require('body-parser');

app.set('port', (process.env.NODE_PORT || 3000));

app.use(cors());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/', express.static(__dirname));

app.get('/generateDummyData', Routes.generateDummyData);
app.post('/addUserAction', Routes.addUserAction);
app.post('/updateUserInfo', Routes.updateUserInfo);
app.get('/userActions', Routes.getUserActions);
app.get('/createUser', Routes.createUser);

app.get('/', Routes.game);

app.listen(app.get('port'), function() {
  console.log(`Node app is running on port: ${app.get('port')}`);
});
