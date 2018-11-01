import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'unistore/preact';
import BUTTON_INCREASE_AND_DECREASE from 'actions/actions';

const UnistoreExample = ({ count, increment, decrement }) => (
	<div>
		<p>Count: {count}</p>
		<button onClick={increment}>Increment</button>
		<button onClick={decrement}>Decrement</button>
	</div>
);

UnistoreExample.propTypes = {
	count: PropTypes.number.isRequired,
	decrement: PropTypes.number.isRequired,
	increment: PropTypes.number.isRequired
};

UnistoreExample.defaultProps = {};

export default connect('count', BUTTON_INCREASE_AND_DECREASE)(UnistoreExample);
