import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import Tabs from '../../../common/Tabs';
import { normalizeDate } from '../../../../utils/databaseToText';
import { Button } from '../../../general/Button';
import LinkToModal from '../../../common/LinkToModal';
import './style.scss';
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };

    this.tabs = [
      {
        label: 'Все',
        value: 'all',
      },
      {
        label: 'Клиенты',
        value: 'clients',
      },
      {
        label: 'Мое АН',
        value: 'myREA',
      },
    ];
    this.chatList = [
      {
        name: 'Михаил',
        lastMessage: 'Привет!',
        time: 1533907975,
        isClient: true,
        isFavourite: true,
        verified: true,
        lastFrom: 59,
        accountId: 59,
        chatId: 3,
        photoPreview: 'https://randomuser.me/api/portraits/men/78.jpg',
      },
      {
        name: 'Николай',
        lastMessage: 'Привет!',
        time: 1533677975,
        isClient: true,
        isFavourite: true,
        verified: true,
        lastFrom: 59,
        accountId: 59,
        chatId: 4,
        photoPreview: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    ];

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(e, value) {
    this.setState({ activeTab: value });
  }

  handleChatChange(id) {
    const { location, history } = this.props;
    const queryString = location.search ? qs.parse(location.search) : {};
    history.push({
      pathname: location.pathname,
      search: qs.stringify({
        ...queryString,
        chatId: id,
      }),
    });
    console.log({
      pathname: location.pathname,
      search: qs.stringify({
        ...queryString,
        chatId: id,
      }),
    });
  }

  renderChats() {
    const { activeTab } = this.state;
    let filteredChatList;
    switch (activeTab) {
      case 1:
        filteredChatList = this.chatList.filter(el => el.isClient);
        break;
      case 2:
        filteredChatList = this.chatList.filter(el => !el.isClient);
        break;
      default:
        filteredChatList = this.chatList;
    }
    return filteredChatList.map(chat => (
      <li
        key={chat.chatId}
        className="chatListItem"
        onClick={() => this.handleChatChange(chat.chatId)}
      >
        <div className="chatListItem__avatar">
          <img src={chat.photoPreview} alt="" />
        </div>
        <div className="chatListItem__content">
          <h4 className="chatListItem__name">
            {chat.name}
          </h4>
          <div className="chatListItem__message">
            {chat.lastMessage}
          </div>
        </div>
        <div>
          <span className="chatListItem__time">
            {normalizeDate(chat.time)}
          </span>
        </div>
      </li>
    ));
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div className="chatList">
        <div className="chatList__tabs">
          <Tabs
            activeTab={activeTab}
            change={this.handleTabChange}
            navLinks={this.tabs}
            fullWidth={false}
          />
        </div>
        <Scrollbars>
          <ul className="chatList__chats">
            {this.renderChats()}
          </ul>
        </Scrollbars>
        <div className="chatList__footer">
          <LinkToModal queryParam="newDialog">
            <Button>
              Новый диалог
            </Button>
          </LinkToModal>
        </div>
      </div>
    );
  }
}

export default withRouter(ChatList);
