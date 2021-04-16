import { createStore } from 'redux';
import { RootReducer } from '../reducers/RootReducer';

const store = createStore(RootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

export type RootState = ReturnType<typeof store.getState>;

export default store;