const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('./utils')
const HappyPack = require('happypack');

module.exports = {
	entry: utils.getEntries(),
	output: {
		path: path.resolve(__dirname, '../lib'),
		publicPath: '/',
		filename: '[name].js',
		library: '[name]',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	externals: {
		vue: {
			root: 'Vue',
			commonjs: 'vue',
			commonjs2: 'vue',
			amd: 'vue'
		},
		'element-ui': 'ELEMENT'
	},
	resolve: {
		extensions: ['.js', '.vue']
	},
	module: {
		loaders: [{
			test: /\.vue$/,
			use: ['HappyPack/loader?id=vue']
		}, {
			test: /\.js$/,
			use: ['HappyPack/loader?id=js'],
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			use: ['HappyPack/loader?id=css']
		}, {
			test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
			loader: 'url-loader?limit=8192'
		}]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			uglifyOptions: {
				ie8: false,
				output: {
					comments: false,
					beautify: false,
				},
				mangle: {
					keep_fnames: true
				},
				compress: {
					warnings: false,
					drop_console: true
				}
			}
		}),
		new CopyWebpackPlugin([
			{
				from: `./packages`,
				to: `./packages`,
				ignore: [
					'theme-default/**'
				]
			}
		]),
		new HappyPack({
			id: 'js',
			loaders: ['babel-loader'],
			threads: 5
		}),
		new HappyPack({
			id: 'css',
			loaders: ['style-loader', 'css-loader'],
			threads: 5
		}),
		new HappyPack({
			id: 'vue',
			loaders: [{
				loader: 'vue-loader',
				options: {
					loaders: {
						css: 'vue-style-loader!css-loader',
						sass: 'vue-style-loader!css-loader!sass-loader'
					},
					postLoaders: {
						html: 'babel-loader'
					}
				}
			}],
			threads: 5
		}),
	]
}
