const ssr = require('../../build/build').default;

module.exports = function (req, res, next) {
	res.render = ssr;
	next();
};
