import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { UserReducer } from "../reducers/UserReducer";
import { Action, UserState } from "../utils/types";

type UserContextType = {
    state: UserState,
    userDispatch: Dispatch<Action>
};

const initialState = {
    state: {
        name: "",
        login: "",
        id: 0,
        avatar: "",
        url: "",
    },
    userDispatch: () => undefined
};

const Users = createContext<UserContextType>(initialState);

type UserProviderProps = {
    children: JSX.Element | JSX.Element[]
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [state, userDispatch] = useReducer(UserReducer, {});

    return (
        <Users.Provider value={{ state, userDispatch }}>
            {children}
        </Users.Provider>
    );
}

export const useUserContext = () => useContext(Users);