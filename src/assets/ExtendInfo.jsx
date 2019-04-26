import React from 'react';
import PropTypes from 'prop-types';

const ShrinkInfo = ({ fill, ...other }) => (
  <svg style={{ cursor: 'pointer' }} {...other} width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M7.6 0L4 3.6L0.4 0L0 0.4L4 4.4L8 0.4L7.6 0Z" fill={fill} />
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
