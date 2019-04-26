import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Comments from '../../../components/common/Comments';
import Tabs from '../../../components/common/Tabs';
import './style.scss';
class Messages extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      image: PropTypes.string,
      text: PropTypes.string,
      date: PropTypes.string,
      author: PropTypes.string,
    })),
    communityMessages: PropTypes.arrayOf(PropTypes.shape({
      image: PropTypes.string,
      text: PropTypes.string,
      date: PropTypes.string,
      author: PropTypes.string,
    })),
  }

  static defaultProps = {
    messages: [],
    communityMessages: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      activeMessagesTab: 0,
    };

    this.scrollbarRef = React.createRef();

    this.messagesLinks = [
      {
        label: 'Комментарии сообщества',
        value: 'community',
      },
      {
        label: 'Аккаунта',
        value: 'my',
      },
    ];
  }

  render() {
    const {
      communityMessages, messages, isClient, setCommentValue,
    } = this.props;

    const { activeMessagesTab } = this.state;

    return (
      <div className="objectInfoMessages__tabs">
        <Tabs
          fullWidth={false}
          activeTab={activeMessagesTab}
          change={(event, value) => this.setState({ activeMessagesTab: value })}
          navLinks={this.messagesLinks}
        />
        <div className="objectInfoMessages__messages">
          {activeMessagesTab === 0 && communityMessages && (
            <Comments
              comments={communityMessages}
              setCommentValue={setCommentValue}
              isClient={isClient}
              global
              fieldName="communityComment"
            />
          )}
          {activeMessagesTab === 1 && messages && (
            <Comments
              comments={messages}
              setCommentValue={setCommentValue}
              isClient={isClient}
              global={false}
              fieldName="comment"
            />
          )}
        </div>
      </div>
    );
  }
}

export default Messages;
