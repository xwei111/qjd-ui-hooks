'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
// const HappyPack = require('happypack');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        // use: ['HappyPack/loader?id=vue'],
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test:/\.pug$/,
        loader: "pug-html-loader"
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // use: ['HappyPack/loader?id=js'],
        include: [resolve('src'), resolve('test'), resolve('packages'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        // use: ['HappyPack/loader?id=img']
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }

      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.md$/,
        // use: ['HappyPack/loader?id=md']
        use: [
          { loader: 'vue-loader' },
          {
            loader: require.resolve('./md_loader')
          }
        ]

      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  // plugins: [
  //   new HappyPack({
  //     id: 'vue',
  //     loaders: [ { loader: 'vue-loader', options: vueLoaderConfig } ],
  //     threads: 5 // 开启进程数，默认3个
  //   }),
  //   new HappyPack({
  //     id: 'js',
  //     loaders: [ 'babel-loader' ],
  //     threads: 5
  //   }),
  //   new HappyPack({
  //     id: 'md',
  //     loaders: [ 'vue-loader', require.resolve('./md_loader') ],
  //     threads: 5
  //   }),
  //   new HappyPack({
  //     id: 'img',
  //     loaders: [{
  //       loader: 'url-loader',
  //       options: {
  //         limit: 10000,
  //         name: utils.assetsPath('img/[name].[hash:7].[ext]')
  //       }
  //     }],
  //     threads: 5
  //   }),
  // ]
}
