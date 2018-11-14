import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { StripeProvider, Elements } from "react-stripe-elements";
import styled from "styled-components";

import View from "containers/View";
import getNewScreen from "helpers/getNewScreen.mjs";
import breakpoints from "helpers/breakpoints.mjs";
import setScreenName from "helpers/setScreenName.mjs";
import db, { firestore } from "helpers/firestore/firestore";
import getDataFirestore from "helpers/firestore/getDataFirestore.mjs";
import writeDataFirestore from "helpers/firestore/writeDataFirestore.mjs";
import CheckoutForm from "components/CheckoutForm";
import HighscoreList from "components/HighscoreList";
import H1 from "../../components/H1/index";
import H3 from "../../components/H3/index";
import Dialog from "../../components/Dialog/index";

const WrapperStyled = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	min-height: 100%;
	background-color: #2f2f2f;
	@media screen and (min-width: ${breakpoints.maxContainerWidth}) {
		flex-direction: row;
		height: 100%;
	}
	.Score {
		flex: 1;
		padding: 40px 0;
		text-align: center;
		color: white;
		display: flex;
		flex-direction: column;
		@media screen and (min-width: ${breakpoints.maxContainerWidth}) {
			overflow: hidden;
		}

		.Padding {
			padding: 0 20px;
		}

		.MainHeader,
		.MainSubheader {
			margin: 0 auto 20px;
			max-width: 600px;
		}
	}
	.Pay {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);
		overflow: auto;
		padding: 20px 10px;
		background-color: white;
		border-radius: 10px;
		margin: 10px auto;
		width: calc(100% - 20px);
		max-width: 500px;
		@media screen and (min-width: ${breakpoints.maxContainerWidth}) {
			padding: 20px;
			height: calc(100% - 80px);
			margin: 40px 40px 40px 0;
		}
	}
`;

const LoadingStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #2f2f2f;
	color: white;
	height: 100%;
	min-height: 100%;
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
				done: false,
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
		const data = await getDataFirestore("scores", "score");
		const players = await getDataFirestore("players");

		this.setState({
			data,
			players,
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

	savePlayer = async info => {
		const email = info.email;
		const playerExists = this.state.players.find(existingPlayers => {
			return existingPlayers.email === info.email;
		});

		const refPath = playerExists
			? playerExists.selfRef.path
			: await writeDataFirestore("players", {
					email
			  });

		const player = db.doc(refPath);
		const timestamp = firestore.FieldValue.serverTimestamp();
		const score = parseInt(info.score);
		const nickname = info.nickname;

		const newPlayerFormatted = {
			player,
			timestamp,
			score,
			nickname
		};

		const newPlayerRef = await writeDataFirestore("scores", newPlayerFormatted);

		this.setState(prevState => {
			let addedData = prevState.data;
			let newPlayer = db.doc(newPlayerRef);
			addedData.push({ ...newPlayerFormatted, selfRef: newPlayer });
			addedData.sort((a, b) => {
				return b.score - a.score;
			});
			return { data: addedData };
		});
	};

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

	showModal = (name, err) => {
		this.setState(prevState => {
			return {
				showModal: { ...prevState.showModal, [name]: true },
				errorMessage: err
			};
		});

		if (name === "done") {
			setTimeout(() => {
				this.explosionState("w");
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
				{this.state.isLoading && (
					<LoadingStyled>
						<H1>Loading...</H1>
					</LoadingStyled>
				)}
				{!this.state.isLoading && (
					<WrapperStyled>
						<section className="Score">
							<div className="Padding">
								<H1 className="MainHeader">Pay to Win!</H1>
								<H3 className="MainSubheader">
									No bullshit. What you pay is your score. Gameplay not
									included.
								</H3>
							</div>
							{this.state.data && <HighscoreList list={this.state.data} />}
						</section>
						<section className="Pay">
							<StripeProvider apiKey="pk_live_YPUxTTVdovB0UNqjblSXENQy">
								<Elements>
									<CheckoutForm
										payment={this.showModal}
										savePlayer={this.savePlayer}
									/>
								</Elements>
							</StripeProvider>
						</section>
						{this.state.showModal.done && (
							<Dialog
								toggleDialog={this.closeModal}
								confetti={this.state.explosion}
								buttonText="New Game"
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
							<Dialog toggleDialog={this.closeModal} buttonText="Main Menu">
								<H3 style={"margin: 0 0 10px 0;"}>Game Over</H3>
								<p>{this.state.errorMessage}</p>
								<p>Your card was not charged.</p>
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
