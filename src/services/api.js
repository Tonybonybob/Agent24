/* eslint-disable */

import axios from 'axios';
import { AuthService } from './auth';

export const API = new class { // Singleton service
  constructor() {
    this.axios = axios.create({
      baseURL: '//agent24.pro:8082/'// dev ? '/api' : '/',
      // baseURL: '//82.207.26.94:8082/'//dev ? '/api' : '/',
    });
    this.tokens = {};
    this.headers = {};
  }

  request({ data, ...config }) {
    console.log('api request', data, config);
    if ('token' in data && 'refreshToken' in data) {
      this.headers.Authorization = `Bearer ${data.token}`;
      this.tokens = { token: data.token, refreshToken: data.refreshToken };
    }
    config.headers = { ...data.headers, ...this.headers };
    console.log('full config', config);
    return this.axios.request(config)
      .catch(err => this.interceptor(err, () => this.axios.request(config)));
  }

  interceptor(data, callback) {
    console.log('interception', data);
    if (data.response && data.response.data.error === 'invalid_token') {
      console.log('should refresh token here', callback);

      return AuthService.refreshToken(this.tokens.refreshToken, callback)
        .then(({ refresh_token, access_token }) => {
          callback()
            .then(data => ({ ...data, access_token, refresh_token }));
        });
    }
    return data;
  }

  get(url, data) {
    const config = { url, data, method: 'get' };

    return this.request(config);
  }

  put(url, data) {
    const config = { url, data, method: 'put' };

    return this.request(config);
  }

  delete(url, data) {
    const config = { url, data, method: 'delete' };

    return this.request(config);
  }

  post(url, data) {
    const config = { url, data, method: 'post' };

    return this.request(config);
  }

  patch(url, data) {
    const config = { url, payload: data, method: 'patch' };

    return this.request(config);
  }
}();
