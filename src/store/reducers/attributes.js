import { createReducer } from 'redux-act';

import {
  updateAttributesAction, deleteAttributesAction,
} from '../actions/attributes';

export default createReducer({
  [updateAttributesAction]: (state, payload) => ({ ...state, ...payload }),
  [deleteAttributesAction]: () => (false),
}, false);

export const getAttributes = state => state.attributes;
export const getFlatAttributes = state => getAttributes(state) && getAttributes(state).flat;
export const getStates = state => getAttributes(state).states;
export const getEstateStatus = state => getAttributes(state).estateStatus;
