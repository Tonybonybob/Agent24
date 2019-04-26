import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { formValueSelector } from 'redux-form';
import { createNumberMask } from 'redux-form-input-masks';
import Checkbox from '../../../../common/Checkbox';
import MapSelectWrapper from '../../../../common/MapSelectWrapper';
import Select from '../../../../common/Select';
import TextField from '../../../../common/TextField';
// import SmallPersonBlock from '../../../SmallPersonBlock';
import AutoComplete from '../../../../common/AutoComplete';
import Tooltip from '../../../../common/Tooltip';
import {
  setNewRequestFormValuesAction,
  loadStreetSuggestions,
  setNewRequestNamesAction,
  loadDistrictSuggestions,
  loadMicroDistrictSuggestions,
  loadSchemesSuggestionsAction,
  setHouseNumber,
  updateStreetId,
  clearAdditionalFormData,
} from '../../../../../store/actions/newRequest';
import {
  getStreetSuggestions,
  getNewRequest,
  getSchemes,
  getWallIds,
  getFormData,
} from '../../../../../store/reducers/newRequest';
import { getAttributes } from '../../../../../store/reducers/attributes';
import './style.scss';
const priceMask = createNumberMask({ suffix: ' $', allowEmpty: true });
// const defaultNumberMask = createNumberMask({ allowEmpty: true });
// const phoneMask = createTextMask({ pattern: '+38 (999) 999-99-99' });

// eslint-disable-next-line react/prefer-stateless-function
class FlatSell extends PureComponent {
  constructor(props) {
    super(props);

    this.handleStreetOrComplexesSelect = this.handleStreetOrComplexesSelect.bind(
      this
    );
    this.handleStreetOrComplexesBlur = this.handleStreetOrComplexesBlur.bind(
      this
    );
    this.handleComplexesSelect = this.handleComplexesSelect.bind(this);
    this.handleComplexesChange = this.handleComplexesChange.bind(this);
    this.handleComplexesBlur = this.handleComplexesBlur.bind(this);

    this.valuesForNewSchemes = {
      cityId: null,
      adminAreaId: null,
      microDistrictId: null,
      streetId: null,
      house: '',
    };

    this.roomsSuggestion = [
      {
        id: 1,
        name: '1-ком',
        paramName: 'rooms',
        position: 1,
      },
      {
        id: 2,
        name: '2-ком',
        paramName: 'rooms',
        position: 2,
      },
      {
        id: 3,
        name: '3-ком',
        paramName: 'rooms',
        position: 3,
      },
      {
        id: 4,
        name: '4-к и более',
        paramName: 'rooms',
        position: 4,
      },
    ];
  }

  componentDidMount() {
    const { streetId, streetSuggestions, setNewRequestFormValues } = this.props;

    if (streetId) {
      const streets =
        streetSuggestions.streets instanceof Array
          ? streetSuggestions.streets
          : [];
      const complices =
        streetSuggestions.complices instanceof Array
          ? streetSuggestions.complices
          : [];
      const selectedStreet = [...streets, ...complices].find(
        el => el.id === streetId
      );
      if (selectedStreet) {
        setNewRequestFormValues({
          cityId: selectedStreet.cityId,
          adminAreaId: selectedStreet.adminAreaId,
          microDistrictId: selectedStreet.microDistrictId,
        });
      }
    }
  }

  componentDidUpdate() {
    const {
      cityId,
      adminAreaId,
      microDistrictId,
      streetId,
      house,
      loadSchemes,
    } = this.props;
    if (cityId && adminAreaId && microDistrictId && streetId && house) {
      const newValues = Object.keys(this.valuesForNewSchemes)
        // eslint-disable-next-line react/destructuring-assignment
        .some(key => this.props[key] !== this.valuesForNewSchemes[key]);
      if (newValues) {
        this.valuesForNewSchemes = {
          cityId,
          adminAreaId,
          microDistrictId,
          streetId,
          house,
        };
        loadSchemes(this.valuesForNewSchemes);
      }
    }
  }

