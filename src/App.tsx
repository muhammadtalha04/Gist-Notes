import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router/Routes';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<Routes />
			</Router>
		</Provider>
	);
}

export default App;
