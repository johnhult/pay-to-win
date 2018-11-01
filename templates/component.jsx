import React from 'react';
import PropTypes from 'prop-types';

import ComponentStyled from './ComponentStyled';

const Component = props => <ComponentStyled {...props}>{props.children}</ComponentStyled>;

Component.propTypes = {
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

Component.defaultProps = {
	// target: '_self'
};

export default Component;
