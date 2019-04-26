import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';

import { userLoadAsyncAction } from '../../store/actions/user';
import { signOutAsyncAction } from '../../store/actions/auth';
import {
  loadAllAttributesAsyncAction,
  loadAllStatesAsyncAction,
  loadEstateStatusAttributesAsyncAction,
} from '../../store/actions/attributes';
import {
  getAttributes,
  getStates,
  getEstateStatus,
} from '../../store/reducers/attributes';
import { withSizes } from '../../utils';
import Header from '../../components/general/Header';
import Nav from '../../components/general/Nav';
import Notification from '../../components/general/Notification';
import StickyBox from '../../components/common/StickyBox';
import Modal from '../../components/common/Modal';
import AddClient from '../../components/modals/AddClient';
import CalendarModal from '../../components/modals/CalendarModal';
import RealtorModal from '../../components/modals/RealtorModal';
import CloseModal from '../../components/modals/CloseModal';
import ErrorModal from '../../components/modals/ErrorModal';
import CalendarAside from '../../components/general/AsideCalendar';
import ChatModal from '../../components/modals/ChatModal';
import NewDialogModal from '../../components/modals/NewDialogModal';
import CoownershipModal from '../../components/modals/CoownershipModal';
import { getCurrentNotification } from '../../store/reducers/notification';
import { getUser } from '../../store/reducers/user';
import { getFilterOpened } from '../../store/reducers/filters';
import { loadAreaSuggestions } from '../../store/actions/newRequest';
import PaymentModal from '../../components/modals/PaymentModal';
import PayServiceModal from '../../components/modals/PayServiceModal';
import './style.scss';
class GeneralLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
      contentClass: false,
      modals: [],
      showUserMenu: false,
    };

    this.SideNav = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  componentDidMount() {
    const { modals } = this.state;

    const {
      loadUser,
      location,
      attributes,
      loadAllAttributes,
      loadAllStates,
      states,
      loadAreas,
    } = this.props;

    if (!attributes) {
      loadAllAttributes();
    }

    if (!states) {
      loadAllStates();
    }

    // if (!status) {
    //   loadEstateStatus();
    // }

    loadUser();
    loadAreas();

    const queryString = qs.parse(location.search) || {};
    const newModals = 'modals' in queryString ? queryString.modals : [];

    if (newModals instanceof Array && newModals.join('') !== modals.join('')) {
      this.setState({ modals: newModals });
    } else if (
      !Array.isArray(newModals) &&
      newModals &&
      newModals !== modals.join('')
    ) {
      // if only one modal
      this.setState({ modals: [newModals] });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot && Object.keys(snapshot).length > 0) {
      this.setState(snapshot);
    }
  }

  getSnapshotBeforeUpdate() {
    const { modals } = this.state;
    const { location } = this.props;

    let returnObject = {};

    const queryString = qs.parse(location.search) || {};
    const newModals = 'modals' in queryString ? queryString.modals : [];
    if (newModals instanceof Array && newModals.join('') !== modals.join('')) {
      returnObject = { modals: newModals };
    } else if (
      !Array.isArray(newModals) &&
      newModals &&
      newModals !== modals.join('')
    ) {
      // if only one modal
      return { modals: [newModals] };
    }

    return returnObject;
  }

  handleClickOutside(e) {
    const { showNav, showUserMenu } = this.state;

    if (showNav && !this.SideNav.current.contains(e.target)) {
      this.setState({ showNav: false });
      setTimeout(() => this.setState({ contentClass: false }), 150);
    }
    if (showUserMenu) {
      this.setState({ showUserMenu: false });
    }
  }

  toggleNav() {
    const { showNav } = this.state;
    if (showNav) {
      this.setState({ showNav: !showNav });
      setTimeout(() => this.setState({ contentClass: false }), 150);
    } else {
      this.setState({ showNav: !showNav, contentClass: true });
    }
  }

  renderModals() {
    const { modals } = this.state;
    const { isDesktopLarge } = this.props;

    const modalsList = [
      {
        name: 'calendar',
        content: isDesktopLarge ? <CalendarModal /> : <CalendarAside />,
        className: isDesktopLarge && 'modal__item--noSetWidth',
      },
      {
        name: 'addClient',
        content: <AddClient />,
        showCloseButton: true,
        className: 'modal__item--noSetWidth',
      },
      {
        name: 'messages',
        content: <ChatModal />,
        className: 'modal__item--noSetWidth',
      },
      {
        name: 'realtorIsRealtor',
        content: <RealtorModal />,
        showCloseButton: true,
        className: 'modal__item--noSetWidth modal__item--centerTop',
      },
      {
        name: 'realtorClosed',
        content: <CloseModal />,
        showCloseButton: true,
        className: 'modal__item--noSetWidth modal__item--centerTop',
      },
      {
        name: 'realtorError',
        content: <ErrorModal />,
        showCloseButton: true,
        className: 'modal__item--noSetWidth modal__item--centerTop',
      },
      {
        name: 'realtorCoownership',
        content: <CoownershipModal />,
        showCloseButton: true,
        className: 'modal__item--noSetWidth modal__item--centerTop',
      },
      {
        name: 'payService',
        content: <PayServiceModal />,
        className: 'modal__item--noSetWidth modal__item--centerTop',
      },
      {
        name: 'payment',
        content: <PaymentModal />,
        className: 'modal__item--noSetWidth',
      },
      {
        name: 'newDialog',
        content: <NewDialogModal />,
      },
    ];

    return modalsList.map(
      modal =>
        modals.includes(modal.name) && (
          <Modal
            key={modal.name}
            className={modal.className || ''}
            showCloseButton={modal.showCloseButton || false}
          >
            {modal.content}
          </Modal>
        )
    );
  }

  render() {
    const { showNav, contentClass, showUserMenu } = this.state;
    const {
      children,
      isDesktopLarge,
      signOut,
      showModal,
      notification,
      filterOpened,
      isDesktopExtraLarge,
      isDesktop,
    } = this.props;

    const widgets = isDesktopLarge &&
      (isDesktopExtraLarge ? true : !filterOpened) && (
        <div className="generalLayout__widgets">
          <CalendarAside />
        </div>
      );

    return (
      <div className="generalLayout" onClick={this.handleClickOutside}>
        <div
          className={`generalLayout__container ${
            showModal ? 'generalLayout__container_locked' : ''
          }`}
        >
          <div className="generalLayout__header">
            <Header
              isNavOpen={showNav}
              toggleNav={() => this.toggleNav()}
              signOut={() => signOut()}
              showUserMenu={showUserMenu}
              toggleUserMenu={() =>
                this.setState({ showUserMenu: !showUserMenu })
              }
            />
            {notification && <Notification notification={notification} />}
          </div>
          <div className="generalLayout__wrapper">
            <div
              className={`generalLayout__nav ${
                showNav ? 'generalLayout__nav_open' : ''
              }`}
              ref={this.SideNav}
            >
              {isDesktop ? (
                <StickyBox>
                  <Nav />
                </StickyBox>
              ) : (
                <Nav />
              )}
            </div>
            <div
              className={`generalLayout__contentWrapper ${
                contentClass ? 'generalLayout__contentWrapper_isNav' : ''
              }`}
            >
              <div className="generalLayout__content">{children}</div>
            </div>
            <StickyBox style={{ right: 0 }}>{widgets}</StickyBox>
          </div>
        </div>
        {this.renderModals()}
      </div>
    );
  }
}

GeneralLayout.propTypes = {
  children: PropTypes.node.isRequired,
  loadUser: PropTypes.func.isRequired,
  isDesktopLarge: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  notification: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ]).isRequired,
  showModal: PropTypes.bool,
  filterOpened: PropTypes.bool.isRequired,
};

GeneralLayout.defaultProps = {
  showModal: false,
};

const mapStateToProps = state => ({
  notification: getCurrentNotification(state),
  user: getUser(state),
  attributes: getAttributes(state),
  states: getStates(state),
  estateStatus: getEstateStatus(state),
  filterOpened: getFilterOpened(state),
});

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(userLoadAsyncAction()),
  signOut: () => dispatch(signOutAsyncAction()),
  loadAllAttributes: () => dispatch(loadAllAttributesAsyncAction()),
  loadEstateStatus: () => dispatch(loadEstateStatusAttributesAsyncAction()),
  loadAllStates: () => dispatch(loadAllStatesAsyncAction()),
  loadAreas: () => dispatch(loadAreaSuggestions()),
});

export default compose(
  withRouter,
  withSizes,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(GeneralLayout);
