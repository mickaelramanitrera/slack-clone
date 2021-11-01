import { combineReducers } from '@reduxjs/toolkit';
import { reducer as counterReducer } from '../slices/counter';
import { reducer as appReducer } from '../slices/app';

const rootReducer = combineReducers({
  counter: counterReducer,
  app: appReducer,
});

export default rootReducer;
