import React, {Component, PropTypes} from 'react';
import b from 'b_';
import './hello-world.css';

const helloWorld_ = b.with('hello-world');

export default class HelloWorld extends Component {
	constructor(props) {
		super(props);
		this.state = {
			test: 1
		};

		setTimeout(() => {
			this.setState({test: 2});
		}, 3000);
	}

	render() {
		const classes = helloWorld_();

		return (
			<div className={classes}>
				<pre className={helloWorld_('code', {type: 'props'})}>
					{`Props: ${JSON.stringify(this.props, null, '\t')}`}
				</pre>
				<pre className={helloWorld_('code', {type: 'context'})}>
					{`Context: ${JSON.stringify(this.context, null, '\t')}`}
				</pre>
				<pre className={helloWorld_('code', {type: 'state'})}>
					{`State: ${JSON.stringify(this.state, null, '\t')}`}
				</pre>
			</div>
		);
	}
}

HelloWorld.propTypes = {};
HelloWorld.defaultProps = {};

HelloWorld.contextTypes = {
	baseUrl: PropTypes.string,
	staticHost: PropTypes.string
};
