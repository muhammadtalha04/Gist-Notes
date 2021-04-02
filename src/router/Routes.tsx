import React from 'react';
import { Route, Switch } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
import CreateGist from '../pages/Gist/CreateGist';
import EditGist from '../pages/Gist/EditGist';
import Gist from '../pages/Gist/Gists';
import SingleGist from '../pages/Gist/SingleGist';
import OAuth from '../pages/OAuth/OAuth';
import Profile from '../pages/User/Profile';

const Routes: React.FC = () => {
    return (
        <React.Fragment>
            <Navbar />

            <Switch>
                <Route exact path="/" render={() => <Gist />} />

                <Route exact path="/gist/:id" component={SingleGist} />

                <Route exact path="/create" render={() => <CreateGist />} />

                <Route exact path="/edit/:id" component={EditGist} />

                <Route exact path="/oauth" render={() => <OAuth />} />

                <Route exact path="/user/gists" render={() => <Profile />} />
            </Switch>
        </React.Fragment>
    );
}

export default Routes;