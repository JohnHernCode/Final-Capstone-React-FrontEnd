import { sendRequestWithData } from './api';

export const signedUp = async (username, password) => sendRequestWithData('post', 'users', { user: { username, password } })
  .then((response) => response.data).catch((error) => error);

export const loggedIn = async (username, password) => sendRequestWithData('post', 'login', { user: { username, password } })
  .then((response) => response.data).catch((error) => error);
