import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Card from '../../components/Card/Card';
import Icon from '../../components/Icon/Icon';
import Table from '../../components/Table/Table';
import { GIST_ACTION_TYPES } from '../../constants/action_types';
import { useAuthContext } from '../../context/AuthContext';
import { useGistContext } from '../../context/GistContext';
import { useUserContext } from '../../context/UserContext';
import { deleteGist, forkGist, getPublicGists, starGist } from '../../utils';
import { Container, Div } from './Style';

const Gist: React.FC = () => {
    const { state } = useUserContext();
    const { gistState, gistDispatch } = useGistContext();
    const { authState } = useAuthContext();
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

    const handleGistStar = useCallback((id: string) => {
        if (authState.token !== null) {
            starGist(authState.token, id).then((data) => {
                // console.log(data);
                alert('Gist starred successfully');
            });
        }
    }, [authState]);

    const handleGistFork = useCallback((id: string) => {
        if (authState.token !== null) {
            forkGist(authState.token, id).then((data) => {
                // console.log(data);
                gistDispatch({ type: GIST_ACTION_TYPES.ADD_GIST, payload: data });
                alert('Gist forked successfully');
            });
        }
    }, [authState, gistDispatch]);

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

    const toggleLayout = useCallback((layout: string) => {
        setLayout(layout);
    }, [setLayout]);

    useEffect(() => {
        const { login } = state;

        if (login !== undefined && login !== null) {
            if (authState.token !== null) {
                // getUserGists(login, authState.token).then((data) => {
                //     gistDispatch({ type: GIST_ACTION_TYPES.SET_GISTS, payload: data });
                // });
                getPublicGists(authState.token).then((data) => {
                    gistDispatch({ type: GIST_ACTION_TYPES.SET_GISTS, payload: data });
                });
            }
        }
    }, [state, gistDispatch, authState.token]);

    return (
        <Container className="container-fluid mt-5 mb-5">
            <Div className="text-right mb-2">
                <Icon icon="fa fa-list" simple={true} fontSize={11} title="List" border={true} handleClick={() => toggleLayout("list")} />
                <Icon icon="fa fa-th" simple={true} fontSize={11} title="Grid" handleClick={() => toggleLayout("grid")} />
            </Div>

            {
                layoutType === "list" ?
                    (
                        <Table
                            gists={gists}
                            loggedIn={authState.loggedIn}
                            username={state.login}
                            handleGistView={handleGistView}
                            handleGistEdit={handleGistEdit}
                            handleGistDelete={handleGistDelete}
                            handleGistStar={handleGistStar}
                            handleGistFork={handleGistFork}
                        />
                    )
                    :
                    (
                        <Div className="row mt-3">
                            {
                                gists.map((gist) => {
                                    return (
                                        <Div className="col-sm-3 mb-5" key={gist.id} onClick={() => handleGistView(gist.id)}>
                                            <Card
                                                gist={gist}
                                                singleGist={false}
                                                handleGistEdit={handleGistEdit}
                                                handleGistDelete={handleGistDelete}
                                                handleGistStar={handleGistStar}
                                                handleGistFork={handleGistFork}
                                            />
                                        </Div>
                                    )
                                })
                            }
                        </Div>
                    )
            }


            <Div className="text-center mt-2">
                <Icon simple={false} icon="fa fa-arrow-left" fontSize={9} title="Previous Page" handleClick={handlePrevPage} />
                {
                    pageNum + " of " + ((lastPage > 0) ? lastPage : "1")
                }
                <Icon simple={false} icon="fa fa-arrow-right" fontSize={9} title="Next Page" handleClick={handleNextPage} />
            </Div>
        </Container>
    );
}

export default Gist;