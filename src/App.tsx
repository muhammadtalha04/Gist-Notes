import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FormProvider } from './context/FormContext';
import { GistProvider } from './context/GistContext';
import { UserProvider } from './context/UserContext';
import Routes from './router/Routes';

const App: React.FC = () => {
	return (
		<AuthProvider>
			<UserProvider>
				<GistProvider>
					<FormProvider>
						<Router>
							<Routes />
						</Router>
					</FormProvider>
				</GistProvider>
			</UserProvider>
		</AuthProvider>
	);
}

export default App;
