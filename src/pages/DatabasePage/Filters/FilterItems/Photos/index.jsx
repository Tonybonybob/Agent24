import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../../../../../components/common/Checkbox';
import FilterItemWrapper from '../../FilterItemWrapper';

const Photos = ({
  itemName, showItem, toggleShow, filterData, hasPhotos, hasVideos,
}) => {
  const templateShow = (
    <div className="filters__checkboxWrapper">
      {[
        { name: 'hasPhotos', label: 'с фотографиями' },
        { name: 'hasVideos', label: 'с видео' },
      ].map(checkbox => (
        <Checkbox
          onChange={() => setTimeout(filterData, 100)}
          name={checkbox.name}
          label={checkbox.label}
        />
      ))}
    </div>
  );

  const templateHide = (
    <div className="filters__description">
      {hasPhotos && (
        <span className="filterName filterName_active filterName_consec filterName_preshow">
          с фотографиями
        </span>
      )}
      {hasVideos && (
        <span className="filterName filterName_active filterName_consec filterName_preshow">
          с видео
        </span>
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
      label="Фото / Видео"
    />
  );
};

Photos.propTypes = {
  itemName: PropTypes.string.isRequired,
  showItem: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
  filterData: PropTypes.func.isRequired,
  hasPhotos: PropTypes.bool.isRequired,
  hasVideos: PropTypes.bool.isRequired,
};

export default Photos;