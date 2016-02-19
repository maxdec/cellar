var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var publicPath = 'http://localhost:4001/';
var env = process.env.MIX_ENV || 'dev';
var prod = env === 'prod';
var dev = env === 'dev';
var hot = 'webpack-hot-middleware/client?path=' + publicPath + '__webpack_hmr';
var entry = ['./web/static/css/app.scss', './web/static/js/app.js'];

var plugins = [
  new ExtractTextPlugin('css/app.css'),
  new CopyWebpackPlugin([
    { from: './web/static/assets' },
    { from: './deps/phoenix_html/web/static/js/phoenix_html.js',
      to: 'js/phoenix_html.js' }
  ]),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __PROD: prod,
    __DEV: dev
  })
];

if (dev) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entry.push(hot);
}

module.exports = {
  devtool: prod ? null : 'source-map',
  entry: entry,

  output: {
    path: path.resolve(__dirname) + '/priv/static/js',
    filename: 'app.js',
    publicPath: publicPath
  },

  resolve: {
    // modulesDirectories: [ __dirname + '/web/static/js' ],
    alias: {
      phoenix: __dirname + '/deps/phoenix/web/static/js/phoenix.js'
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!sass?includePaths[]=' + __dirname +  '/node_modules'
        )
      }
    ]
  },

  plugins: plugins
};
