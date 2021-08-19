export const addMeasurements = (measurements = []) => ({
  type: 'ADD_MEASUREMENTS',
  measurements,
});

export const removeAllMeasurements = () => ({
  type: 'REMOVE_ALL_MEASUREMENTS',
});
