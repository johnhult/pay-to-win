import React from 'react';
import { StaticRouter } from 'react-router';
import { createStore, Provider } from 'unistore/full/react';
import Routes from 'routes/index';
import persistStore from 'unissist';
import localStorageAdapter from 'unissist/integrations/localStorageAdapter';

// Use let rather than const so we can send props in class constructor
let store = createStore({});
const adapter = localStorageAdapter();
persistStore(store, adapter);

export default class ServerApp extends React.Component {
	constructor(props) {
		super(props);
		store = createStore(this.props.initialState);
	}

	render(props) {
		return (
			<StaticRouter location={store.getState().url} context={this.props.context}>
				<Provider store={store}>
					<Routes initialRoute={store.getState().url} />
				</Provider>
			</StaticRouter>
		);
	}
}
