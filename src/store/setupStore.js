import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/users';
import itemReducer from '../reducers/items';
import tracksReducer from '../reducers/tracks';
import trackDatesReducer from '../reducers/trackDates';

const setStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      items: itemReducer,
      tracks: tracksReducer,
      trackDates: trackDatesReducer,
    }),
  );
  return store;
};

export default setStore;
