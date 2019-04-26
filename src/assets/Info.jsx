import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ fill, ...other }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...other}>
    <circle cx="7" cy="7" r="6.3" stroke={fill} strokeWidth="1.4" />
    <path d="M1.08853 2.02606C1.68971 2.02606 2.17706 1.57251 2.17706 1.01303C2.17706 0.453548 1.68971 0 1.08853 0C0.487351 0 0 0.453548 0 1.01303C0 1.57251 0.487351 2.02606 1.08853 2.02606Z" transform="translate(5.77344 3)" fill="#D0D8DC" />
    <path d="M3 5.01292H2.45012H0.549876H-2.28311e-07V3.65874H0.549876V1.35419H0.00748153V-2.12475e-07H0.549876H2.17706H2.45012V3.65874H3V5.01292Z" transform="translate(5.5 5.68707)" fill={fill} />
  </svg>
);

Info.propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string,
};

Info.defaultProps = {
  fill: '#D0D8DC',
  stroke: '',
};

export default Info;
