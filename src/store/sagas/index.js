import { all, takeLatest } from 'redux-saga/effects';

import * as authSagas from './auth';
import * as userSagas from './user';
import * as calendarSagas from './calendar';
import * as apiSagas from './api';
import * as databaseSagas from './database';
import * as clientSagas from './client';
import * as filtersSagas from './filters';
import * as modalSagas from './modal';
import * as exclusiveSagas from './exclusive';
import * as agentSagas from './agent';
import * as landingSagas from './landing';

import * as newRequestSagas from './newRequest';
import * as attributesSagas from './attributes';
import * as authActions from '../actions/auth';
import * as userActions from '../actions/user';
import * as calendarActions from '../actions/calendar';
import * as apiActions from '../actions/api';
import * as clientActions from '../actions/client';
import * as newRequestActions from '../actions/newRequest';
import * as databaseActions from '../actions/database';
import * as filtersActions from '../actions/filters';
import * as attributesActions from '../actions/attributes';
import * as modalActions from '../actions/modal';
import * as exclusiveActions from '../actions/exclusive';
import * as agentActions from '../actions/agent';
import * as landingActions from '../actions/landing';

export default function* rootSaga() {
  yield all([
    takeLatest(apiActions.PERFORM_REQUEST_ASYNC, apiSagas.performRequestSaga),
    takeLatest(authActions.SIGN_IN_ASYNC, authSagas.signIn),
    takeLatest(authActions.RECOVER_PASSWORD_ASYNC, authSagas.recoverPassword),
    takeLatest(authActions.SIGN_OUT_ASYNC, authSagas.signOut),
    takeLatest(authActions.CHECK_PHONE_ASYNC, authSagas.checkPhone),
    takeLatest(authActions.CHECK_SMS_TOKEN_ASYNC, authSagas.checkSmsToken),
    takeLatest(authActions.ADD_REGISTRATION_LOGO_ASYNC, authSagas.addRegistrationLogo),
    takeLatest(authActions.LOAD_STREETS_ASYNC, authSagas.loadStreets),

    takeLatest(userActions.USER_LOAD_ASYNC, userSagas.loadUser),

    takeLatest(calendarActions.CALENDAR_TASKS_LOAD_ASYNC, calendarSagas.loadTasks),
    takeLatest(calendarActions.CALENDAR_CREATE_TASK_ASYNC, calendarSagas.createTask),

    takeLatest(clientActions.LOAD_CLIENT_ASYNC, clientSagas.loadClient),
    takeLatest(clientActions.PRELOAD_CLIENT_ASYNC, clientSagas.preloadClient),
    takeLatest(clientActions.BOUNDED_CLIENT_ASYNC, clientSagas.loadBoundedClient),
    takeLatest(clientActions.CREATE_CLIENT_ASYNC, clientSagas.createClient),
    takeLatest(clientActions.CREATE_CLIENT_EDIT_ASYNC, clientSagas.createClientEdit),
    takeLatest(clientActions.LOAD_CITIES_ASYNC, clientSagas.loadCities),
    takeLatest(clientActions.LOAD_AGENCIES_ASYNC, clientSagas.loadAgencies),
    takeLatest(clientActions.LOAD_OBJECTS_DATABASE_ASYNC, clientSagas.loadObjectsDatabase),
    takeLatest(clientActions.LOAD_OBJECT_ITEM_DATABASE_ASYNC, clientSagas.loadFullObject),
    takeLatest(clientActions.CLIENT_UPLOAD_PROFILE_PHOTO, clientSagas.uploadProfilePhoto),

    takeLatest(newRequestActions.LOAD_CITIES_ASYNC, newRequestSagas.loadCities),
    takeLatest(newRequestActions.LOAD_AREA_ASYNC, newRequestSagas.loadAreas),
    takeLatest(newRequestActions.LOAD_DISTRICT_ASYNC, newRequestSagas.loadDistricts),
    takeLatest(newRequestActions.LOAD_MICRODISTRICT_ASYNC, newRequestSagas.loadMicrodistricts),
    takeLatest(newRequestActions.LOAD_STREETS_ASYNC, newRequestSagas.loadStreets),
    takeLatest(newRequestActions.LOAD_FLAT_SCHEMES_ASYNC, newRequestSagas.loadFlatSchemes),
    takeLatest(newRequestActions.LOAD_AGENCY_ASYNC, newRequestSagas.loadAgencies),
    takeLatest(newRequestActions.NEW_FLAT_REQUEST_ASYNC, newRequestSagas.createNewFlatRequest),
    takeLatest(newRequestActions.UPLOAD_PHOTO_ASYNC, newRequestSagas.uploadPhoto),
    takeLatest(newRequestActions.TURN_TO_AREAS_ASYNC, newRequestSagas.turnToAreas),
    takeLatest(newRequestActions.SET_HOUSE_NUMBER, newRequestSagas.setHouseNumber),

    takeLatest(attributesActions.LOAD_FLAT_ATTRIBUTES_ASYNC, attributesSagas.loadFlatAttributes),
    takeLatest(attributesActions.LOAD_ALL_ATTRIBUTES_ASYNC, attributesSagas.loadAllAttributes),
    takeLatest(attributesActions.LOAD_ALL_STATES_ASYNC, attributesSagas.loadAllStates),
    takeLatest(attributesActions.LOAD_ESTATE_STATUS_ATTRIBUTES_ASYNC, attributesSagas.loadEstateStatusAttributes),
    takeLatest(attributesActions.LOAD_PHOTO_TYPE_ATTRIBUTES_ASYNC, attributesSagas.loadPhotoTypeAttributes),

    takeLatest(databaseActions.ADD_COMMENT_ASYNC, databaseSagas.addComment),
    takeLatest(databaseActions.REMOVE_COMMENT_ASYNC, databaseSagas.removeComment),
    takeLatest(databaseActions.CHANGE_COMMENT_ASYNC, databaseSagas.editComment),
    takeLatest(databaseActions.GET_FULL_OBJECT_ASYNC, databaseSagas.setFullObject),
    takeLatest(databaseActions.SET_OBJECT_LABEL_ASYNC, databaseSagas.setObjectLabel),

    takeLatest(filtersActions.FILTERS_SAVE_ASYNC, filtersSagas.saveFilters),
    takeLatest(filtersActions.FILTER_GET_FILTERS_ASYNC, filtersSagas.getFilters),
    takeLatest(filtersActions.REMOVE_FILTER_ASYNC, filtersSagas.removeFilter),
    takeLatest(filtersActions.CHOOSE_FILTER_ASYNC, filtersSagas.chooseFilter),
    takeLatest(filtersActions.FILTER_DATA_ASYNC, filtersSagas.filterData),
    takeLatest(filtersActions.FILTER_GET_CITIES_ASYNC, filtersSagas.getCities),
    takeLatest(filtersActions.FILTER_GET_ADDRESS_ASYNC, filtersSagas.getAddress),
    takeLatest(filtersActions.SET_STATUS_ASYNC, filtersSagas.setStatus),

    takeLatest(modalActions.ADD_LABEL_ASYNC, modalSagas.addLabel),

    takeLatest(exclusiveActions.LOAD_EXCLUSIVE_OBJECTS, exclusiveSagas.loadObjects),

    takeLatest(agentActions.AGENT_UPLOAD_PROFILE_PHOTO, agentSagas.uploadProfilePhoto),

    takeLatest(landingActions.SEND_MAIL_ASYNC, landingSagas.sendMail),
  ]);
}
