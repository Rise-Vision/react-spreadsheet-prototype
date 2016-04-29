var HTMLWebPackPlugin = require("html-webpack-plugin");
var HTMLWebPackPluginConfig = new HTMLWebPackPlugin({
  template: __dirname + "/app/index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  entry: [
    "./app/main.js"
  ],
  output: {
    path: __dirname + "/dist",
    filename: "react-spreadsheet-prototype.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [HTMLWebPackPluginConfig]
};