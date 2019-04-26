import React, { Component } from 'react';

import Table from '../../../components/common/Table';
import './style.scss'
class AgentPlansTable extends Component {
  createTableContent() {
    const plans = [
      {
        isActive: true,
        name: 'Тариф "Индивидуальный"',
        dateTill: '23 мар 2018',
      },
      {
        isActive: true,
        name: 'ТОП объявления',
        used: 20,
        usedTotal: 100,
      },
      {
        isActive: true,
        name: 'СМС Рассылка',
        used: 0,
        usedTotal: 100,
      },
      {
        isActive: false,
        name: 'Парсер база г. Днепр',
        dateTill: '30 дней'
      },
      {
        isActive: false,
        name: 'Парсер база г. Киев',
        dateTill: '30 дней'
      },
    ]
    return plans && plans.map(plan => [[
      {
        content: (
          <span className={`${plan.isActive ? 'colorfulOperation_green' : ''} colorfulOperation `}>
            {plan.isActive ? '' : 'НЕ'}
            АКТИВЕН
          </span>
        ),
      },
      {
        content: plan.name,
      },
      {
        content: plan.usedTotal ? `${plan.used} / ${plan.usedTotal}` : '-',
      },
      {
        content: plan.dateTill || '-'
      },
      {
        content: (
          <span className="agentsPlansTable__action">
            {plan.isActive ? 'ПРОДЛИТЬ' : 'ЗАКАЗАТЬ'}
          </span>
        ),
      },
    ], {}]);
  }

  createTableHead() {
    return [
      { content: 'Статус' },
      { content: 'Сервис' },
      { content: 'Использовано / из' },
      { content: 'Источник' },
      { content: 'Действует до' },
      { content: '' },
    ];
  }

  render() {
    const tableHead = this.createTableHead();

    const tableContent = this.createTableContent() || [];

    return (
      <div className="agentsPlansTable agentProfile__block">
        <Table tableHead={tableHead} equalSpaces database tableContent={tableContent} objectDatabase />
      </div>
    );
  }
}

export default AgentPlansTable;
