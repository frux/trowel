console.log(`Trowel is building for ${process.env.NODE_ENV}`);

module.exports = [
	require('./client.config'),
	require('./server.config')
];
