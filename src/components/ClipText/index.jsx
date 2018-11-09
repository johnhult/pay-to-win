import React from "react";
import PropTypes from "prop-types";

import ClipTextStyled from "./ClipTextStyled";

const ClipText = props => (
	<ClipTextStyled {...props}>{props.children}</ClipTextStyled>
);

ClipText.propTypes = {
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

ClipText.defaultProps = {
	// target: '_self'
};

export default ClipText;
