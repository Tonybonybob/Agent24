import { put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as clientActions from '../actions/client';
import * as notificationActions from '../actions/notification';
import { performRequestSaga } from './api';
import { getUserCity, getUserCityId } from '../reducers/user';

// eslint-disable-next-line import/prefer-default-export
export function* preloadClient({ isGuarded, data }) {
  try {
    const config = {
      url: '/contact/info',
      method: 'get',
      params: data,
    };
    const clientData = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    if (clientData.firstName) {
      yield put(
        clientActions.setPreloadClientInfoAction({
          ...clientData,
          phoneIsWritten: true,
          newClient: false,
          agencyName: clientData.agencyName || '',
        })
      );
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message === 'Contact phone not found'
    ) {
      const cityName = yield select(getUserCity);
      const cityId = yield select(getUserCityId);
      // Илья еще не добавил cityName в loadUserInfo, там только id

      yield put(
        clientActions.setPreloadClientInfoAction({
          cityName: cityName || '',
          cityId,
          newClient: true,
          phoneIsWritten: true,
        })
      );
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.message === 'Client is in system'
    ) {
      // как то так, это плейсхолдер
      throw new Error('Клиент в системе!');
    }
    console.error(error.response);
  }
}

export function* loadBoundedClient({ isGuarded, data }) {
  try {
    const config = {
      url: '/contact/info',
      method: 'get',
      params: data,
    };
    const clientData = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(clientActions.seBoundedClientInfoAction(clientData));
  } catch (error) {
    console.log(error);
    yield put(clientActions.seBoundedClientInfoAction(null));
  }
}

export function* loadClient({ isGuarded, id }) {
  try {
    const config = {
      url: '/contact/info',
      method: 'get',
      params: { id },
    };
    const clientData = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(clientActions.setClientInfoAction(clientData));

    console.log(clientData);
  } catch (error) {
    console.error(error);
  }
}

export function* createClient({ isGuarded, data: { request, handleClose } }) {
  try {
    const config = {
      url: '/contact/create',
      method: 'post',
      data: JSON.stringify(request),
    };
    const responseData = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded, header: { 'Content-Type': 'application/json' } },
    });

    if (responseData.response === 400) {
      return false;
    }
    if (request.isContinue) {
      yield put(clientActions.clearClientInfoAction());
      yield put(push(`/client/${responseData}/requests/new`));
    } else {
      handleClose();
      yield put(
        notificationActions.openNotificationAction({
          text: 'Запрос сохранен',
        })
      );
    }
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}

export function* loadCities({ isGuarded, city, areaId }) {
  try {
    const config = {
      url: '/locations/city',
      method: 'get',
      params: areaId
        ? {
            name: city,
            areaId,
          }
        : { name: city },
    };

    const cities = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(clientActions.setCitiesSuggestionsAction(cities));
  } catch (e) {
    console.log(e);
  }
}

export function* loadAgencies({ isGuarded, agency }) {
  try {
    const cityId = yield select(getUserCityId);
    const config = cityId
      ? {
          url: '/agency',
          method: 'get',
          params: {
            name: agency,
            cityId,
          },
        }
      : {
          url: '/agency',
          method: 'get',
          params: {
            name: agency,
          },
        };

    const agencies = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(clientActions.setAgenciesSuggestionsAction(agencies));
  } catch (error) {
    console.log(error);
  }
}

export function* loadObjectsDatabase({ isGuarded, id }) {
  try {
    const config = {
      url: '/contact/object',
      method: 'get',
      params: {
        contactId: id,
      },
    };

    const objectsDatabase = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    if (objectsDatabase.response && objectsDatabase.response.status === 401) {
      throw new Error(objectsDatabase.response.statusText);
    }
    yield put(clientActions.setClientObjectsDatabaseAction(objectsDatabase));
  } catch (error) {
    console.log(error);
  }
}

export function* loadFullObject({ id, isGuarded }) {
  try {
    const config = {
      url: '/flat',
      method: 'get',
      params: { id },
    };

    const fullObject = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(clientActions.setFullObjectInfoAction(fullObject[0]));
  } catch (e) {
    console.log(e);
  }
}

export function* createClientEdit({ isGuarded, data }) {
  try {
    const config = {
      url: '/contact/info',
      method: 'post',
      data,
    };

    const responseData = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    if (responseData.response === 400) {
      return false;
    }
    yield put(
      notificationActions.openNotificationAction({
        text: 'Клиент сохранен',
      })
    );
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function* uploadProfilePhoto({ isGuarded, photo }) {
  try {
    const formData = new FormData();
    formData.set('uploadFile[0]', photo);
    formData.set('uploadType', 'avatar');

    const config = {
      method: 'post',
      url: 'http://api.agent24.ua/r=fupload/index.php?fupload',
      data: formData,
    };

    const response = yield call(performRequestSaga, {
      config,
      metaData: {
        isGuarded,
        header: {
          'Content-Type': 'multipart/form-data',
        },
      },
    });
    console.log(response);
    if (response && response[0].uploadFile) {
      console.log('here', response[0].URL);
      yield put(
        clientActions.setClientEditFormValuesAction({ photo: response[0].URL })
      );
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
