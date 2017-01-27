import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import {createServerRenderContext} from 'react-router';
import Helmet from 'react-helmet';

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');

const bundles = {
	index: require('./bundles/index').default.bundle
};

// Prevent XSS
function printWindowData(data) {
	const dataSource = JSON.stringify(data);
	const escapedDataSource = dataSource.replace(/([<>/\u2028\u2029])/g, '\\$1');
	return escapedDataSource;
}

function renderDocument(head, appHtml, appState, appData) {
	// Application "wrapper"
	const html = renderToStaticMarkup(
		<html {...head.htmlAttributes.toComponent()}>
			<head>
				{head.title.toComponent()}
				{head.meta.toComponent()}

				{head.link.toComponent()}
				{IS_PRODUCTION && (
					<link rel="stylesheet" href={`${appData.staticHost}/build/${appData.bundle}.build.css`}/>
				)}

				{head.script.toComponent()}
			</head>
			<body>
				<div id="mount" dangerouslySetInnerHTML={{__html: appHtml}}/>
				<script src={`${appData.staticHost}/build/vendor.js`}/>
				<script src={`${appData.staticHost}/build/${appData.bundle}.build.js`}/>
				<script
					nonce={appData.nonce}
					dangerouslySetInnerHTML={{__html: `__init__(${printWindowData(appState)}, ${printWindowData(appData)});`}}
					/>
			</body>
		</html>
	);

	return `<!doctype html>${html}`;
}

/**
 * Server-side render
 * @param {string} bundleName Name of bundle to render
 * @param {string} location   Location for router (e.g. req.url)
 * @param {*}      appData    Data passed to application
 * @returns {Promise}
 */
export default async function ssr(bundleName, location, appData) {
	const bundle = bundles[bundleName];

	if (!bundle) {
		throw new Error(`Bundle ${bundleName} not found`);
	}

	// get initial redux state
	const appState = await bundle.getInitialState();

	// get <head> content
	const head = Helmet.rewind();

	let appHtml = '';

	// server-side rendering only in production
	if (IS_PRODUCTION) {
		// create react-router context
		const routerContext = createServerRenderContext();

		// init app
		const app = bundle.initServer(location, routerContext, appState, appData);

		// server-side rendering
		appHtml = renderToString(app);
	}

	return renderDocument(head, appHtml, appState, appData);
}
