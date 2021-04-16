import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Image from '../../components/Image/Image';
import Text from '../../components/Text/Text';
import { GIST_ACTION_TYPES } from '../../constants/action_types';
import { Colors } from '../../constants/colors';
import Headings from '../../constants/headings';
import { deleteGist, forkGist, getUserGists, starGist } from '../../utils';
import { Div, GistsDiv, UserDetailsDiv } from './Style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Gist } from '../../types';

const Profile: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const dispatch = useDispatch();
    const [authState, userState, gistState] = useSelector((state: RootState) => [
        state.auth,
        state.user,
        state.gist
    ]);


    const viewProfile = useCallback(() => {
        window.location.href = userState.html_url;
    }, [userState.html_url]);

    const handleGistEdit = useCallback((id: string) => {
        history.push(`/edit/${id}`);
    }, [history]);

    const handleGistDelete = useCallback((id: string) => {
        if (authState.token !== null) {
            deleteGist(authState.token, id).then((response) => {
                if (response['status'] === 200 || response['status'] === 204) {
                    dispatch({ type: GIST_ACTION_TYPES.DELETE_GIST, payload: { id: id } });

                    alert('Gist deleted successfully');
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [dispatch, authState]);

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
                dispatch({ type: GIST_ACTION_TYPES.ADD_GIST, payload: data });
                alert('Gist forked successfully');
            });
        }
    }, [authState, dispatch]);

    useEffect(() => {
        if (authState.token !== null) {
            getUserGists(userState.login, authState.token).then((data) => {
                dispatch({ type: GIST_ACTION_TYPES.SET_GISTS, payload: data });
                setLoading(false);
            });
        }
    }, [authState.token, userState.login, dispatch, setLoading]);

    return (
        <Div className="container mt-5 mb-5">
            <Div className="row">
                <UserDetailsDiv className="col-sm-5 text-center">
                    <Div>
                        <Image
                            source={userState.avatar_url}
                            profile={"true"}
                            altText={userState.name}
                        />
                    </Div>

                    <Div className="mt-4">
                        <Text
                            text={userState.name}
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
                        !loading && gistState.data.map((gist: Gist) => {
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