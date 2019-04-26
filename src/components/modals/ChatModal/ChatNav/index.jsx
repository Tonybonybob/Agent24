import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../../../common/SearchBar';
import MessagesIcon from '../../../../assets/MessagesIcon';
import './style.scss';
const ChatNav = ({ activeTab, onTabChange, closeModal }) => {
  const tabs = [
    {
      name: 'messages',
      icon: <MessagesIcon />,
    },
    {
      name: 'notifications',
      icon: <MessagesIcon />,
    },
  ];
  return (
    <nav className="chatNav">
      <div className="chatNav__tabs">
        {tabs.map(tab => (
          <div
            className={`chatNav__tabItem ${activeTab === tab.name ? 'chatNav__tabItem-active' : ''}`}
            onClick={() => onTabChange(tab.name)}
          >
            <div className="chatNav__tabIcon">
              {tab.icon}
            </div>
            <h4 className="chatNav__tabName">
              {tab.name}
            </h4>
          </div>
        ))}
      </div>
      <h2 className="chatNav__name">
        Константин
      </h2>
      <SearchBar
        className="chatNav__search"
        name="searchDialogsValue"
      />
      <div
        onClick={closeModal}
      >
        close
      </div>
    </nav>
  );
};

ChatNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ChatNav;
