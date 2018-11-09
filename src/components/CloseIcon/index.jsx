import React from "react";
import PropTypes from "prop-types";

import CloseIconStyled from "./CloseIconStyled";

const CloseIcon = props => <CloseIconStyled {...props} />;

CloseIcon.propTypes = {
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

CloseIcon.defaultProps = {
	// target: '_self'
};

export default CloseIcon;
