const defaultMeasurementDatesState = [];

const measurementDatesReducer = (state = defaultMeasurementDatesState, action) => {
  switch (action.type) {
    case 'ADD_MEASUREMENT_DATES':
      return action.measurementDates;
    case 'REMOVE_ALL_MEASUREMENT_DATES':
      return defaultMeasurementDatesState;
    default:
      return state;
  }
};
export default measurementDatesReducer;
