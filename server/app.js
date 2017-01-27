const path = require('path');
const Express = require('express');
const router = require('./router');
const morgan = require('morgan');

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');

const app = new Express();

let ssr;

if (IS_PRODUCTION) {
	// in production use built code
	ssr = require('../build/build').default;
} else {
	const webpack = require('webpack');
	const devMiddleware = require('webpack-dev-middleware');
	const hotMiddleware = require('webpack-hot-middleware');
	const config = require('../webpack/client.config');
	const compiler = webpack(config);

	require('babel-register')({
		ignore: [/node_modules/]
	});

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
}

app.use(morgan('combined'));
app.use((req, res, next) => {
	res.render = ssr;
	next();
});

app.use('/static', Express.static(path.resolve(__dirname, '../static'), {
	fallthrough: true,
	maxAge: 365 * 24 * 60 * 60 * 1000
}));

app.use('/', router);

module.exports = app;
