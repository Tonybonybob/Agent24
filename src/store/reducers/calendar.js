import { createReducer } from 'redux-act';

import { setCalendarTasksAction, updateCalendarTasksAction } from '../actions/calendar';

const initialState = {
  tasks: [],
};

export default createReducer({
  [setCalendarTasksAction]: (state, payload) => ({ tasks: payload }),
  [updateCalendarTasksAction]: (state, payload) => {
    const filteredTasks = state.tasks.filter(task => !payload.some(el => el.id === task.id));
    return { tasks: [...filteredTasks, ...payload] };
  },
}, initialState);

export const getCalendar = state => state.calendar;

export const getCalendarTasks = state => getCalendar(state).tasks;
