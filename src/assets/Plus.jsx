import React from 'react';
import PropTypes from 'prop-types';

const Plus = ({ fill, ...other }) => (
  <svg style={{ cursor: 'pointer' }} {...other} width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5 0V5H0V6.66667H5V11.6667H6.66667V6.66667H11.6667V5H6.66667V0H5Z" transform="translate(0.166016 0.81665)" fill={fill} />
  </svg>
);

Plus.propTypes = {
  fill: PropTypes.string,
};

Plus.defaultProps = {
  fill: '#D0D8DC',
};

export default Plus;
