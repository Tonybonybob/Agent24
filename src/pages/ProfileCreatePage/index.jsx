import React, { Component } from 'react';

import Tabs from '../../components/common/Tabs';
import Logo from '../../assets/Logo';
import DefaultAvatar from '../../assets/DefaultAvatar';
import { withSizes } from '../../utils';
import AgentInfo from './Tabs/AgentInfo';
import RealtorStatus from './Tabs/RealtorStatus';
import CreateAgency from './Tabs/CreateAgency';
import ConfirmAgency from './Tabs/ConfirmAgency';
import './style.scss';
class ProfileCreatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
    };

    this.handleGoNextTab = this.handleGoNextTab.bind(this);
    this.handleGoPrevTab = this.handleGoPrevTab.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  renderTabContent(active, label) {
    return (
      <span>
        <i className={`check-icon ${active ? 'check-icon__active' : ''}`} />
        <span>
          {label}
        </span>
      </span>
    );
  }

  renderMobileTab(tab, active, label) {
    const { activeTab } = this.state;

    return (
      <div
        className={`profileCreate__mobileTab ${activeTab === tab ? 'profileCreate__mobileTab_active' : ''}`}
        onClick={() => this.setState({ activeTab: tab })}
      >
        {this.renderTabContent(active, label)}
      </div>
    );
  }

  renderTabs() {
    const { activeTab } = this.state;

    const navLinks = [
      {
        label: this.renderTabContent(false, 'Информация об агенте'),
        value: 'agent',
      },
      {
        label: this.renderTabContent(false, 'Статус Риелтор'),
        value: 'createRealtor',
      },
      {
        label: this.renderTabContent(false, 'Создать Агентство'),
        value: 'createAgency',
      },
      {
        label: this.renderTabContent(false, 'Подтвердить Агентство'),
        value: 'confirmAgency',
      },
    ];

    return (
      <Tabs
        fullWidth={false}
        activeTab={activeTab}
        change={(event, value) => this.setState({ activeTab: value })}
        navLinks={navLinks}
      />
    );
  }

  handleGoPrevTab() {
    this.setState(prevState => ({
      activeTab: prevState.activeTab ? prevState.activeTab - 1 : prevState.activeTab,
    }));
  }

  handleGoNextTab() {
    this.setState(prevState => ({
      activeTab: prevState.activeTab !== 3 ? prevState.activeTab + 1 : prevState.activeTab,
    }));
  }

  render() {
    const { activeTab } = this.state;

    const { isTablet } = this.props;

    return (
      <div className="profileCreate">
        <header className="profileCreate__header profileCreateHeader">
          <Logo />
          <span className="profileCreateHeader__image">
            <DefaultAvatar />
          </span>
        </header>
        <div className="profileCreate__content">
          {isTablet && (
            <div className="profileCreate__tabs">
              {this.renderTabs()}
            </div>
          )}
          {!isTablet && this.renderMobileTab(0, false, 'Информация об агенте')}
          {activeTab === 0 && <AgentInfo goNextTab={this.handleGoNextTab} />}
          {!isTablet && this.renderMobileTab(1, false, 'Статус Риелтор')}
          {activeTab === 1 && <RealtorStatus goPrevTab={this.handleGoPrevTab} goNextTab={this.handleGoNextTab} />}
          {!isTablet && this.renderMobileTab(2, false, 'Создать Агентство')}
          {activeTab === 2 && <CreateAgency goPrevTab={this.handleGoPrevTab} goNextTab={this.handleGoNextTab} />}
          {!isTablet && this.renderMobileTab(3, false, 'Подтвердить Агентство')}
          {activeTab === 3 && <ConfirmAgency goPrevTab={this.handleGoPrevTab} />}
        </div>
      </div>
    );
  }
}

export default withSizes(ProfileCreatePage);
