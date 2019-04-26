import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './style.scss';
const Calendar = (props) => {
  const {
    inline, selected, onChange, customInput, ...other
  } = props;

  return (
    <div className="calendar-picker">
      <DatePicker
        locale="ru"
        inline={inline}
        selected={selected}
        onChange={onChange}
        customInput={customInput}
        {...other}
      />
    </div>
  );
};

Calendar.propTypes = {
  inline: PropTypes.bool,
  selected: PropTypes.instanceOf(moment).isRequired,
  onChange: PropTypes.func.isRequired,
  customInput: PropTypes.node,
};

Calendar.defaultProps = {
  inline: false,
  customInput: <input />,
};

export default Calendar;
