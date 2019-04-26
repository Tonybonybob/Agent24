import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import _ from 'lodash';

import AutoComplete from '../../AutoComplete';
import { getNewRequest } from '../../../../store/reducers/newRequest';
import {
  setNewRequestFormValuesAction,
  loadCitySuggestions,
  deleteSuggestionsAction,
  setNewRequestNamesAction,
  loadDistrictSuggestions,
  clearAdditionalFormData,
  getCitiesSuggestions,
} from '../../../../store/actions/newRequest';

import {
  getUserAreaId,
  getUserCityId,
  getUserCityName,
} from '../../../../store/reducers/user';

class CityAutoSuggest extends Component {
  constructor(props) {
    super(props);

    this.afterDidMount = false;

    this.autoSuggestRef = React.createRef();

    this.handleBlur = this.handleBlur.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    suggestions: [],
  };

  componentDidMount() {
    const {
      loadCities,
      cityChosen,
      cityId,
      cityName,
      userCityName,
      userAreaId,
    } = this.props;

    if (!cityId && !cityName && cityChosen) {
      loadCities(userCityName, userAreaId);
      this.afterDidMount = true;
    }
  }

  onKeyDown = event => {
    const { cityChosen, clearAdditionalFormData } = this.props;
    const isBackspaceForSelected = event.keyCode === 8 && cityChosen;
    if (!isBackspaceForSelected) {
      return;
    }
    this._setupFormValues('');
    clearAdditionalFormData();
  };

  handleChange(event, { newValue }) {
    const { loadCities, areaId } = this.props;

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }

    loadCities(newValue, areaId || null);

    if (newValue.length > 2) {
      this._getCitiesSuggestionsThrottle(newValue, areaId);
    }

    this._setupFormValues(newValue);
    return false;
  }

  _getCitiesSuggestionsThrottle = _.throttle(
    (newValue, areaId) =>
      this.props
        .getCitiesSuggestions(newValue, areaId)
        .then(this._mapCitiesSuggestionsToState),
    1000
  );

  _mapCitiesSuggestionsToState = (suggestions = []) => {
    const limitedSuggestions = suggestions.slice(0, 10);
    this.setState({ suggestions: limitedSuggestions });
  };

  _setupFormValues = newValue => {
    const { cityId, setNewRequestFormValues, setNewRequestNames } = this.props;
    const valuesToState = {
      cityName: newValue,
      cityChosen: false,
    };

    if (newValue !== cityId) {
      valuesToState.adminAreaName = '';
      valuesToState.adminAreaChosen = false;
      valuesToState.microdistrictName = '';
      valuesToState.microdistrictChosen = false;
      valuesToState.streetName = '';
      valuesToState.streetChosen = false;
      valuesToState.cityOrDistrict = false;
    }
    setNewRequestNames(valuesToState);
    setNewRequestFormValues({
      cityId: null,
      adminAreaId: null,
      microdistrictId: null,
    });
  };

  handleSelect(event, { suggestion }) {
    const {
      setNewRequestFormValues,
      areaId,
      setNewRequestNames,
      deleteSuggestions,
      loadDistrict,
    } = this.props;

    const valuesToReduxForm = {};
    // this.focusAfterUpdate = 'district';
    if (!areaId) {
      let cityNameWithoutAreaName = suggestion.name;
      if (suggestion.name.split(' (').length > 1) {
        cityNameWithoutAreaName = suggestion.name
          .split(' (')
          .slice(0, -1)
          .join('');
      }
      setNewRequestNames({
        cityName: cityNameWithoutAreaName,
        cityChosen: true,
        cityOrDistrict: suggestion.cityTypeEnum,
        areaName: suggestion.areaName,
      });
      valuesToReduxForm.areaId = suggestion.areaId;
    } else {
      setNewRequestNames({
        cityName: suggestion.name,
        cityChosen: true,
        cityOrDistrict: suggestion.cityTypeEnum,
        areaName: suggestion.areaName,
      });
    }

    setNewRequestFormValues({
      cityId: suggestion.id,
      isCity: suggestion.isCity,
    });
    deleteSuggestions();
    loadDistrict('', suggestion.id);
  }

  handleBlur(event) {
    const { setNewRequestNames, cityChosen } = this.props;

    if (!cityChosen) {
      setNewRequestNames({
        cityName: '',
        cityChosen: false,
        cityTouched: true,
      });
    } else {
      event.preventDefault();
      return false;
    }

    return false;
  }

  render() {
    const { cityName, cityChosen, cityTouched } = this.props;
    const { suggestions } = this.state;
    return (
      <AutoComplete
        ref={this.autoSuggestRef}
        suggestions={cityChosen ? [] : suggestions}
        handleSelect={this.handleSelect}
        handleChange={this.handleChange}
        onKeyDown={this.onKeyDown}
        handleBlur={this.handleBlur}
        error={cityTouched && !cityName}
        value={cityName}
        label="Населенный пункт"
        placeholder="Город или район области"
      />
    );
  }
}

CityAutoSuggest.propTypes = {
  loadCities: PropTypes.func.isRequired,
  setNewRequestNames: PropTypes.func.isRequired,
  setNewRequestFormValues: PropTypes.func.isRequired,
  cityId: PropTypes.number,
  cityName: PropTypes.string,
  cityChosen: PropTypes.bool,
  userCityName: PropTypes.string,
  userCityId: PropTypes.number,
  userAreaId: PropTypes.number,
  areaId: PropTypes.number,
  isPreloaded: PropTypes.bool.isRequired,
  deleteSuggestions: PropTypes.func.isRequired,
  loadDistrict: PropTypes.func.isRequired,
  cityTouched: PropTypes.bool,
};

CityAutoSuggest.defaultProps = {
  areaId: '',
  cityId: '',
  userAreaId: '',
  userCityId: '',
  userCityName: '',
  cityName: '',
  cityChosen: false,
  cityTouched: false,
};

const selector = formValueSelector('NewRequestForm');

const mapStateToProps = state => ({
  cityId: selector(state, 'cityId'),
  areaId: selector(state, 'areaId'),
  district: selector(state, 'districtId'),
  microdistrict: selector(state, 'microdistrictId'),
  operation: selector(state, 'operation'),
  userAreaId: getUserAreaId(state),
  userCityId: getUserCityId(state),
  userCityName: getUserCityName(state),
  cityName: getNewRequest(state).cityName,
  cityChosen: getNewRequest(state).cityChosen,
  cityTouched: getNewRequest(state).cityTouched,
  areaName: getNewRequest(state).areaName,
  isPreloaded: getNewRequest(state).isPreloaded,
});

const mapDispatchToProps = dispatch => ({
  setNewRequestFormValues: data =>
    dispatch(setNewRequestFormValuesAction(data)),
  setNewRequestNames: data => dispatch(setNewRequestNamesAction(data)),
  loadCities: (city, areaId) => dispatch(loadCitySuggestions(city, areaId)),
  deleteSuggestions: () => dispatch(deleteSuggestionsAction()),
  loadDistrict: (...args) => dispatch(loadDistrictSuggestions(...args)),
  clearAdditionalFormData: () => clearAdditionalFormData(dispatch),
  getCitiesSuggestions: (city, areaId) =>
    getCitiesSuggestions(dispatch, city, areaId),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CityAutoSuggest);
