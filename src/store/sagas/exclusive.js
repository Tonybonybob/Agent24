import { put, call, select } from 'redux-saga/effects';
import { goBack } from 'connected-react-router';

import { getMyFilter, getObjectFilter, getStatusFilter } from '../reducers/exclusive';
import { performRequestSaga } from './api';

// eslint-disable-next-line import/prefer-default-export
export function* loadObjects({ data, isGuarded }) {
  try {
    const myFilter = yield select(getMyFilter);
    const statusFilter = yield select(getStatusFilter);
    const objectFilter = yield select(getObjectFilter);

    // const config = {
    //   url: `${objectType}/${id}/label`,
    //   method: 'post',
    //   data: {
    //     ...data,
    //     contactId,
    //   },
    // };
    // yield call(performRequestSaga, { config, metaData: { isGuarded } });

    yield put(goBack());
  } catch (error) {
    console.log(error);
  }
}
