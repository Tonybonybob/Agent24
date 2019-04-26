import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import AutoComplete from '../../AutoComplete';
import {
  getAreaSuggestions, getNewRequest,
} from '../../../../store/reducers/newRequest';
import {
  setNewRequestFormValuesAction, loadAreaSuggestions, setNewRequestNamesAction,
  deleteSuggestionsAction,
  loadCitySuggestions,
} from '../../../../store/actions/newRequest';
import { getUserAreaId, getUserCityId, getUserCityName } from '../../../../store/reducers/user';

class AreaAutoSuggest extends PureComponent {
  constructor(props) {
    super(props);
    this.afterDidMount = false;

    this.areaRef = React.createRef();

    this.handleBlur = this.handleBlur.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { areaSuggestions, loadAreas } = this.props;

    if (areaSuggestions.length === 0) {
      loadAreas();
      this.afterDidMount = true;
    }
  }

  componentDidUpdate() {
    const {
      setNewRequestNames, areaId, areaSuggestions, userAreaId,
      setNewRequestFormValues,
    } = this.props;

    if (!areaId && this.afterDidMount && areaSuggestions.length > 0) {
      const area = areaSuggestions.find(el => el.id === userAreaId);
      if (area) {
        setNewRequestNames({ areaName: area.name });
        setNewRequestFormValues({ areaId: userAreaId });
      }
      this.afterDidMount = false;
    }
  }

  handleChange(event, { newValue }) {
    const {
      areaId, setNewRequestFormValues, setNewRequestNames, deleteSuggestions,
      cityName, adminAreaName, microdistrictName, streetName,
    } = this.props;

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }
    let valuesToState = {
      areaName: newValue,
      areaChosen: false,
    };
    let valuesToReduxForm = {};

    if (areaId || cityName || adminAreaName || microdistrictName || streetName) {
      valuesToState = {
        ...valuesToState,
        cityName: '',
        cityChosen: false,
        adminAreaName: '',
        adminAreaChosen: false,
        microdistrictName: '',
        microdistrictChosen: false,
        streetName: '',
        streetChosen: false,
        cityOrDistrict: false,
      };
      valuesToReduxForm = {
        ...valuesToReduxForm,
        areaId: null,
        cityId: null,
        adminAreaId: null,
        microdistrictId: null,
        streetId: null,
      };
    }

    if (Object.keys(valuesToReduxForm).length > 0) {
      setNewRequestFormValues(valuesToReduxForm);
    }
    setNewRequestNames(valuesToState);
    deleteSuggestions();
    return false;
  }

  handleSelect(event, { suggestion }) {
    const { setNewRequestFormValues, setNewRequestNames, loadCities } = this.props;

    // this.focusAfterUpdate = 'city';
    setNewRequestNames({
      areaName: suggestion.name,
      areaChosen: true,
      cityName: '',
      cityChosen: false,
      cityOrDistrict: false,
      adminAreaName: '',
      adminAreaChosen: false,
      microdistrictName: '',
      microdistrictChosen: false,
      streetName: '',
      streetChosen: false,
    });

    setNewRequestFormValues({
      areaId: suggestion.id,
      cityId: null,
      adminAreaId: null,
      microdistrictId: null,
      streetId: null,
    });

    loadCities('', suggestion.id);
  }

  handleBlur(event) {
    const { areaChosen, setNewRequestNames } = this.props;

    if (!areaChosen) {
      setNewRequestNames({
        areaName: '',
        areaTouched: true,
      });
    } else {
      event.preventDefault();
      return false;
    }

    return false;
  }

  render() {
    const {
      areaSuggestions, areaName, areaChosen, areaTouched,
    } = this.props;

    const areaUpdatedSuggestions = areaSuggestions instanceof Array && !areaChosen
      ? areaSuggestions
        .filter(el => el.name.toLowerCase().startsWith(areaName.toLowerCase()))
        .slice(0, 4)
      : [];

    return (
      <AutoComplete
        ref={this.autoSuggestRef}
        suggestions={areaUpdatedSuggestions}
        handleSelect={this.handleSelect}
        handleChange={this.handleChange}
        handleBlur={this.handleBlur}
        error={areaTouched && !areaName}
        value={areaName}
        placeholder="Область"
      />
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
  loadAreas: PropTypes.func.isRequired,
  areaId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  setNewRequestFormValues: PropTypes.func.isRequired,
  userAreaId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  setNewRequestNames: PropTypes.func.isRequired,
  deleteSuggestions: PropTypes.func.isRequired,
  areaName: PropTypes.string,
  areaChosen: PropTypes.bool,
  cityName: PropTypes.string,
  adminAreaName: PropTypes.string,
  microdistrictName: PropTypes.string,
  streetName: PropTypes.string,
  loadCities: PropTypes.func.isRequired,
};

AreaAutoSuggest.defaultProps = {
  areaId: '',
  userAreaId: '',
  areaName: '',
  areaChosen: false,
  areaSuggestions: [],
  cityName: '',
  adminAreaName: '',
  microdistrictName: '',
  streetName: '',
};

const selector = formValueSelector('NewRequestForm');

const mapStateToProps = state => ({
  areaSuggestions: getAreaSuggestions(state),
  areaId: selector(state, 'areaId'),
  areaName: getNewRequest(state).areaName,
  areaChosen: getNewRequest(state).areaChosen,
  areaTouched: getNewRequest(state).areaTouched,
  cityName: getNewRequest(state).cityName,
  adminAreaName: getNewRequest(state).adminAreaName,
  microdistrictName: getNewRequest(state).microdistrictName,
  streetName: getNewRequest(state).streetName,
  operation: selector(state, 'operation'),
  userAreaId: getUserAreaId(state),
  userCityId: getUserCityId(state),
  userCityName: getUserCityName(state),
});

const mapDispatchToProps = dispatch => ({
  setNewRequestFormValues: data => dispatch(setNewRequestFormValuesAction(data)),
  setNewRequestNames: data => dispatch(setNewRequestNamesAction(data)),
  loadAreas: area => dispatch(loadAreaSuggestions(area)),
  deleteSuggestions: () => dispatch(deleteSuggestionsAction()),
  loadCities: (...args) => dispatch(loadCitySuggestions(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(AreaAutoSuggest);
