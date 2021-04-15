import { configureStore } from '@reduxjs/toolkit';
import { } from 'react-redux';
import { RootReducer } from '../reducers/RootReducer';

const store = configureStore({ reducer: RootReducer });

export type RootState = ReturnType<typeof store.getState>;

export default store;