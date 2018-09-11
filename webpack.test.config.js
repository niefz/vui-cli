/**
 * Created by niefz on 2018/9/11.
 */
const webpackMerge = require('webpack-merge');

const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  devtool: '#inline-source-map',
});