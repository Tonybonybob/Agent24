import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Route } from 'react-router-dom';
import moment from 'moment';

import {
  getClientId,
  getObjectsExist,
  getObjects,
} from '../../../store/reducers/client';
import Table from '../../../components/common/Table';
import ExclusiveInfoCard from '../ExclusiveInfoCard';
import Triangle from '../../../assets/Triangle';
import {
  renderOperationContent,
  renderTypeContent,
  toCurrencyFormat,
} from '../../../utils';
import { getFlatAttributes } from '../../../store/reducers/attributes';

/* eslint-disable class-methods-use-this */
class ExclusiveTable extends Component {
  constructor(props) {
    super(props);

    this.goToPureRequests = this.goToPureRequests.bind(this);
  }

  createTableHead() {
    return [
      { content: 'Автопоиск' },
      {
        content: (
          <span>
            Операция/
            <wbr />
            Объект
          </span>
        ),
      },
      { content: 'Адресс' },
      { content: 'Характеристики' },
      {
        content: (
          <span>
            Цена/
            <wbr />
            Комиссия
          </span>
        ),
      },
      { content: 'Статус' },
      { content: 'Держатель договора' },
      { content: 'Дата окончания' },
    ];
  }

  createTableContent() {
    const { objects, history, match, location } = this.props;

    const locationArr = location.pathname.split('/');
    const selectedId = locationArr[locationArr.length - 1];
    let renderObjects = objects;
    if (locationArr.length === 3) {
      const selectedIndex = objects.indexOf(
        objects.find(el => el && el.id === selectedId)
      );
      if (selectedIndex === 0) {
        renderObjects = objects.slice(0, selectedIndex + 1);
      } else if (selectedIndex > 0 && selectedIndex < 3) {
        renderObjects = objects.slice(0, selectedIndex + 2);
      } else {
        renderObjects = objects.slice(0, 3);
      }
    }

    if (selectedId && !renderObjects.find(el => el && el.id === selectedId)) {
      renderObjects.splice(
        2,
        1,
        objects.find(el => el && el.id === selectedId)
      );
    }

    return renderObjects.map(
      object =>
        object && [
          [
            {
              content: (
                <div className="autosearch">
                  <span className="autosearch__item autosearch__item_community">
                    {object.autoSearchCommunity}
                  </span>
                  <span className="autosearch__item autosearch__item_group">
                    {object.autoSearchGroup}
                  </span>
                </div>
              ),
            },
            {
              content: (
                <div style={{ textAlign: 'center' }}>
                  <span
                    className={`colorfulOperation colorfulOperation_${
                      object.operation === 'SELL' ? 'green' : ''
                    }${object.operation === 'BUY' ? 'blue' : ''}`}
                    style={{ marginBottom: '4px' }}
                  >
                    {renderOperationContent(object.operation)}
                  </span>
                  <br />
                  {renderTypeContent(object.type)}
                </div>
              ),
            },
            { content: this.renderAddress(object) },
            { content: this.renderCharacteristics(object) },
            {
              content: (
                <div className="tablePrice">
                  <strong>{toCurrencyFormat(object.price)}</strong>
                  <br />
                  5.4%
                </div>
              ),
            },
            { content: 'Не модерирован' },
            { content: 'Константин К.' },
            {
              content: (
                <div className="tableDate">
                  {moment(object.createdDate, 'YYYY-MM-DD HH:mm').format(
                    'DD MMM YYYY'
                  )}
                </div>
              ),
            },
          ],
          {
            contentClick: false,
            handleClick: () => {
              if (`${match.url}/${object.id}` === location.pathname) {
                history.push({
                  pathname: match.path,
                  search: location.search,
                });
              } else {
                history.push({
                  pathname: match.path,
                  search: location.search,
                });
                history.push({
                  pathname: `${match.url}/${object.id}`,
                  search: location.search,
                });
              }
            },
            id: object.id,
          },
        ]
    );
  }

  goToPureRequests() {
    const { history, location, match } = this.props;

    history.push({
      pathname: match.url,
      search: location.search,
    });
  }

  renderCharacteristics(object) {
    const { attributes } = this.props;
    const {
      room,
      floor,
      maxFloor,
      totalSquare,
      livingSquare,
      kitchenSquare,
      schemeId,
      conditionId,
    } = object;

    const scheme =
      attributes &&
      attributes.scheme &&
      attributes.scheme.find(el => el.id === schemeId);
    const condition =
      attributes &&
      attributes.condition &&
      attributes.condition.find(el => el.id === conditionId);

    return (
      <div className="tableAddressChar" style={{ width: 'unset' }}>
        {`${room}-к, `}
        {`${floor} / ${maxFloor}, ${scheme && scheme.name}, `}
        <wbr />
        {`${totalSquare} / ${livingSquare} / ${kitchenSquare}, `}
        {`${condition && condition.name}`}
      </div>
    );
  }

  renderAddress(object) {
    const { address } = object;

    return (
      <div
        className="tableAddressChar"
        style={{
          width: '100px',
          maxWidth: '100px',
          wordBreak: 'break-all',
          whiteSpace: 'normal',
        }}
      >
        {address.addressStr}
        <br />
        {`${address.microDistrictName} мкр,`}
        <br />
        {`${address.adminAreaName} р-н`}
        {/* <div className="tableAddressChar__line">
          г.
          {address.city.name}
        </div> */}
      </div>
    );
  }

  renderTablePlaceholder() {
    const { objectsExist, location, objects } = this.props;

    const locationArr = location.pathname.split('/');
    const withNewRequest =
      locationArr.includes('new') || locationArr.includes('edit');
    const withPreview = !withNewRequest && locationArr.length === 5;
    return (
      objectsExist &&
      ((objects.length > 5 && withPreview) || withNewRequest) && (
        <div
          className={`clientTablePlaceholder ${
            withPreview ? 'clientTablePlaceholder_preview' : ''
          } `}
          onClick={this.goToPureRequests}
        >
          <span className="clientTablePlaceholder__title">
            {withNewRequest && 'Запросы '}
            {withPreview && 'Развернуть запросы '}(
            {withNewRequest ? objects.length : objects.length - 3})
          </span>
          <span className="clientTablePlaceholder__icon">
            <Triangle />
          </span>
        </div>
      )
    );
  }

  render() {
    const { objectsExist, match, objects, location } = this.props;

    const locationArr = location.pathname.split('/');
    const id = locationArr[locationArr.length - 1];
    const foundObject = objects.find(el => el && el.id === id);
    return (
      <div className="clientTableWrapper">
        {objectsExist && (
          <div className="clientTableObjects">
            <Table
              tableHead={this.createTableHead()}
              tableContent={this.createTableContent()}
              equalSpaces
              activeId={id}
            />
          </div>
        )}
        {this.renderTablePlaceholder()}
        <Route
          path={`${match.url}/:id`}
          render={({ match }) =>
            foundObject && match.params.id === foundObject.id ? (
              <ExclusiveInfoCard />
            ) : null
          }
        />
      </div>
    );
  }
}

ExclusiveTable.propTypes = {
  objects: PropTypes.array,
  handleOpenSlider: PropTypes.func.isRequired,
  handleCloseSlider: PropTypes.func.isRequired,
  handleChangeSliderIndex: PropTypes.func.isRequired,
  currentSlideIndex: PropTypes.number.isRequired,
};

ExclusiveTable.defaultProps = {
  objects: [],
};

const mapStateToProps = state => ({
  id: getClientId(state),
  objects: getObjects(state),
  objectsExist: getObjectsExist(state),
  attributes: getFlatAttributes(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ExclusiveTable);
