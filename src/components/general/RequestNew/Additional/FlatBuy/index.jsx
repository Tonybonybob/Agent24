import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from '../../../../common/Select';
import { getAttributes } from '../../../../../store/reducers/attributes';
import Row from '../../../../Grid/Row';
import Col from '../../../../Grid/Col';
import './style.scss';
const FlatBuy = ({ attributes }) => {
  const defaultValues = [{ id: true, name: 'Да' }, { id: false, name: 'Нет' }];

  return (
    <div className="flatBuyAdditional">
      <div className="flatBuyAdditional__wrapper container">
        <Row>
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <Select
              name="heatingIds"
              label="Отопление"
              items={attributes.heating || []}
              multiple
            />
          </Col>
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <Select
              name="bathroomsIds"
              label="Санузлы"
              items={attributes.bathrooms || []}
              multiple
            />
          </Col>
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <Select
              name="planIds"
              label="Планировка"
              items={attributes.plan || []}
              multiple
            />
          </Col>
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <Select
              name="viewIds"
              label="Вид"
              items={attributes.view || []}
              multiple
            />
          </Col>
        </Row>
        <Row>
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <Select
              name="overlappingIds"
              label="Перекрытия"
              items={attributes.overlapping || []}
              multiple
            />
          </Col>
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <Select
              name="isCorners"
              label="Угловая"
              items={defaultValues}
              multiple
            />
          </Col>
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <Select
              name="roofIds"
              label="Крыша"
              items={attributes.roof || []}
              multiple
            />
          </Col>
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <Select
              name="isTechnicalFloors"
              label="Техэтаж"
              items={defaultValues}
              multiple
            />
          </Col>
        </Row>
        <Row>
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <Select
              name="isGases"
              label="Газ"
              items={defaultValues}
              multiple
            />
          </Col>
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <Select
              name="ceilingHeightIds"
              label="Потолок"
              items={attributes.ceilingHeight || []}
              multiple
            />
          </Col>
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <Select
              name="parkingIds"
              label="Паркинг"
              items={attributes.parking || []}
              multiple
            />
          </Col>
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <Select
              name="wallIds"
              label="Материал стен"
              items={attributes.wall || []}
              multiple
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

FlatBuy.propTypes = {
  attributes: PropTypes.object,
};

FlatBuy.defaultProps = {
  attributes: {},
};

const mapStateToProps = state => ({
  attributes: getAttributes(state),
});

export default connect(mapStateToProps)(FlatBuy);
