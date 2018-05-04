/**
 * Created by niefz on 2018/1/8.
 */
const {resolve} = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const vueLoaderConfig = require('./vue-loader.config.js');

const APP_PATH = resolve(__dirname, 'src');

module.exports = {
  entry: {
    vendors: ['axios', 'vue', 'vue-i18n', 'vue-router', 'vuex'],
    index: APP_PATH
  },
  output: {
    publicPath: '/',
    filename: 'assets/js/[name].min.js?v=[hash:8]',
    chunkFilename: 'assets/js/[name].min.js?v=[chunkhash:8]'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'htmllint'
          },
          {
            loader: 'html'
          }
        ]
      },
      {
        test: /\.(js|vue)$/,
        include: /src/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel',
            options: {
              sourceMap: true,
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css'
          },
          {
            loader: 'postcss'
          },
          {
            loader: 'sass'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css'
          },
          {
            loader: 'postcss'
          },
          {
            loader: 'less'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file',
            options: {}
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue',
            options: vueLoaderConfig
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.js',
      '@': APP_PATH
    }
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendors',
          priority: 10
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].min.css?v=[hash:8]',
      allChunks: true
    })
  ]
};