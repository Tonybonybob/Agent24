import { put, call, select } from 'redux-saga/effects';
import { getFormValues } from 'redux-form';
import { push } from 'connected-react-router';

import { getNewRequest } from '../reducers/newRequest';
import * as newRequestActions from '../actions/newRequest';
import * as notificationActions from '../actions/notification';
import { performRequestSaga } from './api';

export function* loadCities({ isGuarded, city, areaId, cityId }) {
  try {
    const config = {
      url: '/locations/city',
      method: 'get',
      params: cityId
        ? { id: cityId }
        : {
            name: city,
            areaId: areaId || null,
          },
    };

    const cities = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(newRequestActions.setCitiesSuggestionsAction(cities));
  } catch (e) {
    console.log(e);
  }
}

export function* loadAreas({ isGuarded }) {
  try {
    const config = {
      url: '/locations/area',
      method: 'get',
    };
    const areas = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(newRequestActions.setAreaSuggestionsAction(areas));
  } catch (e) {
    console.log(e);
  }
}

export function* loadStreets({ isGuarded, values }) {
  try {
    const config = {
      url: '/locations/street',
      method: 'get',
      dataType: 'json',
      params: {
        cityId: values.cityId,
        isCity: values.isCity,
        name: values.name,
      },
    };
    const suggestion = yield call(performRequestSaga, {
      config,
      metaData: {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        isGuarded,
      },
    });

    const streetsOrComplexes = {
      complices: suggestion.complices,
      streets: suggestion.streets,
    };

    const isComplexes =
      streetsOrComplexes.complices && streetsOrComplexes.complices.length > 0;

    if (values.onlyComplex && isComplexes) {
      yield put(
        newRequestActions.setStreetSuggestionsAction(streetsOrComplexes)
      );
    } else if (!values.onlyComplex) {
      yield put(
        newRequestActions.setStreetSuggestionsAction(streetsOrComplexes)
      );
    }

    return;
  } catch (e) {
    console.log(e);
  }
}

export function* loadAgencies({ isGuarded, values }) {
  try {
    const config = {
      url: '/agency',
      method: 'get',
      params: values,
    };

    const agencies = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(newRequestActions.setAgenciesSuggestionsAction(agencies));

    return;
  } catch (e) {
    console.log(e);
  }
}

export function* loadDistricts({ isGuarded, district, cityId, id }) {
  try {
    const config = {
      url: '/adminArea',
      method: 'get',
      params: id ? { id } : { name: district, cityId },
    };
    console.log('distr', id, config);

    const districts = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(newRequestActions.setDistrictSuggestionsAction(districts));
  } catch (e) {
    console.log(e);
  }
}

export function* loadMicrodistricts({
  isGuarded,
  microdistrict,
  cityId,
  id,
  adminAreaId,
}) {
  try {
    const config = {
      url: '/microdistrict',
      method: 'get',
      params: id ? { id } : { name: microdistrict, cityId, adminAreaId },
    };
    console.log(id, config);

    const microdistricts = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(
      newRequestActions.setMicrodistrictSuggestionsAction(microdistricts)
    );
  } catch (e) {
    console.log(e);
  }
}

export function* turnToAreas({ isGuarded, data }) {
  try {
    console.log(data);

    yield put(newRequestActions.setMapAreasAction(data));
  } catch (error) {
    console.log(error);
  }
}

export function* loadFlatSchemes({ isGuarded, data }) {
  try {
    const config = {
      url: '/flat/scheme',
      method: 'get',
      params: data,
    };

    const responseObject = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    const valuesToNewRequestForm = {};

    if (responseObject.maxFloor) {
      valuesToNewRequestForm.maxFloor = responseObject.maxFloor;
    }
    if (responseObject.complexName) {
      valuesToNewRequestForm.complex = responseObject.complexName;
    }
    if (Object.keys(valuesToNewRequestForm).length > 0) {
      yield put(
        newRequestActions.setNewRequestFormValuesAction(valuesToNewRequestForm)
      );
    }

    yield put(
      newRequestActions.setSchemesSuggestionsAction(responseObject.schemeIds)
    );
    yield put(
      newRequestActions.setWallIdsSuggestionsAction(responseObject.wallIds)
    );
  } catch (e) {
    console.log(e);
  }
}

