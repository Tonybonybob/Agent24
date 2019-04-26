import React, { Component } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { Link, withRouter, Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';

import GeneralLayout from '../../layouts/GeneralLayout';
import { withSizes } from '../../utils';
import SideBarInfo from '../AgentProfilePage/SidebarInfo';
import StickyBox from '../../components/common/StickyBox';
import Plus from '../../assets/Plus';
import { Button } from '../../components/general/Button';
import AgencyProfile from './AgencyProfile';
import AgencyEmployees from './AgencyEmployees';
import AgencyServices from './AgencyServices';
import AgencyPayments from './AgencyPayments';

class AgencyPage extends Component {
  constructor(props) {
    super(props);

    this.navLinks = [
      {
        label: 'ПРОФИЛЬ АН',
        url: '/profile',
      },
      {
        label: 'СОТРУДНИКИ',
        url: '/employees',
      },
      {
        label: 'СЕРВИСЫ',
        url: '/services',
      },
      {
        label: 'ОПЛАТЫ',
        url: '/payments',
      },
    ];
  }

  redirect() {
    const { location: { pathname }, match } = this.props;

    let path = '';
    if (pathname === match.url) {
      const firstLink = this.navLinks[0].url;
      path = pathname[pathname.length - 1] === '/' ? firstLink.substr(1) : firstLink;
    }
    return path && <Redirect to={`${match.url}${path}`} />;
  }

  renderTabs() {
    const { match, location } = this.props;

    const valueId = this.navLinks.find(el => location.pathname.includes(el.url))
      || this.navLinks[0];
    return (
      <div className="tabs">
        <Tabs
          value={this.navLinks.indexOf(valueId)}
          indicatorColor="primary"
          textColor="primary"
          fullWidth={false}
          classes={{
            root: 'tabs__container',
          }}
        >
          {this.navLinks.map(el => (
            <Tab
              fullWidth={false}
              key={el.url}
              label={el.label}
              to={`${match.url}${el.url}`}
              component={Link}
              disableTouchRipple
              classes={{
                root: 'tabs__item',
                selected: 'tabs__item_selected',
                labelContainer: 'tabs__labelWrapper',
                label: 'tabs__label',
              }}
            />
          ))}
        </Tabs>
      </div>
    );
  }

  renderSidebarInfo() {
    const { isDesktop } = this.props;

    return isDesktop
      ? (
        <StickyBox alwaysStyle={{ zIndex: 0 }}>
          <div className="agentProfile__sidebar">
            <SideBarInfo profileType="client" />
          </div>
        </StickyBox>
      )
      : (
        <div className="agentProfile__sidebar">
          <SideBarInfo profileType="client" />
        </div>
      );
  }

  render() {
    const { match } = this.props;

    return (
      <GeneralLayout>
        {this.redirect()}
        <div className="agentProfile">
          {this.renderSidebarInfo()}
          <div className="agentProfile__content">
            <div className="agentProfile__tabsWrapper">
              {this.renderTabs()}
              <Button className="agentProfile__addButton" buttonType="add">
                19.10 ₴
                <Plus />
              </Button>
            </div>
            <Route path={`${match.url}/profile`} component={AgencyProfile} />
            <Route path={`${match.url}/employees`} component={AgencyEmployees} />
            <Route path={`${match.url}/services`} component={AgencyServices} />
            <Route path={`${match.url}/payments`} component={AgencyPayments} />
          </div>
        </div>
      </GeneralLayout>
    );
  }
}

export default compose(
  withSizes,
  withRouter,
)(AgencyPage);
