import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Icon from '../../components/Icon/Icon';
import Table from '../../components/Table/Table';
import { GIST_ACTION_TYPES } from '../../constants/action_types';
import { useGistContext } from '../../context/GistContext';
import { useUserContext } from '../../context/UserContext';
import { deleteGist, getUserGists } from '../../utils';
import { Div } from './Style';

const Gist: React.FC = () => {
    const { state } = useUserContext();
    const { gistState, gistDispatch } = useGistContext();

    const history = useHistory();

    const [loggedIn, setLoggedIn] = useState(false);
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
        const token = window.localStorage.getItem("token");

        if (token !== null) {
            deleteGist(token, id).then((response) => {
                if (response['status'] === 200 || response['status'] === 204) {
                    gistDispatch({ type: GIST_ACTION_TYPES.DELETE_GIST, payload: { id: id } });

                    alert('Gist deleted successfully');
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [gistDispatch]);

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
        const { username } = state;

        if (username !== undefined && username !== null) {
            const token = window.localStorage.getItem('token');
            setLoggedIn(true);

            if (token !== null) {
                getUserGists(username, token).then((data) => {
                    gistDispatch({ type: GIST_ACTION_TYPES.SET_GISTS, payload: data });
                });
            }
        } else {
            setLoggedIn(false);
        }
    }, [state, loggedIn, gistDispatch]);

    return (
        <Div className="container mt-5 mb-5">
            {
                loggedIn && (
                    <Div className="text-right mb-2">
                        <Icon icon="fa fa-plus" fontSize={10} title="Ceate gist" handleClick={addNewGist} />
                    </Div>
                )
            }

            <Table gists={gists} loggedIn={loggedIn} handleGistEdit={handleGistEdit} handleGistDelete={handleGistDelete} />

            <Div className="text-center mt-2">
                <Icon icon="fa fa-arrow-left" fontSize={9} title="Previous Page" handleClick={handlePrevPage} />
                <Icon icon="fa fa-arrow-right" fontSize={9} title="Next Page" handleClick={handleNextPage} />
            </Div>
        </Div>
    );
}

export default Gist;