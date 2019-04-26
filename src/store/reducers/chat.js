import { createReducer } from 'redux-act';

import {
  setChatListAction, updateChatListAction,
  setMessagesAction, updateMessagesAction,
  deleteChatAction,
} from '../actions/chat';

const initialState = {
  chatList: [],
  chatMessages: [],
};

export default createReducer({
  [setChatListAction]: (state, payload) => ({ ...state, chatList: payload }),
  [updateChatListAction]: (state, payload) => {
  	switch (payload.type) {
  		case 'add':
  			return {
  				...state,
  				chatList: [
  					...state.chatList,
  					payload.chat,
  				],
  			};
  		case 'delete':
  			return {
  				...state,
  				chatList: state.chatList.filter(el => el.id !== payload.id),
  			};

  		default:
  			return state;
  	}
  },
  [setMessagesAction]: (state, payload) => ({ ...state, chatMessages: payload }),
  [updateMessagesAction]: (state, payload) => {
  	switch (payload.type) {
  		case 'add':
  			return {
  				...state,
  				chatMessages: [
  					...state.chatMessages,
  					payload.message,
  				],
  			};
  		case 'delete':
  			return {
  				...state,
  				chatMessages: state.chatMessages.filter(el => el.id !== payload.id),
  			};

  		default:
  			return state;
  	}
  },
  [deleteChatAction]: () => initialState,
}, initialState);

export const getChat = state => state.chat;

export const getChatList = state => getChat(state).chatList;

export const getChatMessages = state => getChat(state).chatMessages;
