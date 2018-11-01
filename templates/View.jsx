import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import View from 'containers/View';
import getNewScreen from 'helpers/getNewScreen.mjs';
import setScreenName from 'helpers/setScreenName.mjs';

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
			isLoading: true
		};
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
				window.location = '/login';
			}
		} else {
			await this.initView();
		}
	}

	render() {
		return (
			<View title="Some view">{!this.state.isLoading && <section>Content goes here</section>}</View>
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
