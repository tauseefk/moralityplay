var path = require('path'),
    webpack = require('webpack');

var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
  pixi = path.join(phaserModule, 'build/custom/pixi.js'),
  p2 = path.join(phaserModule, 'build/custom/p2.js');

var commonConfig = {
  context: __dirname,
  entry: __dirname + "/js/main.js",
  output: {
    path: __dirname + "/js/dist/",
    filename: "bundle.js"
  }
};

productionConfig = function() {
  return commonConfig;
}

developmentConfig = function() {
  return commonConfig;
}

module.exports = function(env) {
  if (env === 'production') {
    return productionConfig();
  }
  return developmentConfig();
}
