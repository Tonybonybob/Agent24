import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  filterGetCitiesAsyncAction,
  setGeneralFiltersFormValuesAction,
  filterDataAsyncAction,
} from '../../../store/actions/filters';
import { getCities } from '../../../store/reducers/filters';
import ArrowDown from '../../../assets/ArrowDown';
import { getUserCityId } from '../../../store/reducers/user';
import CityAutocomplete from './CityAutocomplete';
import './style.scss';
const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <ArrowDown />
      </components.DropdownIndicator>
    )
  );
};

const RenderSelectInput = ({
  input,
  options,
  name,
  id,
  placeholder,
  className,
  filterData,
}) => (
  <Select
    {...input}
    id={id}
    name={name}
    components={{ DropdownIndicator }}
    defaultValue={input.value}
    placeholder={placeholder}
    isSearchable={false}
    className={className}
    classNamePrefix="selectInput"
    options={options}
    value={{
      ...options.find(option => option.value === input.value),
      className: 'customOption',
    }}
    onChange={event => {
      if (input.onChange && event != null) {
        console.log(input);
        // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
        input.onChange(event.value);
        filterData();
      } else {
        // Clear the input field
        input.onChange(null);
      }
    }}
    onBlur={() => input.onBlur(input.value)}
  />
);

class GeneralFilters extends Component {
  static propTypes = {
    getCities: PropTypes.func.isRequired,
    setFiltersFormValues: PropTypes.func.isRequired,
    cities: PropTypes.arrayOf({
      name: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
    cityId: PropTypes.number.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);

    this.handleChangeMls = this.handleChangeMls.bind(this);
  }

  componentDidMount() {
    const { getCities, cityId, setFiltersFormValues } = this.props;

    getCities();
  }

  handleChangeMls = event => {
    const { setFiltersFormValues, filterData } = this.props;

    const isMLS = event.currentTarget.getAttribute('data-ismls') === 'true';

    setFiltersFormValues({ isMLS });
    filterData();
  };

  render() {
    const { className, cities, cityId, filterData, isMLS } = this.props;

    return (
      <div className={`generalFilters ${className}`}>
        <div className="generalFilters__item generalFilters__item_mobile generalFilters__item_First">
          <CityAutocomplete
            cities={cities}
            cityId={cityId}
            filterData={filterData}
            name="cityId"
            className="databaseButtons__item"
          />
        </div>
        <div className="generalFilters__item generalFilters__item_mobile">
          <Field
            name="requestObject"
            component={RenderSelectInput}
            filterData={filterData}
            placeholder="Объект"
            className="databaseButtons__item"
            value="land"
            options={[
              { value: 'flat', label: 'Квартиры', className: 'customOption' },
              { value: 'house', label: 'Дома', className: 'customOption' },
              { value: 'land', label: 'Участки', className: 'customOption' },
            ]}
          />
        </div>
        <div className="generalFilters__item generalFilters__item_mobile">
          <Field
            name="requestType"
            placeholder="Операция"
            component={RenderSelectInput}
            filterData={filterData}
            className="databaseButtons__item generalFilters__item_mobile_big"
            options={[
              { value: 'sell', label: 'Продавцы', className: 'customOption' },
              { value: 'buy', label: 'Покупатели', className: 'customOption' },
            ]}
            required={false}
          />
          <div className="generalFilters__mlsWrapper databaseButtons__item generalFilters__item_mobile_small">
            <span
              className={`generalFilters__mls ${
                !isMLS ? 'generalFilters__mls_active' : ''
              }`}
              data-ismls="false"
              onClick={this.handleChangeMls}
            >
              Все
            </span>
            <span
              className={`generalFilters__mls ${
                isMLS ? 'generalFilters__mls_active' : ''
              }`}
              data-ismls="true"
              onClick={this.handleChangeMls}
            >
              МЛС
            </span>
          </div>
        </div>
        <div className="generalFilters__item generalFilters__item_desktop">
          <Field
            name="requestObject"
            component={RenderSelectInput}
            filterData={filterData}
            placeholder="Объект"
            className="databaseButtons__item"
            value="land"
            options={[
              { value: 'flat', label: 'Квартиры', className: 'customOption' },
              { value: 'house', label: 'Дома', className: 'customOption' },
              { value: 'land', label: 'Участки', className: 'customOption' },
            ]}
          />
          <Field
            name="requestType"
            placeholder="Операция"
            component={RenderSelectInput}
            filterData={filterData}
            className="databaseButtons__item"
            options={[
              { value: 'sell', label: 'Продавцы', className: 'customOption' },
              { value: 'buy', label: 'Покупатели', className: 'customOption' },
            ]}
            required={false}
          />
        </div>
        <div className="generalFilters__item generalFilters__item_last generalFilters__item_desktop">
          <CityAutocomplete
            cities={cities}
            cityId={cityId}
            filterData={filterData}
            name="cityId"
            className="databaseButtons__item"
          />
        </div>
        <div className="generalFilters__item generalFilters__mlsWrapper generalFilters__item_desktop">
          <span
            className={`generalFilters__mls ${
              !isMLS ? 'generalFilters__mls_active' : ''
            }`}
            data-ismls="false"
            onClick={this.handleChangeMls}
          >
            Все
          </span>
          <span
            className={`generalFilters__mls ${
              isMLS ? 'generalFilters__mls_active' : ''
            }`}
            data-ismls="true"
            onClick={this.handleChangeMls}
          >
            МЛС
          </span>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('GeneralFiltersForm');

const mapStateToProps = state => ({
  cities: getCities(state),
  initialValues: {
    requestObject: 'flat',
    requestType: 'sell',
    cityId: getUserCityId(state),
    isMLS: false,
  },
  cityId: selector(state, 'cityId'),
  isMLS: selector(state, 'isMLS'),
});

const mapDispatchToProps = dispatch => ({
  getCities: () => dispatch(filterGetCitiesAsyncAction()),
  filterData: () => dispatch(filterDataAsyncAction()),
  setFiltersFormValues: data =>
    dispatch(setGeneralFiltersFormValuesAction(data)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({
    form: 'GeneralFiltersForm',
    enableReinitialize: true,
  })
)(GeneralFilters);
