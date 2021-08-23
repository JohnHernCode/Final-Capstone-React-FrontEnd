import { combineReducers } from 'redux'
import MeasurementReducer from './measurement'
import measurementDatesReducer from './measurementDates'
import SubjectReducer from './subjects'
import userReducer from './users'


const rootReducer = combineReducers({
  measurements: MeasurementReducer,
  measurementDates: measurementDatesReducer,
  user: userReducer,
  subjects: SubjectReducer,
});

export default rootReducer;
