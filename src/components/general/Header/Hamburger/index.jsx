import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
const Hamburger = ({ open }) => (
  <div className={`hamburger ${open ? 'hamburger_open' : ''}`}>
    <span className="hamburger__item hamburger__item_first" />
    <span className="hamburger__item hamburger__item_middle" />
    <span className="hamburger__item hamburger__item_last" />
  </div>
);

Hamburger.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default Hamburger;
