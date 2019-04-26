import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
const RadioFilters = ({ items, active, onChange }) => (
  <div className="radioFilters">
    {items.map(({ value, name }) => (
      <div
        className={`radioFilters__item ${value === active ? 'radioFilters__item_active' : ''}`}
        onClick={() => onChange(value)}
      >
        {name}
      </div>
    ))}
  </div>
);

RadioFilters.propTypes = {
  active: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

RadioFilters.defaultProps = {
  items: [],
  onChange: () => { },
};

export default RadioFilters;
