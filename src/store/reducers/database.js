import { createReducer } from 'redux-act';

import {
  setObjectsInfoAction,
  setFullObjectInfoAction,
  addCommunityCommentAction,
  addGroupCommentAction,
  removeCommunityCommentAction,
  removeGroupCommentAction,
  changeCommunityCommentAction,
  changeGroupCommentAction,
} from '../actions/database';

export default createReducer(
  {
    [setObjectsInfoAction]: (state, payload) => ({
      ...state,
      objects: console.log('GET_', payload) || payload,
    }),
    [setFullObjectInfoAction]: (state, payload) => ({
      ...state,
      fullObject: payload,
    }),
    [addCommunityCommentAction]: (state, payload) => ({
      ...state,
      fullObject: {
        ...state.fullObject,
        communityComments: [...state.fullObject.communityComments, payload],
      },
    }),
    [addGroupCommentAction]: (state, payload) => ({
      ...state,
      fullObject: {
        ...state.fullObject,
        groupComments: [...state.fullObject.groupComments, payload],
      },
    }),
    [removeCommunityCommentAction]: (state, index) => ({
      ...state,
      fullObject: {
        ...state.fullObject,
        communityComments: [
          ...state.fullObject.communityComments.slice(0, index),
          ...state.fullObject.communityComments.slice(index + 1),
        ],
      },
    }),
    [removeGroupCommentAction]: (state, index) => ({
      ...state,
      fullObject: {
        ...state.fullObject,
        groupComments: [
          ...state.fullObject.groupComments.slice(0, index),
          ...state.fullObject.groupComments.slice(index + 1),
        ],
      },
    }),

    [changeCommunityCommentAction]: (state, data) => ({
      ...state,
      fullObject: {
        ...state.fullObject,
        communityComments: [
          ...state.fullObject.communityComments.slice(0, data.index),
          {
            ...state.fullObject.communityComments[data.index],
            text: data.text,
          },
          ...state.fullObject.communityComments.slice(data.index + 1),
        ],
      },
    }),
    [changeGroupCommentAction]: (state, data) => ({
      ...state,
      fullObject: {
        ...state.fullObject,
        groupComments: [
          ...state.fullObject.groupComments.slice(0, data.index),
          { ...state.fullObject.groupComments[data.index], text: data.text },
          ...state.fullObject.groupComments.slice(data.index + 1),
        ],
      },
    }),
  },
  {}
);

export const getObjects = state => state.database.objects;
export const getFullObject = state => state.database.fullObject;
