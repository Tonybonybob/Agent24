import { API } from './api';

/* eslint-disable class-methods-use-this, import/prefer-default-export */
export const UserService = new class {
  loadUserInfo({ token, refreshToken }) {
    return API.get('/user', { token, refreshToken }).then(({ data }) => data);
  }
}();
