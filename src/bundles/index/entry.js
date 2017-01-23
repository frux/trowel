import {bundle} from 'trowel-tools';
import App from './index';

const appBundle = bundle(App);

if (module.hot) {
	module.hot.accept('./index', () => {
		const NextApp = require('./index').default;
		appBundle.updateClient(NextApp);
	});
}

module.exports = appBundle.initClient;
