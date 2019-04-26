import axios from 'axios';
import { backend } from '../../config';
import api from './api';
import { store } from '../../store';
import { getToken } from '../../store/reducers/auth';

axios.defaults.baseURL = backend.baseUrl;
axios.defaults.timeout = 60000;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// REQUEST DEBUGER

axios.interceptors.request.use(
  request => {
    // console.log('Request success', request);
    const token = getToken(store.getState());
    request.headers.authorization = `Bearer ${token}`;
    return request;
  },
  error => {
    // console.log('Request error', error);
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(
//   response => {
//     console.log("Response success", response);
//     return response;
//   },
//   error => {
//     console.log("Response error", error);
//     return Promise.reject(error);
//   }
// );

axios.interceptors.response.use(
  response => {
    return Promise.resolve(response && (response && response.data));
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
