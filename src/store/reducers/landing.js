import { createReducer } from 'redux-act';

import { clearFormLandingAction, closeModalAction, setFormPendingAction } from '../actions/landing';


export default createReducer({
  [clearFormLandingAction]: state => ({ ...state, pending: false }),
  [closeModalAction]: state => ({ ...state }),
  [setFormPendingAction]: (state, pending) => ({ ...state, pending }),
}, { showModal: false });

export const getLanding = state => state.landing;

export const getShowModal = state => getLanding(state).showModal;
export const getFormPending = state => getLanding(state).pending;
