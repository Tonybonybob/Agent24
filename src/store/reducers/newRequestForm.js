import { createReducer } from 'redux-act';

import {
  setNewRequestFormValuesAction,
  clearForm,
} from '../actions/newRequest';

import { successAction, GET_GLOBAL_OBJECT_DATA } from '../types';

const initialAdditionalFormValues = {
  kitchenSquare: null,
  livingSquare: null,
  maxFloor: null,
  room: null,
  schemeId: null,
  house: null,
  housing: null,
  floor: null,
  apartment: null,
  wallFlatId: null,
  description: '',
  totalSquare: null,
  price: null,
  conditionId: null,
};

export default createReducer({
  [clearForm]: state => ({
    ...state,
    values: {
      ...state.values,
      ...state.initial,
      ...initialAdditionalFormValues,
    },
  }),
  [setNewRequestFormValuesAction]: (state, payload) => ({
    ...state,
    values: {
      ...state.values,
      ...payload,
    },
  }),
  [successAction(GET_GLOBAL_OBJECT_DATA)]: (state, data) => ({
    ...state,
    values: {
      ...state.values,
      ...data,
    },
  }),
});
