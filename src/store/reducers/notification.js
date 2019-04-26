import { createReducer } from 'redux-act';

import { openNotificationAction, closeNotificationAction } from '../actions/notification';

export default createReducer({
  [openNotificationAction]: (_, payload) => payload,
  [closeNotificationAction]: () => false,
}, false);

export const getCurrentNotification = state => state.notification;
