import { FormActionTypes } from '../constants/action_types';
import { Action, FormState } from '../utils/types';

const initState = {
    fileName: "",
    description: "",
    content: "",
    heading: ""
};

export const formReducer = (state: FormState = initState, action: Action) => {
    switch (action.type) {
        case FormActionTypes.SET_FILE_NAME:
            return { ...state, fileName: action.payload.fileName };

        case FormActionTypes.SET_DESCRIPTION:
            return { ...state, description: action.payload.description };

        case FormActionTypes.SET_CONTENT:
            return { ...state, content: action.payload.content };

        case FormActionTypes.SET_HEADING:
            return { ...state, heading: action.payload.heading };

        case FormActionTypes.CLEAR_FORM:
            return {
                ...state,
                fileName: "",
                description: "",
                content: "",
            };

        default:
            return { ...state };
    }
}