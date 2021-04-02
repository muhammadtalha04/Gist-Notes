import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Headings from '../../constants/headings';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { Div, Nav, DropdownButton, DropdownWrapper, RightDiv, Dropdown, DropdownItem, Bold, HR, DropdownItemHover } from './Style';
import { getClientId } from '../../utils';
import { useUserContext } from '../../context/UserContext';
import Text from '../Text/Text';
import { Colors } from '../../constants/colors';
import { useAuthContext } from '../../context/AuthContext';
import { AUTH_ACTION_TYPES } from '../../constants/action_types';
import Image from '../Image/Image';
import { URLS } from '../../router/urls';

const Navbar: React.FC = () => {
    const clientId = getClientId();
    const [search, changeSearch] = useState("");
    const [open, setOpen] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const { state, userDispatch } = useUserContext();
    const { authState, authDispatch } = useAuthContext();
    const history = useHistory();

    const addNewGist = useCallback(() => {
        history.push(URLS.CreateGist);
    }, [history]);

    const viewProfile = useCallback(() => {
        window.location.href = state.html_url;
    }, [state.html_url]);

    const viewUserGists = useCallback(() => {
        history.push(URLS.UserGists);
    }, [history]);

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
        history.push(URLS.Default);
    }, [authDispatch, userDispatch, history]);

    const handleNavToHome = useCallback(() => {
        history.push(URLS.Default);
    }, [history]);

    const handleToggleDropdown = useCallback(() => {
        setOpen(!open);
    }, [open]);

    return (
        <Nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <Div className="container-fluid">
                <Text text={Headings.TITLE} fontWeight="600" color={Colors.PRIMARY.color} classN="navbar-brand" fontSize="16" handleClick={handleNavToHome} />

                <RightDiv>
                    <Input reference={searchRef} value={search} handleInputChange={handleSearch} placeholder={Headings.SearchBoxPlaceholder} />

                    {
                        (authState.loggedIn) ?
                            (
                                <DropdownWrapper className="dropdown">
                                    <DropdownButton onClick={handleToggleDropdown}>
                                        <Image source={state.avatar_url} altText={state.name} profile={"false"} />
                                    </DropdownButton>

                                    {
                                        open && (
                                            <Dropdown>
                                                <DropdownItem>
                                                    Signed in as <Bold>{(state.login.length > 12) ? state.login.substring(0, 12) + "..." : state.login}</Bold>
                                                </DropdownItem>

                                                <HR />

                                                <DropdownItemHover onClick={viewUserGists}>Your gists</DropdownItemHover>

                                                <DropdownItemHover>Starred gists</DropdownItemHover>

                                                <DropdownItemHover onClick={addNewGist}>Create new gist</DropdownItemHover>

                                                <HR />

                                                <DropdownItemHover onClick={viewProfile}>Your github profile</DropdownItemHover>

                                                <HR />

                                                <DropdownItemHover onClick={handleLogout}>Sign out</DropdownItemHover>

                                            </Dropdown>
                                        )
                                    }
                                </DropdownWrapper>
                            ) :
                            (<Button onClickHandle={handleLogin} text={Headings.Login} />)
                    }
                </RightDiv>
            </Div>
        </Nav>
    );
}

export default Navbar;