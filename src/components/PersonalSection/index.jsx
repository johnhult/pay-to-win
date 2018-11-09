// AddressSection.js
import React from "react";
import PropTypes from "prop-types";

import PersonalSectionStyled from "./PersonalSectionStyled";

class PersonalSection extends React.Component {
	render() {
		return (
			<PersonalSectionStyled>
				<label>
					<input
						className={`${
							this.props.invalid.nickname && this.props.touched.nickname
								? "Input--invalid"
								: ""
						}`}
						onChange={this.props.handleChange}
						onBlur={this.props.handleBlur}
						value={this.props.personal.nickname}
						type="text"
						name="nickname"
						placeholder="Nickname (displayed)"
						required
					/>
				</label>
				<label>
					<input
						className={`${
							this.props.invalid.email && this.props.touched.email
								? "Input--invalid"
								: ""
						}`}
						onChange={this.props.handleChange}
						onBlur={this.props.handleBlur}
						value={this.props.personal.email}
						type="email"
						name="email"
						placeholder="E-Mail (for receipt)"
						required
					/>
				</label>
			</PersonalSectionStyled>
		);
	}
}

export default PersonalSection;

PersonalSection.propTypes = {
	handleChange: PropTypes.func,
	handleBlur: PropTypes.func,
	personal: PropTypes.shape({
		nickname: PropTypes.string,
		email: PropTypes.string
	}),
	invalid: PropTypes.shape({
		nickname: PropTypes.bool,
		email: PropTypes.bool
	}),
	touched: PropTypes.shape({
		nickname: PropTypes.bool,
		email: PropTypes.bool
	})
};

PersonalSection.defaultTypes = {};
