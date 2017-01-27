module.exports = function (req, res, next) {
	const appData = {
		staticHost: '/static',
		bundle: 'index',
		baseUrl: 'test',
		nonce: 'test'
	};
	res.render('index', req.url, appData)
		.then(html => {
			res.send(html);
		})
		.catch(err => next(err));
};
