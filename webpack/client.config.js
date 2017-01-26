const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV;
const IS_PRODUCTION = (env === 'production');

let stylesLoader = [
	'style-loader',
	'css-loader',
	{
		loader: 'postcss-loader',
		options: {
			plugins() {
				return [
					require('postcss-cssnext')
				];
			}
		}
	}
];

if (IS_PRODUCTION) {
	const fallbackLoader = stylesLoader.shift();
	const loader = stylesLoader;
	stylesLoader = ExtractTextPlugin.extract({
		fallbackLoader,
		loader
	});
}

const vendorLibs = [
	'babel-polyfill',
	'react',
	'react-dom',
	'redux',
	'react-redux',
	'react-helmet',
	'react-router'
];

const config = {
	name: 'client',
	entry: {
		index: IS_PRODUCTION
			? path.join(__dirname, '../src/bundles/index/entry')
			: [
				'react-hot-loader/patch',
				'webpack-hot-middleware/client',
				path.join(__dirname, '../src/bundles/index/entry')
			],
		vendor: vendorLibs
	},
	output: {
		path: path.join(__dirname, '../static/build'),
		filename: '[name].build.js',
		publicPath: '/static/build',
		libraryTarget: 'this',
		library: '__init__',
		devtoolModuleFilenameTemplate: '/[resource-path]'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015', 'stage-0', 'react'],
							plugins: ['react-hot-loader/babel'],
							ignore: /node_modules/,
							babelrc: false
						}
					}
				]
			},
			{
				test: /\.css$/,
				loader: stylesLoader
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
		new ExtractTextPlugin('[name].build.css'),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		})
	],
	devtool: IS_PRODUCTION ? 'source-maps' : 'eval-source-map'
};

module.exports = config;
