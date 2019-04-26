import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import OpenedTask from '../../../../general/OpenedCalendarTask';
import './style.scss';
class Day extends Component {
  renderTask(task, hour) {
    const { changeOpenedTask, openedTaskId } = this.props;

    const time = task.executionDateTime.split(' ')[1];
    const momentTime = moment(task.executionDateTime, 'YYYY-MM-DD HH:mm');

    const taskHour = momentTime.format('HH');
    const showTask = parseInt(taskHour, 10) >= hour && parseInt(taskHour, 10) < hour + 1;

    const isSunday = momentTime.clone().endOf('day')
      .isSame(momentTime.clone().endOf('week'));

    return showTask && (
      <div
        onClick={e => e.stopPropagation()}
      >
        <div
          key={task.id}
          className="calendarWeekTask"
          onClick={() => changeOpenedTask(task.id)}
          style={{ borderColor: task.color }}
        >
          <div>
            <div className="calendarWeekTask__time">
              {time}
            </div>
          </div>
          <div className="calendarWeekTask__content">
            <div className="calendarWeekTask__name">
              {task.title}
            </div>
            <div className="calendarWeekTask__desc">
              {task.description}
            </div>
          </div>

          {openedTaskId === task.id && (
            <OpenedTask
              onClick={() => this.changeOpenedTask()}
              task={task}
              absolute
              bottom={hour === 23}
              right={isSunday}
            />
          )}
        </div>
      </div>
    );
  }

  renderHours() {
    const { tasks, changeOpenedTask } = this.props;
    const hours = new Array(17).fill(null);

    return hours.map((el, hour) => (
      <div
        key={hour}
        className="weekTable__date"
        onClick={() => changeOpenedTask()}
      >
        {tasks.map(task => this.renderTask(task, hour + 7))}
      </div>
    ));
  }

  render() {
    const { isActive, changeOpenedTask } = this.props;

    return (
      <div
        className={`weekTable__day ${isActive ? 'weekTable__day--today' : ''}`}
        onClick={() => changeOpenedTask()}
      >
        {this.renderHours()}
      </div>
    );
  }
}

Day.propTypes = {
  // day: PropTypes.instanceOf(moment).isRequired,
  isActive: PropTypes.bool,
  tasks: PropTypes.arrayOf(
    PropTypes.instanceOf(moment),
  ),
  changeOpenedTask: PropTypes.func.isRequired,
  openedTaskId: PropTypes.number,
};

Day.defaultProps = {
  openedTaskId: null,
  isActive: false,
  tasks: [],
};

export default Day;
