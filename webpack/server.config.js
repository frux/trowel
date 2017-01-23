const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV;

const config = {
	name: 'server',
	entry: path.join(__dirname, '../src/ssr'),
	output: {
		path: path.join(__dirname, '../build'),
		filename: 'build.js',
		libraryTarget: 'commonjs2',
		devtoolModuleFilenameTemplate: '/[absolute-resource-path]'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loaders: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: 'null-loader'
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			}
		]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		})
	],
	devtool: 'source-maps'
};

module.exports = config;
