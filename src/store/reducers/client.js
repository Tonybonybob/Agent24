import { createReducer } from 'redux-act';

/* eslint-disable max-len */
import {
  setClientInfoAction,
  setPreloadClientInfoAction,
  clearClientInfoAction,
  setCitiesSuggestionsAction,
  setAgenciesSuggestionsAction,
  setClientPhoneWritten,
  setClientObjectsDatabaseAction,
  updateClientObjectsDatabaseAction,
  setFullObjectInfoAction,
  addCommunityCommentAction,
  addGroupCommentAction,
  removeCommunityCommentAction,
  removeGroupCommentAction,
  changeCommunityCommentAction,
  changeGroupCommentAction,
  addClientDataAction,
  seBoundedClientInfoAction,
} from '../actions/client';

const initialState = {
  objects: [],
  addClient: {},
  boundedClient: null,
};

export default createReducer(
  {
    [setClientInfoAction]: (state, payload) => ({
      ...state,
      clientInfo: payload,
    }),
    [setPreloadClientInfoAction]: (state, payload) => ({
      ...state,
      addClient: payload,
    }),
    [seBoundedClientInfoAction]: (state, payload) => ({
      ...state,
      boundedClient: payload,
    }),
    [addClientDataAction]: (state, payload) => ({
      ...state,
      addClient: { ...state.addClient, ...payload },
    }),
    [clearClientInfoAction]: state => ({ ...state, addClient: {} }),
    [setCitiesSuggestionsAction]: (state, cities) => ({
      ...state,
      addClient: { ...state.addClient, citiesSuggestions: cities },
    }),
    [setAgenciesSuggestionsAction]: (state, agencies) => ({
      ...state,
      addClient: { ...state.addClient, agenciesSuggestions: agencies },
    }),
    [setClientPhoneWritten]: (state, phoneIsWritten) => ({
      ...state,
      addClient: { ...state.addClient, phoneIsWritten },
    }),
    [setClientObjectsDatabaseAction]: (state, objects) => ({
      ...state,
      objects,
    }),
    [updateClientObjectsDatabaseAction]: (state, objects) => ({
      ...state,
      objects: [...(state.objects || []), ...objects],
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
  initialState
);

export const getClient = state => state.client;

export const getAddClient = state => getClient(state).addClient || {};
export const getBoundedClient = state => getClient(state).boundedClient;

export const getAgencyTouched = state => getAddClient(state).agencyTouched;
export const getCityTouched = state => getAddClient(state).cityTouched;

export const getClientId = state => getClient(state).id;

export const getClientIsNew = state => getAddClient(state).newClient;

export const getPhoneIsWritten = state => getAddClient(state).phoneIsWritten;

export const getRequests = state => getAddClient(state).requests;

export const getObjects = state => getClient(state).objects;
export const getObjectsExist = state =>
  getObjects(state) instanceof Array && getObjects(state).length > 0;
export const getFullObject = state => getClient(state).fullObject;

export const getClientInfo = state => getClient(state).clientInfo;

export const getCities = state => getAddClient(state).citiesSuggestions;
export const getAgencies = state => getAddClient(state).agenciesSuggestions;

export const getCitiesSuggestions = state =>
  getCities(state) instanceof Array ? getCities(state).slice(0, 4) : [];
export const getAgenciesSuggestions = state =>
  getAgencies(state) ? getAgencies(state).slice(0, 4) : [];
