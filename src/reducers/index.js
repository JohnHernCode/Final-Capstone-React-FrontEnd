import { combineReducers } from 'redux';
import MeasurementReducer from './tracks';
import measurementDatesReducer from './trackDates';
import itemReducer from './items';
import userReducer from './users';

const rootReducer = combineReducers({
  measurements: MeasurementReducer,
  measurementDates: measurementDatesReducer,
  user: userReducer,
  items: itemReducer,
});

export default rootReducer;
