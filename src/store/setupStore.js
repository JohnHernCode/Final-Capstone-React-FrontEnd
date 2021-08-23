import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/users';
import subjectReducer from '../reducers/subjects';
import measureReducer from '../reducers/measure';
import measureDatesReducer from '../reducers/measureDates';

const setStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      subjects: subjectReducer,
      measures: measureReducer,
      measureDates: measureDatesReducer,
    }),
  );
  return store;
};

export default setStore;
