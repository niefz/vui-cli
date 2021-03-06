const { resolve } = require('path');
const webpackMerge = require('webpack-merge');
const WebpackSftpClient = require('webpack-sftp-client');
const config = require('./webpack.dist.config');

const BUILD_PATH = resolve(__dirname, 'dist');

module.exports = webpackMerge(config, {
  plugins: [
    new WebpackSftpClient({
      port: '',
      host: '',
      username: '',
      password: '',
      path: BUILD_PATH,
      remotePath: '',
      verbose: true
    })
  ]
});

