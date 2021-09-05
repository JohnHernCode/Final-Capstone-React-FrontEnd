import { sendRequestWithData, sendRequestWithoutData } from '../api/api';

export const getItems = async () => sendRequestWithoutData('get', 'items')
  .then((response) => response.data).catch((error) => error);

export const updateItem = async (id, title, unit, icon, target) => sendRequestWithData('put', `items/${id}`, {
  item: {
    title, unit, icon, target,
  },
})
  .then((response) => response.data).catch((error) => error);

export const addNewItem = async (title, unit, icon, target) => sendRequestWithData('post', 'items', {
  item: {
    title, unit, icon, target,
  },
})
  .then((response) => response).catch((error) => error);

export const removeItemFromDB = async (id) => sendRequestWithoutData('delete', `items/${id}`)
  .then((response) => response).catch((error) => error);
