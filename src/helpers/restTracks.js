import { sendRequestWithData, sendRequestWithoutData } from '../api/api';

export const getTracks = async () => sendRequestWithoutData('get', 'records')
  .then((response) => response.data).catch((error) => error);

export const addNewTrack = async (result, itemId, date) => sendRequestWithData('post', 'records', { record: { result, itemId, date } })
  .then((response) => response).catch((error) => error);

export const updateTrack = async (id, result, itemId, date) => sendRequestWithData('put', `records/${id}`, { record: { result, itemId, date } })
  .then((response) => response).catch((error) => error);

export const removeTrackFromDB = async (id) => sendRequestWithoutData('delete', `records/${id}`)
  .then((response) => response).catch((error) => error);
