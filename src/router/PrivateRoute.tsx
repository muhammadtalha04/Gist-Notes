import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { URLS } from './urls';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface PrivateRouteProps extends RouteProps {
    component: React.FC;
}

const PrivateRoute = (props: PrivateRouteProps): React.ReactElement => {
    const { component: Component, ...rest } = props;
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

    const render = (props: PrivateRouteProps) => {
        return (!loggedIn) ?
            (<Redirect to={URLS.Default} />) :
            (<Component {...props} />)
    }

    return (
        <Route {...rest} render={() => render(props)} />
    );

}

export default PrivateRoute;