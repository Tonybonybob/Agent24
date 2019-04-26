import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import SmallPersonBlock from '../../../components/general/SmallPersonBlock';
import Table from '../../../components/common/Table';
import { normalizeDate } from '../../../utils';
import ChainIcon from '../../../assets/ChainIcon';
import './style.scss';
class AgentReferals extends Component {
  createTableContent() {
    const referals = [
      {
        isActive: true,
        isSignedUp: true,
        name: 'Константин Константинопольский',
        role: 'Моё АН',
        photo: 'https://www.dogbreedinfo.com/images26/PugPurebredDogPuppyJackson10WeeksOldFawnBlack2.jpg',
        date: '2018-03-13',
      },
      {
        isActive: true,
        isSignedUp: true,
        name: 'Константин Константинопольский',
        role: 'Риелтор',
        photo: 'https://www.dogbreedinfo.com/images26/PugPurebredDogPuppyJackson10WeeksOldFawnBlack2.jpg',
        date: '2018-03-10',
      },
      {
        isActive: false,
        isSignedUp: false,
        mail: 'ilya@zdorik.com',
        date: '2018-03-10',
      },
    ]
    return referals && referals.map(referal => [[
      {
        content: (
          <span className={`${referal.isActive ? 'colorfulOperation_green' : ''} colorfulOperation `}>
            {referal.isActive ? 'АКТИВНЫЙ' : 'ПАССИВНЫЙ'}
          </span>
        ),
      },
      {
        content: (
          referal.isSignedUp
            ? (
              <SmallPersonBlock person={{
                img: referal.photo,
                name: referal.name,
                phone: referal.role,
              }} />
            ) : (
              referal.mail
            )
        ),
      },
      {
        content: normalizeDate(referal.date),
      },
      {
        content: ''
      }
    ], {}]);
  }

  createTableHead() {
    return [
      { content: 'Статус' },
      { content: 'Инвайты' },
      { content: 'Дата' },
      { content: '' },
    ];
  }

  render() {
    const tableHead = this.createTableHead();

    const tableContent = this.createTableContent() || [];

    return (
      <div className="agentReferals">
        <div className="agentProfile__block agentReferals__invite">
          <h4 className="agentReferals__title">
            Пригласи Агента и будь в профите
          </h4>
          <div className="agentReferals__descriptionWrapper">
            <p className="agentReferals__descriptionText">
              Приглашайте знакомых риэлторов и руководителей АН попробовать Агент24. Он получает 1 мес бесплатного пользования сервисом, а вы — 50 грн с его первой покупки. Предоставьте ему Вашу ссылку или Промо-код
            </p>
            <div className="agentReferals__count">
              <h5 className="agentReferals__referalTitle">
                Всего ваших рефералов
              </h5>
              <h4 className="agentReferals__referalNumber">
                32
              </h4>
            </div>
          </div>
          <div className="agentReferals__inviteLink">
            <div className="agentReferals__link">
              http://agent24.pro/reg/12345
            </div>
            <CopyToClipboard text="http://agent24.pro/reg/12345">
              <button className="agentReferals__inviteButton" type="button">
                <ChainIcon />
                Cкопировать ссылку
              </button>
            </CopyToClipboard>
          </div>
          <div className="agentReferals__promoCode">
            Промо код:
            <span className="agentReferals__promoCode_code">
              12345
            </span>
          </div>
        </div>

        <div className="agentProfile__block agentReferals__table">
          <Table tableHead={tableHead} equalSpaces tableContent={tableContent} />
        </div>
      </div>
    );
  }
}

export default AgentReferals;
