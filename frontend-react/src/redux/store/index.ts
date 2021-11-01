import { useDispatch as useReduxDispatch, useSelector as useBaseSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { ThunkAction } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import type { Action } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const loggerMiddleware = createLogger({});

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: [],
    },
  }),
];

if (process.env.NODE_ENV === 'development') {
  middleware.push(loggerMiddleware);
}

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.REACT_APP_ENABLE_REDUX_DEV_TOOLS === 'true',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector;

export default store;
