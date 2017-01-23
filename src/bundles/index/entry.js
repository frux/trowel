import App from './index';

if (module.hot) {
	module.hot.accept('./index', () => {
		const NextApp = require('./index').default;
		App.bundle.updateClient(NextApp);
	});
}

module.exports = function (appState, appData) {
	App.bundle.initClient(appState, appData);
};