  static onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true,
    });
  }

  _setHouseNumberDebounce = _.debounce(this.props.setHouseNumber, 1000);

  onHouseNumberChange = event => {
    const { value } = event.currentTarget;
    const { streetId, clearAdditionalFormData } = this.props;
    if (value.length === 0) {
      clearAdditionalFormData();
    }
    this._setHouseNumberDebounce({
      streetId,
      houseNumber: value,
    });
  };

  renderFlattDetailInfo = () => {
    const {
      complex,
      attributes,
      complexTouched,
      schemeId,
      technicalFloorVisible,
      streetSuggestions,
    } = this.props;

    const complices =
      streetSuggestions && streetSuggestions.complices
        ? streetSuggestions.complices
        : [];

    return (
      <div>
        <div className="newRequestDesc__line">
          <div className="newRequestDesc__field newRequestDesc__field-scheme">
            <Select
              name="schemeId"
              label="Проэкт дома"
              items={this.selectShemesSuggestions()}
            />
          </div>
          {schemeId === 8 && (
            <div className="newRequestDesc__field newRequestDesc__field-complex">
              <AutoComplete
                suggestions={complices}
                handleSelect={this.handleComplexesSelect}
                handleChange={this.handleComplexesChange}
                handleBlur={this.handleComplexesBlur}
                error={complexTouched && !complex}
                value={complex}
                placeholder="Название ЖК"
              />
            </div>
          )}
          <div
            className={`newRequestDesc__field newRequestDesc__field-room ${
              schemeId === 8 ? '' : 'newRequestDesc__field-complex'
            }`}
          >
            <Select name="room" label="Комнат" items={this.roomsSuggestion} />
          </div>
          <div
            className={`newRequestDesc__field newRequestDesc__field-withSub newRequestDesc__field-floors  ${
              schemeId === 8 && technicalFloorVisible
                ? 'newRequestDesc__field-floors-min'
                : ''
            }`}
          >
            <div className="newRequestDesc__subField">
              <TextField
                placeholder="Этаж"
                name="floor"
                // {...defaultNumberMask}
              />
            </div>
            <div className="newRequestDesc__subDivider">
              <span>/</span>
            </div>
            <div className="newRequestDesc__subField">
              <TextField
                placeholder="Этажность"
                name="maxFloor"
                // {...defaultNumberMask}
              />
            </div>
          </div>
          {technicalFloorVisible && (
            <div className="newRequestDesc__field newRequestDesc__field-technicalFloor">
              <Checkbox name="technicalFloorExists" label="Есть техэтаж" />
            </div>
          )}
        </div>
        <div className="newRequestDesc__line">
          <div className="newRequestDesc__field newRequestDesc__field-condition">
            <Select
              name="conditionId"
              label="Состояние"
              items={attributes.condition || []}
            />
          </div>
          <div className="newRequestDesc__field newRequestDesc__field-wallMaterial">
            <Select
              name="wallFlatId"
              label="Материал Стен"
              items={this.selectWallSuggestions()}
            />
          </div>
          <div className="newRequestDesc__field newRequestDesc__field-withSub newRequestDesc__field-squares">
            <div className="newRequestDesc__subField">
              <TextField
                placeholder="Общая"
                label="Площадь"
                InputLabelProps={{ shrink: true }}
                name="totalSquare"
              />
            </div>
            <div className="newRequestDesc__subDivider">
              <span>/</span>
            </div>
            <div className="newRequestDesc__subField">
              <TextField
                placeholder="Жилая"
                name="livingSquare"
                // {...defaultNumberMask}
              />
            </div>
            <div className="newRequestDesc__subDivider">
              <span>/</span>
            </div>
            <div className="newRequestDesc__subField">
              <TextField
                placeholder="Кухня"
                name="kitchenSquare"
                // {...defaultNumberMask}
              />
            </div>
          </div>
        </div>
        <div className="newRequestDesc__line">
          <div className="newRequestDesc__field newRequestDesc__field-description">
            <TextField label="Описание" multiline name="description" />
          </div>
        </div>
        <div className="newRequestDesc__line newRequestDesc__line_toBottom">
          <div className="newRequestDesc__field newRequestDesc__field-price">
            <TextField label="Цена, $" name="price" {...priceMask} />
          </div>
          {/* </div> */}
          {/* {exclusiveOwner === 'notUser' && (
          <div className="newRequestDesc__line">
            <div className="newRequestDesc__field newRequestDesc__field_ownerPhone">
              <TextField name="exclusiveOwnerPhone"
              label="Телефон собственника"
              {...phoneMask} />
            </div>
            <div className="newRequestDesc__field newRequestDesc__field_ownerName">
              <TextField name="exclusiveOwnerName" label="Имя собственника" />
            </div>
          </div>
        )} */}
          {/* <div className="newRequestDesc__line newRequestDesc__line_checks"> */}
          <div className="newRequestDesc__field newRequestDesc__field-checkbox">
            <Checkbox
              name="hideInSearch"
              label="Не показывать в Автопоиске Сообщества"
            />
          </div>
          <div className="newRequestDesc__field newRequestDesc__field-checkbox">
            <Checkbox name="hidePhone" label="Скрыть № дома от сообщества" />
          </div>
        </div>
      </div>
    );
  };

  selectWallSuggestions() {
    const {
      wallSuggestions,
      streetId,
      cityId,
      adminAreaId,
      microDistrictId,
      house,
      attributes,
    } = this.props;

    const neededFields =
      streetId && cityId && adminAreaId && microDistrictId && house;
    if (wallSuggestions.length === 0 || !neededFields) {
      return attributes.wall || [];
    }
    const smartSuggestions = wallSuggestions.reduce((arr, acc) => {
      const wall = (attributes.wall || []).find(el => el.id === acc);
      if (wall) {
        return [...arr, wall];
      }
      return arr;
    }, []);

    return smartSuggestions;
  }

  selectShemesSuggestions() {
    const {
      schemesSuggestions,
      streetId,
      cityId,
      adminAreaId,
      microDistrictId,
      house,
      attributes,
    } = this.props;

    const neededFields =
      streetId && cityId && adminAreaId && microDistrictId && house;
    if (schemesSuggestions.length === 0 || !neededFields) {
      return attributes.scheme || [];
    }
    const smartSuggestions = schemesSuggestions.reduce((arr, acc) => {
      const scheme = (attributes.scheme || []).find(el => el.id === acc);
      if (scheme) {
        return [...arr, scheme];
      }
      return arr;
    }, []);

    return smartSuggestions;
  }

  handleStreetOrComplexesBlur(event) {
    const {
      setNewRequestFormValues,
      streetChosen,
      setNewRequestNames,
    } = this.props;
    let valuesToState = {
      streetTouched: true,
    };
    if (!streetChosen) {
      valuesToState = {
        ...valuesToState,
        streetName: '',
        streetChosen: false,
      };
      setNewRequestFormValues({ streetId: null });
    } else {
      event.preventDefault();
    }
    setNewRequestNames(valuesToState);

    return false;
  }

  //TODO REMOVE LEGACY
  handleComplexesChange(event, { newValue }) {
    const {
      loadStreets,
      areaId,
      cityId,
      adminAreaId,
      microDistrictId,
      setNewRequestFormValues,
    } = this.props;

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }

    setNewRequestFormValues({
      complex: newValue,
    });

    const values = {
      name: newValue,
      areaId,
      cityId,
      adminAreaId,
      microDistrictId,
      isComplex: true,
      onlyComplex: true,
    };

    const filteredValues = Object.keys(values).reduce((obj, key) => {
      if (values[key] !== undefined && values[key] !== false) {
        return { ...obj, [key]: values[key] };
      }
      return obj;
    }, {});

    loadStreets(filteredValues);
    return false;
  }

  handleComplexesSelect(event, { suggestion }) {
    const { setNewRequestFormValues } = this.props;

    setNewRequestFormValues({
      complex: suggestion.name,
    });
  }

  handleComplexesBlur() {
    const { setNewRequestNames, complexTouched } = this.props;

    if (!complexTouched) {
      setNewRequestNames({
        complexTouched: true,
      });
    }
  }

  handleStreetOrComplexesSelect(event, { suggestion }) {
    const {
      setNewRequestFormValues,
      cityId,
      setNewRequestNames,
      setStreetId,
    } = this.props;

    const streetId = suggestion.id;
    const valuesToState = {};
    const valuesToReduxForm = {};
    if (cityId) {
      valuesToState.streetName = suggestion.name;
      valuesToState.streetChosen = true;
      valuesToReduxForm.streetId = suggestion.id;
    } else {
      const nameWithoutArea = suggestion.name
        .split(' (')
        .slice(0, -1)
        .join('');
      valuesToState.streetName = nameWithoutArea;
      valuesToState.streetChosen = true;
      valuesToState.cityName = suggestion.cityName;
      valuesToState.cityChosen = true;
      valuesToState.cityOrDistrict = suggestion.microDistrictId
        ? 'CITY'
        : 'DISTRICT';
      valuesToReduxForm.streetId = suggestion.id;
      valuesToReduxForm.cityId = suggestion.cityId;
      // valuesToReduxForm.adminAreaId = suggestion.adminAreaId;
      // valuesToReduxForm.microDistrictId = suggestion.microDistrictId;
      // loadDistrict(null, null, suggestion.adminAreaId);
      // loadMicroDistricts(null, null, suggestion.microDistrictId);
    }
    setStreetId({ streetId });
    setNewRequestNames(valuesToState);
    setNewRequestFormValues(valuesToReduxForm);
  }

  _loadStreetThrottle = _.throttle(this.props.loadStreets, 1000);

  handleStreetOrComplexesChange = (event, { newValue }) => {
    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }
    this._setupStreetValues(newValue);
    return false;
  };

  _setupStreetValues = newValue => {
    const {
      areaId,
      cityId,
      isCity,
      adminAreaId,
      microDistrictId,
      setNewRequestNames,
      clearAdditionalFormData,
    } = this.props;

    setNewRequestNames({
      streetName: newValue,
      streetChosen: false,
    });

    if (newValue.length === 0) {
      return clearAdditionalFormData();
    }

    if (newValue.length < 3) {
      return;
    }

    const values = {
      name: newValue,
      areaId,
      cityId,
      isCity,
      adminAreaId,
      microDistrictId,
      isComplex: true,
    };

    const filteredValues = Object.keys(values).reduce((obj, key) => {
      if (values[key] !== undefined && values[key] !== false) {
        return { ...obj, [key]: values[key] };
      }
      return obj;
    }, {});

    this._loadStreetThrottle(filteredValues);
  };

  onStreetInputKeyDown = event => {
    const { streetChosen } = this.props;
    const isBackspaceForSelected = event.keyCode === 8 && streetChosen;
    if (!isBackspaceForSelected) {
      return;
    }
    this._setupStreetValues('');
  };

  get _isAddressDetected() {
    const { streetName, house } = this.props;
    return streetName && house;
  }

  render() {
    const {
      streetSuggestions,
      streetName,
      streetTouched,
      geoLocation,
      adminAreaName,
      microDistrictName,
    } = this.props;

    const complices =
      streetSuggestions && streetSuggestions.complices
        ? streetSuggestions.complices
        : [];

    const streets =
      streetSuggestions && streetSuggestions.streets
        ? [...streetSuggestions.streets, ...complices]
        : [];

    const location = geoLocation || {};
    return (
      <div className="newRequestDesc">
        <div className="newRequestDesc__line">
          <div className="newRequestDesc__field newRequestDesc__field-street">
            <Tooltip
              text="Выберите вашу улицу (пример)"
              className="newRequestDesc__tooltipBefore"
              primary
            />
            <AutoComplete
              suggestions={streets}
              handleSelect={this.handleStreetOrComplexesSelect}
              handleChange={this.handleStreetOrComplexesChange}
              handleBlur={this.handleStreetOrComplexesBlur}
              onKeyDown={this.onStreetInputKeyDown}
              value={streetName}
              placeholder="Улица или название ЖК"
              error={streetTouched && !streetName}
            />
          </div>
          <div className="newRequestDesc__field newRequestDesc__field-house">
            <TextField
              label="Дом"
              name="house"
              onChange={this.onHouseNumberChange}
            />
          </div>
          <div className="newRequestDesc__field newRequestDesc__field-housing">
            <TextField label="Корпус/секц" name="housing" required={false} />
          </div>
          <div className="newRequestDesc__field newRequestDesc__field-apartment">
            <TextField label="Квартира" name="apartment" required={false} />
          </div>
        </div>
        <div className="newRequestDesc__line">
          <div className="newRequestDesc__field newRequestDesc__field-infoblock newRequestDesc__field-adminArea">
            <label htmlFor="adminArea">Админ район</label>
            <div id="adminArea" className="infoblock">
              {adminAreaName}
            </div>
          </div>
          <div className="newRequestDesc__field newRequestDesc__field-infoblock newRequestDesc__field-microdistrict">
            <label htmlFor="microDistrictName">Микрорайон</label>
            <div id="microDistrictName" className="infoblock">
              {microDistrictName}
            </div>
          </div>
        </div>
        <div className="newRequestDesc__line">
          <div className="newRequestDesc__field newRequestDesc__field-map">
            <MapSelectWrapper location={location} />
          </div>
        </div>
        {this._isAddressDetected && this.renderFlattDetailInfo()}
      </div>
    );
  }
}

