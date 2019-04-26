import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { NavLink, withRouter } from 'react-router-dom';

import { withSizes } from '../../../utils';
import Hamburger from './Hamburger';
import LinkToModal from '../../common/LinkToModal';
import Logo from '../../../assets/Logo';
import CalendarIcon from '../../../assets/CalendarIcon';
import AddClientIcon from '../../../assets/AddClientIcon';
import MessagesIcon from '../../../assets/MessagesIcon';
import SearchBar from '../../common/SearchBar';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
  renderLinks() {
    const { isDesktopLarge } = this.props;
    return (
      <Fragment>
        {!isDesktopLarge && (
          <LinkToModal
            queryParam="calendar"
            className="header__item header__item_calendar"
          >
            <CalendarIcon />
          </LinkToModal>
        )}

        <LinkToModal
          queryParam="addClient"
          className="header__item header__item_client"
        >
          <AddClientIcon />
        </LinkToModal>

        <LinkToModal
          queryParam="messages"
          className="header__item"
        >
          <MessagesIcon />
        </LinkToModal>
      </Fragment>
    );
  }

  render() {
    const {
      toggleNav, isNavOpen, isDesktop, signOut,
      isMobile, showUserMenu, toggleUserMenu,
    } = this.props;

    return (
      <div className="header">
        {!isDesktop && (
          <div className="header__item header__item_hamburger" onClick={toggleNav}>
            <Hamburger open={isNavOpen} />
          </div>
        )}

        {isMobile && (
          <NavLink to="/" className="header__item">
            <Logo />
          </NavLink>
        )}

        {isDesktop && (
          <SearchBar
            name="websiteSearch"
            className="header__searchBar"
          />
        )}

        {this.renderLinks()}

        <div
          className="header__item header__item_profile"
          onClick={toggleUserMenu}
        >
          <div className="header__profile">
            <img
              className="header__profilePicture"
              src="https://randomuser.me/api/portraits/men/52.jpg"
              alt="profile"
            />
            <div className={`header__profileDropdown ${showUserMenu ? 'header__profileDropdown_active' : ''}`}>
              <NavLink className="header__profileDropdownItem" to="/profile">
                Профиль
              </NavLink>
              <div className="header__profileDropdownItem" onClick={() => signOut()}>
                Выйти
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isDesktopLarge: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  showUserMenu: PropTypes.bool.isRequired,
  toggleUserMenu: PropTypes.func.isRequired,
};

export default compose(
  withSizes,
  reduxForm({
    form: 'HeaderSearchForm',
  }),
  withRouter,
)(Header);
