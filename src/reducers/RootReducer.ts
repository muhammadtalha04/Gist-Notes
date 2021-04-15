import { combineReducers } from 'redux';
import { AuthReducer } from './AuthReducer';
import { formReducer } from './FormReducer';
import { GistReducer } from './GistReducer';
import { UserReducer } from './UserReducer';

export const RootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    gist: GistReducer,
    form: formReducer
});