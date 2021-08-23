/* eslint-disable no-return-await */
import { sendRequestWithData, sendRequestWithoutData } from '../api/api';

export const getMeasures = async () => await sendRequestWithoutData('get', 'measures')
  .then((response) => response.data).catch((error) => error);

export const addNewMeasure = async (result, subjectId, date) => await sendRequestWithData('post', 'measures', { record: { result, subjectId, date } })
  .then((response) => response).catch((error) => error);

export const updateMeasure = async (id, result, subjectId, date) => await sendRequestWithData('put', `measures/${id}`, { record: { result, subjectId, date } })
  .then((response) => response).catch((error) => error);

export const removeMeasureFromDB = async (id) => await sendRequestWithoutData('delete', `measures/${id}`)
  .then((response) => response).catch((error) => error);
