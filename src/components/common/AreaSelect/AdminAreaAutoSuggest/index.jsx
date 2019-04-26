import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import AutoComplete from '../../AutoComplete';
import {
  getNewRequest, getDistrictSuggestions,
} from '../../../../store/reducers/newRequest';
import {
  setNewRequestFormValuesAction, setNewRequestNamesAction,
  loadDistrictSuggestions,
  loadMicroDistrictSuggestions,
} from '../../../../store/actions/newRequest';
import { getUserAreaId, getUserCityId, getUserCityName } from '../../../../store/reducers/user';

class AdminAreaAutoSuggest extends PureComponent {
  constructor(props) {
    super(props);

    this.autoSuggestRef = React.createRef();

    this.handleBlur = this.handleBlur.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { cityId, isPreloaded, adminAreaId } = this.props;
    if (!isNaN(cityId) && cityId && isPreloaded && !adminAreaId) {
      this.autoSuggestRef.current.autoCompleteRef.current.input.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const { cityId, isPreloaded } = this.props;
    if (!isNaN(cityId) && cityId && prevProps.cityId !== cityId && isPreloaded) {
      this.autoSuggestRef.current.autoCompleteRef.current.input.focus();
    }
  }

  handleChange(event, { newValue }) {
    const {
      setNewRequestNames, loadDistrict, cityId,
      setNewRequestFormValues, adminAreaId,
    } = this.props;

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }

    loadDistrict(newValue, cityId || null);

    setNewRequestNames({
      adminAreaName: newValue,
      adminAreaChosen: false,
    });

    if (adminAreaId) {
      setNewRequestFormValues({ adminAreaId: null });
    }
    return false;
  }

  handleSelect(event, { suggestion }) {
    const { setNewRequestFormValues, setNewRequestNames, loadMicrodistrict } = this.props;

    setNewRequestNames({
      adminAreaName: suggestion.name,
      adminAreaChosen: true,
    });

    setNewRequestFormValues({
      adminAreaId: suggestion.id,
    });

    loadMicrodistrict('', suggestion.cityId);
  }

  handleBlur(event) {
    const { setNewRequestNames, adminAreaChosen } = this.props;

    if (!adminAreaChosen) {
      setNewRequestNames({
        adminAreaName: '',
        adminAreaChosen: false,
        adminAreaTouched: true,
      });
    } else {
      event.preventDefault();
      return false;
    }

    return false;
  }

  render() {
    const {
      adminAreaName, districtSuggestions, showCity, adminAreaChosen, adminAreaTouched,
    } = this.props;

    return (
      <AutoComplete
        ref={this.autoSuggestRef}
        suggestions={adminAreaChosen ? [] : districtSuggestions}
        handleSelect={this.handleSelect}
        handleChange={this.handleChange}
        handleBlur={this.handleBlur}
        error={adminAreaTouched && !adminAreaName}
        value={adminAreaName}
        placeholder={showCity ? 'Административный Район' : 'Населенный пункт'}
        resizableInput
      />
    );
  }
}

AdminAreaAutoSuggest.propTypes = {
  cityId: PropTypes.string,
  isPreloaded: PropTypes.bool.isRequired,
  setNewRequestNames: PropTypes.func.isRequired,
  loadDistrict: PropTypes.func.isRequired,
  setNewRequestFormValues: PropTypes.func.isRequired,
  adminAreaChosen: PropTypes.bool,
  adminAreaName: PropTypes.string,
  adminAreaId: PropTypes.number,
  districtSuggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  showCity: PropTypes.bool,
  adminAreaTouched: PropTypes.bool,
};

AdminAreaAutoSuggest.defaultProps = {
  cityId: '',
  adminAreaChosen: false,
  adminAreaName: '',
  adminAreaId: '',
  showCity: false,
  adminAreaTouched: false,
};

const selector = formValueSelector('NewRequestForm');

const mapStateToProps = state => ({
  districtSuggestions: getDistrictSuggestions(state),
  adminAreaId: selector(state, 'adminAreaId'),
  cityId: selector(state, 'cityId'),
  userAreaId: getUserAreaId(state),
  userCityId: getUserCityId(state),
  userCityName: getUserCityName(state),
  adminAreaName: getNewRequest(state).adminAreaName,
  adminAreaChosen: getNewRequest(state).adminAreaChosen,
  isPreloaded: getNewRequest(state).isPreloaded,
  adminAreaTouched: getNewRequest(state).adminAreaTouched,
});

const mapDispatchToProps = dispatch => ({
  setNewRequestFormValues: data => dispatch(setNewRequestFormValuesAction(data)),
  setNewRequestNames: data => dispatch(setNewRequestNamesAction(data)),
  loadDistrict: (district, cityId) => dispatch(loadDistrictSuggestions(district, cityId)),
  loadMicrodistrict: (...args) => dispatch(loadMicroDistrictSuggestions(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(AdminAreaAutoSuggest);
