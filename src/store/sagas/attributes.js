import { put, call } from 'redux-saga/effects';

import * as attributesActions from '../actions/attributes';
import { performRequestSaga } from './api';

// eslint-disable-next-line import/prefer-default-export
export function* loadFlatAttributes() {
  try {
    const config = {
      url: '/flat/attributes',
      method: 'get',
      params: {},
    };
    const dataArray = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded: true },
    });
    if (dataArray) {
      yield put(attributesActions.updateAttributesAction(dataArray));
    }
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}

export function* loadEstateStatusAttributes() {
  try {
    const config = {
      url: '/estateStatus/request',
      method: 'get',
      params: {},
    };
    const dataArray = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded: true },
    });
    if (dataArray) {
      yield put(
        attributesActions.updateAttributesAction({ estateStatus: dataArray })
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export function* loadPhotoTypeAttributes() {
  try {
    const config = {
      url: '/photoType',
      method: 'get',
      params: {},
    };
    const dataArray = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded: true },
    });
    if (dataArray) {
      yield put(
        attributesActions.updateAttributesAction({ photoTypes: dataArray })
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export function* loadAllAttributes({ isGuarded }) {
  try {
    const flatConfig = {
      url: '/flat/attributes',
      method: 'get',
      params: {},
    };

    const houseConfig = {
      url: '/house/attributes',
      method: 'get',
      params: {},
    };

    const landConfig = {
      url: '/land/attributes',
      method: 'get',
      params: {},
    };

    const flat = yield call(performRequestSaga, {
      config: flatConfig,
      metaData: { isGuarded },
    });
    // const house = yield call(performRequestSaga, { config: houseConfig, metaData: { isGuarded } });
    // const land = yield call(performRequestSaga, { config: landConfig, metaData: { isGuarded } });

    if (flat /* || house || land */) {
      const totalData = {
        flat,
        // house,
        // land,
      };

      yield put(attributesActions.updateAttributesAction(totalData));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* loadAllStates({ isGuarded }) {
  try {
    const config = {
      url: '/locations/area',
      method: 'get',
      params: {},
    };

    const states = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    if (states) {
      yield put(attributesActions.updateAttributesAction({ states }));
    }
  } catch (e) {
    console.log(e);
  }
}
