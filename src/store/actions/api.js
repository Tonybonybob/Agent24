// eslint-disable-next-line import/prefer-default-export
export const PERFORM_REQUEST_ASYNC = '@@/api/PERFORM_REQUEST_ASYNC';

export const performRequest = data => ({
  type: PERFORM_REQUEST_ASYNC,
  data,
});
