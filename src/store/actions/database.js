import { createAction } from 'redux-act';

export const ADD_COMMENT_ASYNC = '@@/database/ADD_COMMENT';
export const REMOVE_COMMENT_ASYNC = '@@/database/REMOVE_COMMENT';
export const CHANGE_COMMENT_ASYNC = '@@/database/CHANGE_COMMENT';
export const GET_FULL_OBJECT_ASYNC = '@@/database/GET_FULL_OBJECT_ASYNC';
export const SET_OBJECT_LABEL_ASYNC = '@@/database/SET_OBJECT_LABEL_ASYNC';

export const setObjectsInfoAction = createAction('SAVE_OBJECTS_INFO');
export const setFullObjectInfoAction = createAction('SAVE_FULL_OBJECT_INFO');
export const addCommunityCommentAction = createAction('ADD_COMMUNITY_COMMENT');
export const addGroupCommentAction = createAction('ADD_GROUP_COMMENT');
export const changeCommunityCommentAction = createAction('CHANGE_COMMUNITY_COMMENT');
export const changeGroupCommentAction = createAction('CHANGE_GROUP_COMMENT');
export const removeCommunityCommentAction = createAction('REMOVE_COMMUNITY_COMMENT');
export const removeGroupCommentAction = createAction('REMOVE_GROUP_COMMENT');
export const setCommentFormValueAction = createAction('SET_COMMENT_FORM_VALUE');

export const addCommentAsyncAction = data => ({
  type: ADD_COMMENT_ASYNC,
  isGuarded: true,
  data,
});
export const removeCommentAsyncAction = data => ({
  type: REMOVE_COMMENT_ASYNC,
  isGuarded: true,
  data,
});
export const changeCommentAsyncAction = data => ({
  type: CHANGE_COMMENT_ASYNC,
  isGuarded: true,
  data,
});
export const getFullObjectAsyncAction = data => ({
  type: GET_FULL_OBJECT_ASYNC,
  isGuarded: true,
  data,
});
export const setObjectLabelAsyncAction = data => ({
  type: SET_OBJECT_LABEL_ASYNC,
  isGuarded: true,
  data,
});
