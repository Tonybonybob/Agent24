import { createAction } from 'redux-act';

export const FILTERS_SAVE_ASYNC = '@@/filters/FILTERS_SAVE_ASYNC';
export const FILTER_DATA_ASYNC = '@@/filters/FILTER_DATA_ASYNC';
export const FILTER_GET_CITIES_ASYNC = '@@/filters/FILTER_GET_CITIES_ASYNC';
export const FILTER_GET_ADDRESS_ASYNC = '@@/filters/FILTER_GET_ADDRESS_ASYNC';
export const FILTER_GET_FILTERS_ASYNC = '@@/filters/FILTER_GET_FILTERS_ASYNC';
export const REMOVE_FILTER_ASYNC = '@@/filters/REMOVE_FILTER_ASYNC';
export const CHOOSE_FILTER_ASYNC = '@@/filters/CHOOSE_FILTER_ASYNC';
export const SET_STATUS_ASYNC = '@@/filters/SET_STATUS_ASYNC';

export const setFiltersAction = createAction('SET_FILTERS');
export const setCitiesAction = createAction('SET_CITIES');
export const setAddressAction = createAction('SET_ADDRESS');
export const setGeneralFiltersFormValuesAction = createAction(
  'SET_GENERAL_FILTERS_FORM_VALUES'
);
export const clearDescriptionFiltersFormAction = createAction(
  'CLEAR_DESCRIPTION_FILTERS'
);
export const setDescriptionFiltersFormAction = createAction(
  'SET_DESCRIPTION_FILTERS'
);
export const addDescriptionFiltersFormAction = createAction(
  'ADD_DESCRIPTION_FILTERS'
);
export const setCurrentFilter = createAction('SET_CURRENT_FILTER');
export const setFilterChangedAction = createAction('SET_FILTER_CHANGED');
export const setFilterNameChangedAction = createAction(
  'SET_FILTER_NAME_CHANGED'
);
export const setEstateStatus = createAction('SET_ALL_STATUS');
export const setFilterOpenedAction = createAction('SET_FILTER_OPENED');

export const filtersSaveAsyncAction = data => ({
  type: FILTERS_SAVE_ASYNC,
  isGuarded: true,
  data,
});

export const filterDataAsyncAction = data => ({
  type: FILTER_DATA_ASYNC,
  isGuarded: true,
  data,
});

export const filterGetCitiesAsyncAction = () => ({
  type: FILTER_GET_CITIES_ASYNC,
  isGuarded: true,
});

export const getAddressAsyncAction = data => ({
  type: FILTER_GET_ADDRESS_ASYNC,
  isGuarded: true,
  data,
});

export const getFiltersAsyncAction = () => ({
  type: FILTER_GET_FILTERS_ASYNC,
  isGuarded: true,
});

export const removeFilterAsyncAction = data => ({
  type: REMOVE_FILTER_ASYNC,
  isGuarded: true,
  data,
});

export const chooseFilterAsyncAction = data => ({
  type: CHOOSE_FILTER_ASYNC,
  isGuarded: true,
  data,
});

export const setStatusAsyncAction = () => ({
  type: SET_STATUS_ASYNC,
  isGuarded: true,
});
