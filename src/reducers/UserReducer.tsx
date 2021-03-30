import { Action, UserState } from "../utils/types";
import { getAuthUser } from "../utils";

const USER_ACTION_TYPES = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    CURRENT_USER: "CURRENT_USER"
}

export const UserReducer = (state: UserState, action: Action) => {
    switch (action.type) {
        case USER_ACTION_TYPES.CURRENT_USER:
            const user = getAuthUser();

            return {
                ...state,
                name: user.name,
                username: user.login,
                id: user.id,
                avatar: user.avatar_url,
                url: user.url
            };

        case USER_ACTION_TYPES.LOGIN:
            return {
                ...state,
                ...action.payload
            };

        case USER_ACTION_TYPES.LOGOUT:
            return {};

        default:
            return state;
    }
}