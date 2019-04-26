import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import AutoComplete from '../../../common/AutoComplete';
import Select from '../../../common/Select';
import CityAutocomplete from '../CityAutocomplete';

moment.locale('ru');

class CityWithBirthdayLine extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.birthDays = new Array(31).fill(null).map((el, key) => ({ name: key + 1, value: key + 1 }));
    this.birthMonths = new Array(12).fill(null)
      .map((el, key) => ({ name: moment().month(key).format('MMMM'), value: key + 1 }));

    const firstYear = 1938;
    this.birthYears = new Array(62).fill(null)
      .map((el, key) => ({ name: firstYear + key + 1, value: firstYear + key + 1 }));
  }

  handleChange(event, { newValue }) {
    const { onCityChange } = this.props;

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }
    onCityChange(newValue);
    return false;
  }

  handleSelect(event, { suggestion }) {
    const { onCitySelect } = this.props;

    onCitySelect(suggestion);
  }

  handleBlur(event) {
    const { cityChosen, onCityChange } = this.props;

    if (!cityChosen) {
      onCityChange(null);
    } else {
      event.preventDefault();
      return false;
    }

    return false;
  }

  render() {
    const { className, citySuggestions, cityValue, cityChosen, onCityChange, onCitySelect } = this.props;

    return (
      <div className={`${className} editLine editLine_cityWithBirthday`}>
        <AutoComplete
          suggestions={citySuggestions}
          handleSelect={this.handleSelect}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
          value={cityValue}
          label="Город нахождения"
        />
        <Select
          name="birthDay"
          label="День рождения"
          InputLabelProps={{ shrink: true }}
          items={this.birthDays}
        />
        <Select
          name="birthMonth"
          items={this.birthMonths}
        />
        <Select
          name="birthYear"
          items={this.birthYears}
        />
      </div>
    );
  }
}
CityWithBirthdayLine.propTypes = {
  cityValue: PropTypes.string,
  className: PropTypes.string,
  onCitySelect: PropTypes.func.isRequired,
  onCityChange: PropTypes.func.isRequired,
  citySuggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  cityChosen: PropTypes.bool,
};

CityWithBirthdayLine.defaultProps = {
  className: '',
  citySuggestions: [],
  cityChosen: false,
  cityValue: '',
};

export default CityWithBirthdayLine;
