import React, { useEffect, useState } from 'react';
import { parse } from 'querystring';
import { getUser } from '../../utils';
import { BounceLoader } from 'react-spinners';
import { Redirect } from 'react-router';
import { Div } from './Style';
import { AUTH_ACTION_TYPES, USER_ACTION_TYPES } from '../../constants/action_types';
import { URLS } from '../../router/urls';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const OAuth: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const [token] = useSelector((state: RootState) => [
        state.auth.token
    ]);

    useEffect(() => {
        const queryString = window.location.search;
        const { access_token } = parse(queryString, "?");

        if (token === null) {
            dispatch({ type: AUTH_ACTION_TYPES.LOGIN, payload: access_token.toString() });
        } else {
            getUser(access_token.toString()).then((data) => {
                dispatch({ type: USER_ACTION_TYPES.LOGIN, payload: data });
                setLoading(false);
            });
        }
    }, [token, dispatch]);

    return (
        <React.Fragment>
            <Div className="container text-center">
                {loading ? <BounceLoader></BounceLoader> : <Redirect to={URLS.Default} />}
            </Div>
        </React.Fragment>
    );
}

export default OAuth;