import React from 'react';
import PropTypes from 'prop-types';

const CrownIcon = ({ color }) => (
  <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.051 5.949C17.6257 6.37432 16.9238 6.33063 16.5545 5.85584L12.7894 1.01488C12.389 0.500135 11.611 0.500136 11.2106 1.01488L7.44546 5.85584C7.07618 6.33063 6.37433 6.37433 5.949 5.949L1.9809 1.9809C1.31637 1.31637 0.185238 1.85238 0.27875 2.7875L1.40995 14.0995C1.46107 14.6107 1.89124 15 2.40499 15H21.595C22.1088 15 22.5389 14.6107 22.59 14.0995L23.7212 2.78751C23.8148 1.85239 22.6836 1.31637 22.0191 1.98089L18.051 5.949Z" fill={color} />
  </svg>
);

CrownIcon.propTypes = {
  color: PropTypes.string,
};

CrownIcon.defaultProps = {
  color: '#D0D8DC',
};

export default CrownIcon;
