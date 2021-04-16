import { Action, UserState } from "../types";
import { USER_ACTION_TYPES } from "../constants/action_types";

const initState = {
    name: "",
    login: "",
    id: 0,
    avatar_url: "",
    url: "",
    html_url: ""
};

export const UserReducer = (state: UserState = initState, action: Action) => {
    switch (action.type) {
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