import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import ArrowDown from '../../../../assets/ArrowDown';
import Location from '../../../../assets/Location';
import { getStates } from '../../../../store/reducers/attributes';
import { getAttributeNameById } from '../../../../utils';
import {
  setGeneralFiltersFormValuesAction,
  setDescriptionFiltersFormAction,
} from '../../../../store/actions/filters';
import { getCitiesSuggestions } from '../../../../store/actions/newRequest';
import AutoComplete from '../../../../components/common/AutoComplete';
import './style.scss';
function addCity(cities, areaCentres, city, inputValue) {
  if (city.name.toLowerCase().startsWith(inputValue.toLowerCase())) {
    if (city.type === 'CITY') {
      cities.push(city);
    } else {
      areaCentres.push(city);
    }
  }
}

class CityAutocomplete extends Component {
  static propTypes = {
    cityId: PropTypes.number,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    cities: PropTypes.arrayOf(
      PropTypes.shape({
        areaId: PropTypes.number,
        areaName: PropTypes.string,
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
      })
    ),
  };

  static defaultProps = {
    className: '',
    cityId: '',
    cities: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
      hasChanged: false,
      showCityAutosuggest: false,
      cityName: '',
      areaName: '',
    };

    this.adminAreaRef = React.createRef();
    this.cityNameRef = null; // AutosizeInput doesn't wanna connect with new Ref
    this.cityAutosuggestRef = React.createRef();

    this.handleOpenAutosuggest = this.handleOpenAutosuggest.bind(this);
  }

  componentDidMount() {
    const { cities, cityId } = this.props;
    const city = _.flatten(Object.values(cities)).find(
      initialCity => initialCity.id === cityId
    );

    if (city) {
      this.setState({
        cityName: city.name,
        areaName: city.areaName,
        areaId: city.areaId,
        initialId: cityId,
      });
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { cityId, cities, setDescriptionFormValues } = this.props;

  //   const { showInput, areaId, initialId, cityName } = this.state;

  //   if ((cityId !== prevProps.cityId || !cityName) && cityId) {
  //     const city = _.flatten(Object.values(cities)).find(
  //       initialCity => initialCity.id === cityId
  //     );

  //     if (city) {
  //       if (initialId !== cityId) {
  //         setDescriptionFormValues({
  //           microdistricts: [],
  //           adminAreas: [],
  //           streetHouses: [],
  //         });
  //       }
  //       this.setState({
  //         cityName: city.name,
  //         areaName: city.areaName,
  //         areaId: city.areaId,
  //         showCityAutosuggest: false,
  //         hasChanged: false,
  //         showInput: false,
  //         initialId: cityId,
  //       });
  //     }
  //   }
  //   if (showInput !== prevState.showInput && showInput) {
  //     if (cityId && this.cityNameRef) {
  //       this.cityNameRef.focus();
  //     } else if (
  //       this.adminAreaRef.current &&
  //       this.adminAreaRef.current.autoCompleteRef &&
  //       this.adminAreaRef.current.autoCompleteRef.current
  //     ) {
  //       this.adminAreaRef.current.autoCompleteRef.current.input.focus();
  //     }
  //   }
  //   if (areaId !== prevState.areaId && areaId) {
  //     if (this.cityNameRef) {
  //       this.cityNameRef.focus();
  //     }
  //   }
  // }

  handleOpenAutosuggest(event) {
    if (
      this.cityAutosuggestRef.current &&
      this.cityAutosuggestRef.current.contains(event.target)
    ) {
      return false;
    }

    this.setState({
      showInput: true,
    });
  }

  onSelectCity = (event, value) => {
    event.stopPropagation();
    if (!value) {
      return;
    }
    const { suggestion } = value;

    const { filterData, setFormValues } = this.props;
    const { cityName } = this.state;

    this.setState(prevState => {
      if (prevState.cityName !== cityName) {
        setFormValues({ cityId: suggestion.id });
        filterData();
      }
      return {
        showInput: false,
      };
    });
  };

  onChangeCity = (event, { newValue }) => {
    this.setState({ cityName: newValue });
    if (newValue.length > 2) {
      this._getCitiesSuggestionsThrottle(newValue);
    }
  };

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

  _parseCityName = cityName => {
    if (!cityName) {
      return;
    }
    return cityName.split(',')[0];
  };

  render() {
    const { className } = this.props;
    const { showInput, cityName, suggestions } = this.state;

    return (
      <div
        className={`cityAutocomplete ${className} ${
          showInput ? '' : 'cityAutocomplete_preshow'
        }`}
        onClick={this.handleOpenAutosuggest}
      >
        <ClickAwayListener onClickAway={this.onSelectCity}>
          <div className="cityAutocomplete__textfield">
            <AutoComplete
              ref={this.autoSuggestRef}
              suggestions={suggestions ? suggestions : []}
              handleSelect={this.onSelectCity}
              handleChange={this.onChangeCity}
              value={this._parseCityName(cityName)}
              placeholder="Город или район области"
            />
          </div>
        </ClickAwayListener>
        <div className="cityAutocomplete__content">
          <span className="cityAutocomplete__name">
            {cityName ? (
              <Fragment>
                <Location style={{ marginRight: '8px' }} />в &nbsp;
                {this._parseCityName(cityName)}
              </Fragment>
            ) : (
              'Населенный пункт'
            )}
          </span>
          <span className="cityAutocomplete__filtersArrow">
            <ArrowDown />
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  areas: getStates(state),
});

const mapDispatchToProps = dispatch => ({
  setFormValues: data => dispatch(setGeneralFiltersFormValuesAction(data)),
  setDescriptionFormValues: data =>
    dispatch(setDescriptionFiltersFormAction(data)),
  getCitiesSuggestions: (city, areaId) =>
    getCitiesSuggestions(dispatch, city, areaId),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityAutocomplete);
