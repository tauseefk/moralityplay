const express = require('express'),
  app = express(),
  Routes = require('./js/routes.js');

app.set('port', (process.env.PORT || 5000));
app.use('/', express.static(__dirname));

app.get('/', Routes.game);

app.listen(app.get('port'), function() {
  console.log(`Node app is running on port: ${app.get('port')}`);
});