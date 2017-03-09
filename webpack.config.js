const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');


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
     new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
   new ExtractTextPlugin({
        filename: "style.css",
        allChunks: true
    }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code 
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin()//Merge chunks
   
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