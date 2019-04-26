import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createTextMask } from 'redux-form-input-masks';

import AutoComplete from '../../../common/AutoComplete';
import PureTextField from '../../../common/PureTextField';
import Calendar from '../../../common/Calendar';
import './style.scss';
class CalendarAndTime extends Component {
  constructor(props) {
    super(props);
    this.timesSuggestion = [];
    this.setInitialTimeSuggestions();

    this.timeMask = createTextMask({
      pattern: '99:99',
      guide: false,
    });

    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.handleTimeSelect = this.handleTimeSelect.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTimeBlur = this.handleTimeBlur.bind(this);
  }

  setInitialTimeSuggestions() {
    const array = new Array(34).fill(null);
    const startOfDay = moment().startOf('day');
    this.timesSuggestion = array.map((el, key) => ({ name: startOfDay.clone().add((key + 14) * 30, 'minutes').format('HH:mm') }));
  }

  handleCalendarChange(newDate) {
    const { onChange, dateValue } = this.props;

    const time = dateValue.split(' ')[1];
    const date = newDate.format('YYYY-MM-DD');

    onChange(`${date} ${time}`);
  }

  handleTimeSelect(e, { suggestionValue }) {
    const { onChange, dateValue } = this.props;

    const date = dateValue.split(' ')[0];

    onChange(`${date} ${suggestionValue}`);
  }

  handleTimeChange(e, { newValue }) {
    const { onChange, dateValue } = this.props;
    if (e.target.tagName !== 'INPUT' || e.key || newValue.length > 5) {
      return false;
    }

    const date = dateValue.split(' ')[0];

    console.log('date', date);

    onChange(`${date} ${newValue}`);
  }

  handleTimeBlur(e) {
    const { onChange, dateValue } = this.props;

    const errors = false;

    if (errors) {
      const date = dateValue.split(' ')[0];
      onChange(`${date} 07:00`);
    } else {
      e.preventDefault();
    }
  }

  render() {
    const { dateValue } = this.props;

    const time = dateValue.split(' ')[1] || '07:00';
    const date = dateValue.split(' ')[0] || moment().format('YYYY-MM-DD');

    const timesSuggestions = this.timesSuggestion
      .filter(el => el.name.startsWith(time) && time.length < 5)
      .slice(0, 4);
    return (
      <div className="calendarAndTime">
        <Calendar
          customInput={(
            <PureTextField
              value={moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY')}
              onChange={() => { }}
              label="Число"
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
          )}
          selected={moment(date, 'YYYY-MM-DD')}
          onChange={this.handleCalendarChange}
          dateFormat="ll"
        />
        <AutoComplete
          ref={this.timeInput}
          suggestions={timesSuggestions}
          handleSelect={this.handleTimeSelect}
          handleChange={this.handleTimeChange}
          handleBlur={this.handleTimeBlur}
          value={time}
        />
      </div>
    );
  }
}

export default CalendarAndTime;
