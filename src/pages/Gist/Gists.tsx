import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Icon from '../../components/Icon/Icon';
import Table from '../../components/Table/Table';
import { GistContext } from '../../context/GistContext';
import { UserContext } from '../../context/UserContext';
import { generatePageNums, getUserGists } from '../../utils';
import { GIST_ACTION_TYPES } from '../../utils/types';
import { Div } from './Style';

const Gist: React.FC = () => {
    const { state } = UserContext();
    const { gistState, gistDispatch } = GistContext();

    const history = useHistory();

    const [loggedIn, setLoggedIn] = useState(false);
    const [pageNum, setPageNum] = useState(1);

    const perPage = 5;
    const last = pageNum * perPage;
    const first = last - perPage;
    const gists = gistState.data.slice(first, last);
    const pageNums: number[] = generatePageNums(gistState.data.length, perPage);

    const addNewGist = () => {
        history.push('/create');
    }

    const handleNextPage = useCallback(() => {
        if (pageNum < pageNums.length) {
            setPageNum(pageNum + 1);
        }
    }, [pageNum, pageNums.length]);

    const handlePrevPage = useCallback(() => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    }, [pageNum]);

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
            <Table gists={gists} />

            <Div className="text-center mt-2">
                <Icon icon="fa fa-arrow-left" fontSize={9} title="Previous Page" handleClick={handlePrevPage} />
                <Icon icon="fa fa-arrow-right" fontSize={9} title="Next Page" handleClick={handleNextPage} />
            </Div>
        </Div>
    );
}

export default Gist;