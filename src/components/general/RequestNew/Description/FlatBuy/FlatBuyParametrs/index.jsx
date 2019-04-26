import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createNumberMask } from 'redux-form-input-masks';
import { compose } from 'redux';

import TextField from '../../../../../common/TextField';
import Select from '../../../../../common/Select';
import Row from '../../../../../Grid/Row';
import Col from '../../../../../Grid/Col';
import { getAttributes } from '../../../../../../store/reducers/attributes';
import { Button } from '../../../../Button';
import BigClose from '../../../../../../assets/BigClose';
import Checkbox from '../../../../../common/Checkbox';
import { withSizes } from '../../../../../../utils';
import TrashIcon from '../../../../../../assets/Trash';
import './style.scss';
const fromToMask = createNumberMask({
  allowEmpty: true,
});

const generateFromToContent = (from, to, prefix, ending) => {
  if (from && to) {
    return (
      <span>
        {prefix && `${prefix} `}
        {from}
        -
        {to}
        {ending}
        {', '}
      </span>
    );
  }

  if (from && !to) {
    return (
      <span>
        {prefix && `${prefix} `}
        {'от '}
        {from}
        {ending}
        {', '}
      </span>
    );
  }

  if (from && !to) {
    return (
      <span>
        {prefix && `${prefix} `}
        {'до '}
        {to}
        {ending}
        {', '}
      </span>
    );
  }
  return ''
}

