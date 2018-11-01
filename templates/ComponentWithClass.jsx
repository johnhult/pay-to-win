import React from 'react';
import PropTypes from 'prop-types';

import ComponentWithClassStyled from './ComponentWithClassStyled';

class ComponentWithClass extends React.Component {
	componentDidMount() {
		//
	}

	render() {
		return (
			<ComponentWithClassStyled>{props.children}</ComponentWithClassStyled>;
		)
	}
}

ComponentWithClass.propTypes = {
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

ComponentWithClass.defaultProps = {
	// target: '_self'
};

export default ComponentWithClass;
