import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../../../common/Checkbox';
import Select from '../../../common/Select';
import AutoComplete from '../../../common/AutoComplete';
// import TextField from '../../../common/TextField';

const accountTypeItems = [
  {
    name: 'Агенство',
    value: 'AGENCY',
  },
  {
    name: 'Частник',
    value: 'PRIVATE',
  },
];

class RealtorLine extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, { newValue }) {
    const { onAgencyChange } = this.props;

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }
    onAgencyChange(newValue);
    return false;
  }

  handleSelect(event, { suggestion }) {
    const { onAgencySelect } = this.props;

    onAgencySelect(suggestion);
  }

  render() {
    const {
      className, agencyValue, agencySuggestions, isRealtor, type,
    } = this.props;

    const filteredSuggestions = agencySuggestions.filter(el => el.name !== agencyValue);

    return (
      <div className={`${className} editLine editLine_realtorLine`}>
        <Checkbox
          name="isRealtor"
          label="Риелтор"
        />
        {isRealtor && (
          <Select
            name="type"
            label="Тип аккаунта"
            items={accountTypeItems}
          />
        )}
        {isRealtor && !!type && (
          <AutoComplete
            suggestions={filteredSuggestions}
            handleSelect={this.handleSelect}
            handleChange={this.handleChange}
            value={agencyValue}
            label="Название агенства"
          />
        )}
      </div>
    );
  }
}

RealtorLine.propTypes = {
  className: PropTypes.string,
  agencyValue: PropTypes.string,
  agencyChosen: PropTypes.bool,
  agencySuggestions: PropTypes.array,
  onAgencySelect: PropTypes.func.isRequired,
  onAgencyChange: PropTypes.func.isRequired,
  isRealtor: PropTypes.bool,
  type: PropTypes.string,
};

RealtorLine.defaultProps = {
  className: '',
  agencySuggestions: [],
  agencyValue: '',
  agencyChosen: false,
  isRealtor: false,
  type: '',
};

export default RealtorLine;
