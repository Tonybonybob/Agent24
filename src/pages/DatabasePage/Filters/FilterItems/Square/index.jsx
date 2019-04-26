import React from 'react';
import PropTypes from 'prop-types';

import FilterItemWrapper from '../../FilterItemWrapper';
import FromTillComponent from '../../FromTillComponent';
import FromTillPreshow from '../../FromTillPreshow';

const Square = ({
  itemName, showItem, toggleShow, filterData, items, onRemove, onAdd,
  totals, kitchens, livings
}) => {
  const templateShow = (
    <div>
      <div className="filters__preview">
        <span className="filters__previewHead">общая</span>
        <FromTillComponent
          onRemove={onRemove}
          onAdd={onAdd}
          values={totals}
          name="totals"
          ending="-кв.м."
        />
      </div>
      <div className="filters__preview">
        <span className="filters__previewHead">жилая</span>
        <FromTillComponent
          onRemove={onRemove}
          onAdd={onAdd}
          values={livings}
          name="livings"
          ending="-кв.м."
        />
      </div>
      <div className="filters__preview">
        <span className="filters__previewHead">кухня</span>
        <FromTillComponent
          onRemove={onRemove}
          onAdd={onAdd}
          values={kitchens}
          name="kitchens"
          ending="-кв.м."
        />
      </div>
    </div>
  );

  const templateHide = (
    <div>
      {totals.length > 1 && (
        <div className="filters__preview">
          <span className="filters__previewHead">
            Общая
          </span>
          <FromTillPreshow values={totals} ending="-кв.м." />
        </div>
      )}
      {livings.length > 1 && (
        <div className="filters__preview">
          <span className="filters__previewHead">
            Жилая
          </span>
          <FromTillPreshow values={livings} ending="-кв.м." />
        </div>
      )}
      {(kitchens && kitchens.length > 1) && (
        <div className="filters__preview">
          <span className="filters__previewHead">
            Кухня
          </span>
          <FromTillPreshow values={kitchens} ending="-кв.м." />
        </div>
      )}
    </div>
  );

  return (
    <FilterItemWrapper
      itemName={itemName}
      showItem={showItem}
      toggleShow={toggleShow}
      templateShow={templateShow}
      templateHide={templateHide}
      label="Площадь"
    />
  );
};

Square.propTypes = {
  itemName: PropTypes.string.isRequired,
  showItem: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
  filterData: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  totals: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  })),
  livings: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  })),
  kitchens: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  })),
};

export default Square;