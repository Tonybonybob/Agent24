import { put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import qs from 'query-string';

import * as authActions from '../actions/auth';
import { deleteUserInfoAction } from '../actions/user';
// eslint-disable-next-line import/no-cycle
import { performRequestSaga } from './api';
import { getRefreshToken, getIsTokenRefreshing } from '../reducers/auth';

export function* signIn({ data }) {
  try {
    const formData = {
      username: data.username,
      password: data.password,
      grant_type: 'password',
    };

    // formData.set('username', data.username);
    // formData.set('password', data.password);
    // formData.set('grant_type', 'password');
    const config = {
      url: '/oauth/token',
      method: 'post',
      headers: {
        Authorization:
          'Basic d2ViLWFwcC1hZ2VudDI0Olp8QU9TRlZNNW9JYTMzKlpnOVlQaXtrRVNnZn5Ob35BcTB4Z21WNkBMI3k2ens3TkRkVHNWdjN+YyVNSWxTQjM=',
      },
      data: qs.stringify(formData),
    };

    const returnData = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded: false },
    });

    yield put(authActions.setTokenAction(returnData.access_token));
    yield put(authActions.setRefreshTokenAction(returnData.refresh_token));
    yield put(push('/'));
  } catch (error) {
    yield put(authActions.authLoginFail());
  }
}

export function* recoverPassword({ data }) {
  try {
    console.log(data);
  } catch (error) {
    console.error(error);
    yield put(authActions.authLoginFail());
  }
}

export function* signOut() {
  try {
    const config = {
      url: '/?logout',
      method: 'get',
      data: {},
    };

    yield put(authActions.setTokenAction(''));
    yield put(authActions.setRefreshTokenAction(''));
    yield put(deleteUserInfoAction());

    yield put(push('/signin'));

    yield call(performRequestSaga, { config, metaData: { isGuarded: false } });
  } catch (error) {
    console.error(error);
  }
}

export function* refreshToken() {
  console.log('refresh_token');
  if (yield select(getIsTokenRefreshing)) {
    return;
  }

  try {
    yield put(authActions.setTokenRefreshingAction(true));

    const refreshTokenVal = yield select(getRefreshToken);

    console.log(refreshTokenVal);

    const formData = {
      refresh_token: refreshTokenVal,
      grant_type: 'refresh_token',
    };

    const config = {
      url: '/oauth/token',
      method: 'post',
      headers: {
        Authorization:
          'Basic d2ViLWFwcC1hZ2VudDI0Olp8QU9TRlZNNW9JYTMzKlpnOVlQaXtrRVNnZn5Ob35BcTB4Z21WNkBMI3k2ens3TkRkVHNWdjN+YyVNSWxTQjM=',
      },
      data: qs.stringify(formData),
    };

    const returnData = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded: false },
    });
    if (returnData) {
      yield put.resolve(authActions.setTokenAction(returnData.access_token));
      yield put.resolve(
        authActions.setRefreshTokenAction(returnData.refresh_token)
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(authActions.setTokenRefreshingAction(false));
  }
}

export function* checkPhone({ data: { index, phone, type }, isGuarded }) {
  try {
    const config = {
      url: '/otp/get',
      method: 'post',
      data: {
        phone,
        type,
      },
    };
    const token = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    if (token) {
      if (type === 'REGISTRATION') {
        yield put(authActions.setSmsTokenAction(true));
      } else if (type === 'CONFIRM_PHONE') {
        yield put(
          authActions.setFormPhoneCheckAction({ toCheck: true, index })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export function* checkSmsToken({
  data: { index, phone, type, otp },
  isGuarded,
}) {
  try {
    const config = {
      url: '/otp/check',
      method: 'post',
      data: {
        phone,
        type,
        otp,
      },
    };
    const token = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    if (token) {
      if (type === 'REGISTRATION') {
        yield put(authActions.setTokenIsValid(true));
      } else if (type === 'CONFIRM_PHONE') {
        yield put(
          authActions.setFormPhoneCheckAction({ tokenIsValid: true, index })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export function* addRegistrationLogo({ isGuarded, photo }) {
  try {
    console.log(photo);

    const formData = new FormData();
    formData.set('uploadFile[0]', photo);
    formData.set('uploadType', 'avatar');

    const config = {
      method: 'post',
      url: 'http://api.agent24.ua/r=fupload/index.php?fupload',
      data: formData,
    };

    const response = yield call(performRequestSaga, {
      config,
      metaData: {
        isGuarded,
        header: {
          'Content-Type': 'multipart/form-data',
        },
      },
    });

    console.log(response);
    if (response && response[0].uploadFile) {
      yield put(authActions.addRegistrationLogo({ logo: response[0].URL }));
    }
  } catch (e) {
    console.log('fileError', e, Object.entries(e));
  }
}

export function* loadStreets({ isGuarded, data: { value, index } }) {
  try {
    const config = {
      url: '/street',
      method: 'get',
      params: {
        name: value,
      },
    };

    const streets = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(
      authActions.setAuthCreateAgencyFormValuesAction({
        index,
        suggestions: streets,
      })
    );

    return;
  } catch (e) {
    console.log(e);
  }
}
