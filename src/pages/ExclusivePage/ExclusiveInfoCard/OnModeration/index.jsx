import React from 'react';

import Row from '../../../../components/Grid/Row';
import Col from '../../../../components/Grid/Col';
import { Button } from '../../../../components/general/Button';

const OnModerationForm = () => (
  <div className="exclusiveCard__body exclusiveCard__body_centered">
    <Row>
      <Col default={{ col: 12 }}>
        <h2 className="exclusiveCard__title">
          На модерации
        </h2>
        <p className="exclusiveCard__paragraph">
          Ваш обьект в стадии модерации на эсклюзивность.
          <br />
          Подождите немного...
        </p>
      </Col>
    </Row>
    <Row className="exclusiveCard__buttons">
      <Col default={{ col: 12 }} lg={{ col: 2 }}>
        <Button buttonType="add" size="big">
          Назад
        </Button>
      </Col>
      <Col default={{ col: 12 }} lg={{ col: 6 }} />
      <Col default={{ col: 12 }} lg={{ col: 4 }}>
        <Button buttonType="add" size="big">
          В карточку обьекта
        </Button>
      </Col>
    </Row>
  </div>
);

export default OnModerationForm;
