import React from 'react';
import PropTypes from 'prop-types';

const InputEnter = ({ fill, ...other }) => (
  <svg {...other} style={{ cursor: 'pointer' }} width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 16L18 8L0 0V6.22222L12.8571 8L0 9.77778V16Z" fill={fill} />
  </svg>
);

InputEnter.propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string,
};

InputEnter.defaultProps = {
  fill: '#D0D8DC',
  stroke: '',
};

export default InputEnter;
