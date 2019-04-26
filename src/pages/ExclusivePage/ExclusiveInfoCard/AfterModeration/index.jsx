import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Row from '../../../../components/Grid/Row';
import Col from '../../../../components/Grid/Col';
import { Button } from '../../../../components/general/Button';
import Tooltip from '../../../../components/common/Tooltip';
import OnePhotoHolder from '../../../../components/common/OnePhotoHolder';
import SmallPersonBlock from '../../../../components/general/SmallPersonBlock';

const AfterModerationForm = ({ isPublic }) => {
  const charsList = [
    {
      label: 'Цена, $',
      value: '20 000',
      col: 2,
    },
    {
      label: 'Комиссия',
      value: 'Сумма',
      col: 2,
    },
    {
      value: '1000',
      col: 2,
    },
    {
      label: 'Начало действия договора',
      value: '21 марта 2018',
      col: 3,
    },
    {
      label: 'Окончание действия договора',
      value: '21 марта 2018',
      col: 3,
    },
  ];

  return (
    <div className="exclusiveCard__body">
      <Row className="exclusiveCard__characteristics">
        {charsList.map(el => (
          <Col default={{ col: 12 }} lg={{ col: el.col }}>
            {el.label && (
              <div className="exclusiveCard__label">
                {el.label}
              </div>
            )}
            <p>
              {el.value}
            </p>
          </Col>
        ))}
      </Row>
      <Row>
        <Col default={{ col: 12 }}>
          <div className="exclusiveCard__label">
            Собственник в договоре
          </div>
          <div className="exclusiveCard__owners">
            <SmallPersonBlock
              person={{
                img: 'http://api.agent24.pro/fupload/tmp/8218dd845ee9be8b9021b11238acba4e',
                name: 'Валерий Юшинский',
                phone: '+8067 123 4567',
              }}
            />
          </div>
        </Col>
      </Row>
      {!isPublic && (
        <Row>
          <Col default={{ col: 12 }}>
            <div className="exclusiveCard__label">
              Фото эксклюзивного договора
            </div>
            <div className="exclusiveCard__photos">
              <OnePhotoHolder url="http://api.agent24.pro/fupload/tmp/8218dd845ee9be8b9021b11238acba4e" />
            </div>
          </Col>
        </Row>
      )}
      <Row>
        <Col default={{ col: 12 }} lg={{ col: 8 }}>
          <div className="exclusiveCard__tooltipBlock">
            <Tooltip />
            <div>
              <p>
                {isPublic
                  ? 'Информация о собственниках и фотографии документа недоступны'
                  : 'Вся информация о собственнике Вашего обьекта, а также прикрепленный ниже эксклюзивный договор надежно защищены в системе и доступны только Вам.'
                }
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
        {!isPublic && (
          <Fragment>
            <Col default={{ col: 12 }} lg={{ col: 3 }}>
              <Button size="big">
                Продлить договор
              </Button>
            </Col>
            <Col default={{ col: 12 }} lg={{ col: 5 }}>
              <Button size="big">
                Зарегестрировать новый договор
              </Button>
            </Col>
          </Fragment>
        )}
      </Row>
    </div>
  );
};

AfterModerationForm.propTypes = {
  isPublic: PropTypes.bool,
};

AfterModerationForm.defaultProps = {
  isPublic: false,
};

export default AfterModerationForm;
