import React from 'react';
import PropTypes from 'prop-types';


import FromTillComponent from '../../FromTillComponent';
import FromTillPreshow from '../../FromTillPreshow';
import FilterItemWrapper from '../../FilterItemWrapper';

const FromToItem = ({
  itemName, showItem, toggleShow, name, values, onRemove, onAdd, ending, label,
}) => {
  const templateShow = (
    <FromTillComponent
      onRemove={onRemove}
      onAdd={onAdd}
      values={values}
      name={name}
      ending={ending}
    />
  );

  const templateHide = <FromTillPreshow values={values} ending={ending} />;

  return (
    <FilterItemWrapper
      itemName={itemName}
      showItem={showItem}
      toggleShow={toggleShow}
      templateShow={templateShow}
      templateHide={templateHide}
      label={label}
    />
  );
};

FromToItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  showItem: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  ending: PropTypes.string,
  values: PropTypes.array,
};

FromToItem.defaultProps = {
  ending: '',
};

export default FromToItem;
