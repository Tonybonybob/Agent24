import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import Row from '../../../../components/Grid/Row';
import Col from '../../../../components/Grid/Col';
import { Button } from '../../../../components/general/Button';
import CodeField from '../../../../components/common/CodeField';

const ConfirmModeration = ({ code }) => (
  <div className="exclusiveCard__body exclusiveCard__body_centered">
    <Row>
      <Col default={{ col: 12 }} lg={{ col: 6 }}>
        <h2 className="exclusiveCard__title">
          Еще чуть-чуть
        </h2>
        <p className="exclusiveCard__paragraph">
          Ваш объект прошел модерацию на эксклюзивность. Вашему Собственнику
          {' '}
          <strong>
            Валерию Юшинскому
          </strong>
          {' '}
          отправлено СМС-сообщение
        </p>
      </Col>
      <Col default={{ col: 12 }} lg={{ col: 6 }}>
        <p className="exclusiveCard__paragraph exclusiveCard__paragraph_withBack exclusiveCard__paragraph_withQuotes">
          <span className="exclusiveCard__quote">
            «
          </span>
          <span>
            Ваш обьект зарегистрирован как эксклюзивный в МЛС Агент24 сроком до 23 марта
            2019г. Для подтверждения передайте вашему агенту  код ****
          </span>
          <span className="exclusiveCard__quote exclusiveCard__quote_right">
            »
          </span>
        </p>
      </Col>
    </Row>
    <Row>
      <Col default={{ col: 12 }} lg={{ col: 2 }}>
        <CodeField
          code={code}
          smsToken
          checkSmsToken={() => {}}
          showCallAgain
        />
      </Col>
    </Row>
    <Row className="exclusiveCard__buttons">
      <Col default={{ col: 12 }} lg={{ col: 2 }}>
        <Button size="big">
          Подтвердить
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

ConfirmModeration.propTypes = {
  code: PropTypes.string,
};

ConfirmModeration.defaultProps = {
  code: '',
};

const selector = formValueSelector('ExclusiveInfoCardForm');

const mapStateToProps = state => ({
  code: selector(state, 'code'),
});

export default connect(mapStateToProps)(ConfirmModeration);
