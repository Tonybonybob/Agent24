import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Link, Route, Redirect } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import StickyBox from 'react-sticky-box';

import authGuard from '../../guards/AuthGuard';
import GeneralLayout from '../../layouts/GeneralLayout/index';
import SideBarInfo from '../../components/general/SideBarInfo';
import ClientRequests from './ClientRequests';
import ClientHistory from './ClientHistory';
import ClientComments from './ClientComments';
import ClientArchive from './ClientArchive';
import { Button } from '../../components/general/Button';
import { loadClientAsyncAction } from '../../store/actions/client';
import StickyBox from '../../components/common/StickyBox';
import { getClientInfo } from '../../store/reducers/client';
import { withSizes } from '../../utils';
import Plus from '../../assets/Plus';

import './style.scss';
class ClientPage extends Component {
  constructor(props) {
    super(props);

    this.navLinks = [
      {
        label: 'Запросы',
        url: '/requests',
      },
      {
        label: 'История',
        url: '/history',
      },
      {
        label: 'Коментарии',
        url: '/comments',
      },
      {
        label: 'Архив Заявок',
        url: '/archive',
      },
    ];

    this.goToNewRequest = this.goToNewRequest.bind(this);
  }

  componentDidMount() {
    const { loadClient, match } = this.props;

    loadClient(match.params.id);
  }

  redirect() {
    const {
      location: { pathname },
      match,
    } = this.props;
    let path = '';
    if (pathname === match.url) {
      const firstLink = this.navLinks[0].url;
      path =
        pathname[pathname.length - 1] === '/' ? firstLink.substr(1) : firstLink;
    }
    return path && <Redirect to={`${match.url}${path}`} />;
  }

  goToNewRequest() {
    const { match, location, history } = this.props;

    history.push({
      pathname: `${match.url}/requests/new`,
      search: location.search,
    });
  }

  renderTabs() {
    const { match, location } = this.props;
    const valueId =
      this.navLinks.find(el => location.pathname.includes(el.url)) ||
      this.navLinks[0];
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

  renderSideBarInfo() {
    const { isDesktop, client } = this.props;

    return isDesktop ? (
      <StickyBox alwaysStyle={{ zIndex: 0 }}>
        <div className="page__sidebar">
          <SideBarInfo profileType="client" user={client} />
        </div>
      </StickyBox>
    ) : (
      <div className="page__sidebar">
        <SideBarInfo profileType="client" user={client} />
      </div>
    );
  }

  render() {
    const { match, location, isSmallMobile } = this.props;
    const showNewRequestButton = location.pathname.includes(
      `${match.url}/requests`
    );

    return (
      <GeneralLayout>
        {this.redirect()}
        <div className="page">
          {this.renderSideBarInfo()}
          <div className="page__content">
            <div className="page__content__nav">
              {this.renderTabs()}
              {showNewRequestButton && !isSmallMobile && (
                <Button
                  className="navButton"
                  onClick={this.goToNewRequest}
                  disabled={location.pathname === `${match.url}/requests/new`}
                >
                  <span className="navButton__icon">
                    <Plus />
                  </span>
                  <span className="navButton__text">Новый запрос</span>
                </Button>
              )}
            </div>
            <Route path={`${match.url}/requests`} component={ClientRequests} />
            <Route path={`${match.url}/history`} component={ClientHistory} />
            <Route path={`${match.url}/comments`} component={ClientComments} />
            <Route path={`${match.url}/archive`} component={ClientArchive} />
          </div>
        </div>
      </GeneralLayout>
    );
  }
}

ClientPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  loadClient: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  client: getClientInfo(state),
});

const mapDispatchToProps = dispatch => ({
  loadClient: id => dispatch(loadClientAsyncAction(id)),
});

export default compose(
  authGuard({ redirectTo: '/signin' }),
  withSizes,
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ClientPage);
