var commonConfig = {
  context: __dirname,
  entry: __dirname + "/js/main.js",
  output: {
    path: __dirname + "/js/dist/",
    filename: "bundle.js"
  }
};

productionConfig = function () {
  return commonConfig;
}

developmentConfig = function () {
  return commonConfig;
}

module.exports = function (env) {
  if (env === 'production') {
    return productionConfig();
  }
  return developmentConfig();
}
