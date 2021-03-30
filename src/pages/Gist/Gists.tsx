import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Icon from '../../components/Icon/Icon';
import Table from '../../components/Table/Table';
import { GIST_ACTION_TYPES } from '../../constants/action_types';
import { useAuthContext } from '../../context/AuthContext';
import { useGistContext } from '../../context/GistContext';
import { useUserContext } from '../../context/UserContext';
import { deleteGist, getUserGists } from '../../utils';
import { Div } from './Style';

const Gist: React.FC = () => {
    const { state } = useUserContext();
    const { gistState, gistDispatch } = useGistContext();
    const { authState } = useAuthContext();

    const history = useHistory();

    const [pageNum, setPageNum] = useState(1);

    const perPage = 5;
    const last = pageNum * perPage;
    const first = last - perPage;
    const gists = gistState.data.slice(first, last);
    const lastPage: number = Math.ceil(gistState.data.length / perPage);

    /*
        CRUD function handlers
    */
    const addNewGist = useCallback(() => {
        history.push('/create');
    }, [history]);

    const handleGistEdit = useCallback((id: string) => {
        history.push(`/edit/${id}`);
    }, [history]);

    const handleGistDelete = useCallback((id: string) => {
        if (authState.token !== null) {
            deleteGist(authState.token, id).then((response) => {
                if (response['status'] === 200 || response['status'] === 204) {
                    gistDispatch({ type: GIST_ACTION_TYPES.DELETE_GIST, payload: { id: id } });

                    alert('Gist deleted successfully');
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [gistDispatch, authState]);

    // --------------------------------------

    /*
        Page navigation button handlers
    */
    const handleNextPage = useCallback(() => {
        if (pageNum < lastPage) {
            setPageNum(pageNum + 1);
        }
    }, [pageNum, lastPage]);

    const handlePrevPage = useCallback(() => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    }, [pageNum]);

    // -------------------------------------

    useEffect(() => {
        const { login } = state;

        if (login !== undefined && login !== null) {
            if (authState.token !== null) {
                getUserGists(login, authState.token).then((data) => {
                    gistDispatch({ type: GIST_ACTION_TYPES.SET_GISTS, payload: data });
                });
            }
        }
    }, [state, gistDispatch, authState.token]);

    return (
        <Div className="container mt-5 mb-5">
            {
                authState.loggedIn && (
                    <Div className="text-right mb-2">
                        <Icon icon="fa fa-plus" fontSize={10} title="Ceate gist" handleClick={addNewGist} />
                    </Div>
                )
            }

            <Table gists={gists} loggedIn={authState.loggedIn} handleGistEdit={handleGistEdit} handleGistDelete={handleGistDelete} />

            <Div className="text-center mt-2">
                <Icon icon="fa fa-arrow-left" fontSize={9} title="Previous Page" handleClick={handlePrevPage} />
                <Icon icon="fa fa-arrow-right" fontSize={9} title="Next Page" handleClick={handleNextPage} />
            </Div>
        </Div>
    );
}

export default Gist;