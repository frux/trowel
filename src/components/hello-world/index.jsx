import React, {Component, PropTypes} from 'react';
import './hello-world.css';

export default class HelloWorld extends Component {
	constructor(props) {
		super(props);
		this.state = {
			test: 1
		};
	}

	render() {
		return (
			<div className="hello-world">
				<pre className="hello-world__code">
					{`Props: ${JSON.stringify(this.props, null, '\t')}`}
				</pre>
				<pre className="hello-world__code">
					{`Context: ${JSON.stringify(this.context, null, '\t')}`}
				</pre>
				<pre className="hello-world__code">
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