const FlatBuyParametrs = ({ fields, attributes, isDesktop }) => (
  <div className="flatBuyParametrs">
    {fields.map((field, index) => {
      const fieldValues = fields.get(index);

      return index !== fields.length - 1
        ? (
          <div className="flatBuyParametrs__item_preview flatBuyParametrs__item">
            <div>
              {generateFromToContent(fieldValues.roomFrom, fieldValues.roomTo, '', 'к.')}
              {generateFromToContent(fieldValues.maxFloorFrom, fieldValues.maxFloorTo, '', 'этажн.')}
              {generateFromToContent(fieldValues.floorFrom, fieldValues.floorTo, '', 'этаж.')}
              {fieldValues.isLastFloor && 'последний, '}
              {generateFromToContent(fieldValues.totalFrom, fieldValues.totalTo, 'общая', 'м2')}
              {generateFromToContent(fieldValues.livingFrom, fieldValues.livingTo, 'общая', 'м2')}
              {generateFromToContent(fieldValues.kitchenFrom, fieldValues.kitchenTo, 'кухня', 'м2')}
              {generateFromToContent(fieldValues.priceFrom, fieldValues.priceTo, '', '$')}
            </div>
            <TrashIcon onClick={() => fields.remove(index)} />
          </div>
        ) : (
          <div className="flatBuyParametrs__item">
            {/* {fields.length !== 1 && (
              <span className="flatBuyParametrs__close" onClick={() => fields.remove(index)}>
                <BigClose />
              </span>
            )} */}
            <Row className="flatBuyParametrs__row">
              <Col default={{ col: 2 }} lg={{ col: 1 }}>
                <TextField
                  name={`${field}.roomFrom`}
                  label="Комнат"
                  placeholder="от"
                  required={false}
                  InputLabelProps={{ shrink: true }}
                  {...fromToMask}
                />
              </Col>
              <Col default={{ col: 2 }} lg={{ col: 1 }}>
                <TextField
                  name={`${field}.roomTo`}
                  placeholder="до"
                  required={false}
                  {...fromToMask}
                />
              </Col>
              <Col default={{ col: 10 }} lg={{ col: 5 }}>
                <Select
                  label="Проекты домов"
                  name={`${field}.plans`}
                  items={attributes.plan || []}
                  multiple
                />
              </Col>
              {!isDesktop && <Col default={{ col: 2 }} />}
              <Col default={{ col: 2 }} lg={{ col: 1 }}>
                <TextField
                  name={`${field}.maxFloorFrom`}
                  label="Этажность домов"
                  required={false}
                  placeholder="от"
                  InputLabelProps={{ shrink: true }}
                  {...fromToMask}
                />
              </Col>
              <Col default={{ col: 2 }} lg={{ col: 1 }}>
                <TextField
                  name={`${field}.maxFloorTo`}
                  placeholder="до"
                  required={false}
                  {...fromToMask}
                />
              </Col>
              {!isDesktop && (
                <Fragment>
                  <Col default={{ col: 2 }} />
                  <Col default={{ col: 2 }} lg={{ col: 1 }}>
                    <TextField
                      name={`${field}.floorFrom`}
                      label="Этажи"
                      placeholder="от"
                      required={false}
                      InputLabelProps={{ shrink: true }}
                      {...fromToMask}
                    />
                  </Col>
                  <Col default={{ col: 2 }} lg={{ col: 1 }}>
                    <TextField
                      name={`${field}.floorTo`}
                      placeholder="до"
                      required={false}
                      {...fromToMask}
                    />
                  </Col>
                  <Col default={{ col: 8 }} lg={{ col: 2 }}>
                    <Checkbox
                      name={`${field}.isLastFloor`}
                      label="Последний этаж"
                    />
                  </Col>
                </Fragment>
              )}
            </Row>
            <Row className="flatBuyParametrs__row">
              <Col default={{ col: 2 }} lg={{ col: 1 }}>
                <TextField
                  name={`${field}.totalFrom`}
                  label="Общая"
                  required={false}
                  placeholder="от"
                  InputLabelProps={{ shrink: true }}
                  {...fromToMask}
                />
              </Col>
              <Col default={{ col: 2 }} lg={{ col: 1 }}>
                <TextField
                  name={`${field}.totalTo`}
                  required={false}
                  placeholder="до"
                  {...fromToMask}
                />
              </Col>
              {!isDesktop && <Col default={{ col: 8 }} />}
              <Col default={{ col: 2 }} lg={{ col: 1 }}>
                <TextField
                  name={`${field}.livingFrom`}
                  label="Жилая"
                  placeholder="от"
                  required={false}
                  InputLabelProps={{ shrink: true }}
                  {...fromToMask}
                />
              </Col>
              <Col default={{ col: 2 }} lg={{ col: 1 }}>
                <TextField
                  name={`${field}.livingTo`}
                  required={false}
                  placeholder="до"
                  {...fromToMask}
                />
              </Col>
              {!isDesktop && <Col default={{ col: 2 }} />}
              <Col default={{ col: 2 }} lg={{ col: 1 }}>
                <TextField
                  name={`${field}.kitchenFrom`}
                  label="Кухня"
                  required={false}
                  placeholder="от"
                  InputLabelProps={{ shrink: true }}
                  {...fromToMask}
                />
              </Col>
              <Col default={{ col: 2 }} lg={{ col: 1 }}>
                <TextField
                  name={`${field}.kitchenTo`}
                  placeholder="до"
                  required={false}
                  {...fromToMask}
                />
              </Col>
              {isDesktop && (
                <Fragment>
                  <Col lg={{ col: 1 }} />
                  <Col default={{ col: 2 }} lg={{ col: 1 }}>
                    <TextField
                      name={`${field}.floorFrom`}
                      label="Этажи"
                      placeholder="от"
                      required={false}
                      InputLabelProps={{ shrink: true }}
                      {...fromToMask}
                    />
                  </Col>
                  <Col default={{ col: 2 }} lg={{ col: 1 }}>
                    <TextField
                      name={`${field}.floorTo`}
                      placeholder="до"
                      required={false}
                      {...fromToMask}
                    />
                  </Col>
                  <Col default={{ col: 4 }} lg={{ col: 2 }}>
                    <Checkbox
                      name={`${field}.isLastFloor`}
                      label="Последний этаж"
                    />
                  </Col>
                </Fragment>
              )}
            </Row>
            <Row className="flatBuyParametrs__row">
              <Col default={{ col: 10 }} lg={{ col: 4 }}>
                <Select
                  label="Состояние объекта"
                  items={attributes.condition || []}
                  name={`${field}.conditions`}
                />
              </Col>
              <Col default={{ col: 4 }} lg={{ col: 2 }}>
                <TextField
                  name={`${field}.priceFrom`}
                  label="Бюджет"
                  placeholder="от"
                  required={false}
                  InputLabelProps={{ shrink: true }}
                  {...fromToMask}
                />
              </Col>
              <Col default={{ col: 4 }} lg={{ col: 2 }}>
                <TextField
                  name={`${field}.priceTo`}
                  placeholder="до"
                  required={false}
                  {...fromToMask}
                />
              </Col>
            </Row>
            <Row>
              <Col default={{ col: 12 }} lg={{ col: 4 }}>
                <Button buttonType="add" full onClick={() => fields.push(fieldValues)}>
                  ДУБЛИРОВАТЬ ПАРАМЕТРЫ
                </Button>
              </Col>
            </Row>
          </div>
        );
    })}
  </div>
);

const mapStateToProps = state => ({
  attributes: getAttributes(state),
});

export default compose(
  connect(mapStateToProps),
  withSizes,
)(FlatBuyParametrs);
