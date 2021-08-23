import { sendRequestWithData, sendRequestWithoutData } from '../api/api';

export const getSubjects = async () => {
  const response = await sendRequestWithoutData('get', 'subjects')
      .then((response) => response.data).catch((error) => error);
  return response;
};

export const updateSubject = async (id, title, unit, icon, target) => {
  const response = await sendRequestWithData('put', `subjects/${id}`, {
    item: {
      title, unit, icon, target,
    },
  })
      .then((response) => response.data).catch((error) => error);
  return response;
};

export const addNewSubject = async (title, unit, icon, target) => {
  const response = await sendRequestWithData('post', 'subjects', {
    item: {
      title, unit, icon, target,
    },
  })
      .then((response) => response).catch((error) => error);
  return response;
};

export const removeSubjectFromDB = async (id) => {
  const response = await sendRequestWithoutData('delete', `subjects/${id}`)
      .then((response) => response).catch((error) => error);
  return response;
};
