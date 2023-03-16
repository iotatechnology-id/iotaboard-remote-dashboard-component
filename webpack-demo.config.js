/**
 * generates the dist/index.html and dist/demo.js files
 * to demo the component.
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require('react-refresh-typescript');

const path = require("path");
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin({
      "process.env.NODE_ENV": process.env.NODE_ENV
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new ReactRefreshWebpackPlugin()
  ],
  entry: {
    demo: "./src/demo.tsx"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()]
              }),
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      http: false,
      https: false
    },
    alias: {
      "remote-component.config.js": path.resolve("./remote-component.config.js")
    }
  }
};
