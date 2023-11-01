import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selector: TypedUseSelectorHook<RootState>=useSelector;