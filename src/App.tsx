import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GistProvider } from './context/GistContext';
import { UserProvider } from './context/UserContext';
import Routes from './router/Routes';

const App: React.FC = () => {
	return (
		<AuthProvider>
			<UserProvider>
				<GistProvider>
					<Router>
						<Routes />
					</Router>
				</GistProvider>
			</UserProvider>
		</AuthProvider>
	);
}

export default App;
