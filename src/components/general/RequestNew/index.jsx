import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, getFormValues } from 'redux-form';
import qs from 'query-string';

import Additional from './Additional';
import Description from './Description';
import Photos from './Photos';
import Select from '../../common/Select';
import { Button } from '../Button';
import CityAutoSuggest from '../../common/AreaSelect/CityAutoSuggest';
import Tabs from '../../common/Tabs';
import CloseIcon from '../../../assets/BigClose';
import Tooltip from '../../common/Tooltip';
import { withSizes } from '../../../utils';
import { getFullObject } from '../../../store/reducers/client';
import { getUserCityName, getUserAreaName } from '../../../store/reducers/user';
import { selectedGlobalObject } from '../../../store/selectors/geoData';

import { objects, operations, buyFlatForm, commonForm } from './constants';

import {
  setNewRequestFormValuesAction,
  restoreInitialDataAction,
  createNewFlatRequestAction,
  setNewRequestNamesAction,
  loadCitySuggestions,
} from '../../../store/actions/newRequest';

import {
  loadFlatAttributesAsyncAction,
  loadEstateStatusAttributesAsyncAction,
  loadPhotoTypeAttributesAsyncAction,
} from '../../../store/actions/attributes';
import './style.scss';
class RequestNew extends PureComponent {
  constructor(props) {
    super(props);

    const { object, operation } = props;

    this.state = {
      activeTab: 0,
      segments: 0,
      mapAreas: 0,
    };

    if (object === 'flat' && operation === 'buy') {
      this.formValues = buyFlatForm;
      this.descriptionReadyCount = 14;
      this.photosReadyCount = 0;
      this.additionalReadyCount = 12;
    } else {
      this.formValues = commonForm;
      this.descriptionReadyCount = 5;
      this.photosReadyCount = 1;
      this.additionalReadyCount = 14;
    }

    this.percentageRef = React.createRef();
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      location,
      setNewRequestFormValues,
      object,
      operation,
      history,
      loadFlatAttributes,
      loadEstateStatus,
      loadPhotoType,
      fullObject,
      setNewRequestNames,
      userArea,
      userCity,
    } = this.props;

    const queryParams = location.search ? qs.parse(location.search) : {};
    const isNew = location.pathname.split('/')[4] === 'new';
    let newParams = {};

    if (queryParams.operation && queryParams.operation !== operation) {
      newParams = {
        ...queryParams,
        ...newParams,
        operation: queryParams.operation,
      };
    }
    if (queryParams.object && queryParams.object !== object) {
      newParams = { ...queryParams, ...newParams, object: queryParams.object };
    }

    if (!isNew) {
      newParams = {
        ...newParams,
        ...fullObject,
        ...fullObject.extra,
        object: fullObject.type.toLowerCase(),
        operation: fullObject.operation.toLowerCase(),
        house: fullObject.address.house,
        housing: fullObject.address.housing,
        complex: fullObject.address.complexName,
        cityId: fullObject.address.city.id,
        areaId: fullObject.address.city.areaId,
        adminAreaId: fullObject.address.adminArea.id,
        microdistrictId: fullObject.address.microdistrict.id,
        streetId: fullObject.address.street.id,
      };
      if (fullObject.address.apartment) {
        newParams = {
          ...newParams,
          apartment: fullObject.address.apartment,
        };
      }
      setNewRequestNames({
        areaName: fullObject.address.city.areaName,
        areaChosen: true,
        cityName: fullObject.address.city.name,
        cityChosen: true,
        cityOrDistrict: fullObject.address.city.type,
        adminAreaName: fullObject.address.adminArea.name,
        adminAreaChosen: true,
        microdistrictName: fullObject.address.microdistrict.name,
        microdistrictChosen: true,
        streetName: fullObject.address.street.name,
        streetChosen: true,
      });
    } else {
      setNewRequestNames({
        areaName: userArea,
        areaChosen: true,
        cityName: userCity,
        cityChosen: true,
      });
    }

