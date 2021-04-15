import React from 'react';
import { Switch } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
import GistForm from '../pages/Gist/GistForm';
import Gist from '../pages/Gist/Gists';
import SingleGist from '../pages/Gist/SingleGist';
import OAuth from '../pages/OAuth/OAuth';
import Profile from '../pages/User/Profile';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { URLS } from './urls';

const Routes: React.FC = () => {
    return (
        <React.Fragment>
            <Navbar />

            <Switch>
                {/* Public Routes */}
                <PublicRoute exact path={URLS.Default} component={Gist} />
                <PublicRoute exact path={URLS.OAuth} component={OAuth} />

                {/* Private Routes */}
                <PrivateRoute exact path={URLS.SingleGist} component={SingleGist} />
                <PrivateRoute exact path={URLS.CreateGist} component={GistForm} />
                <PrivateRoute exact path={URLS.EditGist} component={GistForm} />
                <PrivateRoute exact path={URLS.UserGists} component={Profile} />
            </Switch>
        </React.Fragment>
    );
}

export default Routes;