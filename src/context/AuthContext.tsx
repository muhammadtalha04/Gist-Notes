import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { AuthReducer } from "../reducers/AuthReducer";
import { Action, AuthState } from "../utils/types";

type AuthContextType = {
    authState: AuthState,
    authDispatch: Dispatch<Action>
}

const initialState = {
    authState: {
        token: null,
        loggedIn: false
    },
    authDispatch: () => undefined
};

const Auth = createContext<AuthContextType>(initialState);

type AuthProviderProps = {
    children: JSX.Element | JSX.Element[]
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, authDispatch] = useReducer(AuthReducer, initialState.authState);

    return (
        <Auth.Provider value={{ authState, authDispatch }}>
            {children}
        </Auth.Provider>
    )
}

export const useAuthContext = () => useContext(Auth);