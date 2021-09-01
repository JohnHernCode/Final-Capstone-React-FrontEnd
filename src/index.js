import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import setStore from './store/setupStore';
import './css/index.css';
import AppRoutes from './routes/AppRoutes';

const store = setStore();
const body = (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);

ReactDOM.render(body, document.getElementById('root'));
