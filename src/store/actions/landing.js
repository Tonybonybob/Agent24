import { createAction } from 'redux-act';

export const SEND_MAIL_ASYNC = '@@/landing/SEND_MAIL_ASYNC';

export const clearFormLandingAction = createAction('CLEAR_LANDING_FORM');
export const closeModalAction = createAction('CLOSE_LANDING_MODAL');
export const setFormPendingAction = createAction('SET_FORM_PENDING');

export const sendMailAsyncAction = data => ({
  type: SEND_MAIL_ASYNC,
  isGuarded: false,
  data,
});
