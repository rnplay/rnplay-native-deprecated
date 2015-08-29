var
  fs = require('fs'),
  os = require('os'),
  path = require('path'),
  webpack = require('webpack')

var config = {
  debug: true,

  devtool: 'source-map',

  entry: {
    'index.ios': [path.resolve(__dirname, '..', 'App', 'entry.js')]
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '..', 'App'),
          path.resolve(__dirname, '..', 'node_modules/react-native')

        ],
        loaders: ['babel-loader?stage=0,blacklist=validation.react']
      },
    ],
  },

  plugins: [],

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}

// Hot loader
if (process.env.HOT) {

  var hostname = 'localhost'  // or use os.hostname() and edit the npm scripts in package.json
  config.devtool = 'eval'; // Speed up incremental builds
  config.entry['index.ios'].unshift(path.resolve(__dirname, '..', 'webpack', 'hot', 'entry'))
  config.entry['index.ios'].unshift('webpack/hot/only-dev-server')
  config.entry['index.ios'].unshift('webpack-dev-server/client?http://'+hostname+':8082')
  config.output.publicPath = 'http://'+hostname+':8082/'
  config.module.loaders[0].loaders.unshift('react-hot')
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
}

// Production config
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config
