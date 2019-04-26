import React, { Component } from 'react';

import AutoComplete from '../../../common/AutoComplete';

class CityAutocomplete extends Component {
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
    const { className, citySuggestions, cityValue } = this.props;

    return (
      <AutoComplete
        suggestions={citySuggestions}
        handleSelect={this.handleSelect}
        handleChange={this.handleChange}
        handleBlur={this.handleBlur}
        value={cityValue}
        placeholder="Город нахождения"
      />
    );
  }
}

export default CityAutocomplete;
