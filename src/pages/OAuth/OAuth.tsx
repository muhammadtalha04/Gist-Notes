import React, { useEffect, useState } from 'react';
import { parse } from 'querystring';
import { createSession, getUser } from '../../utils';
import { BounceLoader } from 'react-spinners';
import { Redirect } from 'react-router';
import { Div } from './Style';
import { UserContext } from '../../context/UserContext';

const OAuth: React.FC = () => {
    const { userDispatch } = UserContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const queryString = window.location.search;
        const { access_token } = parse(queryString, "?");

        createSession(access_token.toString());
        getUser(access_token.toString()).then((data) => {
            userDispatch({ type: "LOGIN", payload: data });
            window.localStorage.setItem("user", JSON.stringify(data));
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Div className="container text-center">
                {loading ? <BounceLoader></BounceLoader> : <Redirect to="/" />}
            </Div>
        </React.Fragment>
    );
}

export default OAuth;