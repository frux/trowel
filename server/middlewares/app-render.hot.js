require('babel-register')();
const webpack = require('webpack');
const hotMiddleware = require('webpack-hot-middleware');
const devMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack/client.config');
const ssr = require('../../src/ssr.jsx').default;
const compiler = webpack(webpackConfig);

module.exports = [
	devMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		historyApiFallback: true,
		stats: {
			colors: true
		}
	}),
	hotMiddleware(compiler),
	(req, res, next) => {
		res.render = ssr;
		next();
	}
];
