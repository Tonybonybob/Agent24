import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
const SmallPersonBlock = ({ person, className }) => (
  <div className={`smallPersonBlock ${className}`}>
    <img className="smallPersonBlock__photo" src={person.img} alt="" />
    <div className="smallPersonBlock__content">
      <div className="smallPersonBlock__firstline">
        <span className="smallPersonBlock__name">
          {person.name}
        </span>
        <span className="smallPersonBlock__id">
          {person.id}
        </span>
      </div>
      <div className="smallPersonBlock__phone">
        {person.phone}
      </div>
    </div>
  </div>
);

SmallPersonBlock.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    img: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
};

SmallPersonBlock.defaultProps = {
  className: '',
};

export default SmallPersonBlock;
