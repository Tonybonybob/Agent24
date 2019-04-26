import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Values } from 'redux-form-website-template';

import Logo from '../../assets/Logo';
import './style.scss';
const AuthLayout = ({ children }) => (
  <div className="authLayout">
    <Link to="/">
      <Logo />
    </Link>
    <div className="authLayout__content">
      {children}
    </div>
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
