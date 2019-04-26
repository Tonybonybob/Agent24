import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Route } from 'react-router-dom';

import Condominium from '../../../assets/Condominium';
import {
  getClientId,
  getObjectsExist,
  getObjects,
} from '../../../store/reducers/client';
import Table from '../../common/Table';
import ClientFlatSellInfo from './ClientFlatSellInfo';
import Triangle from '../../../assets/Triangle';
import CrownIcon from '../../../assets/Crown';
import CommentsIcon from '../../../assets/Comments';
import PlayIcon from '../../../assets/Play';
import PhotosIcon from '../../../assets/Photo';
import LinkToModal from '../../common/LinkToModal';
import {
  renderOperationContent,
  renderTypeContent,
  toCurrencyFormat,
  normalizeDate,
} from '../../../utils';
import { getFlatAttributes } from '../../../store/reducers/attributes';
import './style.scss';

/* eslint-disable class-methods-use-this */
class ClientTableObjects extends Component {
  constructor(props) {
    super(props);

    this.goToPureRequests = this.goToPureRequests.bind(this);
  }

  createTableHead() {
    return [
      { content: 'Операция' },
      { content: 'Объект' },
      { content: 'А', style: { textAlign: 'center' } },
      { content: 'Характеристики' },
      { content: 'Цена, $' },
      { content: 'Дата' },
      { content: 'Совл.' },
      { content: 'Инфо' },
    ];
  }

  createTableContent() {
    const { objects, history, match, location } = this.props;

    const locationArr = location.pathname.split('/');
    const selectedId = locationArr[locationArr.length - 1];
    const withNewRequest =
      locationArr.includes('new') || locationArr.includes('edit');
    let renderObjects = objects;
    if (withNewRequest) {
      renderObjects = [];
    } else if (locationArr.length === 5) {
      renderObjects = objects.slice(0, 3);
    }

    if (
      selectedId &&
      !['new', 'edit', 'requests'].includes(selectedId) &&
      !renderObjects.find(el => el && el.id === selectedId)
    ) {
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
                <span
                  className={`colorfulOperation colorfulOperation_${
                    object.operation === 'SELL' ? 'green' : ''
                  }${object.operation === 'BUY' ? 'blue' : ''}`}
                >
                  {renderOperationContent(object.operation)}
                </span>
              ),
            },
            { content: renderTypeContent(object.type) },
            {
              content: (
                <div className="autosearch">
                  {object.autoSearchCommunity > 0 && (
                    <span className="autosearch__item autosearch__item_community">
                      {object.autoSearchCommunity}
                    </span>
                  )}
                  {object.autoSearchGroup > 0 && (
                    <span className="autosearch__item autosearch__item_group">
                      {object.autoSearchGroup}
                    </span>
                  )}
                </div>
              ),
            },
            {
              content: this.renderAddress(object),
            },
            {
              content: (
                <div className="tablePrice">
                  {toCurrencyFormat(object.price)}
                </div>
              ),
            },
            {
              content: (
                <div className="tableDate">
                  {normalizeDate(object.createdDate)}
                </div>
              ),
            },
            { content: this.renderCoOwnership(object) },
            { content: this.renderMedia(object) },
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

  renderCoOwnership(object) {
    if (object.status === 'EXCLUSIV') {
      return <CrownIcon color={object.isMyAccount ? '#F2C94C' : '#D0D8DC'} />;
    }
    if (object.isInOwners) {
      return (
        <div onClick={e => e.stopPropagation()}>
          <LinkToModal queryParam="realtorCoownership">
            <Condominium fill="#0097a7" stroke="#0097a7" />
          </LinkToModal>
        </div>
      );
    }

    return (
      <div onClick={e => e.stopPropagation()}>
        <LinkToModal queryParam="realtorCoownership">
          <Condominium fill="#D0D8DC" stroke="#D0D8DC" />
        </LinkToModal>
      </div>
    );
  }

  renderAddress(object) {
    const { attributes } = this.props;
    const {
      room,
      floor,
      maxFloor,
      totalSquare,
      livingSquare,
      kitchenSquare,
      address,
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

    const microdistrict = address && address.microDistrictName;
    const adminArea = address && address.adminAreaName;

    return (
      <div className="tableAddressChar">
        <div className="tableAddressChar__line">
          {`${room}-к, `}
          {`${floor} / ${maxFloor}, ${scheme && scheme.name}, `}
          <wbr />
          {`${totalSquare} / ${livingSquare} / ${kitchenSquare}, `}
          {`${condition && condition.name}`}
        </div>
        <div className="tableAddressChar__line">
          {address && address.addressStr}
        </div>
        <div className="tableAddressChar__line">
          {`${microdistrict} мкр, ${adminArea} р-н`}
        </div>
      </div>
    );
  }

  renderMedia({
    hasVideos,
    hasPhotos,
    countCommunityComments,
    countGroupComments,
  }) {
    if (
      !hasPhotos &&
      !hasVideos &&
      !countCommunityComments &&
      !countGroupComments
    ) {
      return <div className="tableMedia">—</div>;
    }

    return (
      <div className="tableMedia">
        {countCommunityComments + countGroupComments > 0 && <CommentsIcon />}
        {hasVideos && <PlayIcon />}
        {hasPhotos && <PhotosIcon />}
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
    const {
      objectsExist,
      match,
      isSliderOpen,
      currentSlideIndex,
      objects,
      handleChangeSliderIndex,
      handleOpenSlider,
      handleCloseSlider,
      location,
    } = this.props;

    const locationArr = location.pathname.split('/');
    const withNewRequest =
      locationArr.includes('new') || locationArr.includes('edit');
    const id = locationArr[locationArr.length - 1];
    const foundObject = objects.find(el => el && el.id === id);
    return (
      <div className="clientTableWrapper">
        {objectsExist && !withNewRequest && (
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
              <ClientFlatSellInfo
                isSliderOpen={isSliderOpen}
                currentSlideIndex={currentSlideIndex}
                handleChangeSliderIndex={handleChangeSliderIndex}
                handleOpenSlider={handleOpenSlider}
                handleCloseSlider={handleCloseSlider}
                id={id}
              />
            ) : null
          }
        />
      </div>
    );
  }
}

ClientFlatSellInfo.propTypes = {
  objects: PropTypes.array,
  handleOpenSlider: PropTypes.func.isRequired,
  handleCloseSlider: PropTypes.func.isRequired,
  handleChangeSliderIndex: PropTypes.func.isRequired,
  currentSlideIndex: PropTypes.number.isRequired,
};

ClientFlatSellInfo.defaultProps = {
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
)(ClientTableObjects);
