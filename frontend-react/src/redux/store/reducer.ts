import { combineReducers } from '@reduxjs/toolkit';
import { reducer as counterReducer } from '../slices/counter';
import { reducer as appReducer } from '../slices/app';
import { reducer as channelReducer } from '../slices/channels';
import { reducer as messageReducer } from '../slices/messages';

const rootReducer = combineReducers({
  counter: counterReducer,
  app: appReducer,
  channels: channelReducer,
  messages: messageReducer,
});

export default rootReducer;
