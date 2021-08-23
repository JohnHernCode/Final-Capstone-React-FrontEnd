const defaultMeasureState = [];

const MeasureReducer = (state = defaultMeasureState, action) => {
  switch (action.type) {
    case 'ADD_MEASURE':
      return action.measures;
    case 'REMOVE_ALL_MEASURES':
      return defaultMeasureState;
    default:
      return state;
  }
};
export default MeasureReducer;
