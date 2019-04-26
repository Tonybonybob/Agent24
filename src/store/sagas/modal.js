import { put, call, select } from 'redux-saga/effects';
import { goBack } from 'connected-react-router';

import { getModalContactId, getModalObjectId, getModalObjectType } from '../reducers/modal';
import { performRequestSaga } from './api';

export function* addLabel({ data, isGuarded }) {
  try {
    const id = yield select(getModalObjectId);
    const contactId = yield select(getModalContactId);
    const objectType = yield select(getModalObjectType);

    const config = {
      url: `${objectType}/${id}/label`,
      method: 'post',
      data: {
        ...data,
        contactId,
      },
    };
    yield call(performRequestSaga, { config, metaData: { isGuarded } });

    yield put(goBack());
  } catch (error) {
    console.log(error);
  }
}