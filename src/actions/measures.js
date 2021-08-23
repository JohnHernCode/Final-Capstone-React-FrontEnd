export const addMeasures = (measures = []) => ({
  type: 'ADD_MEASURES',
  measures,
});

export const removeAllMeasures = () => ({
  type: 'REMOVE_ALL_MEASURES',
});
