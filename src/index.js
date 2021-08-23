import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import rootReducer from './reducers';
import AppRouter from './routes/AppRouter';
import { decode } from './api/api';
import { setUser, logIn } from './actions/user';
import { autoLogin } from './api/userAuth';
import './css/index.css';

const store = rootReducer;
const body = (
    <Provider store={store}>
      <AppRouter />
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
  runAutoLogin(decodedToken.user_id).then(r => {});
} else {
  store.dispatch(logIn(false));
}

ReactDOM.render(body, document.getElementById('root'));



