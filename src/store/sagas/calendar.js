import { put, call } from 'redux-saga/effects';

import * as calendarActions from '../actions/calendar';
import { performRequestSaga } from './api';

// eslint-disable-next-line import/prefer-default-export
export function* loadTasks({ dateFrom, dateTo }) {
  try {
    const params = {
      dateFrom,
      dateTo,
    };

  	Object.keys(params).forEach((key) => {
  		if (!params[key]) {
  			delete params[key];
  		}
  	});

    const config = {
      url: '/userTask',
      method: 'get',
      params,
    };

    const tasks = yield call(performRequestSaga, { config, metaData: { isGuarded: true } });
    if (tasks) {
      yield put(calendarActions.updateCalendarTasksAction(tasks));
    }
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}

export function* createTask({ task }) {
  try {
    console.log('task', task);
    const config = {
      url: '/userTask',
      method: 'post',
      data: { ...task },
    };

    const newTask = yield call(performRequestSaga, { config, metaData: { isGuarded: true } });
    console.log('newtask', newTask);
    yield put(calendarActions.updateCalendarTasksAction([newTask]));
  } catch (error) {
    console.error(error);
    // AuthService.refreshToken();
  }
}
