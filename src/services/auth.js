/* eslint-disable import/prefer-default-export, import/no-cycle */
import { API } from './api';

export const AuthService = new class {
  /* eslint-disable class-methods-use-this */
  signOut() {
    console.log(API.headers);
    return API.get.bind(API, '/logout');
  }

  signIn(data) {
    const formData = new FormData();

    formData.set('username', data.username);
    formData.set('password', data.password);
    formData.set('grant_type', 'password');

    return API.axios
      .request({
        url: '/oauth/token',
        method: 'post',
        headers: {
          Authorization: 'Basic d2ViLWFwcC1hZ2VudDI0Olp8QU9TRlZNNW9JYTMzKlpnOVlQaXtrRVNnZn5Ob35BcTB4Z21WNkBMI3k2ens3TkRkVHNWdjN+YyVNSWxTQjM=',
        },
        data: formData,
      })
      .then((result) => {
        API.headers.Authorization = `Bearer ${result.data.access_token}`;
        return result.data;
      });
  }

  refreshToken(refreshToken, callback) {
    console.log('refreshToken request', refreshToken);
    const formData = new FormData();

    formData.set('refresh_token', refreshToken);
    formData.set('grant_type', 'refresh_token');

    return API.axios
      .request({
        url: '/oauth/token',
        method: 'post',
        headers: {
          Authorization: 'Basic d2ViLWFwcC1hZ2VudDI0Olp8QU9TRlZNNW9JYTMzKlpnOVlQaXtrRVNnZn5Ob35BcTB4Z21WNkBMI3k2ens3TkRkVHNWdjN+YyVNSWxTQjM=',
        },
        data: formData,
      })
      .then(({ data }) => {
        API.headers.Authorization = `Bearer ${data.access_token}`;
        console.log('callback about to exec', API.headers, data);
        return callback ? callback() : data;
      });
  }
  /* eslint-enable */
}();
