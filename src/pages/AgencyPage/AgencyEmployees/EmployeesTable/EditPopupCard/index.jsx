import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const EditPopup = ({ className, items, onClick }) => (
  <div className={`editPopupCard ${className}`}>
    {items.map(el => (
      <div
        key={el.value}
        className="editPopupCard__item"
        onClick={() => onClick(el.value)}
      >
        {el.name}
      </div>
    ))}
  </div>
);

EditPopup.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

EditPopup.defaultProps = {
  className: '',
  onClick: () => {},
  items: [],
};

export default EditPopup;
