import axios from 'axios';
import { select, call, put, fork, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { getToken } from '../reducers/auth';
// eslint-disable-next-line import/no-cycle
import { refreshToken } from './auth';
import * as authActions from '../actions/auth';

// eslint-disable-next-line import/prefer-default-export, consistent-return
export function* performRequestSaga({ config: oldConfig, metaData }) {
  const customAxios = axios.create({
    baseURL: metaData.url || '//api.agent24.ua', // dev ? '/api' : '/',
    // baseURL: '//82.207.26.94:8082/'//dev ? '/api' : '/',
  });

  try {
    const { url, method, data, headers, params } = oldConfig;

    const header = metaData.header || {};

    const token = yield select(getToken);

    const config = !metaData.isGuarded
      ? {
          headers: headers || {},
          method,
          params,
          url,
          data,
        }
      : {
          headers: { Authorization: `Bearer ${token}`, ...header },
          method,
          params,
          url,
          data,
        };

    const { data: returnData } = yield call(customAxios.request, config);

    return returnData;
  } catch (error) {
    console.log('ERRROOOOOR', error, metaData);
    if (
      error.response &&
      error.response.data.error === 'invalid_token' &&
      !metaData.tryingToRefresh
    ) {
      yield fork(refreshToken);

      yield take(authActions.setTokenAction);

      return yield call(performRequestSaga, {
        config: oldConfig,
        metaData: { ...metaData, tryingToRefresh: true },
      });
    }
    if (
      error.response &&
      error.response.data.error === 'invalid_token' &&
      metaData.tryingToRefresh
    ) {
      yield put(authActions.setTokenAction(''));
      yield put(authActions.setRefreshTokenAction(''));
      yield put(push('/signin'));
    }
    throw error;
  }
}
