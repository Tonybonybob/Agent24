import React from 'react';
import PropTypes from 'prop-types';

const Condominium = ({ stroke, fill, ...other }) => (
  <svg {...other} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 8L0 0L8.5 2L11 11L1.5 8Z" transform="translate(6.5 6.50024)" fill={fill} />
    <circle cx="9" cy="9" r="8" transform="translate(6 0.000244141)" stroke={stroke} strokeWidth="2" />
    <circle cx="9" cy="9" r="8" transform="translate(0 6.00024)" stroke={stroke} strokeWidth="2" />
  </svg>
);

Condominium.propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string,
};

Condominium.defaultProps = {
  stroke: '#0097A7',
  fill: '#0097A7',
};

export default Condominium;
