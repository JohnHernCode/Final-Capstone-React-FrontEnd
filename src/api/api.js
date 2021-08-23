import axios from 'axios';
import originDecode from 'jwt-decode';
import originMoment from 'moment';
import baseUrl from './baseUrl';
import authHeaders from './authHeaders';

export const sendRequestWithData = async (method, path, data) => {
  return await axios[method](`${baseUrl}/${path}`, data, authHeaders());
};

export const sendRequestWithoutData = async (method, path) => {
  return await axios[method](`${baseUrl}/${path}`, authHeaders());
};

export const moment = (param) => originMoment(param);
export const decode = (param) => originDecode(param);
