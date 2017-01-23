import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import Helmet from 'react-helmet';
import {initSSR} from 'trowel-tools';

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');

const bundles = {
	index: require('./bundles/index').default
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
	const result = {};

	if (!bundle) {
		throw new Error(`Bundle ${bundleName} not found`);
	}

	// get initial redux state
	const appState = await bundle.getInitialState();

	let appHtml = '';

	// server-side rendering only in production
	if (IS_PRODUCTION) {
		// create react-router-dom context
		const routerContext = {};

		// init app
		const app = initSSR(bundle, {location, routerContext, appState, appData});

		// server-side rendering
		appHtml = renderToString(app);
		result.redirectURL = routerContext.url;
	}

	// get <head> content
	const head = Helmet.rewind();

	result.html = renderDocument(head, appHtml, appState, appData);

	return result;
}
