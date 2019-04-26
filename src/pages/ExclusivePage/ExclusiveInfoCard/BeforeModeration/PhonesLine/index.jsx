import React, { Fragment } from 'react';

import Row from '../../../../../components/Grid/Row';
import Col from '../../../../../components/Grid/Col';
import PhoneTextField from '../../../../../components/general/PhoneTextField';
import TextField from '../../../../../components/common/TextField';
import PlusIcon from '../../../../../assets/Plus';
import './style.scss';
const PhonesLine = ({ fields }) => (
  <Fragment>
    {fields.map(fieldName => (
      <Row>
        <Col default={{ col: 12 }} lg={{ col: 3 }}>
          <PhoneTextField
            name={`${fieldName}.phone`}
          />
        </Col>
        <Col default={{ col: 12 }} lg={{ col: 2 }}>
          <TextField
            name={`${fieldName}.name`}
            label="Имя"
          />
        </Col>
        <Col default={{ col: 12 }} lg={{ col: 7 }}>
          <div
            className="phonesLineAddButton"
            onClick={() => fields.push({})}
          >
            <PlusIcon />
            <span>
              Добавить
            </span>
          </div>
        </Col>
      </Row>
    ))}
  </Fragment>
);

export default PhonesLine;
