import React from 'react';
import PropTypes from 'prop-types';

const ArrowBack = ({ fill, ...other }) => (
  <svg style={{ cursor: 'pointer' }} {...other} width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="12.2702" height="20.6615" fill="black" fillOpacity="0" transform="translate(0.570312 0.57312)" />
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="13" height="22">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.3298 0.985389L0.965966 9.97535C0.438428 10.4811 0.438428 11.3254 0.965966 11.8332L10.3298 20.821C10.904 21.3725 11.8106 21.3725 12.3849 20.821C12.9924 20.2374 12.9924 19.2654 12.3849 18.6808L4.54243 11.1519C4.40016 11.0159 4.40016 10.7905 4.54243 10.6545L12.3849 3.12566C12.9924 2.54204 12.9924 1.57004 12.3849 0.985389C12.0972 0.711235 11.7275 0.57312 11.3579 0.57312C10.9871 0.57312 10.6174 0.711235 10.3298 0.985389Z" fill="white" />
    </mask>
    <g mask="url(#mask0)">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.3298 0.985389L0.965966 9.97535C0.438428 10.4811 0.438428 11.3254 0.965966 11.8332L10.3298 20.821C10.904 21.3725 11.8106 21.3725 12.3849 20.821C12.9924 20.2374 12.9924 19.2654 12.3849 18.6808L4.54243 11.1519C4.40016 11.0159 4.40016 10.7905 4.54243 10.6545L12.3849 3.12566C12.9924 2.54204 12.9924 1.57004 12.3849 0.985389C12.0972 0.711235 11.7275 0.57312 11.3579 0.57312C10.9871 0.57312 10.6174 0.711235 10.3298 0.985389Z" fill={fill} />
    </g>
  </svg>
);

ArrowBack.propTypes = {
  fill: PropTypes.string,
};

ArrowBack.defaultProps = {
  fill: '#0097A7',
};

export default ArrowBack;
