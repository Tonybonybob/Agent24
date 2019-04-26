import React from 'react';
import PropTypes from 'prop-types';

const ShrinkInfo = ({ fill, ...other }) => (
  <svg style={{ cursor: 'pointer' }} {...other} width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M0.4 5.34998L4 1.74998L7.6 5.34998L8 4.94998L4 0.949975L0 4.94998L0.4 5.34998Z" fill={fill} />
  </svg>
);

ShrinkInfo.propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string,
};

ShrinkInfo.defaultProps = {
  fill: '#000000',
  stroke: '',
};

export default ShrinkInfo;
