import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {BrowserRouter, ServerRouter} from 'react-router';
import {Provider} from 'react-redux';

export default function bundle(App, getInitialState, configureStore) {
	App.bundle = {};

	App.bundle.initServer = function (location, routerContext, appState, appData) {
		const store = configureStore(appState);

		return (
			<Provider store={store}>
				<ServerRouter
					location={location}
					context={routerContext}
					basename={appData.baseUrl}
					>
					<AppContainer>
						<App appData={appData}/>
					</AppContainer>
				</ServerRouter>
			</Provider>
		);
	};

	App.bundle.initClient = function (appState, appData) {
		const store = configureStore(appState);
		const updateClient = function (NextApp) {
			const mount = document.getElementById('mount');

			render(
				<Provider store={store}>
					<BrowserRouter basename={appData.baseUrl}>
						<AppContainer>
							<NextApp appData={appData}/>
						</AppContainer>
					</BrowserRouter>
				</Provider>,
				mount
			);
		};

		App.bundle.updateClient = updateClient;

		updateClient(App, store, appData);
	};

	App.bundle.getInitialState = getInitialState;

	return App;
}
