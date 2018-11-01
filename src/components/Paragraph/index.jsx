import React from 'react';
import PropTypes from 'prop-types';

import ParagraphStyled from './ParagraphStyled';

const Paragraph = props => <ParagraphStyled {...props}>{props.children}</ParagraphStyled>;

Paragraph.propTypes = {
	children: PropTypes.string.isRequired,
	size: PropTypes.string
};

Paragraph.defaultProps = {
	size: 'regular'
};

export default Paragraph;
