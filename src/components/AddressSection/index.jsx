// AddressSection.js
import React from "react";
import PropTypes from "prop-types";

import AddressSectionStyled from "./AddressSectionStyled";

class AddressSection extends React.Component {
	render() {
		return (
			<AddressSectionStyled>
				<label>
					<input
						className={`${
							this.props.invalid.address_line1 &&
							this.props.touched.address_line1
								? "Input--invalid"
								: ""
						}`}
						onBlur={this.props.handleBlur}
						onChange={this.props.handleChange}
						value={this.props.address.address_line1}
						type="address"
						name="address_line1"
						placeholder="Address"
						required
					/>
				</label>
				<label>
					<input
						className={`${
							this.props.invalid.address_city && this.props.touched.address_city
								? "Input--invalid"
								: ""
						}`}
						onBlur={this.props.handleBlur}
						onChange={this.props.handleChange}
						value={this.props.address.address_city}
						type="city"
						name="address_city"
						placeholder="City"
						required
					/>
				</label>
				<label>
					<input
						className={`${
							this.props.invalid.address_state &&
							this.props.touched.address_state
								? "Input--invalid"
								: ""
						}`}
						onBlur={this.props.handleBlur}
						onChange={this.props.handleChange}
						value={this.props.address.address_state}
						type="state"
						name="address_state"
						placeholder="State"
						required
					/>
				</label>
				<label>
					<input
						className={`${
							this.props.invalid.address_zip && this.props.touched.address_zip
								? "Input--invalid"
								: ""
						}`}
						onBlur={this.props.handleBlur}
						onChange={this.props.handleChange}
						value={this.props.address.address_zip}
						type="state"
						name="address_zip"
						placeholder="Postal Code"
						required
					/>
				</label>
			</AddressSectionStyled>
		);
	}
}

export default AddressSection;

AddressSection.propTypes = {
	handleBlur: PropTypes.func,
	handleChange: PropTypes.func,
	checkPostal: PropTypes.func,
	postalOk: PropTypes.bool,
	postalReady: PropTypes.func,
	address: PropTypes.shape({
		address_line1: PropTypes.string,
		address_city: PropTypes.string,
		address_state: PropTypes.string,
		address_zip: PropTypes.string
	}),
	invalid: PropTypes.shape({
		address_line1: PropTypes.bool,
		address_city: PropTypes.bool,
		address_state: PropTypes.bool,
		address_zip: PropTypes.bool
	}),
	touched: PropTypes.shape({
		address_line1: PropTypes.bool,
		address_city: PropTypes.bool,
		address_state: PropTypes.bool,
		address_zip: PropTypes.bool
	})
};

AddressSection.defaultTypes = {};
