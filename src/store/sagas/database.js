import { put, call, select } from 'redux-saga/effects';
import { getFormValues } from 'redux-form';
import _ from 'lodash';

import { performRequestSaga } from './api';
import * as databaseActions from '../actions/database';
import * as clientActions from '../actions/client';
import { getFullObject as getFullObjectDatabase } from '../reducers/database';
import { getFullObject as getFullObjectClient } from '../reducers/client';

export function* addComment({ data: { isGlobal, isClient }, isGuarded }) {
  try {
    const { id } = isClient
      ? yield select(getFullObjectClient)
      : yield select(getFullObjectDatabase);
    const commentForm = isClient
      ? yield select(getFormValues('ClientsObjectInfoCommentsForm'))
      : yield select(getFormValues('ObjectInfoCommentsForm'));

    const text = isGlobal
      ? commentForm.communityComment
      : commentForm.comment;
    console.log('teeext', text);

    const config = {
      url: '/estate/comment',
      method: 'post',
      data: {
        isGlobal: Boolean(isGlobal),
        entityId: id,
        text,
      },
    };

    const comment = yield call(performRequestSaga, { config, metaData: { isGuarded } });

    console.log(comment);

    if (isClient) {
      if (isGlobal) {
        yield put(clientActions.addCommunityCommentAction(comment));
      } else {
        yield put(clientActions.addGroupCommentAction(comment));
      }
    } else if (isGlobal) {
      yield put(databaseActions.addCommunityCommentAction(comment));
    } else {
      yield put(databaseActions.addGroupCommentAction(comment));
    }
  } catch (e) {

  }
}

export function* editComment({
  data: {
    isClient, isGlobal, id: sendId, index,
  }, isGuarded,
}) {
  try {
    const { id } = isClient
      ? yield select(getFullObjectClient)
      : yield select(getFullObjectDatabase);
    const commentForm = isClient
      ? yield select(getFormValues('ClientsObjectInfoCommentsForm'))
      : yield select(getFormValues('ObjectInfoCommentsForm'));

    const text = isGlobal
      ? commentForm.communityComment
      : commentForm.comment;
    console.log('teeext', text);

    const config = {
      url: '/estate/comment',
      method: 'put',
      data: {
        isGlobal: Boolean(isGlobal),
        entityId: id,
        id: sendId,
        text,
      },
    };

    const comment = yield call(performRequestSaga, { config, metaData: { isGuarded } });

    console.log(comment);

    if (isClient) {
      if (isGlobal) {
        yield put(clientActions.changeCommunityCommentAction({ index, text }));
      } else {
        yield put(clientActions.changeGroupCommentAction({ index, text }));
      }
    } else if (isGlobal) {
      yield put(databaseActions.changeCommunityCommentAction({ index, text }));
    } else {
      yield put(databaseActions.changeGroupCommentAction({ index, text }));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* removeComment({
  data: {
    id: sendId, isGlobal, index, isClient,
  }, isGuarded,
}) {
  try {
    const { id } = isClient
      ? yield select(getFullObjectClient)
      : yield select(getFullObjectDatabase);

    const config = {
      url: `/estate/${id}/comment/${sendId}`,
      method: 'delete',
      params: {
        isGlobal: Boolean(isGlobal),
      },
    };

    yield call(performRequestSaga, { config, metaData: { isGuarded } });
    if (isClient) {
      if (isGlobal) {
        yield put(clientActions.removeCommunityCommentAction(index));
      } else {
        yield put(clientActions.removeGroupCommentAction(index));
      }
    } else if (isGlobal) {
      yield put(databaseActions.removeCommunityCommentAction(index));
    } else {
      yield put(databaseActions.removeGroupCommentAction(index));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* setFullObject({ data, isGuarded }) {
  try {
    const { requestObject } = yield select(getFormValues('GeneralFiltersForm'));

    const config = {
      url: `/${requestObject}`,
      method: 'get',
      params: {
        id: data,
      },
    };

    const fullObject = yield call(performRequestSaga, { config, metaData: { isGuarded } });

    yield put(databaseActions.setFullObjectInfoAction(fullObject[0]));
  } catch (e) {
    console.log(e);
  }
}

export function* setObjectLabel({ data: { id, label }, isGuarded }) {
  try {
    const { requestObject } = yield select(getFormValues('GeneralFiltersForm'));

    const config = {
      url: `/${requestObject}/${id}/label`,
      method: 'get',
      params: {
        label,
      },
    };

    yield call(performRequestSaga, { config, metaData: { isGuarded } });
  } catch (e) {
    console.log(e);
  }
}
