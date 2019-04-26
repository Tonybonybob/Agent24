import { createAction } from 'redux-act';

export const LOAD_EXCLUSIVE_OBJECTS = '@@/exclusive/LOAD_EXCLUSIVE_OBJECTS';

export const updateExclusivesAction = createAction('UPDATE_EXCLUSIVES');

export const loadExclusiveObjectsAsyncAction = data => ({
  type: LOAD_EXCLUSIVE_OBJECTS,
  isGuarded: true,
  data,
});
