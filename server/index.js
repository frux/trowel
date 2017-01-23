const app = require('./app');
const config = require('config');

const port = config.get('app.port');
const host = config.get('app.host');

console.log(`Trowel is starting on ${process.env.NODE_ENV}`);

app.listen(port, () => {
	console.log(`http://${host}:${port}`);
});
