const defaultMeasurementState = [];

const MeasurementReducer = (state = defaultMeasurementState, action) => {
  switch (action.type) {
    case 'ADD_MEASUREMENT':
      return action.measurement;
    case 'REMOVE_ALL_MEASUREMENTS':
      return defaultMeasurementState;
    default:
      return state;
  }
};
export default MeasurementReducer;
