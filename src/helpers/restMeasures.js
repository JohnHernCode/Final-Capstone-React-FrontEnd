import {sendRequestWithData, sendRequestWithoutData} from '../api/api';

export const getMeasures = async () => {
  return await sendRequestWithoutData('get', 'measures')
      .then((response) => response.data).catch((error) => error);
};

export const addNewMeasure = async (result, subjectId, date) => {
  return await sendRequestWithData('post', 'measures', {record: {result, subjectId, date}})
      .then((response) => response).catch((error) => error);
};

export const updateMeasure = async (id, result, subjectId, date) => {
  return await sendRequestWithData('put', `measures/${id}`, {record: {result, subjectId, date}})
      .then((response) => response).catch((error) => error);
};

export const removeMeasureFromDB = async (id) => {
  return await sendRequestWithoutData('delete', `measures/${id}`)
      .then((response) => response).catch((error) => error);
};
