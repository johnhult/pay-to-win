import React, { Children } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { StripeProvider, Elements } from "react-stripe-elements";
import styled from "styled-components";

import View from "containers/View";
import getNewScreen from "helpers/getNewScreen.mjs";
import setScreenName from "helpers/setScreenName.mjs";
import CheckoutForm from "components/CheckoutForm";
import HighscoreList from "components/HighscoreList";
import H1 from "../../components/H1/index";
import H3 from "../../components/H3/index";
import Dialog from "../../components/Dialog/index";

const WrapperStyled = styled.div`
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;
	height: 100%;
	min-height: 100%;
	.Score {
		flex: 1;
		padding: 20px;
		text-align: center;
		background-color: #2f2f2f;
		color: white;
		h1,
		h3 {
			margin: 0 auto 20px;
			max-width: 600px;
		}
	}
	.Pay {
		box-shadow: -10px 0 20px rgba(0, 0, 0, 0.4);
		padding: 20px;
		height: 100%;
		overflow: auto;
	}
`;

class SomeView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// Data from backend(s)
			data: [],

			// Screens
			screens: {
				isDisplayingFront: true,
				isDisplayingError: false
			},

			// Dialogs
			dialogs: {
				isDisplayingSignout: false
			},

			// Events
			isLoading: true,

			showModal: {
				done: true,
				failed: false
			},
			explosion: {
				w: false,
				a: false,
				s: false,
				d: false
			}
		};

		this.waitingExplosion = false;
	}

	async initView() {
		//const data = await getData(endpoint, options);

		this.setState({
			// data,
			isLoading: false
		});
	}

	toggleScreen(type, newScreen) {
		/* Expected format, example:
		** toggleScreen is called like so: toggleScreen('screens', 'ingredients')
		** Valid arguments should be 'dialog' (popup) or 'screen'
		** Arguments will match: this.state.screens.isDisplayingIngredients
		** NOTE: This function is the same for screens AND dialogs
		*/

		this.setState({
			[type]: getNewScreen(this.state.screens, setScreenName(newScreen))
		});
	}

	async componentDidMount() {
		if (this.props.user) {
			if (this.props.user.isLoggedIn) {
				await this.initView();
			} else {
				window.location = "/login";
			}
		} else {
			await this.initView();
		}

		window.addEventListener("keydown", this.handleKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.handleKeyPress);
	}

	explosionState = direction => {
		if (this.waitingExplosion) {
			return;
		}
		this.waitingExplosion = true;
		this.setState(
			{
				explosion: { [direction]: true }
			},
			() => {
				setTimeout(() => {
					this.waitingExplosion = false;
					this.setState({
						explosion: { [direction]: false }
					});
				}, 2000);
			}
		);
	};

	handleKeyPress = ev => {
		if (
			(this.state.showModal.done || this.state.showModal.failed) &&
			(ev.key === "Escape" || ev.code === "Escape" || ev.keyCode === 27)
		) {
			this.closeModal(ev, true);
		} else if (ev.key === "w" || ev.code === "KeyW" || ev.keyCode === 87) {
			this.explosionState("w");
		} else if (ev.key === "a" || ev.code === "KeyA" || ev.keyCode === 65) {
			this.explosionState("a");
		} else if (ev.key === "s" || ev.code === "KeyS" || ev.keyCode === 83) {
			this.explosionState("s");
		} else if (ev.key === "d" || ev.code === "KeyD" || ev.keyCode === 68) {
			this.explosionState("d");
		}
	};

	showModal = name => {
		this.setState(prevState => {
			return { showModal: { ...prevState.showModal, [name]: true } };
		});

		if (name === "done") {
			setTimeout(() => {
				this.setState(() => {
					return { explosion: { w: true } };
				});
			}, 500);
		}
	};

	closeModal = (ev, force) => {
		if (!ev.target.classList.contains("DialogBg") && !force) {
			return;
		}
		this.setState({
			showModal: { done: false, failed: false }
		});
	};

	render() {
		return (
			<View title="Pay to Win!">
				{!this.state.isLoading && (
					<WrapperStyled>
						<section className="Score">
							<H1>Pay to Win!</H1>
							<H3>
								No bullshit. What you pay is your score. Gameplay not included.
							</H3>
							<HighscoreList />
						</section>
						<section className="Pay">
							<StripeProvider apiKey="null">
								<Elements>
									<CheckoutForm payment={this.showModal} />
								</Elements>
							</StripeProvider>
						</section>
						{this.state.showModal.done && (
							<Dialog
								toggleDialog={this.closeModal}
								confetti={this.state.explosion}
								buttonText="New game"
							>
								<H3 style={"margin: 0 0 10px 0;"}>GG WP!</H3>
								<p>
									You did it! Press any of <strong>W-A-S-D</strong> to
									celebrate. Check out the highscore to find your name or play a
									new game.
								</p>
							</Dialog>
						)}
						{this.state.showModal.failed && (
							<Dialog toggleDialog={this.closeModal} buttonText="Retry">
								<p>You didn't do it!</p>
							</Dialog>
						)}
					</WrapperStyled>
				)}
			</View>
		);
	}
}

export default withRouter(SomeView);

/*
SomeView.propTypes = {
	user: PropTypes.object
};

SomeView.defaultTypes = {
	user: {}
};
*/
