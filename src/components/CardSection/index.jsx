// CardSection.js
import React from "react";
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement
} from "react-stripe-elements";

import CardSectionStyled from "./CardSectionStyled";

class CardSection extends React.Component {
	render() {
		return (
			<CardSectionStyled>
				<label>
					<input
						className={`${
							this.props.invalid.name && this.props.touched.name
								? "Input--invalid"
								: ""
						}`}
						onChange={this.props.handleChange}
						value={this.props.card.name}
						onBlur={this.props.handleBlur}
						type="name"
						name="name"
						placeholder="Name (on card)"
						required
					/>
				</label>
				<label>
					<CardNumberElement
						{...this.props.stripeStyle}
						placeholder="Card Number"
						onReady={ref => this.props.setStripeElement(ref, "number")}
						required
					/>
				</label>
				<div className="StripeInRow">
					<label>
						<CardExpiryElement
							{...this.props.stripeStyle}
							onReady={ref => this.props.setStripeElement(ref, "expiration")}
							required
						/>
					</label>
					<label>
						<CardCVCElement
							{...this.props.stripeStyle}
							onReady={ref => this.props.setStripeElement(ref, "cvc")}
							required
						/>
					</label>
				</div>
			</CardSectionStyled>
		);
	}
}

export default CardSection;
