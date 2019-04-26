import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';
import { reduxForm, formValueSelector } from 'redux-form';

import Filters from './Filters';
import { Button } from '../../components/general/Button';
import SearchBar from '../../components/common/SearchBar';
import DatabaseSellTable from './DatabaseSellTable';
import DatabaseSellCard from './DatabaseSellCard';
import GeneralFilters from './GeneralFilters';
import { withSizes } from '../../utils';
import authGuard from '../../guards/AuthGuard';
import GeneralLayout from '../../layouts/GeneralLayout/index';
import TextField from '../../components/common/TextField';
import ArrowDown from '../../assets/ArrowDown';
import Check from '../../assets/Check';
import DuplicateIcon from '../../assets/Duplicate';
import { descriptionFiltersInitial } from './Filters';

import {
  filterDataAsyncAction,
  filtersSaveAsyncAction,
  clearDescriptionFiltersFormAction,
  setFilterNameChangedAction,
  setGeneralFiltersFormValuesAction,
  setFilterOpenedAction,
} from '../../store/actions/filters';
import {
  getCurrentFilter,
  getFilterIsChanged,
  getFiltersNumber,
  getFilterNameIsChanged,
  getCurrentFilterNotChanged,
} from '../../store/reducers/filters';
import './style.scss';
class DatabasePage extends Component {
  constructor(props) {
    super(props);

    this.handleFiltersToggle = this.handleFiltersToggle.bind(this);
    this.handleFiltersClose = this.handleFiltersClose.bind(this);
    this.handleChangeSliderIndex = this.handleChangeSliderIndex.bind(this);
    this.handleOpenSlider = this.handleOpenSlider.bind(this);
    this.handleCloseSlider = this.handleCloseSlider.bind(this);

    this.handleClearFilters = this.handleClearFilters.bind(this);
    this.handleSaveFilters = this.handleSaveFilters.bind(this);

    this.handleSetFilterNameChanged = this.handleSetFilterNameChanged.bind(
      this
    );

    this.state = {
      showFilters: false,
      isWrapNormal: false,
      isSliderOpen: false,
      currentSlideIndex: 0,
    };
  }

  componentDidMount() {
    const {
      requestType: oldRequestType,
      requestObject: oldRequestObject,
      history,
      location,
      setGeneralFiltersValues,
    } = this.props;

    const newParams = {};

    const { object, operation, ...otherParams } =
      qs.parse(location.search) || {};
    const requestObject =
      object !== 'flat' && ['flat', 'house', 'land'].includes(object)
        ? (newParams.requestObject = object)
        : 'flat';
    const requestType =
      operation !== 'sell' && ['buy', 'sell'].includes(operation)
        ? (newParams.requestType = operation)
        : 'sell';
    if (Object.keys(newParams).length > 0) {
      setGeneralFiltersValues({
        ...newParams,
        requestObject: newParams.requestObject || 'flat',
        requestType: newParams.requestType || 'sell',
      });
    }

    history.push({
      pathname: location.pathname,
      search: qs.stringify({
        ...otherParams,
        object: requestObject,
        operation: requestType,
      }),
    });
  }

  componentDidUpdate(prevProps) {
    const { requestType, requestObject, history, location } = this.props;

    if (
      prevProps.requestType !== requestType ||
      prevProps.requestObject !== requestObject
    ) {
      history.push({
        pathname: location.pathname,
        search: qs.stringify({
          object: requestObject,
          operation: requestType,
        }),
      });
    }
  }

  handleFiltersToggle() {
    const { setFilterOpened } = this.props;

    this.setState(prevState => {
      if (prevState.showFilters) {
        setFilterOpened(false);
        return {
          showFilters: false,
          isWrapNormal: false,
        };
      }
      setFilterOpened(true);
      setTimeout(() => this.setState({ isWrapNormal: true }), 150);
      return {
        showFilters: true,
      };
    });
  }

