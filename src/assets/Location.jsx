import React from 'react';
import PropTypes from 'prop-types';

const LocationIcon = ({ fill, ...other }) => (
  <svg {...other} width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="6.5" cy="6.5" rx="1.5" ry="1.5" fill={fill} />
    <path d="M12.25 6.5C12.25 8.05273 11.6125 9.50343 10.5088 10.9604C9.47708 12.3223 8.07464 13.6422 6.5 15.0096C4.92536 13.6422 3.52292 12.3223 2.49123 10.9604C1.38749 9.50343 0.75 8.05273 0.75 6.5C0.75 3.32436 3.32436 0.75 6.5 0.75C9.67564 0.75 12.25 3.32436 12.25 6.5Z" stroke={fill} strokeWidth="1.5" />
  </svg>
);

LocationIcon.propTypes = {
  fill: PropTypes.string,
};

LocationIcon.defaultProps = {
  fill: '#D0D8DC',
};

export default LocationIcon;
