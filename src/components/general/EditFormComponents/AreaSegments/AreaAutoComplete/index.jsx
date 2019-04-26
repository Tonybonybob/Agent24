import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AutoComplete from '../../../../common/AutoComplete';
import './style.scss';
class AreaAutoSuggest extends PureComponent {
  constructor(props) {
    super(props);
    this.afterDidMount = false;

    this.areaRef = React.createRef();

    this.handleBlur = this.handleBlur.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, { newValue }) {
    const { onChange } = this.props;

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }

    onChange(newValue);
    return false;
  }

  handleSelect(event, { suggestion }) {
    const { onSelect } = this.props;

    onSelect(suggestion);
  }

  handleBlur(event) {
    const { areaChosen, onChange } = this.props;

    if (!areaChosen) {
      onChange(null);
    } else {
      event.preventDefault();
      return false;
    }

    return false;
  }

  render() {
    const {
      areaSuggestions, value, areaChosen, areaPlaceholder,
    } = this.props;

    const areaUpdatedSuggestions = areaSuggestions instanceof Array && !areaChosen
      ? areaSuggestions
        .filter(el => el.name.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 4)
      : [];

    return (
      <div className="areaSegmentsAutoComplete">
        <AutoComplete
          ref={this.areaRef}
          suggestions={areaUpdatedSuggestions}
          handleSelect={this.handleSelect}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
          value={value}
          placeholder={areaPlaceholder}
          resizableInput
        />
      </div>
    );
  }
}

AreaAutoSuggest.propTypes = {
  areaSuggestions: PropTypes.arrayOf(
    PropTypes.shape({
      areaId: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  value: PropTypes.string,
  areaChosen: PropTypes.bool,
  areaPlaceholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

AreaAutoSuggest.defaultProps = {
  value: '',
  areaChosen: false,
  areaSuggestions: [],
  areaPlaceholder: '',
};

export default AreaAutoSuggest;
