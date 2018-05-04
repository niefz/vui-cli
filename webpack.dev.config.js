/**
 * Created by niefz on 2018/1/8.
 */
const {resolve} = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');

const APP_PATH = resolve(__dirname, 'src');

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  output: {
    path: APP_PATH
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: APP_PATH,
    compress: true,
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    inline: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8080,
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/index.html'),
      inject: 'body'
    }),
    new FriendlyErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});