import { put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as agentActions from '../actions/agent';
import { performRequestSaga } from './api';

export function* uploadProfilePhoto({ isGuarded, photo }) {
  try {
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
    if (response && response[0].uploadFile) {
      yield put(agentActions.setAgentEditFormValuesAction({ photo: response[0].URL }));
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
