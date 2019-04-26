import React from 'react';
import PropTypes from 'prop-types';

const Video = ({ fill, ...other }) => (
  <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12.191V1.80902C1 1.43733 1.39116 1.19558 1.72361 1.3618L12.1056 6.55279C12.4741 6.73705 12.4741 7.26295 12.1056 7.44721L1.72361 12.6382C1.39116 12.8044 1 12.5627 1 12.191Z" stroke={fill}/>
  </svg>
);

Video.propTypes = {
  fill: PropTypes.string,
};

Video.defaultProps = {
  fill: '#999999',
};

export default Video;
