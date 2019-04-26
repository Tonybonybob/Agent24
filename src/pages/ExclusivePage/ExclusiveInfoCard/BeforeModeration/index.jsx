import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FieldArray } from 'redux-form';

import { Button } from '../../../../components/general/Button';
import TextField from '../../../../components/common/TextField';
import PureTextField from '../../../../components/common/PureTextField';
import Select from '../../../../components/common/Select';
import Calendar from '../../../../components/common/Calendar';
import Row from '../../../../components/Grid/Row';
import Col from '../../../../components/Grid/Col';
import Tooltip from '../../../../components/common/Tooltip';
import PhonesLine from './PhonesLine';
import Dropzone from '../../../../components/common/Dropzone';
import OnePhotoHolder from '../../../../components/common/OnePhotoHolder';
import SmallPersonBlock from '../../../../components/general/SmallPersonBlock';

const BeforeModerationForm = ({ onCalendarFromChange, onCalendarToChange, error }) => {
  const ownersItems = [
    {
      name: (
        <SmallPersonBlock
          person={{
            name: 'Валерий Юшинский',
            phone: '+8067 123 4567',
            img: 'http://api.agent24.pro/fupload/tmp/8218dd845ee9be8b9021b11238acba4e',
          }}
        />
      ),
      value: 0,
    },
  ];

  return (
    <div className="exclusiveCard__body">
      {error && (
        <Row>
          <Col default={{ col: 12 }} lg={{ col: 6 }}>
            <h2 className="exclusiveCard__title exclusiveCard__title_error">
              Ошибка!
            </h2>
            <p className="exclusiveCard__paragraph exclusiveCard__paragraph_withBack">
              Не совпадают даты с указанными в договоре
            </p>
          </Col>
        </Row>
      )}
      <Row>
        <Col default={{ col: 12 }} lg={{ col: 2 }}>
          <TextField name="price" label="Цена, $" />
        </Col>
        <Col default={{ col: 12 }} lg={{ col: 2 }}>
          <Select name="comissionType" label="Комиссия" items={[{ name: 'Сумма', value: 'summ' }]} />
        </Col>
        <Col default={{ col: 12 }} lg={{ col: 2 }}>
          <TextField name="comission" label="Сумма" />
        </Col>
        <Col default={{ col: 12 }} lg={{ col: 3 }}>
          <Calendar
            selected={moment()}
            onChange={onCalendarFromChange}
            dateFormat="ll"
            customInput={<PureTextField label="Начало действия договора" InputLabelProps={{ shrink: true }} />}
          />
        </Col>
        <Col default={{ col: 12 }} lg={{ col: 3 }}>
          <Calendar
            selected={moment()}
            onChange={onCalendarToChange}
            dateFormat="ll"
            customInput={<PureTextField label="Окончание действия договора" InputLabelProps={{ shrink: true }} />}
          />
        </Col>
      </Row>
      <Row className="mb-20">
        <Col default={{ col: 12 }} lg={{ col: 3 }}>
          <Select
            name="owner"
            label="Собственник в договоре"
            items={ownersItems}
          />
        </Col>
        <Col default={{ col: 12 }} lg={{ col: 6 }} className="d-flex">
          <div className="exclusiveCard__tooltipBlock">
            <Tooltip />
            <p>
              Укажите Собственника, или одного из Собственников, согласно
              подписанного между вами Эксклюзивному договору
            </p>
          </div>
        </Col>
      </Row>
      <FieldArray name="phones" component={PhonesLine} />
      <Row>
        <Col default={{ col: 12 }} lg={{ col: 10 }}>
          <TextField
            name="moderationInfo"
            label="Информация для модератора"
          />
        </Col>
      </Row>
      <Row>
        <Col default={{ col: 12 }} lg={{ col: 8 }}>
          <div className="exclusiveCard__label">
            Фото эксклюзивного договора
          </div>
          <div className="exclusiveCard__photos">
            <Dropzone />
            <OnePhotoHolder url="http://api.agent24.pro/fupload/tmp/8218dd845ee9be8b9021b11238acba4e" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col default={{ col: 12 }} lg={{ col: 8 }}>
          <div className="exclusiveCard__tooltipBlock">
            <Tooltip />
            <div>
              <p>
                Вся информация о собственнике Вашего обьекта, а также прикрепленный ниже
                эксклюзивный договор надежно защищены в системе и доступны только Вам.
              </p>
              <p>
                Внимание! Собственнику Вашего экслюзива будет отправлено СМС с кодом подтверждения о
                регистрации обьекте в МЛС Агент24, который вам нужно будет ввести после модерации.
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="exclusiveCard__buttons">
        <Col default={{ col: 12 }} lg={{ col: 4 }}>
          <Button buttonType="add" size="big">
            В карточку обьекта
          </Button>
        </Col>
        <Col default={{ col: 12 }} lg={{ col: 2 }} />
        <Col default={{ col: 12 }} lg={{ col: 2 }}>
          <Button buttonType="primary add" size="big">
            Отмена
          </Button>
        </Col>
        <Col default={{ col: 12 }} lg={{ col: 4 }}>
          <Button size="big">
            Отправить на модерацию
          </Button>
        </Col>
      </Row>
    </div>
  );
};

BeforeModerationForm.propTypes = {
  onCalendarFromChange: PropTypes.func.isRequired,
  onCalendarToChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

BeforeModerationForm.defaultProps = {
  error: false,
};

export default BeforeModerationForm;
