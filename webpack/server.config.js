const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV;

const config = {
	name: 'server',
	entry: './src/ssr',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'build.js',
		devtoolModuleFilenameTemplate: '/[absolute-resource-path]'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	externals: [nodeExternals()],
	module: {
		rules: [{
			test: /\.jsx?$/,
			loaders: ['babel-loader']
		}]
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
