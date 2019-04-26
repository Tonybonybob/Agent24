import { createReducer } from 'redux-act';
import _ from 'lodash';
import { getFormValues } from 'redux-form';

import {
  setCitiesAction, setAddressAction, setFiltersAction, setCurrentFilter, setFilterChangedAction, setFilterNameChangedAction,
  setEstateStatus, setFilterOpenedAction,
} from '../actions/filters';
import { getUserCityId } from './user';
import { descriptionFiltersInitial } from '../../pages/DatabasePage/Filters';

const initialValues = {
  cities: [],
  address: [],
  filters: [],
  currentFilter: false,
  isFilterChanged: false,
  isFilterNameChanged: false,
  isFilterOpened: false,
};

export default createReducer({
  [setCitiesAction]: (state, payload) => ({ ...state, cities: payload }),
  [setAddressAction]: (state, payload) => ({ ...state, address: payload }),
  [setFiltersAction]: (state, payload) => ({ ...state, filters: payload }),
  [setCurrentFilter]: (state, payload) => ({ ...state, currentFilter: payload }),
  [setFilterChangedAction]: (state, payload) => ({ ...state, isFilterChanged: payload }),
  [setFilterNameChangedAction]: (state, payload) => ({ ...state, isFilterNameChanged: payload }),
  [setEstateStatus]: (state, payload) => ({ ...state, estateStatus: payload }),
  [setFilterOpenedAction]: (state, payload) => {console.log(payload); return { ...state, isFilterOpened: payload }},
}, initialValues);

export const getFiltersReducer = state => state.filters;
export const getCities = state => state.filters.cities || {};
export const getUserCities = state => _.flatten(Object.values(getCities(state)));
export const getEstateStatus = state => state.filters.estateStatus;

export const getFilterOpened = state => getFiltersReducer(state).isFilterOpened;
export const getAddress = state => state.filters.address || {};
export const getAdminAreas = state => getAddress(state).adminAreas || [];
export const getMicrodistricts = state => getAddress(state).microdistricts || [];
export const getStreets = state => getAddress(state).streets || [];
export const getCommonAddressSuggest = state => [
  ...getAdminAreas(state).slice(0, 6),
  ...getMicrodistricts(state).slice(0, 6),
  ...getStreets(state).slice(0, 6),
];

export const getCityNotChanged = state => (
  getUserCityId(state) === (getFormValues('GeneralFiltersForm')(state) || {}).cityId
    || !(getFormValues('GeneralFiltersForm')(state) || {}).cityId
);

export const getFilters = state => state.filters.filters;
export const getCurrentFilter = state => state.filters.currentFilter;
export const getMLSNotChanged = state => (
  (getCurrentFilter(state) || {}).isMLS === (getFormValues('GeneralFiltersForm')(state) || {}).isMLS
    || !(getFormValues('GeneralFiltersForm')(state) || {}).isMLS
);
export const getFilterIsChanged = state => (
  _.isEqual(descriptionFiltersInitial, getFormValues('DescriptionFiltersForm')(state))
  && getCityNotChanged(state) && getMLSNotChanged(state)
);
export const getCurrentFilterNotChanged = state => (
  _.isEqual(
    getFormValues('DescriptionFiltersForm')(state),
    getCurrentFilter(state),
  ) && getCityNotChanged(state) && getMLSNotChanged(state)
);
export const getFiltersNumber = state => (state.filters.filters || []).length;
export const getFilterNameIsChanged = state => state.filters.isFilterNameChanged;
