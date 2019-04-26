import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFlatAttributes } from '../../../../store/reducers/attributes';
import { getAttributeNameById } from '../../../../utils';
import './style.scss';
const Additional = ({ additional, flatAttributes }) => (
  <div className="objectInfoTable__holder">
    <div className="objectInfoTable objectAdditional">
      <div className="objectInfoTable__headers">
        <div className="objectInfoTable__item">
          отопление
        </div>
        <div className="objectInfoTable__item">
          санузел
        </div>
        <div className="objectInfoTable__item">
          планир.
        </div>
        <div className="objectInfoTable__item">
          вид
        </div>
        <div className="objectInfoTable__item">
          комплект.
        </div>
        <div className="objectInfoTable__item">
          перкр.
        </div>
        <div className="objectInfoTable__item">
          угловая
        </div>
        <div className="objectInfoTable__item">
          техэтаж
        </div>
      </div>
      <div className="objectInfoTable__content">
        <div className="objectInfoTable__item">
          {getAttributeNameById(additional.heatingId, flatAttributes.heating) || '—'}
        </div>
        <div className="objectInfoTable__item">
          {getAttributeNameById(additional.bathroomsId, flatAttributes.bathrooms) || '—'}
        </div>
        <div className="objectInfoTable__item">
          {getAttributeNameById(additional.planId, flatAttributes.plan) || '—'}
        </div>
        <div className="objectInfoTable__item">
          {additional.viewIds.length > 0
            ? additional.viewIds.map((viewId, index) => (
              <span>
                {index !== 0 && (',')}
                {getAttributeNameById(viewId, flatAttributes.view)}
              </span>
            )) : '—'
          }
        </div>
        <div className="objectInfoTable__item">
          {additional.equipmentIds.length > 0
            ? additional.equipmentIds.map((equipmentId, index) => (
              <span>
                {index !== 0 && ', '}
                {getAttributeNameById(equipmentId, flatAttributes.equipment)}
              </span>
            )) : '—'
          }
        </div>
        <div className="objectInfoTable__item">
          {getAttributeNameById(additional.overlappingId, flatAttributes.overlapping) || '—'}
        </div>
        <div className="objectInfoTable__item">
          {additional.isCorner ? 'Есть' : 'Нет'}
        </div>
        <div className="objectInfoTable__item">
          {additional.isTechnicalFloor ? 'Есть' : 'Нет'}
        </div>
      </div>
    </div>
    <div className="objectAdditional__table objectInfoTable">
      <div className="objectInfoTable__headers">
        <div className="objectInfoTable__item">
          крыша
        </div>
        <div className="objectInfoTable__item">
          газ
        </div>
        <div className="objectInfoTable__item">
          потолок
        </div>
        <div className="objectInfoTable__item">
          паркинг
        </div>
        <div className="objectInfoTable__item">
          рекр.
        </div>
      </div>
      <div className="objectInfoTable__content">
        <div className="objectInfoTable__item">
          {getAttributeNameById(additional.roofId, flatAttributes.roof) || '—'}
        </div>
        <div className="objectInfoTable__item">
          {additional.isGas ? 'Есть' : 'Нет'}
        </div>
        <div className="objectInfoTable__item">
          {getAttributeNameById(additional.ceilingHeightId, flatAttributes.ceilingHeight) || '—'}
        </div>
        <div className="objectInfoTable__item">
          {additional.parkingIds.length > 0
            ? additional.parkingIds.map((parkingId, index) => (
              <span>
                {index !== 0 && ', '}
                {getAttributeNameById(parkingId, flatAttributes.parking)}
              </span>
            )) : '—'
          }
        </div>
        <div className="objectInfoTable__item">
          {additional.recreationIds.length > 0
            ? additional.recreationIds.map((recreationId, index) => (
              <span>
                {index !== 0 && ', '}
                {getAttributeNameById(recreationId, flatAttributes.recreation)}
              </span>
            )) : '—'
          }
        </div>
      </div>
    </div>
  </div>
);

Additional.propTypes = {
  additional: PropTypes.shape({
    heatingId: PropTypes.number,
    bathroomsId: PropTypes.number,
    planId: PropTypes.number,
    viewIds: PropTypes.arrayOf(PropTypes.number),
    equipmentIds: PropTypes.arrayOf(PropTypes.number),
    overlappingId: PropTypes.number,
    isCorner: PropTypes.number,
    isTechnicalFloor: PropTypes.number,
    roofIds: PropTypes.arrayOf(PropTypes.number),
    isGas: PropTypes.number,
    ceilingHeightId: PropTypes.number,
    parkingIds: PropTypes.arrayOf(PropTypes.number),
    recreationIds: PropTypes.arrayOf(PropTypes.number),
  }),
};

Additional.defaultProps = {
  additional: {
    heatingId: '',
    bathroomsId: '',
    planId: '',
    viewIds: '',
    equipmentIds: '',
    overlappingId: '',
    isTechnicalFloor: '',
    roofIds: '',
    ceilingHeightId: '',
    parkingIds: '',
    recreationIds: '',
  },
};

const mapStateToProps = state => ({
  flatAttributes: getFlatAttributes(state),
});

export default connect(mapStateToProps)(Additional);
