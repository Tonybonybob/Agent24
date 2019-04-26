import React from 'react';

import Row from '../../../Grid/Row';
import Col from '../../../Grid/Col';
import TextField from '../../TextField';
import Select from '../../Select';
import Plus from '../../../../assets/Plus';
import Trash from '../../../../assets/Trash';

import './style.scss';
const MultipleSourceWithLink = ({ fields }) => (
  fields.map((field, index) => {
    const fieldInfo = fields.get(index);

    return (
      <Row className="multipleSourceWithLink">
        <Col
          default={{
            col: 6,
          }}
          lg={{
            col: 2,
          }}
        >
          <Select
            name={`${field}.source`}
            items={[
              { name: 'Сайт', value: 'site' },
              { name: 'Что-то', value: 'something' },
            ]}
            label="Ссылка"
          />
        </Col>
        <Col
          default={{
            col: 9,
          }}
          lg={{
            col: 3,
          }}
        >
          <TextField
            name={`${field}.link`}
            required={false}
          />
        </Col>
        <Col
          className="ai-c"
          default={{
            col: 1,
          }}
        >
          
          {fields.length > 1 && (
            <span onClick={() => fields.remove(index)}>
              <Trash />
            </span>
          )}
          {fieldInfo.link && fieldInfo.source && (
            <span onClick={() => fields.push({})}>
              <Plus />
            </span>
          )}
        </Col>
      </Row>
    )
  })
);

export default MultipleSourceWithLink;
