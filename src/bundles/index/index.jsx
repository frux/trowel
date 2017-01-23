/* globals document */
import React, {PureComponent, PropTypes} from 'react';
import {Match, Miss} from 'react-router';
import Helmet from 'react-helmet';
import b from 'b_';
import bundle from '../../tools/bundle.jsx';
import {configureStore} from '../../redux/store';
import {getInitialState} from '../../redux/state';
import HelloWorld from '../../components/hello-world';

class App extends PureComponent {
	getChildContext() {
		const {baseUrl, staticHost} = this.props.appData;

		return {
			baseUrl,
			staticHost
		};
	}

	_404() {
		return (<div>Not found</div>);
	}

	render() {
		const app_ = b.with('app');

		return (
			<div className={app_()}>
				<Helmet
					htmlAttributes={{lang: 'ru'}}
					title="test1"
					meta={[
						{name: 'description', content: 'test'},
						{property: 'og:type', content: 'website'}
					]}
					link={[]}
					script={[]}
					/>
				<Match pattern="(/)?" exactly component={HelloWorld}/>
				<Miss component={this._404}/>
			</div>
		);
	}
}

App.propTypes = {
	appData: PropTypes.object
};

App.childContextTypes = {
	baseUrl: PropTypes.string,
	staticHost: PropTypes.string
};

export default bundle(App, getInitialState, configureStore);
