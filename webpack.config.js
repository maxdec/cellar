var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

var publicPath = 'http://localhost:4001/';
var srcDir = './web/static';
var jsDir = srcDir + '/js';
var cssDir = srcDir + '/css';

var env = process.env.NODE_ENV || 'development';
var prod = env === 'production';
var dev = env === 'development';
var hot = 'webpack-hot-middleware/client?path=' + publicPath + '__webpack_hmr';
var entry = ['bootstrap-loader', path.resolve(__dirname, jsDir, 'app.js')];

var plugins = [
  new CopyWebpackPlugin([
    { from: './web/static/assets' },
    { from: './deps/phoenix_html/web/static/js/phoenix_html.js',
      to: 'js/phoenix_html.js' }
  ]),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      },
    __PROD: prod,
    __DEV: dev
  })
];

if (dev) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entry.push(hot);
}

if (prod) {
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}

module.exports = {
  devtool: prod ? null : '#cheap-module-eval-source-map',
  entry: entry,

  output: {
    path: path.resolve(__dirname, 'priv/static'),
    filename: 'js/app.js',
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
        include: path.resolve(jsDir),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      // {
      //   test: /\.scss$/,
      //   loader: 'style!css!postcss!sass?includePaths[]=./node_modules',
      //   include: path.resolve(cssDir),
      // },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'postcss',
          'sass',
        ],
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loaders: [ 'url?limit=10000' ],
      },
    ]
  },

  plugins: plugins,
  postcss: [ autoprefixer ]
};
