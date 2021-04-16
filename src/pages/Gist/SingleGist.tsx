import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { GIST_ACTION_TYPES } from '../../constants/action_types';
import { URLS } from '../../router/urls';
import { deleteGist, forkGist, getGistData, starGist } from '../../utils';
import { Gist } from '../../types';
import { Div } from './Style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Params {
    id: string;
}

const SingleGist: React.FC = () => {
    const initGist: Gist = { id: "", files: {}, owner: { login: "", avatar_url: "" }, updated_at: "", description: "" };
    const [gist, setGist] = useState(initGist);
    const history = useHistory();
    const match = useRouteMatch<Params>(URLS.SingleGist);

    const dispatch = useDispatch();
    const [token, data] = useSelector((state: RootState) => [
        state.auth.token,
        state.gist.data
    ]);

    const handleGistEdit = useCallback((id: string) => {
        history.push(`/edit/${id}`);
    }, [history]);

    const handleGistDelete = useCallback((id: string) => {
        if (token !== null) {
            deleteGist(token, id).then((response) => {
                if (response['status'] === 200 || response['status'] === 204) {
                    dispatch({ type: GIST_ACTION_TYPES.DELETE_GIST, payload: { id: id } });

                    alert('Gist deleted successfully');
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [token, dispatch]);

    const handleGistStar = useCallback((id: string) => {
        if (token !== null) {
            starGist(token, id).then((data) => {
                // console.log(data);
                alert('Gist starred successfully');
            });
        }
    }, [token]);

    const handleGistFork = useCallback((id: string) => {
        if (token !== null) {
            forkGist(token, id).then((data) => {
                // console.log(data);
                dispatch({ type: GIST_ACTION_TYPES.ADD_GIST, payload: data });

                alert('Gist forked successfully');
            });
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (match !== null) {
            const gistRecord = getGistData(match.params.id, data);

            if (gistRecord !== null && gist.id === "") {
                setGist(gistRecord);
            } else if (gistRecord === null) {
                history.push(URLS.Default);
            }
        }
    }, [gist, match, history, data, setGist]);

    return (
        <Div className="container mt-5 mb-5">
            <Card
                gist={gist}
                singleGist={true}
                handleGistEdit={() => handleGistEdit(gist.id)}
                handleGistDelete={() => handleGistDelete(gist.id)}
                handleGistStar={() => handleGistStar(gist.id)}
                handleGistFork={() => handleGistFork(gist.id)}
            />
        </Div>
    );
}

export default SingleGist;