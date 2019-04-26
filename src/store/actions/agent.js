import { createAction } from 'redux-act';

export const AGENT_UPLOAD_PROFILE_PHOTO = '@@/client/AGENT_UPLOAD_PROFILE_PHOTO';

export const setAgentEditFormValuesAction = createAction('SET_AGENT_EDIT_FORM_VALUES');

export const agentUploadProfilePhoto = photo => ({
  type: AGENT_UPLOAD_PROFILE_PHOTO,
  isGuarded: true,
  photo,
});
