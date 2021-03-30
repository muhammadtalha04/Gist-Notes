import { Action, UserState } from "../utils/types";
import { USER_ACTION_TYPES } from "../constants/action_types";

export const UserReducer = (state: UserState, action: Action) => {
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