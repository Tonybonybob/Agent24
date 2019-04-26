import { createAction } from 'redux-act';

export const SIGN_IN_ASYNC = '@@/auth/SIGN_IN_ASYNC';
export const RECOVER_PASSWORD_ASYNC = '@@/auth/RECOVER_PASSWORD_ASYNC';
export const SIGN_OUT_ASYNC = '@@/auth/SIGN_OUT_ASYNC';
export const CHECK_PHONE_ASYNC = '@@/auth/CHECK_PHONE_ASYNC';
export const CHECK_SMS_TOKEN_ASYNC = '@@/auth/CHECK_SMS_TOKEN_ASYNC';
export const ADD_REGISTRATION_LOGO_ASYNC =
  '@@/auth/ADD_REGISTRATION_LOGO_ASYNC';
export const LOAD_STREETS_ASYNC = '@@/auth/LOAD_STREETS_ASYNC';

export const setTokenAction = createAction('SET_TOKEN');
export const setRefreshTokenAction = createAction('SET_REFRESH_TOKEN');
export const setTokenRefreshingAction = createAction('SET_TOKEN_REFRESHING');
export const authLoginFail = createAction('AUTH_FAIL');
export const setRegistrationStepAction = createAction('SET_REGISTRATION_STEP');
export const setSmsTokenAction = createAction('SET_SMS_TOKEN');
export const setTokenIsValid = createAction('SET_TOKEN_VALID');
export const addRegistrationLogo = createAction('ADD_REGISTRATION_LOGO');
export const setIsOOOFormAction = createAction('SET_IS_OOO');
export const setFormPhoneCheckAction = createAction('SET_FORM_PHONE_CHECK');
export const setAuthCreateAgencyFormValuesAction = createAction(
  'SET_AUTH_CREATE_AGENCY_FORM_VALUES'
);

export const checkPhoneAsyncAction = data => ({
  type: CHECK_PHONE_ASYNC,
  isGuarded: false,
  data,
});
export const checkSmsTokenAsyncAction = token => ({
  type: CHECK_SMS_TOKEN_ASYNC,
  isGuarded: false,
  data: token,
});

export const addRegistrationLogoAsyncAction = photo => ({
  type: ADD_REGISTRATION_LOGO_ASYNC,
  isGuarded: false,
  photo,
});

export const signInAsyncAction = userData => ({
  type: SIGN_IN_ASYNC,
  data: userData,
});

export const recoverPasswordAsyncAction = email => ({
  type: RECOVER_PASSWORD_ASYNC,
  isGuarded: false,
  data: email,
});

export const signOutAsyncAction = () => ({
  type: SIGN_OUT_ASYNC,
});

export const loadStreetsAsyncAction = data =>
  console.log(data, 'loadAsync') || {
    type: LOAD_STREETS_ASYNC,
    data,
    isGuarded: false,
  };
