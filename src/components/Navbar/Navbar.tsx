import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Headings from '../../constants/headings';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { Div, Nav, RightDiv } from './Style';
import { getClientId } from '../../utils';
import { useUserContext } from '../../context/UserContext';
import Text from '../Text/Text';
import { Colors } from '../../constants/colors';
import { useAuthContext } from '../../context/AuthContext';
import { AUTH_ACTION_TYPES } from '../../constants/action_types';

const Navbar: React.FC = () => {
    const clientId = getClientId();
    const [search, changeSearch] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    const { userDispatch } = useUserContext();
    const { authState, authDispatch } = useAuthContext();
    const history = useHistory();

    const handleSearch = useCallback(() => {
        changeSearch(searchRef.current!.value);
    }, [searchRef]);

    const handleLogin = useCallback(() => {
        const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist`;
        window.location.href = url;
    }, [clientId]);

    const handleLogout = useCallback(() => {
        userDispatch({ type: "LOGOUT", payload: {} })
        authDispatch({ type: AUTH_ACTION_TYPES.LOGOUT, payload: {} })
        history.push('/');
    }, [authDispatch, userDispatch, history]);

    const handleNavToHome = useCallback(() => {
        history.push('/');
    }, [history]);

    return (
        <Nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <Div className="container">
                <Text text={Headings.TITLE} fontWeight="600" color={Colors.PRIMARY.color} classN="navbar-brand" fontSize="16" handleClick={handleNavToHome} />

                <RightDiv>
                    <Input reference={searchRef} value={search} handleInputChange={handleSearch} placeholder={Headings.SearchBoxPlaceholder} />

                    {(authState.loggedIn) ? (<Button onClickHandle={handleLogout} text={Headings.Logout} />) : (<Button onClickHandle={handleLogin} text={Headings.Login} />)}
                </RightDiv>
            </Div>
        </Nav>
    );
}

export default Navbar;