import { createReducer } from 'redux-act';

import { updateExclusivesAction } from '../actions/exclusive';

const initialState = {
  myFilter: 'mine',
  statusFilter: 'active',
  objectFilter: 'all',
};

export default createReducer(
  {
    [updateExclusivesAction]: (state, payload) => ({ ...state, ...payload }),
  },
  initialState
);

export const getExclusive = state => state.exclusive;

export const getMyFilter = state => getExclusive(state).myFilter;
export const getStatusFilter = state => getExclusive(state).statusFilter;
export const getObjectFilter = state => getExclusive(state).objectFilter;
