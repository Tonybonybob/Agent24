import React, { Component } from 'react';
import { withSize } from 'react-sizeme';
import { withRouter, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Table from '../../../components/common/Table';
import DatabaseSellInfo from './DatabaseSellInfo';
import {
  normalizeDate,
  getAttributeNameById,
  toCurrencyFormat,
} from '../../../utils';
import Comments from '../../../assets/Comments';
import Play from '../../../assets/Play';
import Photo from '../../../assets/Photo';
import { getObjects } from '../../../store/reducers/database';
import { getFlatAttributes } from '../../../store/reducers/attributes';
import './style.scss';
class DatabaseSellTable extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     clickObjects: [{
  //       contentClick: <div>sasa</div>,
  //       isChosen: false,
  //     }]
  //   };
  // }

  static defaultProps = {
    objects: [],
  };

  renderAddress = (address = {}) => {
    const isGeoIsset = address.microDistrictName && address.adminAreaName;
    return (
      <div className="address">
        <div className="address__address">
          <span>{address.streetName}</span>,{address.house}
        </div>
        {address.complexId && (
          <div className="address__district">
            <strong className="yellow">{`ЖК "${address.complexName}"`}</strong>
            <strong />,
          </div>
        )}
        {isGeoIsset && (
          <div className="address__district">
            <strong>{address.microDistrictName}</strong>, &nbsp;
            <span className="address__district_transparent">
              {address.adminAreaName}
            </span>
          </div>
        )}
      </div>
    );
  };

  createTableContent() {
    const {
      objects,
      isSliderOpen,
      currentSlideIndex,
      history,
      location,
      handleChangeSliderIndex,
      handleOpenSlider,
      handleCloseSlider,
      match,
      flatAttributes,
      images,
    } = this.props;

    return objects.map(object => {
      return [
        [
          {
            content: (
              <div className="">
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
            content: this.renderAddress(object.address),
          },
          ...this.createFlexibleContent(
            [
              {
                content: (
                  <div className="database__centerCell">
                    <strong>
                      {object.room}
                      -к
                    </strong>
                  </div>
                ),
              },
              {
                content: (
                  <span>
                    {getAttributeNameById(
                      object.schemeId,
                      flatAttributes.scheme
                    )}
                  </span>
                ),
              },
              {
                content: (
                  <div className="autosearch">
                    <strong>
                      {object.floor}
                      &nbsp;/&nbsp;
                      {object.maxFloor}
                    </strong>
                  </div>
                ),
              },
              {
                content: (
                  <span>
                    {object.totalSquare}&nbsp;/&nbsp;{object.livingSquare}
                    &nbsp;/&nbsp;{object.kitchenSquare}
                  </span>
                ),
              },
              {
                content: getAttributeNameById(
                  object.conditionId,
                  flatAttributes.condition
                ),
              },
            ],
            [
              {
                content: (
                  <div>
                    <div>
                      <strong>
                        {object.room}
                        -к, &nbsp;
                        {getAttributeNameById(
                          object.schemeId,
                          flatAttributes.scheme
                        )}
                        , &nbsp;
                        {object.floor}
                        &nbsp;/&nbsp;
                        {object.maxFloor}
                      </strong>
                    </div>
                    <div>
                      <span>
                        {object.totalSquare}
                        &nbsp;/&nbsp;
                        {object.livingSquare}
                        &nbsp;/&nbsp;
                        {object.kitchenSquare}
                      </span>
                      , &nbsp;
                      {getAttributeNameById(
                        object.conditionId,
                        flatAttributes.condition
                      )}
                    </div>
                  </div>
                ),
              },
            ]
          ),
          { content: <strong>{toCurrencyFormat(object.price)}</strong> },
          { content: object.sourceInfo },
          {
            content: (
              <div>
                {object.hasPhotos && (
                  <div className="databaseCell__center">
                    <Photo />
                  </div>
                )}
                {object.hasVideos && (
                  <div className="databaseCell__center">
                    <Play />
                  </div>
                )}
                {object.countCommunityComments + object.countGroupComments >
                  0 && (
                  <div className="databaseCell__center">
                    <Comments />
                  </div>
                )}
              </div>
            ),
          },
          { content: normalizeDate(object.createdDate) },
        ],
        {
          contentClick: (
            <Route
              path="/database/:id"
              render={({ match }) =>
                match.params.id === object.id && (
                  <DatabaseSellInfo
                    isSliderOpen={isSliderOpen}
                    contactId={object.contactId}
                    currentSlideIndex={currentSlideIndex}
                    handleChangeSliderIndex={handleChangeSliderIndex}
                    handleOpenSlider={handleOpenSlider}
                    handleCloseSlider={handleCloseSlider}
                    images={images}
                  />
                )
              }
            />
          ),
          objectChosen: `/database/${object.id}` === location.pathname,
          handleClick: () => {
            if (`/database/${object.id}` === location.pathname) {
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
                pathname: `/database/${object.id}`,
                search: location.search,
              });
            }
          },
        },
      ];
    });
  }

  createTableHead() {
    return [
      { content: 'Aвтопоиск' },
      { content: 'Aдрес' },
      ...this.createFlexibleContent(
        [
          {
            content: 'Комнат',
            class:
              'table__cell table__cell_header table__cell_database table__cell_center',
          },
          { content: 'Проект' },
          { content: 'Эт/Эт-н' },
          { content: 'Площадь' },
          { content: 'Состояние' },
        ],
        [{ content: 'Характеристики' }]
      ),
      { content: 'Цена, $' },
      { content: 'Источник' },
      { content: 'Инфо' },
      { content: 'Дата' },
    ];
  }

  createFlexibleContent(contentBig, contentSmall) {
    const { size } = this.props;

    return size.width >= 900 ? contentBig : contentSmall;
  }

  render() {
    const tableHead = this.createTableHead();

    const tableContent = this.createTableContent() || [];

    return (
      <Table
        tableHead={tableHead}
        database
        tableContent={tableContent}
        objectDatabase
      />
    );
  }
}

const mapStateToProps = state => ({
  objects: getObjects(state),
  flatAttributes: getFlatAttributes(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
  withSize()
)(DatabaseSellTable);
