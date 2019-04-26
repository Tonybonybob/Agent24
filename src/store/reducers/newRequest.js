import { createReducer } from 'redux-act';

import {
  setCitiesSuggestionsAction,
  setAreaSuggestionsAction,
  setDistrictSuggestionsAction,
  setMicrodistrictSuggestionsAction,
  setStreetSuggestionsAction,
  setSchemesSuggestionsAction,
  setWallIdsSuggestionsAction,
  deleteSuggestionsAction,
  setNewRequestNamesAction,
  restoreInitialDataAction,
  setAgenciesSuggestionsAction,
  setMapAreasAction,
  removeAreasAction,
  updateHouseNumber,
  updateStreetId,
  updateAddressInfo,
  clearForm,
} from '../actions/newRequest';

const initialAdditionalRequestValues = {
  microdistrictChosen: false,
  microdistrictTouched: false,
  streetChosen: true,
  streetTouched: false,
  complexTouched: false,
  areaSuggestions: [],
  citiesSuggestions: [],
  districtSuggestions: [],
  microdistrictSuggestions: [],
  streetSuggestions: [],
  schemesSuggestions: [],
  wallSuggestions: [],
  agencySuggestions: [],
  mapAreas: [],
  houseNumber: null,
  houseNumberId: null,
  adminAreaId: null,
  adminAreaName: null,
  microDistrictId: null,
  microDistrictName: null,
  geoLocation: null,
  house: null,
  housing: null,
  apartment: null,
};

const initialValues = {
  isPreloaded: false,
  cityOrDistrict: false,
  areaName: '',
  areaId: null,
  areaChosen: true,
  areaTouched: false,
  cityName: '',
  cityId: null,
  cityChosen: true,
  cityTouched: false,
  adminAreaChosen: false,
  adminAreaTouched: false,
  ...initialAdditionalRequestValues,
};

export default createReducer(
  {
    [setCitiesSuggestionsAction]: (state, cities) => ({
      ...state,
      citiesSuggestions: cities,
    }),
    [setAreaSuggestionsAction]: (state, areas) => ({
      ...state,
      areaSuggestions: areas,
    }),
    [setDistrictSuggestionsAction]: (state, districts) => ({
      ...state,
      districtSuggestions: districts,
    }),
    [setMicrodistrictSuggestionsAction]: (state, microdistricts) => ({
      ...state,
      microdistrictSuggestions: microdistricts,
    }),
    [setStreetSuggestionsAction]: (state, streets) => ({
      ...state,
      streetSuggestions: streets,
    }),
    [setSchemesSuggestionsAction]: (state, schemes) => ({
      ...state,
      schemesSuggestions: schemes,
    }),
    [setWallIdsSuggestionsAction]: (state, wallIds) => ({
      ...state,
      wallSuggestions: wallIds,
    }),
    [deleteSuggestionsAction]: state => ({
      ...state,
      citiesSuggestions: [],
      districtSuggestions: [],
      microdistrictSuggestions: [],
      streetSuggestions: [],
    }),
    [setNewRequestNamesAction]: (state, payload) => ({ ...state, ...payload }),
    [restoreInitialDataAction]: () => initialValues,
    [setAgenciesSuggestionsAction]: (state, agencies) => ({
      ...state,
      agencySuggestions: agencies,
    }),
    [setMapAreasAction]: (state, mapAreas) => ({ ...state, mapAreas }),
    [removeAreasAction]: (state, index) => ({
      ...state,
      mapAreas: state.mapAreas.filter((_, areaIndex) => areaIndex !== index),
    }),
    [updateHouseNumber]: (state, payload) => ({ ...state, ...payload }),
    [updateStreetId]: (state, payload) => ({ ...state, ...payload }),
    [updateAddressInfo]: (state, payload) => ({ ...state, ...payload }),
    [clearForm]: state => ({
      ...state,
      ...initialAdditionalRequestValues,
    }),
  },
  initialValues
);

export const getNewRequest = state => state.newRequest;

export const getFormData = state => state.form.NewRequestForm.values;
export const getCities = state => getNewRequest(state).citiesSuggestions;
export const getArea = state => getNewRequest(state).areaSuggestions;
export const getDistrict = state => getNewRequest(state).districtSuggestions;
export const getMicrodistrict = state =>
  getNewRequest(state).microdistrictSuggestions;
export const getStreet = state => getNewRequest(state).streetSuggestions;
export const getSchemes = state => getNewRequest(state).schemesSuggestions;
export const getWallIds = state => getNewRequest(state).wallSuggestions;
export const getAgencies = state => getNewRequest(state).agencySuggestions;
export const getMapAreas = state => getNewRequest(state).mapAreas;

export const getCitiesSuggestions = state =>
  getCities(state) instanceof Array ? getCities(state).slice(0, 10) : [];
export const getAreaSuggestions = state => getArea(state);
export const getDistrictSuggestions = state =>
  getDistrict(state) ? getDistrict(state).slice(0, 4) : [];
export const getMicrodistrictSuggestions = state =>
  getMicrodistrict(state) ? getMicrodistrict(state).slice(0, 4) : [];
export const getStreetSuggestions = state => getStreet(state) || {};
