import { createAction } from 'redux-act';

export const LOAD_FLAT_ATTRIBUTES_ASYNC = '@@/dataArray/LOAD_FLAT_ATTRIBUTES_ASYNC';
export const LOAD_ALL_ATTRIBUTES_ASYNC = '@@/dataArray/LOAD_ALL_ATTRIBUTES_ASYNC';
export const LOAD_ALL_STATES_ASYNC = '@@/dataArray/LOAD_ALL_STATES_ASYNC';
export const LOAD_ESTATE_STATUS_ATTRIBUTES_ASYNC = '@@/dataArray/LOAD_ESTATE_STATUS_ATTRIBUTES_ASYNC';
export const LOAD_PHOTO_TYPE_ATTRIBUTES_ASYNC = '@@/dataArray/LOAD_PHOTO_TYPE_ATTRIBUTES_ASYNC';

export const updateAttributesAction = createAction('UPDATE_ATTRIBUTES');
export const deleteAttributesAction = createAction('DELETE_ATTRIBUTES');

export const loadFlatAttributesAsyncAction = () => ({
  type: LOAD_FLAT_ATTRIBUTES_ASYNC,
});

export const loadAllAttributesAsyncAction = () => ({
  type: LOAD_ALL_ATTRIBUTES_ASYNC,
  isGuarded: true,
});

export const loadAllStatesAsyncAction = () => ({
  type: LOAD_ALL_STATES_ASYNC,
  isGuarded: true,
});

export const loadEstateStatusAttributesAsyncAction = () => ({
  type: LOAD_ESTATE_STATUS_ATTRIBUTES_ASYNC,
  isGuarded: true,
});

export const loadPhotoTypeAttributesAsyncAction = () => ({
  type: LOAD_PHOTO_TYPE_ATTRIBUTES_ASYNC,
  isGuarded: true,
});
