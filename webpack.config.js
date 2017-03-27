var path = require('path'),
    webpack = require('webpack');

var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
  pixi = path.join(phaserModule, 'build/custom/pixi.js'),
  p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
  // module: {
  //       rules: [
  //           { test: /pixi\.js/, loader: "script-loader" },
  //           { test: /p2\.js/, loader: "script-loader" },
  //           { test: /\.json$/, loader: 'json-loader' },
  //       ]
  //   },
  //   resolve: {
  //       alias: {
  //           'phaser': phaser,
  //           'pixi.js': pixi,
  //           'p2': p2,
  //       }
  //   },
    context: __dirname,
    entry: __dirname + "/js/main.js",
    output: {
        path: __dirname + "/js/dist/",
        filename: "bundle.js"
    }
}
