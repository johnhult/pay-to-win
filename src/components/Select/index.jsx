import React from 'react';
import PropTypes from 'prop-types';

import SelectStyled from './SelectStyled';

import Label from 'components/Label';

const Select = props => {
	const options = props.options.map((option, index) => {
		return (
			<option id={option} key={`SelectOptions_${index}`}>
				{option}
			</option>
		);
	});

	return (
		<SelectStyled {...props}>
			<Label for={props.label} label={props.label} />
			<select id={props.label} onChange={e => props.onChange(e)} required={props.required}>
				{options}
			</select>
		</SelectStyled>
	);
};

Select.propTypes = {
	options: PropTypes.array.isRequired,
	label: PropTypes.string.isRequired,
	required: PropTypes.bool,
	onChange: PropTypes.func
};

Select.defaultProps = {
	required: false,
	onChange: () => null
};

export default Select;
