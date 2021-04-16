import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import GridView from '../../components/GridView/GridView';
import Icon from '../../components/Icon/Icon';
import Pagination from '../../components/Pagination/Pagination';
import Table from '../../components/Table/Table';
import { GIST_ACTION_TYPES } from '../../constants/action_types';
import { deleteGist, forkGist, getPublicGists, starGist } from '../../utils';
import { Container, Div } from './Style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const Gist: React.FC = () => {
    const dispatch = useDispatch();
    const [gistState, token, loggedIn, login] = useSelector((state: RootState) => [
        state.gist,
        state.auth.token,
        state.auth.loggedIn,
        state.user.login
    ]);

    const [layoutType, setLayout] = useState("list");

    const history = useHistory();

    const [pageNum, setPageNum] = useState(1);

    const perPage = 8;
    const last = pageNum * perPage;
    const first = last - perPage;
    const gists = gistState.data.slice(first, last);
    const lastPage: number = Math.ceil(gistState.data.length / perPage);

    /*
        CRUD function handlers
    */
    const handleGistView = useCallback((id: string) => {
        history.push(`/gist/${id}`);
    }, [history]);

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

    // To toggle the layout view
    const toggleLayout = useCallback((layout: string) => {
        setLayout(layout);
    }, [setLayout]);
    // -------------------------------------

    // Memoized variable for displaying gists
    const renderGists = useMemo(() => {
        return layoutType === "list" ?
            (
                <Table
                    gists={gists}
                    loggedIn={loggedIn}
                    username={login}
                    handleGistView={handleGistView}
                    handleGistEdit={handleGistEdit}
                    handleGistDelete={handleGistDelete}
                    handleGistStar={handleGistStar}
                    handleGistFork={handleGistFork}
                />
            )
            :
            (
                <GridView
                    gists={gists}
                    handleGistEdit={handleGistEdit}
                    handleGistDelete={handleGistDelete}
                    handleGistFork={handleGistFork}
                    handleGistStar={handleGistStar}
                    handleGistView={handleGistView}
                />
            )
    }, [layoutType, gists, loggedIn, login, handleGistView, handleGistEdit, handleGistDelete, handleGistFork, handleGistStar]);
    // -------------------------------------

    useEffect(() => {
        if (login !== undefined && login !== null) {
            if (token !== null) {
                getPublicGists(token).then((data) => {
                    dispatch({ type: GIST_ACTION_TYPES.SET_GISTS, payload: data });
                });
            }
        }
    }, [token, dispatch, login]);

    return (
        <Container className="container-fluid mt-5 mb-5">
            <Div className="text-right mb-2">
                <Icon icon="fa fa-list" simple={true} fontSize={11} title="List" border={true} handleClick={() => toggleLayout("list")} />
                <Icon icon="fa fa-th" simple={true} fontSize={11} title="Grid" handleClick={() => toggleLayout("grid")} />
            </Div>

            {
                renderGists
            }

            <Pagination
                pageNum={pageNum}
                lastPage={lastPage}
                onClickPrevPage={handlePrevPage}
                onClickNextPage={handleNextPage}
            />
        </Container>
    );
}

export default Gist;