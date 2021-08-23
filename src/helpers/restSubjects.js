import {sendRequestWithData, sendRequestWithoutData} from '../api/api';

export const getSubjects = async () => {
  return await sendRequestWithoutData('get', 'subjects')
      .then((response) => response.data).catch((error) => error);
};

export const updateSubject = async (id, title, unit, icon, target) => {
  return await sendRequestWithData('put', `subjects/${id}`, {
    subject: {
      title, unit, icon, target,
    },
  })
      .then((response) => response.data).catch((error) => error);
};

export const addNewSubject = async (title, unit, icon, target) => {
  return await sendRequestWithData('post', 'subjects', {
    subject: {
      title, unit, icon, target,
    },
  })
      .then((response) => response).catch((error) => error);
};

export const removeSubjectFromDB = async (id) => {
  return await sendRequestWithoutData('delete', `subjects/${id}`)
      .then((response) => response).catch((error) => error);
};
