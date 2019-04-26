import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DefaultAvatar from '../../../assets/DefaultAvatar';
import { Button } from '../../../components/general/Button';
import ArrowDownStroke from '../../../assets/ArrowDownStroke';
import TelegramIcon from '../../../assets/Telegram';
import WhatsappIcon from '../../../assets/Whatsapp';
import ViberIcon from '../../../assets/Viber';
import MessagesIcon from '../../../assets/MessagesIcon';
import FacebookIcon from '../../../assets/Facebook';
import Instagram from '../../../assets/Instagram';
import LocationIcon from '../../../assets/Location';
import Plus from '../../../assets/Plus';
import LinkToModal from '../../../components/common/LinkToModal';
import Pencil from '../../../assets/Pencil';
import TypeCard from '../../../components/general/SideBarInfo/TypeCard';
import './style.scss';
// eslint-disable-next-line
class AgentSidebar extends Component {
  render() {
    return (
      <div className="agentSidebar">
        <Link to="/agent-edit/2" className="agentSidebar__editLink">
          <Pencil />
        </Link>
        <DefaultAvatar />
        <TypeCard
          renderHeader={() => <span>Частник</span>}
          subText="Не в системе Агент24"
        />
        <div className="agentSidebar__content">
          <h3 className="agentSidebar__name">
            Константинопольский Константин Константинович
          </h3>
          <div className="agentSidebar__date">21.02.1983</div>
          <div className="agentSidebar__id">#1232 с 21.02.2018</div>
          <div className="d-flex">
            <span className="agentSidebar__message">
              <Button buttonType="add" full>
                Сообщение
              </Button>
            </span>
            <span className="agentSidebar__arrowDown">
              <Button buttonType="add" full>
                <ArrowDownStroke />
              </Button>
            </span>
          </div>
          <div className="agentSidebar__phone">
            +380 67 765 4321
            <ViberIcon />
            <TelegramIcon />
            <WhatsappIcon />
          </div>
          <div>
            <span className="agentSidebar__linkSvg">
              <MessagesIcon className="agentSidebar__linkSvg" />
            </span>
            <a href="mailto:sample@mail.com" className="agentSidebar__link">
              sample@mail.com
            </a>
          </div>
          <div>
            <span className="agentSidebar__linkSvg">
              <FacebookIcon />
            </span>
            <a
              href="https://facebook.com/10000072435713"
              target="_blank"
              className="agentSidebar__link"
            >
              /10000072435713
            </a>
          </div>
          <div>
            <span className="agentSidebar__linkSvg">
              <Instagram className="agentSidebar__linkSvg" />
            </span>
            <a
              href="https://instagram.com/ilya_zdorik"
              target="_blank"
              className="agentSidebar__link"
            >
              @ilya_zdorik
            </a>
          </div>
          <div>
            <LocationIcon className="agentSidebar__linkSvg" />
            <span className="agentSidebar__link">Днепр</span>
          </div>
          <div className="agentSidebarBalance">
            <div className="agentSidebarBalance__title">Баланс:</div>
            <LinkToModal
              queryParam="payment"
              state={{ activeTab: 0, money: '19.10' }}
            >
              <div className="agentSidebarBalance__content">
                <div>
                  <div className="agentSidebarBalance__price">19.10₴</div>
                  <div className="agentSidebarBalance__plan">
                    <div>«Индивидуальный»</div>
                    <div>до 22 октября 2018</div>
                  </div>
                </div>
                <Plus />
              </div>
            </LinkToModal>
          </div>

          <div>
            <span className="colorfulOperation colorfulOperation_green agentSidebar__requestType">
              ПРОДАЖА
            </span>
            <span className="agentSidebar__requestObject">Дома</span>
          </div>
          <div className="agentSidebar__addresses">
            г. Днипро, Соборный р-н Победы 1, Победы 2, Победы 3, Победы 4
          </div>
        </div>
      </div>
    );
  }
}

export default AgentSidebar;
