import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const TypeCard = ({ renderHeader, subText, type }) => (
  <div className={`typeCard typeCard_${type}`}>
    <h4 className="typeCard__header">{renderHeader()}</h4>
    <p className="typeCard__subText">{subText}</p>
  </div>
);

TypeCard.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  subText: PropTypes.string.isRequired,
  type: PropTypes.string,
};

TypeCard.defaultProps = {
  type: 'gray',
};

export default TypeCard;
