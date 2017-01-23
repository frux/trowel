const Express = require('express');
const config = require('config');
const router = require('./router');
const morgan = require('morgan');

const app = new Express();

if (config.get('render.hot')) {
	app.use(require('./middlewares/app-render.hot'));
} else {
	app.use(require('./middlewares/app-render'));
}

app.use(morgan('combined'));

app.use(config.get('static.path'), Express.static(config.get('static.dir'), {
	fallthrough: true,
	maxAge: 365 * 24 * 60 * 60 * 1000
}));

app.use('/', router);

module.exports = app;
