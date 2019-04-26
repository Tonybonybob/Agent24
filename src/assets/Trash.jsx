import React from 'react';
import PropTypes from 'prop-types';

const TrashIcon = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 3C13.8 3 14 2.8 14 2.5V1.5C14 1.2 13.8 1 13.5 1H9.75C9.6 1 9.5 0.9 9.5 0.75V0.5C9.5 0.2 9.3 0 9 0H5C4.7 0 4.5 0.2 4.5 0.5V0.75C4.5 0.9 4.4 1 4.25 1H0.5C0.2 1 0 1.2 0 1.5V2.5C0 2.8 0.2 3 0.5 3H13.5ZM1 4.5V13.5C1 13.8 1.2 14 1.5 14H12.5C12.8 14 13 13.8 13 13.5V4.5C13 4.2 12.8 4 12.5 4H11.5C11.2 4 11 4.2 11 4.5V11.75C11 11.9 10.9 12 10.75 12H3.25C3.1 12 3 11.9 3 11.75V4.5C3 4.2 2.8 4 2.5 4H1.5C1.2 4 1 4.2 1 4.5Z" fill={color} />
  </svg>
);

TrashIcon.propTypes = {
  color: PropTypes.string,
};

TrashIcon.defaultProps = {
  color: '#D0D8DC',
};

export default TrashIcon;
