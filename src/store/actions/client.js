import { createAction } from 'redux-act';

export const LOAD_CLIENT_ASYNC = '@@/client/LOAD_CLIENT_ASYNC';
export const PRELOAD_CLIENT_ASYNC = '@@/client/PRELOAD_CLIENT_ASYNC';
export const BOUNDED_CLIENT_ASYNC = '@@/client/BOUNDED_CLIENT_ASYNC';
export const CREATE_CLIENT_ASYNC = '@@/client/CREATE_CLIENT_ASYNC';
export const CREATE_CLIENT_EDIT_ASYNC = '@@/client/CREATE_CLIENT_EDIT_ASYNC';
export const LOAD_CITIES_ASYNC = '@@/client/LOAD_CITIES_ASYNC';
export const LOAD_AGENCIES_ASYNC = '@@/client/LOAD_AGENCIES_ASYNC';
export const LOAD_OBJECTS_DATABASE_ASYNC = '@@/client/LOAD_OBJECTS_DATABASE_ASYNC';
export const LOAD_OBJECT_ITEM_DATABASE_ASYNC = '@@/client/LOAD_OBJECT_ITEM_DATABASE_ASYNC';
export const CLIENT_UPLOAD_PROFILE_PHOTO = '@@/client/CLIENT_UPLOAD_PROFILE_PHOTO';

export const setClientInfoAction = createAction('SET_CLIENT_INFO');
export const addClientDataAction = createAction('ADD_DATA_CLIENT');
export const setPreloadClientInfoAction = createAction('SET_PRELOAD_CLIENT_INFO');
export const seBoundedClientInfoAction = createAction('SET_BOUNDED_CLIENT_INFO');
export const clearClientInfoAction = createAction('CLEAR_PRELOAD_CLIENT_INFO');
export const setClientPhoneWritten = createAction('SET_CLIENT_PHONE_WRITTEN_INFO');
export const setCitiesSuggestionsAction = createAction('SET_CITIES_SUGGESTIONS');
export const setAgenciesSuggestionsAction = createAction('SET_AGENCIES_SUGGESTIONS');
export const setFormValuesAction = createAction('SET_FORM_VALUES');
export const setClientObjectsDatabaseAction = createAction('SET_CLIENT_OBJECTS_DATABASE');
export const updateClientObjectsDatabaseAction = createAction('UPDATE_CLIENT_OBJECTS_DATABASE');
export const setFullObjectInfoAction = createAction('SET_FULL_OBJECT_INFO');
export const addCommunityCommentAction = createAction('ADD_CLIENT_COMMUNITY_COMMENT');
export const addGroupCommentAction = createAction('ADD_CLIENT_GROUP_COMMENT');
export const removeCommunityCommentAction = createAction('REMOVE_CLIENT_COMMUNITY_COMMENT');
export const removeGroupCommentAction = createAction('REMOVE_CLIENT_GROUP_COMMENT');
export const changeCommunityCommentAction = createAction('CHANGE_CLIENT_COMMUNITY_COMMENT');
export const changeGroupCommentAction = createAction('CHANGE_CLIENT_GROUP_COMMENT');
export const setCommentFormValueAction = createAction('SET_CLIENT_COMMENT_FORM_VALUE');
export const setClientEditFormValuesAction = createAction('SET_CLIENT_EDIT_FORM_VALUES');

export const loadClientAsyncAction = id => ({
  type: LOAD_CLIENT_ASYNC,
  isGuarded: true,
  id,
});
export const clientLoadAsyncAction = data => ({
  type: PRELOAD_CLIENT_ASYNC,
  isGuarded: true,
  data,
});
export const clientBoundLoadAsyncAction = data => ({
  type: BOUNDED_CLIENT_ASYNC,
  isGuarded: true,
  data,
});
export const clientCreateAsyncAction = data => ({
  type: CREATE_CLIENT_ASYNC,
  isGuarded: true,
  data,
});
export const clientCreateEditAsyncAction = data => ({
  type: CREATE_CLIENT_EDIT_ASYNC,
  isGuarded: true,
  data,
});
export const clientLoadObjectsDatabase = id => ({
  type: LOAD_OBJECTS_DATABASE_ASYNC,
  isGuarded: true,
  id,
});
export const clientLoadObjectItemDatabase = id => ({
  type: LOAD_OBJECT_ITEM_DATABASE_ASYNC,
  isGuarded: true,
  id,
});
export const clientLoadCitySuggestions = (city, areaId) => ({
  type: LOAD_CITIES_ASYNC,
  isGuarded: true,
  city,
  areaId,
});
export const clientLoadAgencySuggestions = agency => ({
  type: LOAD_AGENCIES_ASYNC,
  isGuarded: true,
  agency,
});

export const clientUploadProfilePhoto = photo => ({
  type: CLIENT_UPLOAD_PROFILE_PHOTO,
  isGuarded: true,
  photo,
});
