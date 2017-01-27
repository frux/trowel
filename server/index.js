const app = require('./app');

console.log(`Trowel is starting on ${process.env.NODE_ENV}`);

app.listen(8080, () => {
	console.log('http://localhost:8080');
});
