import { AUTH_ACTION_TYPES } from "../constants/action_types";
import { Action, AuthState } from "../utils/types";

const initState = {
    token: null,
    loggedIn: false
};

export const AuthReducer = (state: AuthState = initState, action: Action) => {
    switch (action.type) {
        case AUTH_ACTION_TYPES.LOGIN:
            return {
                ...state,
                token: action.payload,
                loggedIn: true
            };

        case AUTH_ACTION_TYPES.LOGOUT:
            return {
                ...state,
                token: null,
                loggedIn: false
            };

        default:
            return state;
    }
}