import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import ChatNav from './ChatNav';
import ChatList from './ChatList';
import ChatActive from './ChatActive';
import SideBarInfo from '../../general/SideBarInfo';
import './style.scss';
class ChatModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'messages',
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    const { activeTab } = this.state;
    const { closeModal, location } = this.props;

    const showChat = location.search && !!qs.parse(location.search).chatId;

    return (
      <div className="chatModal">
        <div className="chatModal__nav">
          <ChatNav
            activeTab={activeTab}
            onTabChange={this.handleTabChange}
            closeModal={closeModal}
          />
        </div>
        <div className="chatModal__body">
          <ChatList />
          {showChat
            ? <ChatActive />
            : <div className="chatModal__activePlaceholder" />
          }
          <aside className="chatModal__sidebarInfo">
            <Scrollbars>
              <SideBarInfo />
            </Scrollbars>
          </aside>
        </div>
      </div>
    );
  }
}

ChatModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({
    form: 'ChatForm',
  }),
  withRouter,
)(ChatModal);
