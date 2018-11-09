import React from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Loadable from "react-loadable";

//import { getAuthUser } from 'helpers/user.mjs';

/* Note: Loadable may not work correctly in SSR */
const SomeView = Loadable({
	loader: () => import("containers/SomeView"),
	loading: "Loading"
});
const ExamplesView = Loadable({
	loader: () => import("containers/ExamplesView"),
	loading: "Loading"
});

class Routes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {}
		};
	}

	/*
	componentDidMount() {
		const user = getAuthUser();

		this.setState({
			user
		});
	}
	*/

	render() {
		return (
			<Switch>
				<Route exact path="/" render={() => <SomeView />} />
				{/* <Route exact path="/examples" render={() => <ExamplesView />} /> */}
				<Route render={() => <Redirect to="/" />} />
			</Switch>
		);
	}
}

// If you want to set a user and pass it down, use the below pattern
// <Route exact path="/" render={() => <SomeView user={this.state.user} />} />

export default withRouter(Routes);
