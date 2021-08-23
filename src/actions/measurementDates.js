export const addMeasurementDates = (measurementDates = []) => ({
  type: 'ADD_MEASUREMENT_DATES',
  measurementDates,
});

export const removeAllMeasurementDates = () => ({
  type: 'REMOVE_ALL_MEASUREMENT_DATES',
});
