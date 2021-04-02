import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Image from '../../components/Image/Image';
import Text from '../../components/Text/Text';
import { GIST_ACTION_TYPES } from '../../constants/action_types';
import { Colors } from '../../constants/colors';
import Headings from '../../constants/headings';
import { useAuthContext } from '../../context/AuthContext';
import { useGistContext } from '../../context/GistContext';
import { useUserContext } from '../../context/UserContext';
import { deleteGist, forkGist, getUserGists, starGist } from '../../utils';
import { Div, GistsDiv, UserDetailsDiv } from './Style';

const Profile: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const { state } = useUserContext();
    const { authState } = useAuthContext();
    const { gistState, gistDispatch } = useGistContext();
    const history = useHistory();

    const viewProfile = useCallback(() => {
        window.location.href = state.html_url;
    }, [state.html_url]);

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

    useEffect(() => {
        if (authState.token !== null) {
            getUserGists(state.login, authState.token).then((data) => {
                gistDispatch({ type: GIST_ACTION_TYPES.SET_GISTS, payload: data });
                setLoading(false);
            });
        }
    }, [authState.token, state.login, gistDispatch, setLoading]);

    return (
        <Div className="container mt-5 mb-5">
            <Div className="row">
                <UserDetailsDiv className="col-sm-5 text-center">
                    <Div>
                        <Image
                            source={state.avatar_url}
                            profile={"true"}
                            altText={state.name}
                        />
                    </Div>

                    <Div className="mt-4">
                        <Text
                            text={state.name}
                            fontWeight={"normal"}
                            color={Colors.SECONDARY.color}
                            fontSize={"16"}
                        />
                    </Div>

                    <Div className="mt-4">
                        <Button text={Headings.ViewProfile} onClickHandle={viewProfile} normal={true} />
                    </Div>
                </UserDetailsDiv>

                <GistsDiv className="col-sm-7">
                    {
                        !loading && gistState.data.map((gist) => {
                            return (
                                <Card
                                    key={gist.id}
                                    gist={gist}
                                    singleGist={true}
                                    handleGistEdit={handleGistEdit}
                                    handleGistDelete={handleGistDelete}
                                    handleGistStar={handleGistStar}
                                    handleGistFork={handleGistFork}
                                />
                            )
                        })
                    }
                </GistsDiv>
            </Div>
        </Div>
    );
}

export default Profile;