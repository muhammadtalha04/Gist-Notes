import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { URLS } from './urls';

interface PrivateRouteProps extends RouteProps {
    component: React.FC;
}

const PrivateRoute = (props: PrivateRouteProps): React.ReactElement => {
    const { component: Component, ...rest } = props;
    const { authState } = useAuthContext();

    const render = (props: PrivateRouteProps) => {
        return (!authState.loggedIn) ?
            (<Redirect to={URLS.Default} />) :
            (<Component {...props} />)
    }

    return (
        <Route {...rest} render={() => render(props)} />
    );

}

export default PrivateRoute;