import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FilterItemWrapper from '../../FilterItemWrapper';
import Close from '../../../../../assets/Close';
import ExtendInfo from '../../../../../assets/ExtendInfo';
import ShrinkInfo from '../../../../../assets/ShrinkInfo';

class MyFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAllFilters: false,
    };
    
    this.toggleShowFiltersName = this.toggleShowFiltersName.bind(this);
  }

  toggleShowFiltersName() {
    this.setState(prevState => ({
      showAllFilters: !prevState.showAllFilters,
    }));
  }

  render () {
    const { itemName, showItem, toggleShow, currentFilter, filters, chooseFilter, removeFilter } = this.props;

    const { showAllFilters } = this.state;

    const templateShow = (
      <div>
        {filters && (
          (filters.length > 7 && !showAllFilters ? filters.slice(0, 7) : filters).map(filter => (
            <div
              data-filterid={filter.id}
              onClick={chooseFilter}
              className={`filterName filterName_name ${currentFilter && currentFilter.id === filter.id ? 'filterName_active' : ''}`}>
              <span className="filterName__name">{filter.filterName}</span>
              <div style={{ width: '10.5px' }} onClick={removeFilter} data-filterid={filter.id}>
                {currentFilter && currentFilter.id === filter.id && !filter.base && (
                  <Close className="filterName__close" />
                )}
              </div>
            </div>
          )))}
        {filters.length > 7 && (
          !showAllFilters ? (
            <span className="filtersShowMore" onClick={this.toggleShowFiltersName}>
              <span className="filtersShowMore__text">
                Показать ещё {filters.length - 7}
              </span>
              <span>
                <ExtendInfo />
              </span>
            </span>
          ) : (
              <span className="filtersShowMore" onClick={this.toggleShowFiltersName}>
                <span className="filtersShowMore__text">
                  Скрыть
              </span>
                <span>
                  <ShrinkInfo />
                </span>
              </span>
            )
        )}
      </div>
    );
  
    const templateHide = (
      currentFilter && (
        <span className="filterName filterName_active filterName_consec filterName_preshow">
          {currentFilter.filterName}
        </span>
      )
    );
  
    return (
      <FilterItemWrapper
        itemName={itemName}
        showItem={showItem}
        toggleShow={toggleShow}
        templateShow={templateShow}
        templateHide={templateHide}
        label="Мои фильтры"
      />
    );
  }
};

MyFilters.propTypes = {
  itemName: PropTypes.string.isRequired,
  showItem: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  chooseFilter: PropTypes.func.isRequired
};

export default MyFilters;