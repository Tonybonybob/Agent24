import { put, call, select } from 'redux-saga/effects';
import { getFormValues } from 'redux-form';
import { push } from 'connected-react-router';

import { performRequestSaga } from './api';
import * as landingActions from '../actions/landing';


export function* sendMail({ data: { link, ...info }, isGuarded }) {
  try {
    const config = {
      method: 'post',
      url: '//api.agent24.ua/fupload/index.php?r=email',
      data: info,
    };
    yield put(landingActions.setFormPendingAction(true));
    const response = yield call(performRequestSaga, {
      config,
      metaData: {
        isGuarded,
        // header: {
        //   'Content-Type': 'multipart/form-data',
        // },
      },
    });

    console.log(landingActions);

    yield put(landingActions.clearFormLandingAction());

    yield put(push(link));
  } catch (error) {
    console.log(error);
  }
}