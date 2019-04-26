import { createAction } from 'redux-act';

export const ADD_LABEL_ASYNC = '@@/modal/ADD_LABEL_ASYNC';

export const addModalFieldAction = createAction('ADD_MODAL_FIELD');

export const addLabelAsyncAction = data => ({
  type: ADD_LABEL_ASYNC,
  isGuarded: true,
  data,
});
