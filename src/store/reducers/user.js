import { createReducer } from 'redux-act';

import { setUserInfoAction, deleteUserInfoAction } from '../actions/user';

export default createReducer(
  {
    [setUserInfoAction]: (state, payload) => payload,
    [deleteUserInfoAction]: () => false,
  },
  false
);

export const getUser = state => state.user;

export const getUserCity = state => getUser(state).cityName;

export const getUserId = state => getUser(state).id;

export const getUserCityId = state => getUser(state).cityId;

export const getUserAreaId = state => getUser(state).areaId;

export const getUserCityName = state => getUser(state).cityName;

export const getUserAreaName = state => getUser(state).areaName;
