import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../general/Button';
import ArrowDown from '../../../../assets/ArrowDownStroke';
import IconSmallScreen from '../../../../assets/SmallScreen';

const CalendarNav = (props) => {
  const { currentMonth, closeModal, changeWeek } = props;

  return (
    <nav className="calendarModal__nav calendarNav">
      <h3 className="calendarNav__title">
        Календарь
      </h3>
      <div
        className="calendarNav__previous"
        onClick={() => changeWeek('prev')}
      >
        <ArrowDown />
      </div>
      <div
        className="calendarNav__next"
        onClick={() => changeWeek('next')}
      >
        <ArrowDown />
      </div>
      <div className="calendarNav__selectedMonth">
        {currentMonth}
      </div>
      <Button onClick={() => { }}>
        + Добавить
      </Button>
      <div
        className="calendarNav__close"
        onClick={closeModal}
      >
        <IconSmallScreen />
      </div>
    </nav>
  );
};

CalendarNav.propTypes = {
  // isToday: PropTypes.bool.isRequired,
  // changeDate: PropTypes.func.isRequired,
  currentMonth: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  changeWeek: PropTypes.func.isRequired,
};

export default CalendarNav;
