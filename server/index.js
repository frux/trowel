const Express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const env = process.env.NODE_ENV;

const app = new Express();

if (env === 'local') {
	require('babel-register')({
		ignore: [/node_modules/]
	});
	const ssr = require('../src/ssr.jsx').default;

	const config = require('../webpack/client.config');
	const compiler = webpack(config);

	// мидлвара, которая вотчит и пересобирает бандлы
	app.use(devMiddleware(compiler, {
		publicPath: config.output.publicPath,
		historyApiFallback: true,
		stats: {
			colors: true
		}
	}));

	// мидлвара, которая вотчит пересобранные бандлы и заменяет их "на лету"
	app.use(hotMiddleware(compiler));

	// в режиме разработки не используем серверный рендеринг
	app.get('/', function (req, res, next) {
		const appData = {
			staticHost: '/static',
			bundle: 'index',
			baseUrl: 'test',
			nonce: 'test'
		};
		ssr('index', req.url, appData)
			.then(html => {
				res.send(html);
			})
			.catch(err => next(err));
	});
} else {
	app.use('/static', Express.static('/static', {
		fallthrough: false,
		maxAge: 365 * 24 * 60 * 60 * 1000
	}));

	app.get('/', (req, res) => {
		res.send('Hello World!');
	});
}

app.listen(8080, () => {
	console.log('http://localhost:8080');
});
