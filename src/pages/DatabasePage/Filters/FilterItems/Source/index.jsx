import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../../../../../components/common/Checkbox';
import FilterItemWrapper from '../../FilterItemWrapper';

const Source = ({
  itemName, showItem, toggleShow, filterData, items
}) => {
  const templateShow = (
    <div className="filters__checkboxWrapper">
      {items.map(checkbox => (
        <Checkbox
          key={checkbox.name}
          onChange={() => setTimeout(filterData, 100)}
          name={checkbox.name}
          label={checkbox.label}
        />
      ))}
    </div>
  );

  const templateHide = (
    <div>
      {items.map(item => (
        item.isActive && (
          <div key={item.name} className="filterName filterName_active filterName_consec filterName_preshow">
            {item.label}
          </div>
        )
      ))}
    </div>
  );

  return (
    <FilterItemWrapper
      itemName={itemName}
      showItem={showItem}
      toggleShow={toggleShow}
      templateShow={templateShow}
      templateHide={templateHide}
      label="Источники"
    />
  );
};

Source.propTypes = {
  itemName: PropTypes.string.isRequired,
  showItem: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
  filterData: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    isActive: PropTypes.bool
  })).isRequired,
};

export default Source;