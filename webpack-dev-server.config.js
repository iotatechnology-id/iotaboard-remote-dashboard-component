const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.config");

module.exports = {
  entry: "./src/webpack-dev-server.tsx",
  plugins: [
    ...config[0].plugins,
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html"
    }),
    new webpack.EnvironmentPlugin({
      "process.env.NODE_ENV": process.env.NODE_ENV
    }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    moduleIds: "named"
  },
  module: config[0].module,
  devServer: {
    hot: true,
    open: true,
    static: __dirname,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    }
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "remote-component.config.js": path.resolve("./remote-component.config.js")
    },
    fallback: {
      http: false,
      https: false
    }
  }
};
