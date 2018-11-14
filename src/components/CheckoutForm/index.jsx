// CheckoutForm.js
import React from "react";
import { injectStripe } from "react-stripe-elements";
import PropTypes, { number } from "prop-types";

import { postOptions, stripePayment } from "helpers/api.mjs";
import getData from "helpers/getData.mjs";
import AddressSection from "components/AddressSection";
import Button from "components/Button";
import CardSection from "components/CardSection";
import PersonalSection from "components/PersonalSection";
import CheckoutFormStyled from "./CheckoutFormStyled";
import H3 from "../H3/index";
import ClipText from "components/ClipText";
import H1 from "../H1/index";
import { Object } from "core-js";

const createOptions = (fontSize, padding) => {
	return {
		style: {
			base: {
				fontSize,
				color: "#424770",
				letterSpacing: "0.025em",
				fontFamily: "monospace",
				"::placeholder": {
					color: "#aab7c4"
				},
				padding,
				":focus": {
					color: "#fff",
					"::placeholder": {
						color: "#fff"
					}
				}
			},
			invalid: {
				color: "mediumvioletred",
				"::placeholder": {
					color: "mediumvioletred"
				},
				":focus": {
					color: "mediumvioletred",
					"::placeholder": {
						color: "mediumvioletred"
					}
				}
			}
		}
	};
};

const setTouched = {
	nickname: true,
	email: true,
	name: true,
	address_line1: true,
	address_city: true,
	address_state: true,
	address_zip: true
};

class CheckoutForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currency: "usd",
			error: "",
			tokenInfo: {
				nickname: "",
				email: "",
				name: "",
				address_line1: "",
				address_city: "",
				address_state: "",
				address_zip: "",
				amount: 100
			},
			invalid: {
				nickname: true,
				email: true,
				name: true,
				address_line1: true,
				address_city: true,
				address_state: true,
				address_zip: true,
				amount: false
			},
			touched: {
				nickname: false,
				email: false,
				name: false,
				address_line1: false,
				address_city: false,
				address_state: false,
				address_zip: false
			},
			paymentLoading: false
		};
		this.stripeElements = {
			number: null,
			expiration: null,
			cvc: null
		};
	}

	handleChange = ev => {
		this.setState(prevState => {
			if (ev.target.name === "amount") {
				if (ev.data && ev.data.search(/\D/) >= 0) {
					return null;
				} else {
					ev.target.value = ev.target.value.toString().replace(/^0+/, "");
					let parsedAmount = parseInt(ev.target.value);
					let tooLow = isNaN(parsedAmount) || parsedAmount < 100;
					return {
						invalid: {
							...prevState.invalid,
							amount: tooLow
						},
						tokenInfo: {
							...prevState.tokenInfo,
							[ev.target.name]: ev.target.value
						}
					};
				}
			} else if (ev.target.name === "email") {
				return {
					invalid: {
						...prevState.invalid,
						email: !this.isEmail(ev.target.value)
					},
					tokenInfo: {
						...prevState.tokenInfo,
						[ev.target.name]: ev.target.value
					}
				};
			} else {
				return {
					tokenInfo: {
						...prevState.tokenInfo,
						[ev.target.name]: ev.target.value
					},
					invalid: {
						...prevState.invalid,
						[ev.target.name]: !!(ev.target.value === "")
					}
				};
			}
		});
	};

	handleBlur = ev => {
		this.setState(prevState => {
			if (ev.target.name === "email") {
				return {
					touched: {
						...prevState.touched,
						[ev.target.name]: true
					},
					invalid: {
						...prevState.invalid,
						[ev.target.name]: !this.isEmail(ev.target.value)
					}
				};
			}

			return {
				touched: {
					...prevState.touched,
					[ev.target.name]: true
				},
				invalid: {
					...prevState.invalid,
					[ev.target.name]: !!(ev.target.value === "")
				}
			};
		});
	};

	handleSubmit = async ev => {
		// We don't want to let default form submission happen here, which would refresh the page.
		ev.preventDefault();

		this.setState({
			touched: setTouched
		});

		Object.keys(this.state.tokenInfo).forEach(name => {
			this.handleChange({
				target: { name: name, value: this.state.tokenInfo[name] }
			});
		});

		await this.setState({
			paymentLoading: true
		});

		const amount = this.state.tokenInfo.amount;
		const currency = this.state.currency;

		const player = {
			nickname: this.state.tokenInfo.nickname,
			email: this.state.tokenInfo.email,
			score: this.state.tokenInfo.amount
		};

		// Within the context of `Elements`, this call to createToken knows which Element to tokenize, since there's only one in this group.
		let tokenResponse = await this.props.stripe.createToken(
			this.state.tokenInfo
		);

		if (tokenResponse.error) {
			this.setState({
				error: "Couldn't create token for payment.",
				paymentLoading: false
			});

			console.log("No token", tokenResponse.error);
			this.props.payment("failed", tokenResponse.error.message);

			return;
		}

		let paymentDone = await getData(
			stripePayment,
			postOptions({
				token: tokenResponse.token,
				charge: { amount, currency }
			})
		).catch(err => {
			this.props.payment("failed");
			this.setState({
				paymentLoading: false
			});
		});
		if (!paymentDone) {
			this.setState({
				paymentLoading: false
			});

			return;
		} else {
			if (paymentDone.status === 200) {
				this.props.payment("done");
				this.setState({
					paymentLoading: false
				});
				this.resetForm();
				this.props.savePlayer(player);
			} else {
				this.props.payment("failed", "Something went wrong.");
				this.setState({
					paymentLoading: false
				});
			}
		}
	};

	resetForm = () => {
		Object.keys(this.stripeElements).forEach(name => {
			this.stripeElements[name].clear();
		});
		this.setState(prevState => {
			let resetValue = {};
			Object.keys(prevState.tokenInfo).forEach(name => {
				resetValue[name] = name === "amount" ? "100" : "";
			});
			return {
				tokenInfo: resetValue
			};
		});
	};

	setStripeElement = (ref, refName) => {
		this.stripeElements[refName] = ref;
	};

	isEmail = str => {
		var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
		return re.test(str);
	};

	checkArrowUp = ev => {
		return ev.code === "ArrowUp" || ev.key === "ArrowUp" || ev.keyCode === 38;
	};

	checkArrowDown = ev => {
		return (
			ev.code === "ArrowDown" || ev.key === "ArrowDown" || ev.keyCode === 40
		);
	};

	changeBy = (ev, incOrDec) => {
		this.setState(prevState => {
			if (this.state.tokenInfo.amount === "") {
				let conditionalValue = ev.shiftKey ? incOrDec * 10 : incOrDec;
				conditionalValue = conditionalValue < 0 ? 0 : conditionalValue;
				let conditionalLow = conditionalValue < 100;
				return {
					invalid: {
						...prevState.invalid,
						amount: conditionalLow
					},
					tokenInfo: {
						...prevState.tokenInfo,
						amount: conditionalValue
					}
				};
			}
			let pInt = parseInt(prevState.tokenInfo.amount);
			let newValue = (ev.shiftKey ? incOrDec * 10 : incOrDec) + pInt;
			let tooLow = parseInt(newValue) < 100;
			return {
				invalid: {
					...prevState.invalid,
					amount: tooLow
				},
				tokenInfo: {
					...prevState.tokenInfo,
					amount: newValue < 0 ? pInt : newValue
				}
			};
		});
	};

	render() {
		return (
			<CheckoutFormStyled>
				<H1
					style={{ padding: "5px", margin: "0 0 20px 0", textAlign: "center" }}
				>
					Git Gud!
				</H1>
				<form onSubmit={this.handleSubmit}>
					<span className="CheckoutSubheader">Player</span>
					<PersonalSection
						handleChange={this.handleChange}
						handleBlur={this.handleBlur}
						personal={{
							nickname: this.state.tokenInfo.nickname,
							email: this.state.tokenInfo.email
						}}
						invalid={{
							nickname: this.state.invalid.nickname,
							email: this.state.invalid.email
						}}
						touched={{
							nickname: this.state.touched.nickname,
							email: this.state.touched.email
						}}
					/>
					<span className="CheckoutSubheader">Card</span>
					<CardSection
						stripeStyle={createOptions("16px")}
						card={{ name: this.state.tokenInfo.name }}
						invalid={{
							name: this.state.invalid.name
						}}
						touched={{
							name: this.state.touched.name
						}}
						handleChange={this.handleChange}
						handleBlur={this.handleBlur}
						setStripeElement={this.setStripeElement}
					/>
					<span className="CheckoutSubheader">Address</span>
					<AddressSection
						handleChange={this.handleChange}
						handleBlur={this.handleBlur}
						address={{
							address_line1: this.state.tokenInfo.address_line1,
							address_city: this.state.tokenInfo.address_city,
							address_state: this.state.tokenInfo.address_state,
							address_zip: this.state.tokenInfo.address_zip
						}}
						invalid={{
							address_line1: this.state.invalid.address_line1,
							address_city: this.state.invalid.address_city,
							address_state: this.state.invalid.address_state,
							address_zip: this.state.invalid.address_zip
						}}
						touched={{
							address_line1: this.state.touched.address_line1,
							address_city: this.state.touched.address_city,
							address_state: this.state.touched.address_state,
							address_zip: this.state.touched.address_zip
						}}
					/>
					<div className="AmountWrapper">
						<ClipText>
							<span>Your Points:</span>
							<span>Your Points:</span>
						</ClipText>
						<label className="AmountPoints">
							<input
								className={`AmountInput ${
									this.state.invalid.amount ? "Amount--invalid" : ""
								}`}
								onChange={this.handleChange}
								onKeyUp={e => {
									if (this.checkArrowUp(e)) {
										this.changeBy(e, 10);
									} else if (this.checkArrowDown(e)) {
										this.changeBy(e, -10);
									}
								}}
								name="amount"
								value={this.state.tokenInfo.amount}
								type="text"
								pattern="[1-9][\d]*"
								required
								autoComplete="off"
							/>
						</label>
						<H3 className="Equals">=</H3>
						<H3 className="Money">${this.state.tokenInfo.amount / 100}</H3>
						{this.state.invalid.amount && (
							<span className="AmountError">Lowest possible score is 100</span>
						)}
					</div>
					<div style={{ width: "100%", padding: "5px" }}>
						<Button disabled={this.state.paymentLoading}>
							{this.state.paymentLoading ? (
								<div className="loading">
									<div className="food" />
									<div className="food" />
									<div className="food" />
								</div>
							) : (
								"Insert Coins 👑"
							)}
						</Button>
					</div>
				</form>
				<span className="SecureText">
					Each transaction is a separate game play. Points from multiple
					transactions will not be added. Payments handled securely through{" "}
					<a
						href="https://stripe.com/docs/security/stripe"
						rel="noopener noreferrer"
						target="_blank"
					>
						Stripe
					</a>
					. No sensitive data saved.
				</span>
			</CheckoutFormStyled>
		);
	}
}

export default injectStripe(CheckoutForm);

CheckoutForm.propTypes = {
	stripe: PropTypes.object,
	payment: PropTypes.func,
	savePlayer: PropTypes.func
};

CheckoutForm.defaultTypes = {};
