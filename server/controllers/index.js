const config = require('config');

module.exports = function (req, res, next) {
	const appData = {
		staticHost: `${config.get('static.host')}${config.get('static.path')}`,
		bundle: 'index',
		baseUrl: ''
	};
	res.render('index', req.url, appData)
		.then(({redirectUrl, html}) => {
			if (redirectUrl) {
				res.redirect(redirectUrl);
			} else {
				res.send(html);
			}
		})
		.catch(err => next(err));
};
