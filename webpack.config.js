const path = require('path')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './js/common/App.js',
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/public/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: [

  ],
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss|.css$/,
        loader: "style!raw!postcss!sass"
      }
    ]
  }
}