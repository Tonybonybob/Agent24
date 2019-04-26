import React from 'react';
import PropTypes from 'prop-types';

import FilterItemWrapper from '../../FilterItemWrapper';
import Close from '../../../../../assets/Close';
import PureSelect from '../../../../../components/common/PureSelect';

const MultiselectItems = ({
  itemName, showItem, toggleShow, filterData, items, onRemove, onAdd,
  attribute, label, name, getAttributeNameById, mainLabel
}) => {
  const initialItems = attribute.filter(singleItem => (
      !items.some(singleChosenItem => (
        singleChosenItem === singleItem.id
      ))
    ));
  const templateShow = (
   <div>
    <div>
      {items.map((item, index) => (
        <span key={item.id} className="filterName filterName_active filterName_consec">
          {getAttributeNameById(item, attribute)}
          <Close
            onClick={event => onRemove(event, name, index)}
            style={{ marginLeft: '6.5px' }}
          />
        </span>
      ))}
    </div>
    {initialItems.length > 0 && (
      <PureSelect
        label={label}
        items={initialItems}
        value={[]}
        onChange={onAdd}
        multiple
      />
    )}
  </div>
  );

  const templateHide = (
    items.map(item => (
      <div className="filterName filterName_active filterName_consec filterName_preshow">
        {getAttributeNameById(item, attribute)}
      </div>
    ))
  );

  return (
    <FilterItemWrapper
      itemName={itemName}
      showItem={showItem}
      toggleShow={toggleShow}
      templateShow={templateShow}
      templateHide={templateHide}
      label={mainLabel}
    />
  );
};

MultiselectItems.propTypes = {
  itemName: PropTypes.string.isRequired,
  showItem: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
  filterData: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  attribute: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  label: PropTypes.string.isRequired,
  mainLabel: PropTypes.string.isRequired,
};

export default MultiselectItems;