    if (Object.keys(newParams).length) {
      setNewRequestFormValues(newParams);
    } else if (!queryParams.operation || !queryParams.object) {
      history.push({
        pathname: location.pathname,
        search: qs.stringify({
          ...queryParams,
          object: 'flat',
          operation: 'sell',
        }),
      });
    }

    loadFlatAttributes();
    loadEstateStatus();
    loadPhotoType();
  }

  componentDidUpdate(prevState) {
    const { operation, history, location, object, schemeId } = this.props;

    const queryParams = location.search ? qs.parse(location.search) : {};
    let search = {};
    if (operation !== prevState.operation) {
      search = {
        ...queryParams,
        ...search,
        operation,
      };
      if (object === 'flat' && operation === 'buy') {
        this.formValues = buyFlatForm;
        this.descriptionReadyCount = 14;
        this.photosReadyCount = 0;
        this.additionalReadyCount = 12;
      } else {
        this.formValues = commonForm;
        this.descriptionReadyCount = 5;
        this.photosReadyCount = 1;
        this.additionalReadyCount = 14;
      }
    }
    if (object !== prevState.object) {
      search = {
        ...queryParams,
        ...search,
        object,
      };
      if (object === 'flat' && operation === 'buy') {
        this.formValues = buyFlatForm;
        this.descriptionReadyCount = 14;
        this.photosReadyCount = 0;
        this.additionalReadyCount = 12;
      } else {
        this.formValues = commonForm;
        this.descriptionReadyCount = 5;
        this.photosReadyCount = 1;
        this.additionalReadyCount = 14;
      }
    }

    if (Object.keys(search).length) {
      history.push({
        pathname: location.pathname,
        search: qs.stringify(search),
      });
    }
    if (object === 'flat' && operation === 'sell') {
      this.descriptionReadyCount = schemeId === 10 ? 18 : 5;
    }
  }

  componentWillUnmount() {
    const { restoreInitialData } = this.props;
    restoreInitialData();
  }

  handleChangeSegment = segments => this.setState({ segments });

  handleChangeMapAreas = mapAreas => this.setState({ mapAreas });

  closeModal() {
    const { history, location, match } = this.props;

    const isNew = location.pathname.split('/')[4] === 'new';
    const back = isNew
      ? match.url.replace('/new', '')
      : match.url.replace('/edit', '');
    history.push(back);
  }

  summarize() {
    const summ =
      this.countDescription() * 2 +
      this.countPhotos() * 2 +
      this.countAdditional();
    const cost =
      100 /
      (2 * this.descriptionReadyCount +
        this.photosReadyCount * 2 +
        this.additionalReadyCount);
    return Math.min(Math.floor(summ * cost), 100);
  }

  countDescription() {
    const { formValues, object, operation } = this.props;

    const { segments, mapAreas } = this.state;

    let counter = 0;

    if (object === 'flat' && operation === 'buy') {
      if (
        this.formValues.description &&
        this.formValues.description.parametrs
      ) {
        for (const item of this.formValues.description.parametrs) {
          for (const parametr of formValues.parametrs) {
            const val = parametr[item];

            if (val instanceof Array) {
              if (val.length > 0) {
                counter += 1;
              }
            } else {
              if (val && val !== '') {
                counter += 1;
              }
            }
          }
        }
        counter += segments + mapAreas;
      }
    } else {
      if (Array.isArray(this.formValues.description)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of this.formValues.description) {
          const val = formValues && formValues[item];
          if (val && val !== '') {
            counter += 1;
          } else {
            if (val) {
              console.log(item);
            }
          }
        }
      }
    }

    return counter;
  }

  handleSubmit() {
    const { createNewFlatRequest, location } = this.props;

    const queryString = qs.parse(location.search);
    const isNew = location.pathname.split('/')[4] === 'new';

    if (this.countDescription() >= this.descriptionReadyCount) {
      createNewFlatRequest(
        {
          clientId: location.pathname.split('/')[2],
          requestObject: queryString.object.toUpperCase(),
          requestType: queryString.operation.toUpperCase(),
        },
        isNew
      );
    }
  }

  countPhotos() {
    const { formValues, object, operation } = this.props;
    if (object === 'flat' && operation === 'buy') {
      // not implemented
    } else {
      // if (this.formValues && this.formValues.photos && this.formValues.photos.tags) {
      //   for (const photoType of this.formValues.photos.tags) {
      //     const photos = formValues && formValues.photos ? formValues.photos : [];
      //     if (photos.some(el => el.photoType === photoType)) {
      //       counter += 1;
      //     }
      //   }
      // }
      // if (formValues && formValues.videos && formValues.videos.length !== 0) {
      //   counter += 1;
      // }
    }

    return formValues ? formValues.photos.length : 0;
  }

  countAdditional() {
    const { formValues } = this.props;

    let counter = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of this.formValues.additional) {
      if (
        formValues &&
        formValues[item] !== undefined &&
        formValues[item] !== ''
      ) {
        if (formValues[item] instanceof Array) {
          if (formValues[item].length > 0) {
            counter += 1;
          }
        } else {
          counter += 1;
        }
      }
    }

    return counter;
  }

  // eslint-disable-next-line class-methods-use-this
  renderTabContent(active, label) {
    return (
      <span>
        <i className={`check-icon ${active ? 'check-icon__active' : ''}`} />
        <span>{label}</span>
      </span>
    );
  }

  renderMobileTab(tab, active, label) {
    const { activeTab } = this.state;

    return (
      <div
        className={`new-request__mobileTab ${
          activeTab === tab ? 'new-request__mobileTab_active' : ''
        }`}
        onClick={() => this.setState({ activeTab: tab })}
      >
        {this.renderTabContent(active, label)}
      </div>
    );
  }

  renderPhotosAndAdditional = (photos, additional) => {
    const { operation } = this.props;

    return operation === 'buy' ? [additional] : [photos, additional];
  };

  renderTabs() {
    const { activeTab } = this.state;

    const navLinks = [
      {
        label: this.renderTabContent(
          this.countDescription() >= this.descriptionReadyCount,
          'Описание обьекта'
        ),
        value: 'description',
      },
      ...this.renderPhotosAndAdditional(
        {
          label: this.renderTabContent(
            this.countPhotos() >= this.photosReadyCount,
            'Фотографии'
          ),
          value: 'photos',
        },
        {
          label: this.renderTabContent(
            this.countAdditional() === this.additionalReadyCount,
            'Дополнительные параметры'
          ),
          value: 'additional',
        }
      ),
    ];

    return (
      <Tabs
        fullWidth={false}
        activeTab={activeTab}
        change={(event, value) => this.setState({ activeTab: value })}
        navLinks={navLinks}
      />
    );
  }

  render() {
    const { activeTab } = this.state;

    const { location, isDesktop, isTablet, operation, fields } = this.props;

    const locationArr = location.pathname.split('/');
    const clientId = locationArr[2];
    const isNew = locationArr[4] === 'new';
    const descriptionSum = this.countDescription();
    return (
      <div className="new-request">
        <div className="new-request__titleHolder">
          <h2 className="new-request__title">
            {isNew ? 'Новый Запрос' : 'Редактирование запроса'}
          </h2>
          <span className="new-request__close" onClick={this.closeModal}>
            <CloseIcon />
          </span>
        </div>
        <div className="new-request__selects">
          <Select
            className="new-request__selectItem"
            key={operations.name}
            name={operations.name}
            label={operations.label}
            items={operations.items}
          />
          <Select
            className="new-request__selectItem"
            key={objects.name}
            name={objects.name}
            label={objects.label}
            items={objects.items}
          />
          <div className="newRequestDesc__field newRequestDesc__field_city">
            <CityAutoSuggest />
          </div>
          {/* <div className="newRequestDesc__field newRequestDesc__field_area">
            <AreaAutoSuggest />
          </div> */}
        </div>
        {isTablet && (
          <div className="new-request__tabs">{this.renderTabs()}</div>
        )}
        {!isTablet &&
          this.renderMobileTab(
            0,
            this.countDescription() >= this.descriptionReadyCount,
            'Описание обьекта'
          )}
        {activeTab === 0 && (
          <Description
            fields={fields}
            onSegmentChange={this.handleChangeSegment}
            onMapAreasChange={this.handleChangeMapAreas}
          />
        )}
        {operation === 'sell' && (
          <Fragment>
            {!isTablet &&
              this.renderMobileTab(
                1,
                this.countPhotos() >= this.photosReadyCount,
                'Фотографии'
              )}
            {activeTab === 1 && <Photos clientId={clientId} />}
          </Fragment>
        )}
        {!isTablet &&
          this.renderMobileTab(
            2,
            this.countAdditional() === this.additionalReadyCount,
            'Дополнительные параметры'
          )}
        {(operation === 'sell' ? activeTab === 2 : activeTab === 1) && (
          <Additional />
        )}
        <div className="new-request__footer">
          <div className="nrFooterInfo">
            <span className="nrFooterInfo__title">Заполнено</span>
            <div className="nrFooterInfo__percentage">{this.summarize()}%</div>
          </div>
          <div className="new-request__infoPopup">
            <Tooltip text="Заполнение  влияет на релевантность и колличество показов" />
          </div>
          <Button
            size="big"
            className={`nrFooterInfo__saveButton ${
              descriptionSum < this.descriptionReadyCount
                ? 'nrFooterInfo__saveButton_disabled'
                : ''
            }`}
            disabled={descriptionSum < this.descriptionReadyCount}
            onClick={this.handleSubmit}
          >
            Сохранить запрос
          </Button>
          {(operation === 'buy' ? activeTab !== 1 : activeTab !== 2) &&
            isDesktop && (
              <Button
                buttonType="secondary"
                size="big"
                className="nrFooterInfo__nextButton"
                onClick={() => this.setState({ activeTab: activeTab + 1 })}
              >
                Далее
              </Button>
            )}
        </div>
      </div>
    );
  }
}

