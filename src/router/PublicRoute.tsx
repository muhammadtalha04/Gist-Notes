import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface PublicRouteProps extends RouteProps {
    component: React.FC;
}

const PublicRoute = (props: PublicRouteProps): React.ReactElement => {
    const { component: Component, ...rest } = props;

    const render = (props: PublicRouteProps) => {
        return (<Component {...props} />)
    }

    return (
        <Route {...rest} render={() => render(props)} />
    );

}

export default PublicRoute;