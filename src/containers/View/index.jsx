import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import ViewStyled from "./ViewStyled";

const View = props => (
	<ViewStyled>
		<Helmet>
			<title>{props.title}</title>
			<link rel="canonical" href={window.location.href} />
		</Helmet>
		{props.children}
	</ViewStyled>
);

View.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired
};

export default View;
