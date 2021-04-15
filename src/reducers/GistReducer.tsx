import { GIST_ACTION_TYPES } from "../constants/action_types";
import { editGistData, removeGist, searchGist } from "../utils";
import { Action, GistState } from "../utils/types";

const initState = {
    data: []
};

export const GistReducer = (state: GistState = initState, action: Action) => {
    switch (action.type) {
        case GIST_ACTION_TYPES.SET_GISTS:
            console.log("Fetch gists");
            return { ...state, data: action.payload };

        case GIST_ACTION_TYPES.ADD_GIST:
            console.log("Add gist");
            return { ...state, data: [action.payload, ...state.data] };

        case GIST_ACTION_TYPES.EDIT_GIST:
            console.log("Edit gist");
            return { ...state, data: editGistData(action.payload['id'], action.payload['data'], state.data) };

        case GIST_ACTION_TYPES.DELETE_GIST:
            console.log("Delete gist");
            return { ...state, data: removeGist(action.payload['id'], state.data) };

        case GIST_ACTION_TYPES.SEARCH_GIST:
            console.log("Search gist");
            return { ...state, data: searchGist(action.payload['id'], state.data) };

        default:
            return state;
    }
}