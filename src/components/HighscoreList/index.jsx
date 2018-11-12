import React from "react";
import PropTypes from "prop-types";

import HighscoreListStyled from "./HighscoreListStyled";

class HighscoreList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <HighscoreListStyled>{this.props.children}</HighscoreListStyled>;
	}
}

HighscoreList.propTypes = {
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

HighscoreList.defaultProps = {
	// target: '_self'
};

export default HighscoreList;
