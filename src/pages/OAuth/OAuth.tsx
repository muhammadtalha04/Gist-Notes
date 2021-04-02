import React, { useEffect, useState } from 'react';
import { parse } from 'querystring';
import { getUser } from '../../utils';
import { BounceLoader } from 'react-spinners';
import { Redirect } from 'react-router';
import { Div } from './Style';
import { useUserContext } from '../../context/UserContext';
import { useAuthContext } from '../../context/AuthContext';
import { AUTH_ACTION_TYPES } from '../../constants/action_types';
import { URLS } from '../../router/urls';

const OAuth: React.FC = () => {
    const { userDispatch } = useUserContext();
    const [loading, setLoading] = useState(true);
    const { authState, authDispatch } = useAuthContext();

    useEffect(() => {
        const queryString = window.location.search;
        const { access_token } = parse(queryString, "?");

        if (authState.token === null) {
            authDispatch({ type: AUTH_ACTION_TYPES.LOGIN, payload: access_token.toString() });
        } else {
            getUser(access_token.toString()).then((data) => {
                userDispatch({ type: "LOGIN", payload: data });
                setLoading(false);
            });
        }
    }, [authState, authDispatch, userDispatch]);

    return (
        <React.Fragment>
            <Div className="container text-center">
                {loading ? <BounceLoader></BounceLoader> : <Redirect to={URLS.Default} />}
            </Div>
        </React.Fragment>
    );
}

export default OAuth;