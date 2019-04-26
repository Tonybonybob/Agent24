import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { createReducer } from 'redux-act';

import authReducer from './auth';

import userReducer from './user';
import clientReducer from './client';
import newRequestReducer from './newRequest';
import notificationReducer from './notification';
import chatReducer from './chat';
import filtersReducer from './filters';
import databaseReducer from './database';
import calendarReducer from './calendar';
import modalReducer from './modal';
import attributesReducer from './attributes';
import exclusiveReducer from './exclusive';
import landingReducer from './landing';
import geoData from './geoData';
import newRequestForm from './newRequestForm';
import {
  setPreloadClientInfoAction,
  setFormValuesAction,
  clearClientInfoAction,
  setCommentFormValueAction as setClientCommentFormValueAction,
  setClientEditFormValuesAction,
} from '../actions/client';
import {
  setGeneralFiltersFormValuesAction,
  clearDescriptionFiltersFormAction,
  setDescriptionFiltersFormAction,
  addDescriptionFiltersFormAction,
} from '../actions/filters';

import { setAgentEditFormValuesAction } from '../actions/agent';
import { setCommentFormValueAction } from '../actions/database';
import { setCalendarTaskFormValuesAction } from '../actions/calendar';
import {
  setIsOOOFormAction,
  authLoginFail,
  setFormPhoneCheckAction,
  setAuthCreateAgencyFormValuesAction,
} from '../actions/auth';

import { descriptionFiltersInitial } from '../../pages/DatabasePage/Filters';
import { clearFormLandingAction } from '../actions/landing';

export default combineReducers({
  form: form.plugin({
    SigninForm: createReducer({
      [authLoginFail]: state => ({
        ...state,
        values: {
          ...state.values,
          password: undefined, // <----- clear password value
        },
        fields: {
          ...state.fields,
          password: undefined, // <----- clear field state, too (touched, etc.)
        },
      }),
    }),
    AddClientForm: createReducer({
      [setPreloadClientInfoAction]: (state, payload) => ({
        values: {
          countryCode: state.values.countryCode,
          phoneNumber: state.values.phoneNumber,
          ...payload,
        },
      }),
      [setFormValuesAction]: (state, payload) => ({
        ...state,
        values: {
          ...state.values,
          ...payload,
        },
      }),
      [clearClientInfoAction]: () => ({}),
    }),
    CalendarTaskForm: createReducer({
      [setCalendarTaskFormValuesAction]: (state, payload) => ({
        ...state,
        values: {
          ...state.values,
          ...payload,
        },
      }),
    }),
    GeneralFiltersForm: createReducer({
      [setGeneralFiltersFormValuesAction]: (state, payload) => ({
        ...state,
        values: {
          ...state.values,
          ...payload,
        },
      }),
      [clearDescriptionFiltersFormAction]: state => ({
        ...state,
        fields: {},
        values: {
          ...state.initial,
          cityId: state.initial.cityId,
        },
      }),
    }),
    DescriptionFiltersForm: createReducer({
      [clearDescriptionFiltersFormAction]: () => ({
        values: descriptionFiltersInitial,
        initial: descriptionFiltersInitial,
        fields: {},
      }),
      [setDescriptionFiltersFormAction]: (state, payload) => ({
        ...state,
        values: {
          ...state.initial,
          ...payload,
        },
      }),
      [addDescriptionFiltersFormAction]: (state, payload) => ({
        ...state,
        values: {
          ...state.values,
          ...payload,
        },
      }),
    }),
    ObjectInfoCommentsForm: createReducer({
      [setCommentFormValueAction]: (state, payload) => ({
        ...state,
        values: {
          ...state.values,
          ...payload,
        },
      }),
    }),
    ClientsObjectInfoCommentsForm: createReducer({
      [setClientCommentFormValueAction]: (state, payload) => ({
        ...state,
        values: {
          ...(state || {}).values,
          ...payload,
        },
      }),
    }),
    ClientEditPageForm: createReducer({
      [setClientEditFormValuesAction]: (state, payload) => ({
        ...state,
        values: {
          ...(state || {}).values,
          ...payload,
        },
      }),
    }),
    ConfirmAgencyForm: createReducer({
      [setIsOOOFormAction]: (state, payload) => ({
        ...state,
        values: {
          ...state.values,
          isOOO: payload,
        },
      }),
    }),
    CreateAgencyForm: createReducer({
      [setAuthCreateAgencyFormValuesAction]: (state, { index, ...other }) => ({
        ...state,
        values: {
          ...state.values,
          branches: [
            ...state.values.branches.slice(0, index),
            { ...state.values.branches[index], ...other },
            ...state.values.branches.slice(index + 1),
          ],
        },
      }),
    }),
    AgentEditForm: createReducer({
      [setAgentEditFormValuesAction]: (state, payload) => ({
        ...state,
        values: {
          ...(state || {}).values,
          ...payload,
        },
      }),
    }),
    AgentInfoForm: createReducer({
      [setFormPhoneCheckAction]: (state, { index, ...other }) => ({
        ...state,
        values: {
          ...state.values,
          phones: [
            ...state.values.phones.slice(0, index),
            { ...state.values.phones[index], ...other },
            ...state.values.phones.slice(index + 1),
          ],
        },
      }),
    }),
    InvestorsForm: createReducer({
      [clearFormLandingAction]: state => ({
        values: {
          investorsName: state ? state.values.investorsName : '',
        },
        registeredFields: state && state.registeredFields,
      }),
    }),
    ResumesForm: createReducer({
      [clearFormLandingAction]: state => ({
        values: {
          candidateName: state ? state.values.candidateName : '',
        },
        registeredFields: state && state.registeredFields,
      }),
    }),
    LandingForm: createReducer({
      [clearFormLandingAction]: state => ({
        values: {
          subscribeName: state
            ? state.values
              ? state.values.subscribeName
              : ''
            : '',
        },
        registeredFields: state && state.registeredFields,
      }),
    }),
    NewRequestForm: newRequestForm,
  }),
  auth: authReducer,
  user: userReducer,
  client: clientReducer,
  notification: notificationReducer,
  chat: chatReducer,
  filters: filtersReducer,
  database: databaseReducer,
  calendar: calendarReducer,
  newRequest: newRequestReducer,
  attributes: attributesReducer,
  modal: modalReducer,
  exclusive: exclusiveReducer,
  landing: landingReducer,
  geoData,
});
