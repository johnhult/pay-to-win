import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'unistore/full/preact'; // For SSR: 'unistore/full/react'
import Routes from 'routes/index';

import store from 'store/store';
import persistStore from 'unissist';
import localStorageAdapter from 'unissist/integrations/localStorageAdapter';

const ClientSideApp = () => {
	const adapter = localStorageAdapter();
	persistStore(store, adapter);

	return (
		<BrowserRouter location={store.getState().url}>
			<Provider store={store}>
				<Routes initialRoute={store.getState().url} />
			</Provider>
		</BrowserRouter>
	);
};

ReactDOM.render(<ClientSideApp />, document.querySelector('#root'));

// For SSR, use:
// ReactDOM.hydrate(<ClientSideApp />, document.querySelector('#root'));