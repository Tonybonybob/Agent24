import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';
import PropTypes from 'prop-types';

import ClientRequests from '../../general/ClientRequests';
import AutoComplete from '../../common/AutoComplete';
import Checkbox from '../../common/Checkbox';
import RadioGroup from '../../common/RadioGroup';
import { Button } from '../../general/Button';
import Select from '../../common/Select';
import TextField from '../../common/TextField';
import {
  clientLoadAsyncAction,
  clientCreateAsyncAction,
  clientLoadCitySuggestions,
  clientLoadAgencySuggestions,
  setFormValuesAction,
  setClientPhoneWritten,
  addClientDataAction,
} from '../../../store/actions/client';
import {
  getClientIsNew,
  getPhoneIsWritten,
  getRequests,
  getCitiesSuggestions,
  getAgenciesSuggestions,
  getAgencyTouched,
  getCityTouched,
} from '../../../store/reducers/client';
import './style.scss';
class AddClient extends Component {
  static propTypes = {
    getClient: PropTypes.func.isRequired,
    isNewClient: PropTypes.bool,
    isPhoneWritten: PropTypes.bool,
    isCommunity: PropTypes.bool,
    isRealtor: PropTypes.bool.isRequired,
    realtorType: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    requestObject: PropTypes.string,
    requests: PropTypes.array,
    valid: PropTypes.bool.isRequired,
    citiesSuggestions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    agenciesSuggestions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    cityName: PropTypes.string,
    cityId: PropTypes.number,
    agencyName: PropTypes.string,
    agencyTouched: PropTypes.bool,
    cityTouched: PropTypes.bool,
    addClientData: PropTypes.func.isRequired,
    setFormValues: PropTypes.func.isRequired,
    setPhoneWritten: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    createClient: PropTypes.func.isRequired,
    loadCities: PropTypes.func.isRequired,
    loadAgencies: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isNewClient: null,
    isCommunity: false,
    isPhoneWritten: false,
    realtorType: '',
    requestObject: '',
    citiesSuggestions: [],
    agenciesSuggestions: [],
    cityName: '',
    agencyName: '',
    agencyTouched: false,
    cityTouched: false,
    cityId: null,
  };

  constructor(props) {
    super(props);

    this.phoneMask = createTextMask({
      pattern: '99 999 99 99',
      guide: false,
      onChange: value => {
        const { setPhoneWritten, getClient } = this.props;
        if (value.length === 9) {
          getClient({ phone: `+380${value}` });
        }
        setPhoneWritten(false);
      },
    });

    this.state = {
      isChosen: true,
    };

    this.submit = this.submit.bind(this);
    this.handleCityLoad = this.handleCityLoad.bind(this);
    this.handleAgencyLoad = this.handleAgencyLoad.bind(this);
    this.handleCityBlur = this.handleCityBlur.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAgencySelect = this.handleAgencySelect.bind(this);
    this.handleAgencyBlur = this.handleAgencyBlur.bind(this);
  }

  submit(
    {
      agencyName,
      countryCode,
      phoneNumber,
      isRealtor,
      realtorType,
      source,
      ...values
    },
    isContinue
  ) {
    const { createClient, closeModal } = this.props;

    const realtorTypeObj = isRealtor ? { realtorType } : {};

    const agencyNameObj =
      isRealtor && realtorType === 'AGENCY' && !values.agencyId
        ? { agencyName }
        : {};

    const request = {
      ...values,
      lastName: values.lastName || '',
      middleName: values.middleName || '',
      ...agencyNameObj,
      ...realtorTypeObj,
      phone: countryCode + phoneNumber,
      source,
      isContinue,
    };

    createClient({ request, handleClose: closeModal });
  }

  handleCityLoad(event, { newValue }) {
    const { loadCities, setFormValues } = this.props;

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }

    const value = typeof newValue !== 'undefined' ? newValue : '';

    this.setState({
      isChosen: false,
    });

    setFormValues({
      cityName: value,
    });