export function* createNewFlatRequest({ isGuarded, data, isNew }) {
  try {
    const {
      areaId,
      cityId,
      adminAreaId,
      apartment,
      conditionId,
      description,
      bathroomsId,
      ceilingHeightId,
      heatingId,
      isCorner,
      isGas,
      isTechnicalFloor,
      overlappingId,
      planId,
      roofId,
      floor,
      house,
      kitchenSquare,
      housing,
      livingSquare,
      maxFloor,
      microdistrictId,
      price,
      room,
      schemeId,
      status,
      streetId,
      totalSquare,
      wallFlatId,
      complex,
      equipmentIds,
      recreationIds,
      parkingIds,
      viewIds,
      hideInSearch,
      photos,
      hidePhone,
      id,
    } = yield select(getFormValues('NewRequestForm'));

    const { houseNumberId } = yield select(getNewRequest);

    const refactoredForm = {
      houseNumberId,
      adminAreaId,
      apartment: parseInt(apartment, 10),
      areaId,
      cityId,
      conditionId,
      contactId: parseInt(data.clientId, 10),
      description,
      flatExtra: {
        bathroomsId,
        ceilingHeightId,
        equipmentIds,
        heatingId,
        isCorner: isCorner === 'undefined' ? null : isCorner,
        isGas: isGas === 'undefined' ? null : isGas,
        isTechnicalFloor:
          isTechnicalFloor === 'undefined' ? null : isTechnicalFloor,
        overlappingId,
        parkingIds,
        planId,
        recreationIds,
        roofId,
        viewIds,
      },
      floor: parseInt(floor, 10),
      house,
      housing,
      inSearch: !hideInSearch,
      hidePhone,
      kitchenSquare: parseFloat(kitchenSquare, 10),
      livingSquare: parseFloat(livingSquare, 10),
      maxFloor: parseInt(maxFloor, 10),
      microdistrictId,
      photos: photos.map(({ photoType, photoId }) => ({
        photoId,
        photoType: photoType || null,
      })),
      price: parseFloat(price, 10),
      requestObject: data.requestObject,
      requestType: data.requestType,
      room,
      schemeId,
      status,
      streetId,
      totalSquare: parseFloat(totalSquare, 10),
      wallFlatId,
      complex,
    };

    // const data
    const config = {
      url: isNew ? '/flat' : `/flat/${id}`,
      method: isNew ? 'post' : 'put',
      data: refactoredForm,
    };

    console.log(config);

    const flat = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    // yield put(clientActions.updateClientObjectsDatabaseAction([{
    //   autoSearchCommunity: 0,
    //   autoSearchGroup: 0,
    //   contactId: parseInt(data.clientId, 10),
    //   createdDate: moment().format('YYYY-MM-DD HH:mm'),
    //   id: flat.id,
    //   isInOwners: true,
    //   isMyAccount: true,
    //   label: null,
    //   lastContactTime: null,
    //   operation: data.requestType,
    //   owner: true,
    //   price: parseFloat(price, 10),
    //   source: null,
    //   specification: '5-к Кирова пр. 5 5/5эт Хрущевка Под ремонт',
    //   status,
    //   type: data.requestObject,
    // }]));
    // yield put(clientActions.setFullObjectInfoAction(refactoredForm));

    yield put(push(`/client/${data.clientId}/requests`));
    yield put(
      notificationActions.openNotificationAction({ text: 'Запрос сохранен' })
    );
  } catch (e) {
    console.log(e);
  }
}

export function* uploadPhoto({ isGuarded, data: { photos, id } }) {
  try {
    const formData = new FormData();
    photos.forEach((photo, i) => {
      formData.set(`uploadFile[${i}]`, photo);
    });
    console.log('photos', photos);
    // formData.set('uploadPhoto', photos);
    formData.set('id', id);

    const config = {
      method: 'post',
      url: 'http://api.agent24.ua/fupload/index.php?r=fupload',
      data: formData,
    };
    console.log('formData', formData);
    const response = yield call(performRequestSaga, {
      config,
      metaData: {
        isGuarded,
        header: {
          'Content-Type': 'multipart/form-data',
        },
      },
    });
    console.log('response', response);
    const { photos: reduxPhotos } = yield select(
      getFormValues('NewRequestForm')
    ) || {};

    const updatedPhotos = reduxPhotos.map(photo => {
      const foundPhoto = response.find(el => el.uploadFile === photo.photoName);
      return foundPhoto
        ? {
            photoId: foundPhoto.URL,
            photoType: photo.photoType,
            id: photo.id,
          }
        : photo;
    });
    const removeDuplicatesByURL = updatedPhotos.reduce((arr, acc) => {
      const foundValue = arr.find(el => el.id === acc.id);
      return foundValue ? arr : [...arr, acc];
    }, []);

    yield put(
      newRequestActions.setNewRequestFormValuesAction({
        photos: removeDuplicatesByURL,
      })
    );
  } catch (e) {
    console.log('fileError', e, Object.entries(e));
  }
}

export function* setHouseNumber({ data }) {
  const { houseNumber, streetId } = data;
  if (!houseNumber || !streetId) {
    return;
  }

  yield put(newRequestActions.getGlobalObjectData(streetId, houseNumber));

  const config = {
    url: '/locations/address',
    method: 'POST',
    dataType: 'json',
    data: JSON.stringify({ streetId, houseNumber }),
  };

  console.log(config);
  const response = yield call(performRequestSaga, {
    config,
    metaData: {
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      isGuarded: true,
    },
  });
  const {
    adminAreaId,
    adminAreaName,
    microDistrictId,
    microDistrictName,
    geoLocation,
    id,
  } = response;

  yield put(
    newRequestActions.updateAddressInfo({
      adminAreaId,
      adminAreaName,
      microDistrictId,
      microDistrictName,
      geoLocation,
      houseNumberId: id,
    })
  );
  yield put(
    newRequestActions.updateHouseNumber({
      houseNumber: data,
    })
  );
}
