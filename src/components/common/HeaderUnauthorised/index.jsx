import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import Logo from '../../../assets/Logo';
import { withSizes } from '../../../utils';
import Hamburger from '../../general/Header/Hamburger';
import LogoDark from '../../../assets/LogoDark';
import './style.scss';

// eslint-disable-next-line
class HeaderUnauthorised extends Component {
  render() {
    const { className, isDesktop, history, location } = this.props;

    const isNavOpen = location.hash === '#menu';

    return (
      <Fragment>
        {!isDesktop && (
          <div className={`headerMenu ${isNavOpen ? 'headerMenu_active' : ''}`} id="#menu">
            <div className="headerMenu__head">
              <NavLink
                to="/"
                className="headerUnauthorised__logo"
              >
                <LogoDark />
              </NavLink>
              <div onClick={() => history.goBack()}>
                <Hamburger open={isNavOpen} />
              </div>
            </div>
            <div className="headerMenu__links">
              <NavLink
                to="/investors"
                className="headerUnauthorised__specialLink"
                activeClassName="headerUnauthorised__specialLink_active"
              >
                Инвесторам
              </NavLink>
              <NavLink
                to="/cv"
                className="headerUnauthorised__specialLink"
                activeClassName="headerUnauthorised__specialLink_active"
              >
                Разработчикам
              </NavLink>
              <HashLink
                to="/#footer"
                className="headerUnauthorised__specialLink"
                smooth
              >
                Подписка
              </HashLink>
            </div>
            <div className="headerMenu__controls">
              <NavLink
                to="/signin"
                className="headerUnauthorised__link"
                activeClassName="headerUnauthorised__link_active"
              >
                Вход
            </NavLink>
            </div>
          </div>
        )}
        <div className={`container headerUnauthorised ${className}`}>
          <div>
            <NavLink
              to="/"
              className="headerUnauthorised__logo"
            >
              <Logo
                className="headerUnauthorised__logoImage"
              />
              <div
                className="headerUnauthorised__logoText"
              >
                Единая
                <br />
                Риелторская Сеть
              </div>
            </NavLink>
            {isDesktop && (
              <Fragment>
                <NavLink
                  to="/investors"
                  className="headerUnauthorised__specialLink"
                  activeClassName="headerUnauthorised__specialLink_active"
                >
                  Инвесторам
                </NavLink>
                <NavLink
                  to="/cv"
                  className="headerUnauthorised__specialLink"
                  activeClassName="headerUnauthorised__specialLink_active"
                >
                  Разработчикам
                </NavLink>
                <HashLink
                  to="/#footer"
                  className="headerUnauthorised__specialLink"
                  smooth
                >
                  Подписка
                </HashLink>
              </Fragment>
            )}
          </div>
          {!isDesktop && (
            <div onClick={() => history.push(`${location.pathname === '/' ? '' : location.pathname}/#menu`)}>
              <Hamburger open={isNavOpen} />
            </div>
          )}
          {isDesktop && (
            <div>
              <NavLink
                to="/signin"
                className="headerUnauthorised__link headerUnauthorised__link_login"
                activeClassName="headerUnauthorised__link_active"
              >
                Вход
              </NavLink>
              {/* <NavLink
                to="/signup"
                className="headerUnauthorised__link headerUnauthorised__link_register"
                activeClassName="headerUnauthorised__link_active"
              >
                Регистрация
              </NavLink> */}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

HeaderUnauthorised.propTypes = {
  className: PropTypes.string,
  isDesktop: PropTypes.bool.isRequired,
};

HeaderUnauthorised.defaultProps = {
  className: '',
};


export default compose(
  withSizes,
  withRouter,
)(HeaderUnauthorised);
