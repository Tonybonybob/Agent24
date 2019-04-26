import React, { Component } from 'react';

import Table from '../../../components/common/Table';
import { normalizeDate } from '../../../utils';
import ProfilePaymentsLinks from '../../../components/common/ProfilePaymentsLinks';
import './style.scss';
class AgentPayments extends Component  {
  createTableContent() {
    const payments = [
      {
        account: '#133546',
        service: 'Мессенджер',
        price: 10,
        days: 30,
        date: '2018-03-23',
        isPaid: true,
      },
      {
        account: '#133546',
        service: 'ТОП объявления',
        price: 30,
        date: '2018-03-23',
        isPaid: true,
      },
      {
        account: '#133546',
        service: 'СМС Рассылка',
        price: 20,
        date: '2018-03-23',
        isPaid: true,
      },
      {
        account: '#133546',
        service: 'Парсер база г.Днепр',
        price: 100,
        days: 100,
        date: '2018-03-23',
        isProcessed: true,
      },
      {
        account: '#133546',
        service: 'Парсер база г.Киев',
        price: 100,
        days: 1,
        date: '2018-03-23',
        isDenied: true,
      },
    ]
    return payments && payments.map(payment => [[
      {
        content: (
          <span className="agentPayments__account">
            {payment.account}
          </span>
        ),
      },
      {
        content: payment.service,
      },
      {
        content: payment.price || '-',
      },
      {
        content: payment.days || '-'
      },
      {
        content: normalizeDate(payment.date),
      },
      {
        content: (
          <span className={`roundedOperation
            ${payment.isPaid && 'roundedOperation__paid'}
            ${payment.isProcessed ? 'roundedOperation__processed' : ''}
            ${payment.isDenied ? 'roundedOperation__denied' : ''}`
          }>
            {payment.isPaid && 'ОПЛАЧЕН'}
            {payment.isProcessed && 'ОБРАБАТЫВАЕТСЯ'}
            {payment.isDenied && 'ОТКЛОНЁН'}
          </span>
        ),
      },
    ], {}]);
  }

  createTableHead() {
    return [
      { content: 'Счёт' },
      { content: 'Сервис' },
      { content: '₴' },
      { content: 'Период' },
      { content: 'Дата' },
      { content: 'Счет' },
    ];
  }

  render() {
    const tableHead = this.createTableHead();

    const tableContent = this.createTableContent() || [];

    return (
      <div>
        <div className="agentPayments agentProfile__block">
          <Table tableHead={tableHead} equalSpaces tableContent={tableContent} />
        </div>
        <ProfilePaymentsLinks />
      </div>
    );
  }
}

export default AgentPayments;
