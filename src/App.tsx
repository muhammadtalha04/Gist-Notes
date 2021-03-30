import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GistProvider } from './context/GistContext';
import { UserProvider } from './context/UserContext';
import Routes from './router/Routes';

const App: React.FC = () => {
	return (
		<UserProvider>
			<GistProvider>
				<Router>
					<Routes />
				</Router>
			</GistProvider>
		</UserProvider>
	);
}

export default App;
