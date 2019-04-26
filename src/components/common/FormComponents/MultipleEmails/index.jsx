import React from 'react';

import Row from '../../../Grid/Row';
import Col from '../../../Grid/Col';
import TextField from '../../TextField';
import Select from '../../Select';
import Plus from '../../../../assets/Plus';
import Trash from '../../../../assets/Trash';

const MultipleEmails = ({ fields }) => (
  fields.map((field, index) => {
    const fieldValue = fields.get(index);

    return (
      <Row>
        <Col
          default={{
            col: 9,
          }}
          lg={{
            col: 3,
          }}
        >
          <TextField
            name={field}
            label="Email"
            required={false}
          />
        </Col>
        <Col
          className="ai-c"
          default={{
            col: 2,
          }}
          lg={{
            col: 1,
          }}
        >
          {fields.length > 1 && (
            <span onClick={() => fields.remove(index)}>
              <Trash />
            </span>
          )}
          {fieldValue.length > 0 && (
            <span onClick={() => fields.push('')}>
              <Plus />
            </span>
          )}
        </Col>
      </Row>
    );
  })
);

export default MultipleEmails;
