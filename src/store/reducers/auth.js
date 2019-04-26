import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import {
  setTokenAction,
  setRefreshTokenAction,
  setTokenRefreshingAction,
  setRegistrationStepAction,
  setSmsTokenAction,
  setTokenIsValid,
  addRegistrationLogo,
} from '../actions/auth';

const initialState = {
  token: '',
  refreshToken: '',
  registration: {
    step: '',
    isSmsToken: false,
  },
};

export default createReducer(
  {
    [setTokenAction]: (state, token) =>
      console.log('token') || { ...state, token },
    [setRefreshTokenAction]: (state, refreshToken) =>
      console.log('tokenRefresh') || {
        ...state,
        refreshToken,
      },
    [setTokenRefreshingAction]: (state, isTokenRefreshing) => ({
      ...state,
      isTokenRefreshing,
    }),
    [setRegistrationStepAction]: (state, step) => ({
      ...state,
      registration: { ...state.registration, step },
    }),
    [setSmsTokenAction]: (state, isSmsToken) => ({
      ...state,
      registration: { ...state.registration, isSmsToken },
    }),
    [setTokenIsValid]: (state, isTokenValid) => ({
      ...state,
      registration: { ...state.registration, isTokenValid },
    }),
    [addRegistrationLogo]: (state, photos) => ({
      ...state,
      registration: { ...state.registration, ...photos },
    }),
    // signIn: createReducerAsync(signInAction),
    // signOut: createReducerAsync(signOutAction),
  },
  initialState
);

export const getAuth = state => state.auth;

export const getToken = state => getAuth(state).token;

export const getRefreshToken = state => getAuth(state).refreshToken;

export const getIsTokenRefreshing = state => getAuth(state).isTokenRefreshing;

export const getRegistration = state => getAuth(state).registration;
export const getRegistrationLogo = state => getRegistration(state).logo;
export const getRegistrationStep = state => getRegistration(state).step;
export const getSmsToken = state => getRegistration(state).isSmsToken;
export const getTokenIsValid = state => getRegistration(state).isTokenValid;
