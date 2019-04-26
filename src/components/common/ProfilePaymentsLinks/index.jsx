import React from 'react';

import Row from '../../Grid/Row';
import Col from '../../Grid/Col';
import LinkToModal from '../LinkToModal';
import { Button } from '../../general/Button';
import SendMoneyIcon from '../../../assets/SendMoney';
import AddMoneyIcon from '../../../assets/AddMoney';
import './style.scss';

const ProfilePaymentsLinks = () => (
  <Row className="profilePaymentButton">
    <Col default={{ col: 12 }} lg={{ col: 6 }}>
      <LinkToModal queryParam="payment" state={{ activeTab: 0, money: '19.10' }}>
        <Button size="big" full buttonType="add">
          <AddMoneyIcon />
          <span>
            Пополнить счёт
          </span>
        </Button>
      </LinkToModal>
    </Col>
    <Col default={{ col: 12 }} lg={{ col: 6 }}>
      <LinkToModal queryParam="payment" state={{ activeTab: 1, money: '19.10' }}>
        <Button size="big" full>
          <SendMoneyIcon />
          <span>
            Перевести баланс
          </span>
        </Button>
      </LinkToModal>
    </Col>
  </Row>
);

export default ProfilePaymentsLinks;
