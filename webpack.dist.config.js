/**
 * Created by niefz on 2018/1/8.
 */
const {resolve} = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackBaseConfig = require('./webpack.base.config.js');

const BUILD_PATH = resolve(__dirname, 'dist');

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  output: {
    publicPath: '/',
    path: BUILD_PATH
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(BUILD_PATH),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/index.html'),
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeEmptyElements: true,
        sortAttributes: true
      }
    }),
    new BundleAnalyzerPlugin()
  ]
});