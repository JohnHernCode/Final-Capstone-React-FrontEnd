import { combineReducers } from 'redux'
import MeasurementReducer from './measurement'
import SubjectReducer from './subjects'
import userReducer from './users'


const rootReducer = combineReducers({
  measurement: MeasurementReducer,
  user: userReducer,
  subject: SubjectReducer,
});

export default rootReducer;
