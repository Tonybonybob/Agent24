/* eslint-disable */

import { put, call, select } from 'redux-saga/effects';
import { getFormValues } from 'redux-form';
import _ from 'lodash';

import * as filtersActions from '../actions/filters';
import * as databaseActions from '../actions/database';
import { getFlatAttributes } from '../reducers/attributes';
import { getEstateStatus } from '../reducers/filters';
import { getAttributeNameById } from '../../utils';
import { performRequestSaga } from './api';
import { setStatic } from 'recompose';

export function* saveFilters({ isGuarded, data: type }) {
  try {
    const { requestType, requestObject, cityId, isMLS } = yield select(
      getFormValues('GeneralFiltersForm')
    );

    yield put(filtersActions.setFilterNameChangedAction(false));

    const { id, base, ...descriptionData } = yield select(
      getFormValues('DescriptionFiltersForm')
    );

    const neededFilterId = type === 'change' ? id : null;
    const data = Object.assign(
      {},
      {
        ...descriptionData,
        id: neededFilterId,
        ...{ cities: [{ id: cityId }] },
        isMLS,
      }
    );

    data.statuses = data.statuses.map(status => ({ id: status }));
    data.conditions = data.conditions.map(condition => ({ id: condition }));
    data.schemes = data.schemes.map(scheme => ({ id: scheme }));

    const config = {
      url: `/db/${requestObject}/${requestType}/filter`,
      method: type === 'change' ? 'put' : 'post',
      data,
    };

    const {
      cities,
      filterName,
      wallFlatsIncludeNull,
      schemesIncludeNull,
      conditionFlatsIncludeNull,
      floorIncludeNull,
      maxFloorIncludeNull,
      totalIncludeNull,
      livingIncludeNull,
      kitchenIncludeNull,
      houseIncludeNull,
      ...lastFilter
    } = yield call(performRequestSaga, { config, metaData: { isGuarded } });

    console.log('filter', lastFilter);

    lastFilter.adminAreas = lastFilter.adminAreas || [];
    lastFilter.conditions =
      (lastFilter.conditions || []).map(condition => condition.id) || [];
    lastFilter.microdistricts = lastFilter.microdistricts || [];
    lastFilter.schemes =
      (lastFilter.schemes || []).map(scheme => scheme.id) || [];
    lastFilter.statuses =
      (lastFilter.statuses || []).map(status => status.id) || [];
    lastFilter.streetHouses = lastFilter.streetHouses || [];
    lastFilter.createDateFrom = lastFilter.createDateFrom || '';
    lastFilter.createDateTo = lastFilter.createDateTo || '';

    yield put(filtersActions.setCurrentFilter({ filterName, ...lastFilter }));
    yield put(
      filtersActions.setDescriptionFiltersFormAction({
        filterName,
        ...lastFilter,
      })
    );
    yield put(filtersActions.getFiltersAsyncAction());
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}

export function* changeFilter({ isGuarded }) {
  try {
    const { requestType, requestObject, cityId } = yield select(
      getFormValues('GeneralFiltersForm')
    );

    yield put(filtersActions.setFilterNameChangedAction(false));

    const { id, ...descriptionData } = yield select(
      getFormValues('DescriptionFiltersForm')
    );

    const data = Object.assign({}, descriptionData, {
      cities: [{ id: cityId }],
    });

    const config = {
      url: `/db/${requestObject}/${requestType}/filter`,
      method: 'post',
      data,
    };

    const filter = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(filtersActions.setCurrentFilter(filter));
    yield put(filtersActions.getFiltersAsyncAction());
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}

export function* getFilters({ isGuarded }) {
  try {
    const { requestType, requestObject } = yield select(
      getFormValues('GeneralFiltersForm')
    );

    const config = {
      url: `/db/${requestObject}/${requestType}/filter`,
      method: 'get',
    };

    const filters = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(filtersActions.setFiltersAction(filters));
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}

export function* removeFilter({ isGuarded, data }) {
  try {
    const { requestType, requestObject } = yield select(
      getFormValues('GeneralFiltersForm')
    );

    console.log('REMOVING');
    const config = {
      url: `/db/${requestObject}/${requestType}/filter/${data}`,
      method: 'delete',
    };

    yield put(filtersActions.clearDescriptionFiltersFormAction());
    yield put(filtersActions.setCurrentFilter(null));

    const response = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    console.log(response);

    yield put(filtersActions.getFiltersAsyncAction());
    yield put(filtersActions.filterDataAsyncAction());
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}

export function* chooseFilter({ isGuarded, data }) {
  try {
    const { requestType, requestObject } = yield select(
      getFormValues('GeneralFiltersForm')
    );

    const config = {
      url: `/db/${requestObject}/${requestType}/filter/${data}`,
      method: 'get',
    };

    yield put(filtersActions.setFilterNameChangedAction(false));

    const {
      content,
      filter: { cities, filterName, id, isMLS, ...lastFilter },
    } = yield call(performRequestSaga, { config, metaData: { isGuarded } });

    lastFilter.adminAreas = lastFilter.adminAreas || [];
    lastFilter.conditions =
      (lastFilter.conditions || []).map(condition => condition.id) || [];
    lastFilter.microdistricts = lastFilter.microdistricts || [];
    lastFilter.schemes =
      (lastFilter.schemes || []).map(scheme => scheme.id) || [];
    lastFilter.statuses =
      (lastFilter.statuses || []).map(status => status.id) || [];
    lastFilter.streetHouses = lastFilter.streetHouses || [];
    lastFilter.floors = Array.isArray(lastFilter.floors)
      ? [...lastFilter.floors, {}]
      : [{}];
    lastFilter.kitchens = Array.isArray(lastFilter.kitchens)
      ? [...lastFilter.kitchens, {}]
      : [{}];
    lastFilter.livings = Array.isArray(lastFilter.livings)
      ? [...lastFilter.livings, {}]
      : [{}];
    lastFilter.totals = Array.isArray(lastFilter.totals)
      ? [...lastFilter.totals, {}]
      : [{}];
    lastFilter.maxFloors = Array.isArray(lastFilter.maxFloors)
      ? [...lastFilter.maxFloors, {}]
      : [{}];
    lastFilter.prices = Array.isArray(lastFilter.prices)
      ? [...lastFilter.prices, {}]
      : [{}];
    lastFilter.rooms = Array.isArray(lastFilter.rooms)
      ? [...lastFilter.rooms, {}]
      : [{}];
    lastFilter.createDateFrom = lastFilter.createDateFrom || '';
    lastFilter.createDateTo = lastFilter.createDateTo || '';

    console.log('SET_OBJECT_FROM_chooseFilter');
    yield put(databaseActions.setObjectsInfoAction(content));
    yield put(
      filtersActions.setCurrentFilter({ filterName, id, ...lastFilter })
    );
    yield put(
      filtersActions.setDescriptionFiltersFormAction({
        filterName,
        id,
        ...lastFilter,
      })
    );
    yield put(
      filtersActions.setGeneralFiltersFormValuesAction({
        cityId: cities[0].id,
        isMLS,
      })
    );

    yield put(filtersActions.getFiltersAsyncAction());
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}

export function* filterData({ data: dataFromAction, isGuarded }) {
  try {
    const formData = yield select(getFormValues('DescriptionFiltersForm'));
    const flatAttributes = yield select(getFlatAttributes);
    const estateAttributes = yield select(getEstateStatus);

    if (dataFromAction === 'clear') {
      yield put(filtersActions.setCurrentFilter(null));
    }

    const data = { ...formData };
    console.log('SET_OBJECT_FROM_filterData', data);

    data.kitchens = data.kitchens
      .slice(0, data.kitchens.length - 1)
      .map(kitchen => ({
        from: Number(kitchen.from),
        to: Number(kitchen.to),
      }));
    data.livings = data.livings
      .slice(0, data.livings.length - 1)
      .map(living => ({
        from: Number(living.from),
        to: Number(living.to),
      }));
    data.totals = data.totals.slice(0, data.totals.length - 1).map(total => ({
      from: Number(total.from),
      to: Number(total.to),
    }));
    data.floors = data.floors.slice(0, data.floors.length - 1).map(floor => ({
      from: Number(floor.from),
      to: Number(floor.to),
    }));
    data.maxFloors = data.maxFloors
      .slice(0, data.maxFloors.length - 1)
      .map(maxFloor => ({
        from: Number(maxFloor.from),
        to: Number(maxFloor.to),
      }));
    data.prices = data.prices.slice(0, data.prices.length - 1).map(price => ({
      from: Number(price.from),
      to: Number(price.to),
    }));
    data.rooms = data.rooms.slice(0, data.rooms.length - 1).map(room => ({
      from: Number(room.from),
      to: Number(room.to),
    }));
    data.conditions = data.conditions.map(id => ({
      id,
      name: getAttributeNameById(id, flatAttributes.condition),
    }));
    data.schemes = data.schemes.map(id => ({
      id,
      name: getAttributeNameById(id, flatAttributes.scheme),
    }));
    data.statuses = data.statuses.map(id => ({
      id,
    }));

    data.streetHouses = _.flatten(
      data.streetHouses.map(streetHouse => {
        if (streetHouse.houses.length > 0) {
          return streetHouse.houses
            .slice(0, streetHouse.houses.length - 1)
            .map(house => ({
              streetId: streetHouse.street.id,
              house,
            }));
        }
        return {
          streetId: streetHouse.street.id,
          house: streetHouse.house ? streetHouse.house : null,
        };
      })
    );

    const externalData = yield select(getFormValues('GeneralFiltersForm'));

    const { requestObject, requestType, cityId, isMLS } = externalData;

    const config = {
      url: `/db/${requestObject}/${requestType}`,
      method: 'post',
      data: JSON.stringify({ ...data, cities: [{ id: cityId }], isMLS }),
    };

    console.log(config);
    const userData = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded, header: { 'Content-Type': 'application/json' } },
    });
    yield put(databaseActions.setObjectsInfoAction(userData.content));
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}

export function* getCities({ isGuarded }) {
  try {
    const config = {
      url: '/city/user',
      method: 'get',
    };
    const userCities = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    if (userCities) {
      yield put(filtersActions.setCitiesAction(userCities));
    }
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}

export function* getAddress({ isGuarded, data }) {
  try {
    const { cityId } = yield select(getFormValues('GeneralFiltersForm'));

    console.log(cityId);

    const config = {
      url: '/city/address',
      method: 'get',
      params: {
        name: data,
        cityId,
      },
    };

    const userAddress = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded },
    });

    yield put(filtersActions.setAddressAction(userAddress));
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}

export function* setStatus({ isGuarded }) {
  try {
    const config = {
      url: '/estateStatus/filter',
      method: 'get',
      params: {},
    };
    const dataArray = yield call(performRequestSaga, {
      config,
      metaData: { isGuarded: true },
    });
    if (dataArray) {
      yield put(filtersActions.setEstateStatus(dataArray));
    }
  } catch (error) {
    console.log(error);
  }
}