FlatSell.propTypes = {
  streetSuggestions: PropTypes.shape({
    complices: PropTypes.array,
    streets: PropTypes.array,
  }).isRequired,
  setNewRequestFormValues: PropTypes.func.isRequired,
  loadStreets: PropTypes.func.isRequired,
  loadSchemes: PropTypes.func.isRequired,
  areaId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  cityId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  adminAreaId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  microDistrictId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  streetId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  house: PropTypes.string,
  setNewRequestNames: PropTypes.func.isRequired,
  streetChosen: PropTypes.bool,
  complex: PropTypes.string,
  streetName: PropTypes.string.isRequired,
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  schemeId: PropTypes.number,
  schemesSuggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  wallSuggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  streetTouched: PropTypes.bool.isRequired,
  complexTouched: PropTypes.bool.isRequired,
  setHouseNumber: PropTypes.func.isRequired,
  setStreetId: PropTypes.func.isRequired,
  geoLocation: PropTypes.shape({}),
  adminAreaName: PropTypes.string,
  microDistrictName: PropTypes.string,
  technicalFloorVisible: PropTypes.bool.isRequired,
};

FlatSell.defaultProps = {
  areaId: false,
  cityId: false,
  adminAreaId: false,
  microDistrictId: false,
  streetId: false,
  house: '',
  streetChosen: false,
  schemeId: '',
  adminAreaName: '',
  microDistrictName: '',
  geoLocation: {},
  complex: '',
};

