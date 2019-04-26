import { createAction } from 'redux-act';
import { callApi } from '../utilities';
import api from '../../services/network';
import { GET_GLOBAL_OBJECT_DATA } from '../types';

export const LOAD_CITIES_ASYNC = '@@/newRequest/LOAD_CITIES_ASYNC';
export const LOAD_AREA_ASYNC = '@@/newRequest/LOAD_AREA_ASYNC';
export const LOAD_DISTRICT_ASYNC = '@@/newRequest/LOAD_DISTRICT_ASYNC';
export const LOAD_MICRODISTRICT_ASYNC =
  '@@/newRequest/LOAD_MICRODISTRICT_ASYNC';
export const LOAD_STREETS_ASYNC = '@@/newRequest/LOAD_STREETS_ASYNC';
export const LOAD_AGENCY_ASYNC = '@@/newRequest/LOAD_AGENCY_ASYNC';
export const LOAD_FLAT_SCHEMES_ASYNC = '@@/newRequest/LOAD_FLAT_SCHEMES_ASYNC';
export const NEW_FLAT_REQUEST_ASYNC = '@@/newRequest/NEW_FLAT_REQUEST_ASYNC';
export const UPLOAD_PHOTO_ASYNC = '@@/newRequest/UPLOAD_PHOTO_ASYNC';
export const TURN_TO_AREAS_ASYNC = '@@/newRequest/TURN_TO_AREAS_ASYNC';

export const SET_HOUSE_NUMBER = '@@/newRequest/SET_HOUSE_NUMBER';

export const setCitiesSuggestionsAction = createAction(
  'SET_NEWREQUEST_CITIES_SUGGESTIONS'
);
export const setAgenciesSuggestionsAction = createAction(
  'SET_NEWREQUEST_AGENCIES_SUGGESTIONS'
);
export const setStreetSuggestionsAction = createAction(
  'SET_NEWREQUEST_STREET_SUGGESTIONS'
);
export const setAreaSuggestionsAction = createAction(
  'SET_NEWREQUEST_AREA_SUGGESTIONS'
);
export const setDistrictSuggestionsAction = createAction(
  'SET_NEWREQUEST_DISTRICT_SUGGESTIONS'
);
export const setMicrodistrictSuggestionsAction = createAction(
  'SET_NEWREQUEST_MICRODISTRICT_SUGGESTIONS'
);
export const setSchemesSuggestionsAction = createAction(
  'SET_NEWREQUEST_SCHEMES_SUGGESTIONS'
);
export const setWallIdsSuggestionsAction = createAction(
  'SET_NEWREQUEST_WALLIDS_SUGGESTIONS'
);
export const setNewRequestFormValuesAction = createAction(
  'SET_NEWREQUEST_FORM_VALUES'
);
export const setNewRequestNamesAction = createAction('SET_NEWREQUEST_NAMES');
export const setMapAreasAction = createAction('SET_MAP_AREAS');
export const removeAreasAction = createAction('REMOVE_AREAS');

export const deleteSuggestionsAction = createAction('DELETE_SUGGESTIONS');
export const restoreInitialDataAction = createAction(
  'RESTORE_INITIAL_NEWREQUEST'
);

export const updateHouseNumber = createAction('SAVE_HOUSE_NUMBER');
export const updateStreetId = createAction('SAVE_STREET_ID');
export const updateAddressInfo = createAction('SAVE_ADDRESS_INFO');
export const clearForm = createAction('CLEAR_FORM');

export const clearAdditionalFormData = dispatch => dispatch(clearForm());

export const getCitiesSuggestions = (dispatch, city, areaId) => {
  const action = () => api.geoData.getCitiesSuggestions(city, areaId);
  return callApi(action)(dispatch);
};

export const getGlobalObjectData = (streetId, house) => {
  const action = () => api.geoData.getGlobal(streetId, house);
  return callApi(action, GET_GLOBAL_OBJECT_DATA);
};

export const loadCitySuggestions = (city, areaId, cityId) => ({
  type: LOAD_CITIES_ASYNC,
  isGuarded: true,
  city,
  areaId,
  cityId,
});
export const loadAreaSuggestions = area => ({
  type: LOAD_AREA_ASYNC,
  isGuarded: true,
  area,
});
export const loadDistrictSuggestions = (districtName, cityId, districtId) => ({
  type: LOAD_DISTRICT_ASYNC,
  isGuarded: true,
  district: districtName,
  cityId,
  id: districtId,
});
export const loadMicroDistrictSuggestions = (microdistrict, cityId, id) => ({
  type: LOAD_MICRODISTRICT_ASYNC,
  isGuarded: true,
  microdistrict,
  cityId,
  id,
});
export const loadSchemesSuggestionsAction = data => ({
  type: LOAD_FLAT_SCHEMES_ASYNC,
  isGuarded: true,
  data,
});
export const loadStreetSuggestions = values => ({
  type: LOAD_STREETS_ASYNC,
  isGuarded: true,
  values,
});
export const loadAgencySuggestions = values => ({
  type: LOAD_AGENCY_ASYNC,
  isGuarded: true,
  values,
});
export const createNewFlatRequestAction = (data, isNew) => ({
  type: NEW_FLAT_REQUEST_ASYNC,
  isGuarded: true,
  data,
  isNew,
});
export const turnToAreasAsyncAction = data => ({
  type: TURN_TO_AREAS_ASYNC,
  isGuarded: true,
  data,
});
export const uploadPhotoAction = data => ({
  type: UPLOAD_PHOTO_ASYNC,
  isGuarded: true,
  data,
});

export const setHouseNumber = data => ({
  type: SET_HOUSE_NUMBER,
  isGuarded: true,
  data,
});