  handleFiltersClose() {
    this.setState({
      showFilters: false,
      isWrapNormal: false,
    });
  }

  handleChangeSliderIndex(currentSlideIndex) {
    this.setState({
      currentSlideIndex,
    });
  }

  handleOpenSlider(currentSlideIndex) {
    this.setState({
      isSliderOpen: true,
      currentSlideIndex,
    });
  }

  handleCloseSlider() {
    this.setState({
      isSliderOpen: false,
    });
  }

  handleClearFilters() {
    const { clearFilters, filterData } = this.props;

    clearFilters();
    filterData('clear');
  }

  handleSaveFilters(event, type) {
    const { saveFilters, filterNameIsChanged } = this.props;
    if (type === 'duplicate' && !filterNameIsChanged) {
      this.setState({
        errorMessage: 'Измените название фильтра',
      });
    } else if (type === 'change') {
      saveFilters(type);
    } else {
      saveFilters();
    }
  }

  handleSetFilterNameChanged() {
    const { setFilterNameChanged } = this.props;

    this.setState({
      errorMessage: '',
    });

    setFilterNameChanged(true);
  }

  render() {
    const {
      showFilters,
      isSliderOpen,
      currentSlideIndex,
      isWrapNormal,
    } = this.state;

    const {
      isMobile,
      isTablet,
      array,
      currentFilter,
      filterName,
      isChanged,
      currentFilterNotChanged,
    } = this.props;

    const filterControls = !isChanged && (
      <div className="filters__controls">
        <TextField
          name="filterName"
          onChange={this.handleSetFilterNameChanged}
          label={currentFilter ? 'Название фильтра' : 'Новый фильтр'}
          required={false}
        />
        <div className="filtersControls">
          {currentFilter && currentFilter.filterName !== filterName && (
            <span onClick={event => this.handleSaveFilters(event, 'duplicate')}>
              <DuplicateIcon height="29px" />
            </span>
          )}
          {(currentFilter
            ? !currentFilter.base &&
              currentFilter.filterName === filterName &&
              !currentFilterNotChanged
            : filterName) && (
            <Button
              buttonType="primary add"
              size="small"
              onClick={
                currentFilter
                  ? () => this.handleSaveFilters({}, 'change')
                  : this.handleSaveFilters
              }
            >
              Сохранить
            </Button>
          )}
          <Button
            buttonType="primary add"
            size="small"
            className="filters__clearButton"
            onClick={this.handleClearFilters}
          >
            Очистить
          </Button>
        </div>
      </div>
    );

    return (
      <GeneralLayout>
        <div className="databaseButtons">
          <div className="databaseButtons__openFiltersContainer">
            <div className="databaseButtons__filters">
              <button
                type="button"
                className={`databaseButtons__description
                  databaseButtons__item
                  databaseButtons__openFilters
                  ${showFilters ? 'databaseButtons__openFilters_active' : ''}`}
                onClick={this.handleFiltersToggle}
              >
                <span>
                  {currentFilter ? currentFilter.filterName : 'Фильтр'}
                  {/*<span className="databaseButtons__number">
                    {filtersNumber}
                  </span>*/}
                </span>
                <span className="databaseButtons__filtersArrow">
                  <ArrowDown />
                </span>
              </button>
              {!isTablet && !isChanged && (
                <Button
                  buttonType="primary add"
                  size="small"
                  className="filters__clearButton"
                  onClick={this.handleClearFilters}
                >
                  Очистить
                </Button>
              )}
            </div>
            {showFilters && !isTablet && !isChanged && (
              <div className="filters__controls">
                {currentFilter &&
                  !currentFilter.base &&
                  (currentFilter.filterName === filterName &&
                    !currentFilterNotChanged) && (
                    <Button
                      buttonType="primary add"
                      size="small"
                      onClick={() => this.handleSaveFilters({}, 'change')}
                    >
                      Сохранить текущий
                    </Button>
                  )}
                <SearchBar
                  name="filterName"
                  placeholder="Новый фильтр"
                  required={false}
                />
                {(currentFilter
                  ? currentFilter.filterName !== filterName
                  : filterName) && <Check onClick={this.handleSaveFilters} />}
              </div>
            )}
          </div>
          <GeneralFilters className="databaseButtons__general" />
        </div>
        <div className="database">
          <div
            className={`database__filters
              ${showFilters ? 'database__filters_active' : ''}
              ${isWrapNormal ? 'database__filters_whiteSpaceNormal' : ''}
            `}
          >
            <Filters
              array={array}
              filterControls={() => isTablet && filterControls}
            />
          </div>
          <div
            className={`
              database__content
              ${showFilters ? 'database__content_active' : ''}
              ${isWrapNormal ? 'database__content_whiteSpaceNormal' : ''}
            `}
          >
            {isMobile ? (
              <DatabaseSellTable
                isSliderOpen={isSliderOpen}
                currentSlideIndex={currentSlideIndex}
                handleChangeSliderIndex={this.handleChangeSliderIndex}
                handleOpenSlider={this.handleOpenSlider}
                handleCloseSlider={this.handleCloseSlider}
              />
            ) : (
              <DatabaseSellCard
                isSliderOpen={isSliderOpen}
                currentSlideIndex={currentSlideIndex}
                handleChangeSliderIndex={this.handleChangeSliderIndex}
                handleOpenSlider={this.handleOpenSlider}
                handleCloseSlider={this.handleCloseSlider}
              />
            )}
          </div>
        </div>
      </GeneralLayout>
    );
  }
}

