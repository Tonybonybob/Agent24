import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import Day from './Day';
import { calendarTasksLoadAsyncAction } from '../../../../store/actions/calendar';
import { getCalendarTasks } from '../../../../store/reducers/calendar';
import './style.scss';
class WeekLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedTaskId: null,
    };

    this.handleChangeTask = this.handleChangeTask.bind(this);
  }

  componentDidMount() {
    this.requestTasks();
  }

  componentDidUpdate(prevProps) {
    const { startOfWeek } = this.props;
    if (!prevProps.startOfWeek.isSame(startOfWeek)) {
      this.requestTasks();
    }
  }

  requestTasks() {
    const { loadCalendarTasks, startOfWeek } = this.props;
    const endOfWeek = startOfWeek.clone().add(7, 'd');

    const startUTC = moment.utc(startOfWeek.unix(), 'X').unix();
    const endUTC = moment.utc(endOfWeek.unix(), 'X').unix();

    loadCalendarTasks(startUTC, endUTC);
  }

  handleChangeTask(id) {
    const { openedTaskId } = this.state;

    if (openedTaskId === id || (!id && id !== 0)) {
      this.setState({ openedTaskId: null });
    } else {
      this.setState({ openedTaskId: id });
    }
  }

  renderHeader() {
    const { selected, startOfWeek } = this.props;

    const days = new Array(7).fill(null);
    return days.map((el, id) => {
      const day = startOfWeek.clone().add(id, 'day').startOf('day');
      const isActive = day.isSame(selected, 'day');
      const isToday = day.isSame(moment(), 'day');
      const isGone = moment().startOf('day').isAfter(day);
      const className = `headerDay
        ${isActive ? 'headerDay--active' : ''}
        ${isToday ? 'headerDay--today' : ''}
        ${isGone ? 'headerDay--previous' : ''}`;
      return (
        <li
          key={day.unix()}
          className={className}
        >
          <div className="headerDay__holder">
            <div className="headerDay__dow">
              {day.format('ddd')}
            </div>
            <div className="headerDay__date">
              {day.format('DD')}
            </div>
          </div>
        </li>
      );
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderHours() {
    const hours = new Array(17).fill(null);
    return hours.map((el, id) => {
      const time = String(id + 7).length === 1 ? `0${id + 7}:00` : `${id + 7}:00`;
      return (
        <div
          key={time}
          className="weekTable__hourItem"
        >
          {time}
        </div>
      );
    });
  }

  renderDays() {
    const { openedTaskId } = this.state;
    const { selected, startOfWeek, tasks } = this.props;

    const days = new Array(7).fill(null);
    return days.map((el, id) => {
      const day = startOfWeek.clone().add(id, 'day');
      const isActive = selected.isSame(day, 'day');
      const tasksForDay = tasks.filter((elem) => {
        const taskTime = moment(elem.executionDateTime, 'YYYY-MM-DD HH:mm');

        if (taskTime.isSame(day, 'day')) {
          return true;
        }
        return false;
      });
      return (
        <Day
          openedTaskId={openedTaskId}
          changeOpenedTask={this.handleChangeTask}
          key={day.unix()}
          day={day}
          isActive={isActive}
          tasks={tasksForDay}
        />
      );
    });
  }

  render() {
    return (
      <div className="weekTable">
        <div className="weekTable__header">
          <ul>
            {this.renderHeader()}
          </ul>
        </div>
        <div className="weekTable__contentHolder">
          <Scrollbars>
            <div className="weekTable__content">
              <div className="weekTable__hours">
                {this.renderHours()}
              </div>
              {this.renderDays()}
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

WeekLayout.propTypes = {
  selected: PropTypes.instanceOf(moment).isRequired,
  // changeDate: PropTypes.func.isRequired,
  startOfWeek: PropTypes.instanceOf(moment).isRequired,
  loadCalendarTasks: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ),
};

WeekLayout.defaultProps = {
  tasks: [],
};

const mapStateToProps = state => ({
  tasks: getCalendarTasks(state),
});

const mapDispatchToProps = dispatch => ({
  loadCalendarTasks: (dateFrom, dateTo) => dispatch(calendarTasksLoadAsyncAction(dateFrom, dateTo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekLayout);
