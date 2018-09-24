'use strict';

var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // context: __dirname + '/src',
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: { 
    path: path.join(__dirname, '/public/'), 
    filename: 'bundle.js' 
  },
  resolve: {
    alias: {
      'src': path.resolve('src/')
    }
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy', 'babel-plugin-transform-object-rest-spread'],
        }
      },
      { 
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  }, 
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],
  watch: true
};