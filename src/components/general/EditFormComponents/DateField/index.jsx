import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import Col from '../../../Grid/Col';
import Row from '../../../Grid/Row';
import Select from '../../../common/Select';
import './style.scss';
const days = new Array(31).fill(null).map((el, key) => ({ name: key + 1, value: key + 1 }));
const months = new Array(12).fill(null)
  .map((el, key) => ({ name: moment().month(key).format('MMMM'), value: key + 1 }));


const DateField = ({ label, years }) => (
  <Row>
    <Col default={{ col: 3 }}>
      <div className="dateField">
        <Select
          name="dateDay"
          label={label}
          InputLabelProps={{ shrink: true }}
          items={days}
        />
      </div>
    </Col>
    <Col default={{ col: 6 }}>
      <Select
        name="dateMonth"
        items={months}
      />
    </Col>
    <Col default={{ col: 3 }}>
      <div className="dateField">
        <Select
          name="dateYear"
          items={years}
        />
      </div>
    </Col>
  </Row>
);

DateField.propTypes = {
  label: PropTypes.string,
};

DateField.defaultProps = {
  label: 'Дата выдачи',
};

export default DateField;
