import { createReducer } from 'redux-act';
import { successAction, GET_GLOBAL_OBJECT_DATA } from '../types';

const initialState = {
  selectedGlobalObject: null,
};

export default createReducer(
  {
    [successAction(GET_GLOBAL_OBJECT_DATA)]: state => state,
  },
  initialState
);
