import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  filterDataAsyncAction,
  getAddressAsyncAction,
  filtersSaveAsyncAction,
  clearDescriptionFiltersFormAction,
  removeFilterAsyncAction,
  chooseFilterAsyncAction,
  getFiltersAsyncAction,
  setDescriptionFiltersFormAction,
  addDescriptionFiltersFormAction,
  setStatusAsyncAction,
} from '../../../store/actions/filters';
import Photos from './FilterItems/Photos';
import Address from './FilterItems/Address';
import FromToItem from './FilterItems/FromToItem';
import Source from './FilterItems/Source';
import Square from './FilterItems/Square';
import MyFilters from './FilterItems/MyFilters';
import MultiselectItem from './FilterItems/MultiselectItem';
import { getFlatAttributes } from '../../../store/reducers/attributes';
import { getFilters, getCurrentFilter, getEstateStatus } from '../../../store/reducers/filters';
import { getAttributeNameById } from '../../../utils';
import ShrinkInfo from '../../../assets/ShrinkInfo';
import ExtendInfo from '../../../assets/ExtendInfo';
import PureTextField from '../../../components/common/PureTextField';
import Calendar from '../../../components/common/Calendar';
import './style.scss';
moment.locale('ru');

export const descriptionFiltersInitial = {
  rooms: [{}],
  kitchens: [{}],
  livings: [{}],
  totals: [{}],
  prices: [{}],
  floors: [{}],
  maxFloors: [{}],
  statuses: [],
  adminAreas: [],
  microdistricts: [],
  streetHouses: [],
  schemes: [],
  conditions: [],
  hasPhotos: false,
  hasVideos: false,
  createDateFrom: '',
  createDateTo: '',
  filterName: '',
};


class Filters extends Component {
  static propTypes = {
    className: PropTypes.string,
    // eslint-disable-next-line
    array: PropTypes.object.isRequired,
    filterData: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);

