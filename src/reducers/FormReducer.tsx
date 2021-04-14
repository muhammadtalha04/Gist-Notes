import { Action, FormState, FormActionTypes } from '../utils/types';

export const formReducer = (state: FormState, action: Action) => {
    switch (action.type) {
        case FormActionTypes.SET_FILE_NAME:
            return { ...state, fileName: action.payload.fileName };

        case FormActionTypes.SET_DESCRIPTION:
            return { ...state, description: action.payload.description };

        case FormActionTypes.SET_CONTENT:
            return { ...state, content: action.payload.content };

        case FormActionTypes.SET_HEADING:
            return { ...state, heading: action.payload.heading };

        default:
            return { ...state };
    }
}