RequestNew.propTypes = {
  setNewRequestFormValues: PropTypes.func.isRequired,
  object: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  loadFlatAttributes: PropTypes.func.isRequired,
  restoreInitialData: PropTypes.func.isRequired,
  createNewFlatRequest: PropTypes.func.isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
};

const selector = formValueSelector('NewRequestForm');

const mapStateToProps = state => ({
  object: selector(state, 'object'),
  operation: selector(state, 'operation'),
  schemeId: selector(state, 'schemeId'),
  formValues: getFormValues('NewRequestForm')(state),
  fullObject: getFullObject(state),
  userCity: getUserCityName(state),
  userArea: getUserAreaName(state),
  selectedGlobalObject: selectedGlobalObject(state),
});

const mapDispatchToProps = dispatch => ({
  setNewRequestFormValues: data =>
    dispatch(setNewRequestFormValuesAction(data)),
  setNewRequestNames: data => dispatch(setNewRequestNamesAction(data)),
  restoreInitialData: () => dispatch(restoreInitialDataAction()),
  createNewFlatRequest: (data, isNew) =>
    dispatch(createNewFlatRequestAction(data, isNew)),
  loadFlatAttributes: () => dispatch(loadFlatAttributesAsyncAction()),
  loadEstateStatus: () => dispatch(loadEstateStatusAttributesAsyncAction()),
  loadPhotoType: () => dispatch(loadPhotoTypeAttributesAsyncAction()),
  loadCities: (city, areaId, cityId) =>
    dispatch(loadCitySuggestions(city, areaId, cityId)),
});

const initialValues = {
  operation: 'sell',
  object: 'flat',
  parametrs: [
    {
      plans: [],
    },
  ],
  photos: [],
  heatingIds: [],
  bathroomsIds: [],
  planIds: [],
  overlappingIds: [],
  isCorners: [],
  roofIds: [],
  isTechnicalFloors: [],
  isGases: [],
  ceilingHeightIds: [],
  parkingIds: [],
  viewIds: [],
  wallIds: [],
  recreationIds: [],
  builtYear: '',
  videos: [],
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm(
    {
      form: 'NewRequestForm',
      initialValues,
    },
    state => ({
      initialValues: {
        ...selectedGlobalObject(state),
      },
    })
  ),
  withSizes
)(RequestNew);
