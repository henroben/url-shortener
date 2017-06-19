var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

const VENDOR_LIBS = [
  'axios',
  'react',
  'react-dom',
  'react-redux',
  'redux',
  'redux-thunk',
  'valid-url'
];

module.exports = {
  entry: {
    bundle: ['./src/index.js', './style/style.scss'],
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js', // replaces [name] with key from entry section
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/ // exclude node modules as trust that all are ES5 already
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/, // set file types to handle
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000, publicPath: '../', name: './img/[hash].[ext]' }
          }, // depending on image size, will either incorporate img directly into bundle.js (< 40 kb) or supply link, use object rather than string so can set config
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          } // first to be applied
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 3000
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }), // checks double including between bundle & vendor, any duplicates are only added to vendor.js
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'css/style.[chunkhash].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};