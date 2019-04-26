import { createAction } from 'redux-act';

export const USER_LOAD_ASYNC = '@@/auth/USER_LOAD_ASYNC';

export const setUserInfoAction = createAction('SET_USER_INFO');
export const deleteUserInfoAction = createAction('DELETE_USER_INFO');

export const userLoadAsyncAction = () => ({
  type: USER_LOAD_ASYNC,
  isGuarded: true,
});
