import { createReducer } from 'redux-act';

import {
  addModalFieldAction,
} from '../actions/modal';

const initialState = {};

export default createReducer({
  [addModalFieldAction]: (state, payload) => ({ ...state, ...payload }),
}, initialState);

export const getModal = state => state.modal;

export const getModalContactId = state => getModal(state).contactId;
export const getModalObjectId = state => getModal(state).objectId;
export const getModalObjectType = state => getModal(state).objectType;
