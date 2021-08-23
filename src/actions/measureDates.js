export const addMeasureDates = (measureDates = []) => ({
  type: 'ADD_MEASURE_DATES',
  measureDates,
});

export const removeAllMeasureDates = () => ({
  type: 'REMOVE_ALL_MEASURE_DATES',
});
