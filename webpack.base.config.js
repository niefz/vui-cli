/**
 * Created by niefz on 2018/9/11.
 */
const { resolve } = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// 多入口
const multipageConfig = require('./multipage.config.js');

const APP_PATH = resolve(__dirname, 'src');

module.exports = webpackMerge({
  entry: {
    vendors: ['axios', 'babel-polyfill', 'vue', 'vue-i18n', 'vue-router', 'vuex'],
    index: 'src/index.js'
  },
  output: {
    publicPath: '/',
    filename: 'assets/js/[name].min.js?v=[hash:8]',
    chunkFilename: 'assets/js/[name].min.js?v=[chunkhash:8]'
  },
  module: {
    rules: [
      {
        test: /\.x?html?$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'htmllint-loader',
            query: {
              failOnError: true,
              failOnWarning: false
            },
          },
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader?id=eslint'
          }
        ]
      },
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader?id=babel'
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'happypack/loader?id=sass'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/[name].[ext]?v=[hash:8]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]?v=[hash:8]'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.js',
      'src': APP_PATH
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: Infinity
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'eslint',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }
      ]
    }),
    new HappyPack({
      id: 'babel',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            sourceMap: true,
            cacheDirectory: true
          }
        }
      ]
    }),
    new HappyPack({
      id: 'sass',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'sass-loader'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body',
      favicon: 'src/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        sortClassName: true
      },
      chunks: ['vendors', 'commons', 'index'],
      chunksSortMode: 'dependency'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].min.css?v=[hash:8]'
    })
  ]
}, multipageConfig);