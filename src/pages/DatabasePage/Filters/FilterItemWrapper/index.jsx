import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ShrinkInfo from '../../../../assets/ShrinkInfo';
import ExtendInfo from '../../../../assets/ExtendInfo';

const FilterItemWrapper = ({
  itemName, showItem, templateShow, templateHide, toggleShow, label
}) => (
  <div
    className={`filters__item ${showItem ? '' : 'filters__item_pointer'}`}
    data-component={itemName}
    onClick={showItem ? () => { } : toggleShow}
  >
    <div
      className="filters__blockWithSvg"
      data-component={itemName}
      onClick={showItem ? toggleShow : () => { }}>
      <strong>
        {label}
      </strong>
      {showItem
        ? <ShrinkInfo />
        : <ExtendInfo />
      }
    </div>
    {showItem 
      ? templateShow
      : templateHide
    }
  </div>
);

FilterItemWrapper.propTypes = {
  itemName: PropTypes.string.isRequired,
  showItem: PropTypes.bool.isRequired,
  templateShow: PropTypes.node.isRequired,
  templateHide: PropTypes.node.isRequired,
  toggleShow: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default FilterItemWrapper;
