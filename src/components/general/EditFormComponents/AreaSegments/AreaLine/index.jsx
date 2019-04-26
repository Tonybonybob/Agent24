import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AreaAutoComplete from '../AreaAutoComplete';
import {
  getAreaSuggestions, getCitiesSuggestions, getDistrictSuggestions, getMicrodistrictSuggestions,
} from '../../../../../store/reducers/newRequest';
import { loadCitySuggestions, loadDistrictSuggestions, loadMicroDistrictSuggestions } from '../../../../../store/actions/newRequest';
import './style.scss';
class AreaLine extends Component {
  constructor(props) {
    super(props);
    this.areaRef = React.createRef();
    this.cityRef = React.createRef();
    this.adminAreaRef = React.createRef();
    this.microdistrictRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { segment } = this.props;

    const areaChanged = segment.areaId && !prevProps.segment.areaId;
    const cityChanged = segment.cityId && !prevProps.segment.cityId;
    const adminAreaChanged = segment.adminAreaId && !prevProps.segment.adminAreaId;

    if (areaChanged) {
      if (this.cityRef && this.cityRef.current.areaRef && this.cityRef.current.areaRef.current.autoCompleteRef) {
        this.cityRef.current.areaRef.current.autoCompleteRef.current.input.focus();
      }
    } 
    if (cityChanged) {
      if (this.adminAreaRef && this.adminAreaRef.current.areaRef && this.adminAreaRef.current.areaRef.current.autoCompleteRef) {
        this.adminAreaRef.current.areaRef.current.autoCompleteRef.current.input.focus();
      }
    } 
    if (adminAreaChanged) {
      if (this.microdistrictRef && this.microdistrictRef.current.areaRef && this.microdistrictRef.current.areaRef.current.autoCompleteRef) {
        this.microdistrictRef.current.areaRef.current.autoCompleteRef.current.input.focus();
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getNameWithoutArea(nameWithArea) {
    return nameWithArea && nameWithArea.split(' (')[0];
  }

  handleAreaChange = (newAreaName) => {
    const { onChange, segment } = this.props;

    onChange({
      ...segment,
      areaName: newAreaName,
      areaId: null,
      areaChosen: false,
      cityName: null,
      cityId: null,
      cityChosen: false,
      cityOrDistrict: null,
      adminAreaName: null,
      adminAreaId: null,
      adminAreaChosen: false,
      microdistrictName: null,
      microdistrictId: null,
      microdistrictChosen: false,
    });
  }

  handleAreaSelect = (newArea) => {
    const { onChange, segment, loadCities } = this.props;

    onChange({
      ...segment,
      areaName: newArea.name,
      areaId: newArea.id,
      areaChosen: true,
    });
    loadCities('', newArea.id);
  }

  handleCityChange = (newCityName) => {
    const { onChange, segment, loadCities } = this.props;

    onChange({
      ...segment,
      cityName: newCityName,
      cityId: null,
      cityChosen: false,
      cityOrDistrict: null,
      adminAreaName: null,
      adminAreaId: null,
      adminAreaChosen: false,
      microdistrictName: null,
      microdistrictId: null,
      microdistrictChosen: false,
    });
    loadCities(newCityName, segment.areaId);
  }

  handleCitySelect = (newCity) => {
    const { onChange, segment, loadAdminAreas } = this.props;

    onChange({
      ...segment,
      cityName: this.getNameWithoutArea(newCity.name),
      cityId: newCity.id,
      cityChosen: true,
      cityOrDistrict: newCity.type,
      areaName: newCity.areaName,
      areaId: newCity.areaId,
      areaChosen: true,
    });
    loadAdminAreas('', newCity.id);
  }

  handleAdminAreaChange = (newAdminAreaName) => {
    const { onChange, segment, loadAdminAreas } = this.props;

    onChange({
      ...segment,
      adminAreaName: newAdminAreaName,
      adminAreaId: null,
      adminAreaChosen: false,
      microdistrictName: null,
      microdistrictId: null,
      microdistrictChosen: false,
    });
    loadAdminAreas(newAdminAreaName, segment.cityId);
  }

  handleAdminAreaSelect = (newAdminArea) => {
    const { onChange, segment, loadMicrodistricts } = this.props;

    onChange({
      ...segment,
      adminAreaName: this.getNameWithoutArea(newAdminArea.name),
      adminAreaId: newAdminArea.id,
      adminAreaChosen: true,
    });
    loadMicrodistricts('', segment.cityId, null, newAdminArea.id);
  }

  handleMicrodistrictChange = (newMicrodistrictName) => {
    const { onChange, segment, loadMicrodistricts } = this.props;

    onChange({
      ...segment,
      microdistrictName: newMicrodistrictName,
      microdistrictId: null,
      microdistrictChosen: false,
    });
    loadMicrodistricts(newMicrodistrictName, segment.cityId, null, segment.adminAreaId);
  }

  handleMicrodistrictSelect = (newMicrodistrict) => {
    const { onChange, segment } = this.props;

    onChange({
      ...segment,
      microdistrictName: this.getNameWithoutArea(newMicrodistrict.name),
      microdistrictId: newMicrodistrict.id,
      microdistrictChosen: true,
    });
  }

  render() {
    const {
      segment, areaSuggestions, citySuggestions, adminAreaSuggestions, microdistrictSuggestions,
    } = this.props;

    const showAdminArea = !!segment.cityId;
    const showMicrodistrict = showAdminArea && !!segment.adminAreaId && segment.cityOrDistrict === 'CITY';

    return (
      <div className="areaSegmentsLine">
        <AreaAutoComplete
          ref={this.areaRef}
          areaSuggestions={areaSuggestions}
          value={segment.areaName || ''}
          areaChosen={segment.areaChosen}
          areaPlaceholder="Область"
          onChange={this.handleAreaChange}
          onSelect={this.handleAreaSelect}
        />
        <AreaAutoComplete
          ref={this.cityRef}
          areaSuggestions={citySuggestions}
          value={segment.cityName || ''}
          areaChosen={segment.cityChosen}
          areaPlaceholder="Город или район области"
          onChange={this.handleCityChange}
          onSelect={this.handleCitySelect}
        />
        {showAdminArea && (
          <AreaAutoComplete
            ref={this.adminAreaRef}
            areaSuggestions={adminAreaSuggestions}
            value={segment.adminAreaName || ''}
            areaChosen={segment.adminAreaChosen}
            areaPlaceholder="Административный Район"
            onChange={this.handleAdminAreaChange}
            onSelect={this.handleAdminAreaSelect}
          />
        )}
        {showMicrodistrict && (
          <AreaAutoComplete
            ref={this.microdistrictRef}
            areaSuggestions={microdistrictSuggestions}
            value={segment.microdistrictName || ''}
            areaChosen={segment.microdistrictChosen}
            areaPlaceholder="Микрорайон"
            onChange={this.handleMicrodistrictChange}
            onSelect={this.handleMicrodistrictSelect}
          />
        )}
      </div>
    );
  }
}

const SuggestionArrayPropType = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
);

AreaLine.propTypes = {
  onChange: PropTypes.func.isRequired,
  segment: PropTypes.shape({
    areaName: PropTypes.string,
    cityName: PropTypes.string,
    adminAreaName: PropTypes.string,
    microdistrictName: PropTypes.string,
  }).isRequired,
  areaSuggestions: SuggestionArrayPropType,
  citySuggestions: SuggestionArrayPropType,
  adminAreaSuggestions: SuggestionArrayPropType,
  microdistrictSuggestions: SuggestionArrayPropType,
  loadCities: PropTypes.func.isRequired,
  loadAdminAreas: PropTypes.func.isRequired,
  loadMicrodistricts: PropTypes.func.isRequired,
};

AreaLine.defaultProps = {
  areaSuggestions: [],
  citySuggestions: [],
  adminAreaSuggestions: [],
  microdistrictSuggestions: [],
};

const mapStateToProps = state => ({
  areaSuggestions: getAreaSuggestions(state),
  citySuggestions: getCitiesSuggestions(state),
  adminAreaSuggestions: getDistrictSuggestions(state),
  microdistrictSuggestions: getMicrodistrictSuggestions(state),
});

const mapDispatchToProps = dispatch => ({
  loadCities: (...args) => dispatch(loadCitySuggestions(...args)),
  loadAdminAreas: (...args) => dispatch(loadDistrictSuggestions(...args)),
  loadMicrodistricts: (...args) => dispatch(loadMicroDistrictSuggestions(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AreaLine);
