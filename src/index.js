import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import setStore from './store/setupStore';
import { decode } from './api/api';
import { setUser, logIn } from './actions/user';
import { autoLogin } from './api/userAuth';
import './css/index.css';
import AppRoutes from './routes/AppRoutes';

const store = setStore();
const body = (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);

const runAutoLogin = async (userId) => {
  const response = await autoLogin(userId);
  if (response.logged_in) {
    store.dispatch(setUser(response.user));
    store.dispatch(logIn(true));
  } else {
    store.dispatch(logIn(false));
    store.dispatch(setUser({}));
    localStorage.clear();
  }
};

if (localStorage.token) {
  const decodedToken = decode(localStorage.token);
  runAutoLogin(decodedToken.user_id);
} else {
  store.dispatch(logIn(false));
}

ReactDOM.render(body, document.getElementById('root'));
