import React from 'react';
import PropTypes from 'prop-types';

const Condominium = ({ fill, ...other }) => (
  <svg {...other} width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 0C5.10547 0 3.38281 0.556641 2.10938 1.48828C0.833984 2.41797 0 3.75391 0 5.25C0 7.06445 1.23633 8.59961 3 9.52539V13L6.37305 10.4688C6.57812 10.4844 6.78516 10.5 7 10.5C8.89453 10.5 10.6172 9.94336 11.8906 9.01367C13.166 8.08203 14 6.74609 14 5.25C14 3.75391 13.166 2.41797 11.8906 1.48828C10.6172 0.556641 8.89453 0 7 0ZM7 1C8.69531 1 10.2227 1.50781 11.3008 2.29492C12.3789 3.08203 13 4.12305 13 5.25C13 6.37695 12.3789 7.41797 11.3008 8.20508C10.2227 8.99219 8.69531 9.5 7 9.5C6.75391 9.5 6.50781 9.48633 6.26172 9.46289L6.07031 9.44727L4 11V8.92969L3.71094 8.79688C2.03516 8.00977 1 6.69336 1 5.25C1 4.12305 1.62109 3.08203 2.69922 2.29492C3.77734 1.50781 5.30469 1 7 1Z" transform="translate(0 0.000854492)" fill={fill} />
  </svg>
);

Condominium.propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string,
};

Condominium.defaultProps = {
  fill: '#999999',
  stroke: '',
};

export default Condominium;
