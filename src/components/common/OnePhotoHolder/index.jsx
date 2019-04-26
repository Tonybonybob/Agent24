import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const OnePhotoHolder = ({ url }) => (
  <div className="onePhotoHolder">
    <div className="onePhotoHolder__photo" style={{ backgroundImage: `url(${url})` }} />
  </div>
);

OnePhotoHolder.propTypes = {
  url: PropTypes.string.isRequired,
};

export default OnePhotoHolder;
