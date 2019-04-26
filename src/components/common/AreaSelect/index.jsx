import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import GoogleMapHolder from './GoogleMapHolder';
import AreaAutoSuggest from './AreaAutoSuggest';
import CityAutoSuggest from './CityAutoSuggest';
import MicrodistrictAutoSuggest from './MicrodistrictAutoSuggest';
import AdminAreaAutoSuggest from './AdminAreaAutoSuggest';
import { getNewRequest } from '../../../store/reducers/newRequest';
import { deleteSuggestionsAction, setNewRequestNamesAction, loadDistrictSuggestions } from '../../../store/actions/newRequest';
import './style.scss';
class AreaSelect extends Component {
  constructor(props) {
    super(props);

    this.focusAfterUpdate = false;
    this.didMountForArea = false;
    this.didMountForCity = false;
  }

  componentDidUpdate() {
    const {
      isPreloaded, areaName, cityName, setNewRequestNames, loadDistricts, cityId,
    } = this.props;

    if (!isPreloaded && areaName && cityName && cityId) {
      setNewRequestNames({ isPreloaded: true });
      loadDistricts('', cityId);
    }
  }

  componentWillUnmount() {
    const { deleteSuggestions } = this.props;

    // deleteSuggestions();
  }

  render() {
    const { operation, cityOrDistrict, adminAreaId } = this.props;

    const showCity = cityOrDistrict && cityOrDistrict === 'CITY';
    const showDistrict = cityOrDistrict && cityOrDistrict === 'DISTRICT';
    const showMicroDistrict = showCity && adminAreaId;

    return (
      <div className="areaSelect">
        <div className="areaSelect__line">
          { this.props.areaDisplayAllowed && <div className="areaSelect__field">
            <AreaAutoSuggest />
          </div>
          }
          {this.props.cityDisplayAllowed && <div className="areaSelect__field">
            <CityAutoSuggest />
          </div>
          }
          {this.props.microDistrictDisplayAllowed && showCity && (
            <Fragment>
              <div className="areaSelect__field">
                <AdminAreaAutoSuggest showCity />
              </div>
              {showMicroDistrict && (
                <div className="areaSelect__field">
                  <MicrodistrictAutoSuggest />
                </div>
              )}
            </Fragment>
          )}
          {this.props.districtDisplayAllowed && showDistrict && (
            <div className="areaSelect__field">
              <AdminAreaAutoSuggest />
            </div>
          )}
        </div>
      </div>
    );
  }
}

AreaSelect.propTypes = {
  operation: PropTypes.string.isRequired,
  cityOrDistrict: PropTypes.bool.isRequired,
  isPreloaded: PropTypes.bool.isRequired,
  areaName: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
  setNewRequestNames: PropTypes.func.isRequired,
  deleteSuggestions: PropTypes.func.isRequired,
  adminAreaId: PropTypes.number,
};

AreaSelect.defaultProps = {
  areaDisplayAllowed: true,
  cityDisplayAllowed: true,
  districtDisplayAllowed: true,
  microDistrictDisplayAllowed: true,
}

const selector = formValueSelector('NewRequestForm');

const mapStateToProps = state => ({
  cityOrDistrict: getNewRequest(state).cityOrDistrict,
  areaName: getNewRequest(state).areaName,
  cityName: getNewRequest(state).cityName,
  isPreloaded: getNewRequest(state).isPreloaded,
  operation: selector(state, 'operation'),
  object: selector(state, 'object'),
  adminAreaId: selector(state, 'adminAreaId'),
  cityId: selector(state, 'cityId'),
});

const mapDispatchToProps = dispatch => ({
  deleteSuggestions: () => dispatch(deleteSuggestionsAction()),
  setNewRequestNames: data => dispatch(setNewRequestNamesAction(data)),
  loadDistricts: (...args) => dispatch(loadDistrictSuggestions(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(AreaSelect);
