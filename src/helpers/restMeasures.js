import { sendRequestWithData, sendRequestWithoutData } from '../api/api';

export const getMeasures = async () => {
  const response = await sendRequestWithoutData('get', 'measures')
      .then((response) => response.data).catch((error) => error);
  return response;
};

export const addNewMeasure = async (result, subjectId, date) => {
  const response = await sendRequestWithData('post', 'measures', { record: { result, subjectId, date } })
      .then((response) => response).catch((error) => error);
  return response;
};

export const updateMeasure = async (id, result, subjectId, date) => {
  const response = await sendRequestWithData('put', `measures/${id}`, { record: { result, subjectId, date } })
      .then((response) => response).catch((error) => error);
  return response;
};

export const removeMeasureFromDB = async (id) => {
  const response = await sendRequestWithoutData('delete', `measures/${id}`)
      .then((response) => response).catch((error) => error);
  return response;
};
