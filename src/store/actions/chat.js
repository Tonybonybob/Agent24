import { createAction } from 'redux-act';

export const setChatListAction = createAction('SET_CHAT_LIST');
export const updateChatListAction = createAction('UPDATE_CHAT_LIST');

export const setMessagesAction = createAction('SET_MESSAGES');
export const updateMessagesAction = createAction('UPDATE_MESSAGES');

export const deleteChatAction = createAction('DELETE_CHAT');
