import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { GistReducer } from "../reducers/GistReducer";
import { Action, GistState } from "../utils/types";

type GistContextType = {
    gistState: GistState,
    gistDispatch: Dispatch<Action>
};

const initialState = {
    gistState: {
        data: []
    },
    gistDispatch: () => undefined
};

const Gists = createContext<GistContextType>(initialState);

type GistProviderProps = {
    children: JSX.Element | JSX.Element[]
}

export const GistProvider: React.FC<GistProviderProps> = ({ children }) => {
    const [gistState, gistDispatch] = useReducer(GistReducer, { data: [] });

    return (
        <Gists.Provider value={{ gistState, gistDispatch }}>
            {children}
        </Gists.Provider>
    );
}

export const GistContext = () => useContext(Gists);
