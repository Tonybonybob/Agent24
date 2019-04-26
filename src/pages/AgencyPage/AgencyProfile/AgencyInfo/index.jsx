import React, { Component, Fragment } from 'react';

import Row from '../../../../components/Grid/Row';
import Col from '../../../../components/Grid/Col';
import { Button } from '../../../../components/general/Button';
import OnePhotoHolder from '../../../../components/common/OnePhotoHolder';
import VerifiedIcon from '../../../../assets/Verified';
import CloseIcon from '../../../../assets/BigClose';
import PencilIcon from '../../../../assets/Pencil';
import ArrowDownIcon from '../../../../assets/ArrowDownStroke';
import OfficeInfo from './OfficeInfo';
import './style.scss';
class AgencyProfileInfo extends Component {
  state = { showMore: false }

  render() {
    const { showMore } = this.state;

    return (
      <div className="agencyProfileInfo">
        <Row>
          <Col
            default={{ col: 12 }}
            lg={{ col: 7 }}
            className="d-flex"
          >
            <OnePhotoHolder url="http://api.agent24.pro/fupload/tmp/0cbcc2448d9405a386c78476cf51365b" />
            <div>
              <h1 className="agencyProfileInfo__title">
                АН «Веселые Качели»
              </h1>
              <div className="agencyProfileInfo__status agencyProfileInfo__status_verified">
                <VerifiedIcon />
                Подтверждено
              </div>
              <div className="agencyProfileInfo__label">
                Основан 21 мар 2018
              </div>
            </div>
          </Col>
          <Col default={{ col: 12 }} lg={{ col: 3 }}>
            <Button buttonType="add">
              Подтвердить статус
            </Button>
          </Col>
          <Col default={{ col: 12 }} lg={{ col: 2 }}>
            <div className="agencyProfileInfo__editIcon">
              <PencilIcon />
            </div>
          </Col>
        </Row>
        <hr />
        <OfficeInfo className="noBorder" />
        {showMore && (
          <Fragment>
            <OfficeInfo />
            <OfficeInfo />
          </Fragment>
        )}
        <div>
          <div
            className={`agencyProfileInfo__extendInfoButton ${showMore ? 'agencyProfileInfo__extendInfoButton_reverse' : ''}`}
            onClick={() => this.setState({ showMore: !showMore })}
          >
            <span>
              {showMore ? 'Скрыть' : 'Показать'}
              филиалы
            </span>
            <ArrowDownIcon />
          </div>
        </div>
      </div>
    );
  }
}

export default AgencyProfileInfo;
