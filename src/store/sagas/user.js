import { put, call } from 'redux-saga/effects';

import * as userActions from '../actions/user';
import { performRequestSaga } from './api';

// eslint-disable-next-line import/prefer-default-export
export function* loadUser() {
  try {
    const config = {
      url: '/user',
      method: 'get',
      data: {},
    };
    const userData = yield call(performRequestSaga, { config, metaData: { isGuarded: true } });
    if (userData) {
      yield put(userActions.setUserInfoAction(userData));
    }
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}
