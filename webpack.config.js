const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');


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
     new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
   new ExtractTextPlugin({
        filename: "style.css",
        allChunks: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(), 
    new webpack.optimize.AggressiveMergingPlugin(),
    new OptimizeCSSAssetsPlugin()
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
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use:'raw!postcss!sass'})
      }
    ]
  }
}