const selector = formValueSelector('NewRequestForm');

const mapStateToProps = state => ({
  streetSuggestions: getStreetSuggestions(state),
  areaId: selector(state, 'areaId'),
  areaName: null,

  cityId: selector(state, 'cityId'),
  isCity: selector(state, 'isCity'),
  cityName: null,

  streetId: getNewRequest(state).streetId,
  streetName: getNewRequest(state).streetName,
  streetChosen: getNewRequest(state).streetChosen,
  streetTouched: getNewRequest(state).streetTouched,

  complex: selector(state, 'complex'),
  complexTouched: getNewRequest(state).complexTouched,

  house: selector(state, 'house'),

  adminAreaId: selector(state, 'adminAreaId'),
  adminAreaName: getNewRequest(state).adminAreaName,

  microDistrictId: selector(state, 'microDistrictId'),
  microDistrictName: getNewRequest(state).microDistrictName,

  geoLocation: getNewRequest(state).geoLocation,

  schemeId: selector(state, 'schemeId'),
  schemesSuggestions: getSchemes(state),

  attributes: getAttributes(state),
  wallSuggestions: getWallIds(state),

  exclusiveOwner: selector(state, 'exclusiveOwner'),
  technicalFloorVisible:
    getFormData(state).floor === getFormData(state).maxFloor &&
    getFormData(state).maxFloor > 0,
});

const mapDispatchToProps = dispatch => ({
  setNewRequestFormValues: values =>
    dispatch(setNewRequestFormValuesAction(values)),
  setNewRequestNames: data => dispatch(setNewRequestNamesAction(data)),
  loadStreets: (...args) => dispatch(loadStreetSuggestions(...args)),
  setStreetId: (...args) => dispatch(updateStreetId(...args)),
  setHouseNumber: (...args) => dispatch(setHouseNumber(...args)),
  loadDistrict: (...args) => dispatch(loadDistrictSuggestions(...args)),
  loadMicroDistricts: (...args) =>
    dispatch(loadMicroDistrictSuggestions(...args)),
  loadSchemes: data => dispatch(loadSchemesSuggestionsAction(data)),
  clearAdditionalFormData: () => clearAdditionalFormData(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlatSell);
