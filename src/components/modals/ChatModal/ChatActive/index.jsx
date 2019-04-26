import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';

import Message from './Message';
import TextFieldPlane from '../../../common/TextFieldPlane';
import { normalizeDate } from '../../../../utils';
import './style.scss';
class ChatActive extends Component {
  constructor(props) {
    super(props);
    this.userId = 87;
    this.lastRenderedMessageTime = false;
    this.messages = [
      {
        messageId: 0,
        message: 'Добрый день!',
        id: 59,
        time: 1526285428,
      },
      {
        messageId: 1,
        message: 'Здравствуйте!',
        id: 87,
        time: 1526292628,
      },
      {
        messageId: 2,
        message: 'Можете подобрать мне квартиру?',
        id: 59,
        time: 1532599828,
      },
      {
        messageId: 3,
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text'
          + 'ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not'
          + 'only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged?',
        id: 59,
        time: 1532600188,
      },
      {
        messageId: 4,
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text'
          + 'ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not'
          + 'only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged?',
        id: 87,
        time: 1532600188,
      },
      {
        messageId: 5,
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text'
          + 'ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not'
          + 'only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged?',
        id: 59,
        time: 1534234322,
      },
    ];
    this.scrollBar = React.createRef();
  }

  componentDidMount() {
    this.scrollBar.current.scrollToBottom();
  }

  renderSeparator(last, curr, id) {
    let separator = false;
    if (curr) {
      console.log(1);
      if (!last.isSame(curr, 'd')) {
        console.log(2);
        separator = this.messages[id].time;
      }
    } else if (id === 0) {
      console.log(3);
      separator = this.messages[0].time;
    }
    return separator && (
      <li>
        {normalizeDate(separator)}
      </li>
    );
  }

  renderMessages() {
    this.lastRenderedMessageTime = false;
    return this.messages.map((message, key) => {
      const lastMessageDate = moment.unix(message.time);
      const currentMessageDate = this.lastRenderedMessageTime
        ? moment.unix(this.lastRenderedMessageTime)
        : false;
      this.lastRenderedMessageTime = message.time;
      return (
        <Fragment key={message.messageId}>
          {this.renderSeparator(lastMessageDate, currentMessageDate, key)}
          <Message
            message={message}
            userId={this.userId}
          />
        </Fragment>
      );
    });
  }

  render() {
    return (
      <div className="chatActive">
        <div className="chatActive__messagesHolder">
          <Scrollbars ref={this.scrollBar}>
            <ul className="chatActive__messages">
              {this.renderMessages()}
            </ul>
          </Scrollbars>
        </div>
        <div className="chatActive__controlPanel">
          <TextFieldPlane
            name="message"
            placeholder="Сообщение"
          />
        </div>
      </div>
    );
  }
}

export default ChatActive;
