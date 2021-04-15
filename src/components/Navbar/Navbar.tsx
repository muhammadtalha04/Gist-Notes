import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Headings from '../../constants/headings';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { Div, Nav, DropdownButton, DropdownWrapper, RightDiv, Dropdown, DropdownItem, Bold, HR, DropdownItemHover } from './Style';
import { getClientId } from '../../utils';
import Text from '../Text/Text';
import { Colors } from '../../constants/colors';
import { AUTH_ACTION_TYPES, USER_ACTION_TYPES } from '../../constants/action_types';
import Image from '../Image/Image';
import { URLS } from '../../router/urls';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const Navbar: React.FC = () => {
    const clientId = getClientId();
    const [search, changeSearch] = useState("");
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const dispatch = useDispatch();
    const [htmlUrl, loggedIn, avatarUrl, name, login] = useSelector((state: RootState) => [
        state.user.html_url,
        state.auth.loggedIn,
        state.user.avatar_url,
        state.user.name,
        state.user.login
    ]);

    const addNewGist = useCallback(() => {
        history.push(URLS.CreateGist);
    }, [history]);

    const viewProfile = useCallback(() => {
        window.location.href = htmlUrl;
    }, [htmlUrl]);

    const viewUserGists = useCallback(() => {
        history.push(URLS.UserGists);
    }, [history]);

    const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        changeSearch(event.target.value);
    }, []);

    const handleLogin = useCallback(() => {
        const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist`;
        window.location.href = url;
    }, [clientId]);

    const handleLogout = useCallback(() => {
        dispatch({ type: USER_ACTION_TYPES.LOGOUT });
        dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
        history.push(URLS.Default);
    }, [history, dispatch]);

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
                    <Input value={search} handleInputChange={handleSearch} placeholder={Headings.SearchBoxPlaceholder} />

                    {
                        (loggedIn) ?
                            (
                                <DropdownWrapper className="dropdown">
                                    <DropdownButton onClick={handleToggleDropdown}>
                                        <Image source={avatarUrl} altText={name} profile={"false"} />
                                    </DropdownButton>

                                    {
                                        open && (
                                            <Dropdown>
                                                <DropdownItem>
                                                    Signed in as <Bold>{(login.length > 12) ? login.substring(0, 12) + "..." : login}</Bold>
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