import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Headings from '../../constants/headings';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { Div, Nav, RightDiv } from './Style';
import { getAuthUser, getClientId } from '../../utils';
import { useUserContext } from '../../context/UserContext';
import Text from '../Text/Text';
import { Colors } from '../../constants/colors';

const Navbar: React.FC = () => {
    const clientId = getClientId();
    const [search, changeSearch] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    let user = getAuthUser();
    const { userDispatch } = useUserContext();
    const history = useHistory();

    const handleSearch = useCallback(() => {
        changeSearch(searchRef.current!.value);
    }, [searchRef]);

    const handleLogin = useCallback(() => {
        const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist`;
        window.location.href = url;
    }, [clientId]);

    const handleLogout = useCallback(() => {
        if (user !== false) {
            setLoggedIn(false);
            userDispatch({ type: "LOGOUT", payload: {} })
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
        }
    }, [user, userDispatch]);

    const handleNavToHome = useCallback(() => {
        history.push('/');
    }, [history]);

    useEffect(() => {
        userDispatch({ type: "CURRENT_USER", payload: {} });

        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    return (
        <Nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <Div className="container">
                <Text text={Headings.TITLE} fontWeight="600" color={Colors.PRIMARY.color} classN="navbar-brand" fontSize="16" handleClick={handleNavToHome} />

                <RightDiv>
                    <Input reference={searchRef} value={search} handleInputChange={handleSearch} placeholder={Headings.SearchBoxPlaceholder} />

                    {(loggedIn) ? (<Button onClickHandle={handleLogout} text={Headings.Logout} />) : (<Button onClickHandle={handleLogin} text={Headings.Login} />)}
                </RightDiv>
            </Div>
        </Nav>
    );
}

export default Navbar;