import React, {Component, PropTypes} from 'react';
import {Switch, Route} from 'react-router-dom';
import Helmet from 'react-helmet';
import {configureStore} from '../../redux/store';
import {getInitialState} from '../../redux/state';
import HelloWorld from '../../components/hello-world';

export default class App extends Component {
	getChildContext() {
		const {baseUrl, staticHost} = this.props.appData;

		return {
			baseUrl,
			staticHost
		};
	}

	render() {
		return (
			<div className="app">
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
				<h1>Hello Trowel!</h1>
				<Switch>
					<Route path="/" exact component={HelloWorld}/>
				</Switch>
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

App.getInitialState = getInitialState;
App.configureStore = configureStore;
