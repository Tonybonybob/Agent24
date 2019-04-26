import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getFlatAttributes } from '../../../../store/reducers/attributes';
import {
  renderStatusContent,
  getAttributeNameById,
  toCurrencyFormat,
  withSizes,
} from '../../../../utils';
import PlaceMarker from '../../../../assets/PlaceMarker';
import KeyInfo from '../../../../assets/KeyInfo';
import IconClose from '../../../../assets/BigClose';
import './style.scss';
const names = ['проект', 'состояние', 'этаж', 'площадь', 'стены', 'статус'];

const FlatSellCharacteristics = ({ object, flatAttributes, isTablet }) => {
  const isObjectLoaded = Object.values(object).length;
  console.log(object);
  if (!isObjectLoaded) {
    return null;
  }
  const price = object.price ? `$ ${toCurrencyFormat(object.price)}` : '—';
  const adminAreaName = object.address.adminAreaName;
  const microdistrictName = object.address.microDistrictName;

  return (
    <Fragment>
      <div className="objectInfoTable__alerts">
        {!object.inSearch && (
          <div className="objectInfoTable__alertItem">
            <IconClose />
            <span>Не участвует в Автопоиске</span>
          </div>
        )}
        <div className="objectInfoTable__alertItem">
          <IconClose />
          <span>№ дома скрыт</span>
        </div>
      </div>
      {!isTablet && (
        <div className="objectCharacteristics__address">
          <div className="objectInfo__svg">
            <PlaceMarker />
          </div>
          <div>
            <span>
              {object.address && object.address.streetName}
              {object.address && object.address.house}
              {', '}
              {object.address && object.address.apartment && (
                <span>
                  {' '}
                  кв.
                  {object.address && object.address.apartment},{' '}
                </span>
              )}
            </span>
            <span>
              {object.address && object.address.microdistrictName}
              {', '}
            </span>
            <span>
              {object.address && object.address.adminAreaName}
              {', '}
            </span>
            <span>
              {object.address && object.address.cityName}
              {', '}
            </span>
          </div>
        </div>
      )}
      <div className="objectInfoTable__holder">
        <div className="objectInfoTable objectCharacteristics__table">
          <div className="objectInfoTable__headers">
            <div className="objectInfoTable__firstHeader objectInfoTable__item">
              <span className="objectInfoTable__roomMarker">
                <KeyInfo />
              </span>
              комнат
            </div>
            {names.map(el => (
              <div className="objectInfoTable__item">{el}</div>
            ))}
          </div>
          <div className="objectInfoTable__content">
            <div className="objectInfoTable__item">
              {object.room ? `${object.room}-х` : '—'}
            </div>
            <div className="objectInfoTable__item">
              {getAttributeNameById(object.schemeId, flatAttributes.scheme) ||
                '-'}
            </div>
            <div className="objectInfoTable__item">
              {getAttributeNameById(
                object.conditionId,
                flatAttributes.condition
              ) || '-'}
            </div>
            <div className="objectInfoTable__item">
              {object.floor}
              &nbsp;/&nbsp;
              {object.maxFloor}
            </div>
            <div className="objectInfoTable__item">
              {object.totalSquare}
              &nbsp;/&nbsp;
              {object.livingSquare}
              &nbsp;/&nbsp;
              {object.kitchenSquare}
            </div>
            <div className="objectInfoTable__item">
              {getAttributeNameById(object.wallFlatId, flatAttributes.wall) ||
                '-'}
            </div>
            <div className="objectInfoTable__item">
              {renderStatusContent(object.status) || '—'}
            </div>
          </div>
        </div>
        {isTablet && (
          <div className="objectCharacteristics__address">
            <div className="objectInfo__svg">
              <PlaceMarker />
            </div>
            <div>
              <span>
                {object.address && object.address.streetName}
                {object.address && object.address.house}
                {', '}
                <span>
                  {' '}
                  кв.
                  {object.address && object.address.apartment},{' '}
                </span>
              </span>
              <span>
                {object.address && object.address.microdistrictName}
                {', '}
              </span>
              <span>
                {object.address && object.address.adminAreaName}
                {', '}
              </span>
              <span>
                {object.address && object.address.cityName}
                {', '}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="objectInfoTablePrice">
        <div className="objectInfoTablePrice__item">цена</div>
        <div className="objectInfoTablePrice__item objectInfoTablePrice__item_big">
          {price}
          {object.prevPrice &&
            object.prevPrice.length > 0 &&
            object.prevPrice.map(el => (
              <span className="objectInfoTablePrice__oldPrice">{el}</span>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

FlatSellCharacteristics.propTypes = {
  object: PropTypes.shape({
    room: PropTypes.string.isRequired,
    schemeId: PropTypes.string.isRequired,
    conditionId: PropTypes.string.isRequired,
    floor: PropTypes.string.isRequired,
    maxFloor: PropTypes.string.isRequired,
    totalSquare: PropTypes.string.isRequired,
    kitchenSquare: PropTypes.string.isRequired,
    livingSquare: PropTypes.string.isRequired,
    wallFlatId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    address: PropTypes.shape({
      apartment: PropTypes.number,
      house: PropTypes.string,
      street: PropTypes.shape({
        name: PropTypes.string,
      }),
      microdistrict: PropTypes.shape({
        name: PropTypes.string,
      }),
      adminArea: PropTypes.shape({
        name: PropTypes.string,
      }),
      city: PropTypes.shape({
        name: PropTypes.string,
      }),
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  flatAttributes: getFlatAttributes(state),
});

export default compose(
  connect(mapStateToProps),
  withSizes
)(FlatSellCharacteristics);
