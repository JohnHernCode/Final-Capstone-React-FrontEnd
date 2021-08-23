import {sendRequestWithData} from './api';

export const signedUp = async (username, password) => {
  return await sendRequestWithData('post', 'users', {user: {username, password}})
      .then((response) => response.data).catch((error) => error);
};

export const loggedIn = async (username, password) => {
  return await sendRequestWithData('post', 'login', {user: {username, password}})
      .then((response) => response.data).catch((error) => error);
};

export const autoLogin = async (userId) => {
  return await sendRequestWithData('post', 'auto_login', {user: {user_id: userId}})
      .then((response) => response.data).catch((error) => error);
};
