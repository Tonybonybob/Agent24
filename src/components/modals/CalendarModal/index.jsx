import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import WeekLayout from './WeekLayout';
import Nav from './CalendarNav';
import './style.scss';
class CalendarFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(),
      currentWeek: moment().startOf('isoWeek'),
    };

    this.changeWeek = this.changeWeek.bind(this);
  }

  getCurrentMonth() {
    const { currentWeek } = this.state;
    const firstMonth = currentWeek.format('MMMM');
    let secondMonth;
    const hasTwoMonths = new Array(6).fill(null).some((el, id) => {
      const day = currentWeek.clone().add(id + 1, 'days');
      if (day.format('MMMM') !== firstMonth) {
        secondMonth = day.format('MMMM');
        return true;
      }
      return false;
    });
    if (hasTwoMonths) {
      return `${firstMonth} - ${secondMonth}`;
    }
    return firstMonth;
  }

  changeWeek(week) {
    const { currentWeek } = this.state;
    if (week === 'prev') {
      this.setState({ currentWeek: currentWeek.clone().subtract(1, 'weeks') });
    } else if (week === 'next') {
      this.setState({ currentWeek: currentWeek.clone().add(1, 'weeks') });
    }
  }

  render() {
    const { selectedDate, currentWeek } = this.state;
    const { closeModal } = this.props;
    const currentMonth = this.getCurrentMonth();
    const isToday = selectedDate.isSame(moment(), 'day');

    return (
      <div className="calendarModal">
        <Nav
          isToday={isToday}
          // changeDate={this.changeDate}
          currentMonth={currentMonth}
          closeModal={closeModal}
          changeWeek={this.changeWeek}
        />
        <WeekLayout
          startOfWeek={currentWeek}
          selected={selectedDate}
          // changeDate={this.changeDate}
        />
      </div>
    );
  }
}

CalendarFull.propTypes = {
  closeModal: PropTypes.func,
};

export default CalendarFull;
