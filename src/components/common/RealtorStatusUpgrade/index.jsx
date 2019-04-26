import React from 'react';
import moment from 'moment';
import { createTextMask } from 'redux-form-input-masks';

import TextField from '../TextField';
import DateField from '../../general/EditFormComponents/DateField';
import Row from '../../Grid/Row';
import Col from '../../Grid/Col';

moment.locale('ru');

const firstYear = 1956;
const years = new Array(62).fill(null)
  .map((el, key) => ({ name: firstYear + key + 1, value: firstYear + key + 1 }));


const FLPMask = createTextMask({
  pattern: '9 999 999 9999 999999',
  guide: false,
});

const RealtorStatusUpgrade = () => (
  <Row>
    <Col
      default={{
        col: 7,
      }}
      lg={{
        col: 3,
      }}
    >
      <TextField
        label="ИНН"
        name="INN"
      />
    </Col>
    <Col
      default={{
        col: 9,
      }}
      lg={{
        col: 4,
      }}
    >
      <TextField
        label="№ свидительства ФЛП"
        name="EDR"
        {...FLPMask}
      />
    </Col>
    <Col default={{ col: 12 }} lg={{ col: 5 }}>
      <DateField years={years} />
    </Col>
  </Row>
);

export default RealtorStatusUpgrade;