    loadCities(value);
  }

  handleAgencySelect(event, { suggestion }) {
    const { setFormValues } = this.props;

    const values = {
      agencyName: suggestion.name,
      agencyId: suggestion.id,
    };

    setFormValues(values);
  }

  handleAgencyLoad(event, { newValue }) {
    const { loadAgencies, setFormValues } = this.props;

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }

    const value = typeof newValue !== 'undefined' ? newValue : '';
    setFormValues({
      agencyName: value,
    });

    loadAgencies(value);
  }

  handleSelect(event, { suggestion }) {
    const { setFormValues } = this.props;

    const values = {
      cityName: suggestion.name,
      cityId: suggestion.id,
    };

    this.setState({
      isChosen: true,
    });

    setFormValues(values);
  }

  handleCityBlur(event) {
    const { isChosen } = this.state;

    const { setFormValues, addClientData } = this.props;

    if (isChosen) {
      event.preventDefault();
      return false;
    }
    addClientData({ cityTouched: true });
    setFormValues({
      cityName: '',
      cityId: '',
    });
    return true;
  }

  handleAgencyBlur() {
    const { addClientData } = this.props;

    addClientData({ agencyTouched: true });
  }

  render() {
    const {
      isPhoneWritten,
      isNewClient,
      isCommunity,
      isRealtor,
      realtorType,
      requestObject,
      handleSubmit,
      requests,
      valid,
      citiesSuggestions,
      agenciesSuggestions,
      cityName,
      agencyName,
      agencyTouched,
      cityTouched,
    } = this.props;

    return (
      <form className="addClient">
        <h3 className="addClient__headerText">Добавить нового клиента</h3>
        <div className="addClient__fieldWrapper">
          <div className="addClient__field addClient__field_first addClient__field_number">
            <div className="addClient__number_first">
              <TextField
                label="Телефон"
                name="countryCode"
                disabled
                noDisabledUnderline
              />
            </div>
            <div className="addClient__number_second">
              <TextField name="phoneNumber" {...this.phoneMask} />
            </div>
          </div>
          {isNewClient && isPhoneWritten && (
            <h5 className="addClient__newClient">Новый клиент!</h5>
          )}
        </div>

        {isPhoneWritten && (
          <Fragment>
            <div className="addClient__fieldWrapper">
              <div className="addClient__field addClient__field_first">
                <TextField name="firstName" label="Имя" />
              </div>
              <Checkbox name="isRealtor" label="Риелтор" />
            </div>
            <div
              className={`addClient__field addClient__field_first ${
                cityTouched && !cityName ? '' : 'addClient__field_marginB'
              }`}
            >
              <AutoComplete
                suggestions={citiesSuggestions}
                handleSelect={this.handleSelect}
                handleChange={this.handleCityLoad}
                handleBlur={this.handleCityBlur}
                value={cityName}
                error={cityTouched && !cityName}
                label="Город"
              />
            </div>
            <TextField component="input" type="hidden" name="cityId" />
            <div className="addClient__fieldWrapper">
              {isRealtor && (
                <div className="addClient__field addClient__field_first addClient__field_marginB">
                  <Select
                    name="realtorType"
                    label="Тип аккаунта"
                    items={[
                      { value: 'AGENCY', name: 'Агентство' },
                      { value: 'PRIVATE', name: 'Частник' },
                    ]}
                  />
                </div>
              )}
              {realtorType === 'AGENCY' && isRealtor && (
                <div
                  className={`addClient__field ${
                    agencyTouched && !agencyName
                      ? ''
                      : 'addClient__field_marginB'
                  }`}
                >
                  <AutoComplete
                    suggestions={agenciesSuggestions}
                    value={agencyName}
                    label="Название агентства"
                    error={agencyTouched && !agencyName}
                    handleChange={this.handleAgencyLoad}
                    handleSelect={this.handleAgencySelect}
                    handleBlur={this.handleAgencyBlur}
                  />
                  <TextField
                    component="input"
                    name="agencyName"
                    type="hidden"
                  />
                </div>
              )}
            </div>
            {(isCommunity || isNewClient) && (
              <div className="addClient__field addClient__field_first">
                <Select
                  name="source"
                  label="Источник"
                  items={[
                    { value: 'SITE', name: 'Сайт' },
                    { value: 'RECOMMENDATION', name: 'Рекоммендации' },
                  ]}
                />
              </div>
            )}
            {requests && <ClientRequests requests={requests} />}
            <div className="addClient__fieldWrapper addClient__fieldWrapper_top">
              <div className="addClient__radio">
                <RadioGroup
                  name="requestObject"
                  label="Объект"
                  required
                  items={[
                    { value: 'FLAT', label: 'Квартира' },
                    { value: 'HOUSE', label: 'Дом' },
                    { value: 'LAND', label: 'Земля' },
                  ]}
                />
              </div>
              {requestObject && (
                <div>
                  <RadioGroup
                    name="requestType"
                    label="Операция"
                    required
                    items={[
                      { value: 'SELL', label: 'Продажа' },
                      { value: 'BUY', label: 'Покупка' },
                    ]}
                  />
                </div>
              )}
            </div>
            <div className="addClient__buttons">
              <div className="addClient__button">
                <Button
                  blank
                  full
                  noBorder
                  buttonType="add"
                  size="big"
                  disabled={!valid}
                  onClick={handleSubmit(values => this.submit(values, false))}
                >
                  Сохранить и выйти
                </Button>
              </div>
              <div className="addClient__button">
                <Button
                  buttonType="secondary"
                  disabled={!valid}
                  full
                  size="big"
                  onClick={handleSubmit(values => this.submit(values, true))}
                >
                  Добавить параметры
                </Button>
              </div>
            </div>
          </Fragment>
        )}
      </form>
    );
  }
}

const selector = formValueSelector('AddClientForm');

const mapStateToProps = state => ({
  isNewClient: getClientIsNew(state),
  isPhoneWritten: getPhoneIsWritten(state),
  requests: getRequests(state),
  citiesSuggestions: getCitiesSuggestions(state),
  cityTouched: getCityTouched(state),
  agencyTouched: getAgencyTouched(state),
  agenciesSuggestions: getAgenciesSuggestions(state),
  isRealtor: selector(state, 'isRealtor'),
  isCommunity: selector(state, 'isCommunity'),
  requestObject: selector(state, 'requestObject'),
  realtorType: selector(state, 'realtorType'),
  cityName: selector(state, 'cityName'),
  cityId: selector(state, 'cityId'),
  agencyName: selector(state, 'agencyName'),
});

const mapDispatchToProps = dispatch => ({
  getClient: phone => dispatch(clientLoadAsyncAction(phone)),
  setPhoneWritten: isWritten => dispatch(setClientPhoneWritten(isWritten)),
  createClient: data => dispatch(clientCreateAsyncAction(data)),
  addClientData: data => dispatch(addClientDataAction(data)),
  loadCities: data => dispatch(clientLoadCitySuggestions(data)),
  loadAgencies: data => dispatch(clientLoadAgencySuggestions(data)),
  setFormValues: data => dispatch(setFormValuesAction(data)),
});

export default compose(
  reduxForm({
    form: 'AddClientForm',
    initialValues: {
      countryCode: '+380',
    },
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AddClient);
