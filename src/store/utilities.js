import { successAction, errorAction } from './types';

export const callApi = (action, keys, options) => dispatch => {
  const { startA, resolveA, rejectA } = parseKeyCall(keys);

  startA && dispatch(startA(options));
  return new Promise((resolve, reject) => {
    const actionPromise = action();
    actionPromise.then(data => {
      resolveA && dispatch(resolveA(data, options));
      resolve(data);
    });
    actionPromise.catch(error => {
      rejectA && dispatch(rejectA(error, options));
      reject(error);
    });
  });
};

const parseKeyCall = key => {
  if (typeof key === 'string') {
    return {
      startA: options => ({ type: key, payload: options }),
      resolveA: data => ({
        type: successAction(key),
        payload: data,
      }),
      rejectA: data => ({
        type: errorAction(key),
        payload: data,
      }),
    };
  } else {
    return key || {};
  }
};
