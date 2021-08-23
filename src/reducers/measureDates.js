const defaultMeasureDatesState = [];

const measureDatesReducer = (state = defaultMeasureDatesState, action) => {
  switch (action.type) {
    case 'ADD_MEASURE_DATES':
      return action.measureDates;
    case 'REMOVE_ALL_MEASURE_DATES':
      return defaultMeasureDatesState;
    default:
      return state;
  }
};
export default measureDatesReducer;
