const path = require('path');
const Express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const router = require('./router');

const env = process.env.NODE_ENV;

const app = new Express();

let ssr;

if (env === 'local') {
	require('babel-register')({
		ignore: [/node_modules/]
	});

	const config = require('../webpack/client.config');
	const compiler = webpack(config);

	ssr = require('../src/ssr.jsx').default;

	// watch files and rebuild bundles
	app.use(devMiddleware(compiler, {
		publicPath: config.output.publicPath,
		historyApiFallback: true,
		stats: {
			colors: true
		}
	}));

	// watch bundles and hot-reload
	app.use(hotMiddleware(compiler));
} else {
	// in production use built code
	ssr = require('../build/build').default;

	app.use('/static', Express.static(path.resolve(__dirname, '../static'), {
		fallthrough: true,
		maxAge: 365 * 24 * 60 * 60 * 1000
	}));
}

app.use((req, res, next) => {
	res.render = ssr;
	next();
});

app.use('/', router);

module.exports = app;