    this.handleShowToggle = this.handleShowToggle.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
    this.handleRemoveField = this.handleRemoveField.bind(this);
    this.handleChooseFilter = this.handleChooseFilter.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);

    this.handleChangeCalendarFrom = this.handleChangeCalendarFrom.bind(this);
    this.handleChangeCalendarTo = this.handleChangeCalendarTo.bind(this);
    this.handlePushCondition = this.handlePushCondition.bind(this);
    this.handlePushScheme = this.handlePushScheme.bind(this);
    this.handlePushStatus = this.handlePushStatus.bind(this);

    this.state = {
      showMyFilters: false,
      showPhotos: false,
      showAddress: false,
      showRooms: false,
      showProject: false,
      showFloor: false,
      showMaxFloor: false,
      showArea: false,
      showState: false,
      showPrice: false,
      showSource: false,
      showStatus: false,
      showDate: false,
    }
  }

  componentDidMount() {
    const { filterData, getFilters, estateStatus, getAllStatus } = this.props;

    filterData('filter');
    if (!estateStatus) {
      getAllStatus();
    }
    getFilters();
  }

  handleShowToggle(event) {
    const whatToShow = `show${event.currentTarget.getAttribute('data-component')}`;

    this.setState(prevState => ({
      showMyFilters: false,
      showPhotos: false,
      showAddress: false,
      showRooms: false,
      showProject: false,
      showFloor: false,
      showMaxFloor: false,
      showArea: false,
      showState: false,
      showPrice: false,
      showSource: false,
      showDate: false,
      showStatus: false,
      [whatToShow]: !prevState[whatToShow],
    }));
  }

  handleAddField(event, field, isActive, whatToPush) {
    const { array, filterData } = this.props;

    console.log(isActive);

    event.preventDefault();

    if (isActive) {
      array.push(field, whatToPush);
      filterData();
    }
  }

  handleRemoveField(event, field, index) {
    const { array, filterData } = this.props;

    event.preventDefault();

    array.remove(field, index);
    filterData();
  }

  handleChooseFilter(event) {
    const { chooseFilter } = this.props;

    const id = event.currentTarget.getAttribute('data-filterid');

    chooseFilter(id);
  }

  handleRemoveFilter(event) {
    const { removeFilter } = this.props;

    event.stopPropagation();

    const id = event.currentTarget.getAttribute('data-filterid');

    removeFilter(id);
  }

  handleChangeCalendarFrom(newValue) {
    const { filterData, addFiltersForm } = this.props;

    console.log('changeCalendarFrom');

    addFiltersForm({
      createDateFrom: moment(newValue).format('YYYY-MM-DD'),
    });

    filterData();
  }

  handleChangeCalendarTo(newValue) {
    const { filterData, addFiltersForm } = this.props;

    addFiltersForm({
      createDateTo: moment(newValue).format('YYYY-MM-DD'),
    });

    filterData();
  }

  handlePushCondition(event) {
    const { addFiltersForm, filterData, conditions } = this.props;

    addFiltersForm({
      conditions: [...conditions, ...event.target.value],
    });

    filterData();
  }

  handlePushStatus(event) {
    const { addFiltersForm, filterData, statuses } = this.props;

    addFiltersForm({
      statuses: [...(statuses || []), ...event.target.value],
    });

    filterData();
  }

  handlePushScheme(event) {
    const { addFiltersForm, filterData, schemes } = this.props;
    
    console.log(event.target.value);

    addFiltersForm({
      schemes: [...schemes, ...event.target.value],
    });
    filterData();
  }

  render() {
    const {
      showMyFilters,
      showPhotos,
      showAddress,
      showRooms,
      showProject,
      showFloor,
      showMaxFloor,
      showArea,
      showState,
      showPrice,
      showSource,
      showDate,
      showStatus,
    } = this.state;

    const { rooms, kitchens, totals, livings, prices, floors, maxFloors,
      streetHouses, microdistricts, adminAreas, className, filterData, array,
      hasPhotos, hasVideos, filterControls, filters, currentFilter, flatAttributes,
      schemes, conditions, createDateFrom, createDateTo, sourceMyAgency, sourceMine,
      sourceCommunity, sourceParser, estateStatus, statuses,
    } = this.props;

    return (
      <form className={`filters ${className}`}>
        {filterControls()}
        <div className="filters__myFilters">
          <MyFilters
            itemName="MyFilters"
            showItem={showMyFilters}
            toggleShow={this.handleShowToggle}
            filters={filters}
            currentFilter={currentFilter}
            chooseFilter={this.handleChooseFilter}
            removeFilter={this.handleRemoveFilter}
          />
        </div>
        <div className="filters__content">
          <Photos
            itemName="Photos"
            showItem={showPhotos}
            toggleShow={this.handleShowToggle}
            filterData={filterData}
            hasPhotos={hasPhotos}
            hasVideos={hasVideos}
          />
          <Address
            itemName="Address"
            showItem={showAddress}
            toggleShow={this.handleShowToggle}
            filterData={filterData}
            adminAreas={adminAreas}
            microdistricts={microdistricts}
            streetHouses={streetHouses}
            onRemove={this.handleRemoveField}
            onAdd={this.handleAddField}
            array={array}
          />
          <FromToItem
            itemName="Rooms"
            showItem={showRooms}
            label="Комнат"
            toggleShow={this.handleShowToggle}
            onRemove={this.handleRemoveField}
            onAdd={this.handleAddField}
            values={rooms}
            name="rooms"
            ending="-к"
          />
          <MultiselectItem
            itemName="Project"
            showItem={showProject}
            toggleShow={this.handleShowToggle}
            attribute={flatAttributes.scheme}
            onRemove={this.handleRemoveField}
            onAdd={this.handlePushScheme}
            items={schemes}
            name="schemes"
            getAttributeNameById={getAttributeNameById}
            label="Проект дома"
            mainLabel="Планировка"
          />
          <FromToItem
            itemName="Floor"
            showItem={showFloor}
            label="Этаж"
            toggleShow={this.handleShowToggle}
            onRemove={this.handleRemoveField}
            onAdd={this.handleAddField}
            values={floors}
            name="floors"
            ending="-эт."
          />
          <FromToItem
            itemName="MaxFloor"
            showItem={showMaxFloor}
            label="Этажность"
            toggleShow={this.handleShowToggle}
            onRemove={this.handleRemoveField}
            onAdd={this.handleAddField}
            values={maxFloors}
            name="maxFloors"
            ending="-эт."
          />
          <Square
            itemName="Area"
            showItem={showArea}
            toggleShow={this.handleShowToggle}
            onRemove={this.handleRemoveField}
            onAdd={this.handleAddField}
            totals={totals}
            kicthens={kitchens}
            livings={livings}
          />
          <MultiselectItem
            itemName="State"
            showItem={showState}
            toggleShow={this.handleShowToggle}
            attribute={flatAttributes.condition}
            onRemove={this.handleRemoveField}
            onAdd={this.handlePushCondition}
            items={conditions}
            name="conditions"
            getAttributeNameById={getAttributeNameById}
            label="Cостояние объекта"
            mainLabel="Состояние"
          />
          <MultiselectItem
            itemName="Status"
            showItem={showStatus}
            toggleShow={this.handleShowToggle}
            attribute={estateStatus || []}
            onRemove={this.handleRemoveField}
            onAdd={this.handlePushStatus}
            items={statuses || []}
            name="statuses"
            getAttributeNameById={getAttributeNameById}
            label="Cтатус объекта"
            mainLabel="Статус"
          />
          <FromToItem
            itemName="Price"
            showItem={showPrice}
            label="Цена"
            toggleShow={this.handleShowToggle}
            onRemove={this.handleRemoveField}
            onAdd={this.handleAddField}
            values={prices}
            name="prices"
          />
          <Source
            itemName="Source"
            showItem={showSource}
            toggleShow={this.handleShowToggle}
            filterData={filterData}
            items={[
              { name: 'sourceMine', label: 'Мои', isActive: sourceMine },
              { name: 'sourceMyAgency', label: 'Моё АН', isActive: sourceMyAgency },
              { name: 'sourceCommunity', label: 'Сообщество', isActive: sourceCommunity },
              { name: 'sourceParser', label: 'Парсер', isActive: sourceParser },
            ]}
          />
          <div
            className={`filters__item filters__item_data ${showDate ? '' : 'filters__item_pointer'}`}
            data-component="Date"
            onClick={showDate ? () => { } : this.handleShowToggle}
          >
            <div
              className="filters__blockWithSvg"
              data-component="Date"
              onClick={showDate ? this.handleShowToggle : () => { }}
            >
              <strong>Дата</strong>
              {showDate
                ? <ShrinkInfo />
                : <ExtendInfo />
              }
            </div>
            {showDate ? (
              <div>
                <div>
                  <Calendar
                    customInput={(
                      <PureTextField
                        value={moment(createDateFrom, 'YYYY-MM-DD').format('DD MMM YYYY')}
                        label="от"
                        InputLabelProps={null}
                      />
                    )}
                    selected={createDateFrom ? moment(createDateFrom, 'YYYY-MM-DD') : null}
                    dateFormat="ll"
                    onChange={this.handleChangeCalendarFrom}
                  />
                </div>
                <div>
                  <Calendar
                    customInput={(
                      <PureTextField
                        value={moment(createDateTo, 'YYYY-MM-DD').format('DD MMM YYYY')}
                        label="до"
                        InputLabelProps={null}
                      />
                    )}
                    selected={createDateTo ? moment(createDateTo, 'YYYY-MM-DD') : null}
                    dateFormat="ll"
                    onChange={this.handleChangeCalendarTo}
                  />
                </div>
              </div>
            ) : (
              <div>
                {createDateFrom && (
                  <div className="filters__previewHead filters__previewHead_date">
                    c {moment(createDateFrom, 'YYYY-MM-DD').format('DD MMM YYYY')}
                  </div>
                )}
                {createDateTo && (
                  <div className="filters__previewHead filters__previewHead_date">
                    по {moment(createDateTo, 'YYYY-MM-DD').format('DD MMM YYYY')}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('DescriptionFiltersForm');

const mapStateToProps = state => ({
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
  sourceMine: selector(state, 'sourceMine'),
  sourceMyAgency: selector(state, 'sourceMyAgency'),
  sourceCommunity: selector(state, 'sourceCommunity'),
  sourceParser: selector(state, 'sourceParser'),
  adminAreas: selector(state, 'adminAreas'),
  hasPhotos: selector(state, 'hasPhotos'),
  hasVideos: selector(state, 'hasVideos'),
  createDateTo: selector(state, 'createDateTo'),
  createDateFrom: selector(state, 'createDateFrom'),
  statuses: selector(state, 'statuses'),
  filters: getFilters(state),
  currentFilter: getCurrentFilter(state),
  flatAttributes: getFlatAttributes(state),
  estateStatus: getEstateStatus(state),
});

const mapDispatchToProps = dispatch => ({
  filterData: data => dispatch(filterDataAsyncAction(data)),
  getAddress: data => dispatch(getAddressAsyncAction(data)),
  removeFilter: data => dispatch(removeFilterAsyncAction(data)),
  chooseFilter: data => dispatch(chooseFilterAsyncAction(data)),
  getFilters: () => dispatch(getFiltersAsyncAction()),
  getAllStatus: () => dispatch(setStatusAsyncAction()),
  setFiltersForm: data => dispatch(setDescriptionFiltersFormAction(data)),
  addFiltersForm: data => dispatch(addDescriptionFiltersFormAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
