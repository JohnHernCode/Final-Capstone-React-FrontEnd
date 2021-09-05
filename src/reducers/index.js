import { combineReducers } from 'redux';
import userReducer from './users';
import itemReducer from './items';
import tracksReducer from './tracks';
import trackDatesReducer from './trackDates';

const rootReducer = combineReducers({
  user: userReducer,
  items: itemReducer,
  tracks: tracksReducer,
  trackDates: trackDatesReducer,
});

export default rootReducer;
