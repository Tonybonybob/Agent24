import { createAction } from 'redux-act';

export const CALENDAR_TASKS_LOAD_ASYNC = '@@/calendar/CALENDAR_TASKS_LOAD_ASYNC';
export const CALENDAR_CREATE_TASK_ASYNC = '@@/calendar/CALENDAR_CREATE_TASK_ASYNC';

export const setCalendarTasksAction = createAction('SET_CALENDAR_TASKS');
export const updateCalendarTasksAction = createAction('UPDATE_CALENDAR_TASKS');

export const setCalendarTaskFormValuesAction = createAction('SET_CALENDAR_TASK_FORM_VALUES');

export const calendarTasksLoadAsyncAction = (dateFrom, dateTo) => ({
  type: CALENDAR_TASKS_LOAD_ASYNC,
  dateFrom,
  dateTo,
});

export const calendarCreateTaskAsyncAction = task => ({
  type: CALENDAR_CREATE_TASK_ASYNC,
  task,
});