const selector = formValueSelector('DescriptionFiltersForm');
const generalSelector = formValueSelector('GeneralFiltersForm');

const mapStateToProps = state => ({
  currentFilter: getCurrentFilter(state),
  isChanged: getFilterIsChanged(state),
  currentFilterNotChanged: getCurrentFilterNotChanged(state),
  filtersNumber: getFiltersNumber(state),
  filterNameIsChanged: getFilterNameIsChanged(state),
  filterName: selector(state, 'filterName'),
  rooms: selector(state, 'rooms'),
  kitchens: selector(state, 'kitchens'),
  livings: selector(state, 'livings'),
  totals: selector(state, 'totals'),
  floors: selector(state, 'floors'),
  maxFloors: selector(state, 'maxFloors'),
  schemes: selector(state, 'schemes'),
  conditions: selector(state, 'conditions'),
  prices: selector(state, 'prices'),
  streetHouses: selector(state, 'streetHouses'),
  microdistricts: selector(state, 'microdistricts'),
  adminAreas: selector(state, 'adminAreas'),
  hasPhotos: selector(state, 'hasPhotos'),
  hasVideos: selector(state, 'hasVideos'),
  createDateFrom: selector(state, 'createDateFrom'),
  createDateTo: selector(state, 'createDateTo'),
  requestType: generalSelector(state, 'requestType'),
  requestObject: generalSelector(state, 'requestObject'),
});

const mapDispatchToProps = dispatch => ({
  filterData: data => dispatch(filterDataAsyncAction(data)),
  saveFilters: data => dispatch(filtersSaveAsyncAction(data)),
  clearFilters: () => dispatch(clearDescriptionFiltersFormAction()),
  setFilterNameChanged: data => dispatch(setFilterNameChangedAction(data)),
  setGeneralFiltersValues: data =>
    dispatch(setGeneralFiltersFormValuesAction(data)),
  setFilterOpened: data => dispatch(setFilterOpenedAction(data)),
});

export default compose(
  authGuard({ redirectTo: '/signin' }),
  withSizes,
  reduxForm({
    form: 'DescriptionFiltersForm',
    initialValues: descriptionFiltersInitial,
    destroyOnUnmount: false,
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DatabasePage);
