import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


import Plus from '../../../../../assets/Plus';
import Close from '../../../../../assets/Close';
import TextField from '../../../../../components/common/TextField';
import FilterItemWrapper from '../../FilterItemWrapper';
import AddressAutocomplete from '../../../AddressAutocomplete';

const Address = ({
  itemName, showItem, toggleShow, filterData,
  array, adminAreas, microdistricts, streetHouses, onAdd, onRemove
}) => {
  const templateShow = (
    <div>
      {adminAreas && adminAreas.length > 0 && (
        <div className="filters__preview">
          <div className="filters__previewHead filters__previewHead_area">
            Админ. районы
          </div>
          {adminAreas.map((adminArea, index) => (
            <span key={adminArea.id} className="filterName filterName_active filterName_consec filterName_area">
              {adminArea.name}
              <Close
                onClick={event => onRemove(event, 'adminAreas', index)}
                style={{ marginLeft: '6.5px' }}
              />
            </span>
          ))}
        </div>
      )}
      {microdistricts && microdistricts.length > 0 && (
        <div className="filters__preview">
          <div className="filters__previewHead filters__previewHead_area">
            Микрорайоны
          </div>
          {microdistricts.map((microdistrict, index) => (
            <span key={microdistrict.id} className="filterName filterName_active filterName_consec filterName_area">
              {microdistrict.name}
              <Close
                onClick={event => onRemove(event, 'microdistricts', index)}
                style={{ marginLeft: '6.5px' }}
              />
            </span>
          ))}
        </div>
      )}
      {streetHouses && streetHouses.length > 0 && (
        <div className="filters__preview">
          <div className="filters__previewHead filters__previewHead_area">
            Улицы
          </div>
          {streetHouses.map((streetHouse, streetIndex) => (
            <Fragment>
              <span key={streetHouse.street.id} className="filterName filterName_active filterName_consec filterName_area">
                {streetHouse.street.name}
                <Close
                  onClick={event => onRemove(event, 'streetHouses', streetIndex)}
                  style={{ marginLeft: '6.5px' }}
                />
              </span>
              {streetHouse.houses && streetHouse.houses.length > 0 && (
                <Fragment>
                  {streetHouse.houses.map((house, houseIndex) => (
                    <div>
                      {houseIndex !== streetHouse.houses.length - 1 && (
                        <div className="filterName filterName_active filterName_consec">
                          <span>
                            {' '}
                            дом №
                            &nbsp;
                            {house}
                          </span>
                          <Close
                            onClick={event => onRemove(
                              event,
                              `streetHouses[${streetIndex}].houses`,
                              houseIndex,
                            )}
                            style={{ marginLeft: '6.5px' }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="filters__addWrapper">
                    <div className="filters__textfield">
                      <TextField
                        name={`streetHouses[${streetIndex}].houses[${streetHouse.houses.length - 1}]`}
                        required={false}
                        label="дом"
                      />
                    </div>
                    <Plus
                      className="filters__plus"
                      onClick={event => onAdd(
                        event,
                        `streetHouses[${streetIndex}].houses`,
                        streetHouse.houses[streetHouse.houses.length - 1],
                        ''
                      )}
                      fill={streetHouse.houses[streetHouse.houses.length - 1] ? '#0097A7' : '#D0D8DC'}
                    />
                  </div>
                </Fragment>
              )}
            </Fragment>
          ))}
        </div>
      )}
      <AddressAutocomplete className="addressAutocomplete" array={array} filterData={filterData} />
    </div>
  );

  const templateHide = (
    <div>
      {adminAreas && adminAreas.length > 0 && (
        <div className="filters__preview">
          <div className="filters__previewHead filters__previewHead_area">
            Админ. районы
        </div>
          {adminAreas.map(adminArea => (
            <span key={adminArea.name} className="filters__description filterName filterName_active filterName_consec filterName_preshow">
              {adminArea.name}
            </span>
          ))}
        </div>
      )}
      {microdistricts && microdistricts.length > 0 && (
        <div className="filters__preview">
          <div className="filters__previewHead filters__previewHead_area">
            Микрорайоны
        </div>
          {microdistricts.map(microdistrict => (
            <span key={microdistrict.name} className="filters__description filterName filterName_active filterName_consec filterName_preshow">
              {microdistrict.name}
            </span>
          ))}
        </div>
      )}
      {streetHouses && streetHouses.length > 0 && (
        <div className="filters__preview">
          <div className="filters__previewHead filters__previewHead_area">
            Улицы
        </div>
          {streetHouses.map(streetHouse => (
            <span className="filterName filterName_active filterName_consec filterName_preshow">
              {streetHouse.street.name}
              {streetHouse.houses && streetHouse.houses.length > 0 && (
                streetHouse.houses.map((house, houseIndex) => (
                  <div>
                    {houseIndex !== streetHouse.houses.length - 1 && (
                      <span>
                        <span> дом № </span>
                        {house}
                      </span>
                    )}
                  </div>
                ))
              )}
            </span>
          ))}
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
      label="Адрес"
    />
  );
};

Address.propTypes = {
  itemName: PropTypes.string.isRequired,
  showItem: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
  filterData: PropTypes.func.isRequired,
  microdistricts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  adminAreas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  streetHouses: PropTypes.arrayOf(PropTypes.shape({
    street: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
    houses: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  array: PropTypes.shape({
    push: PropTypes.func,
    splice: PropTypes.func,
  }).isRequired,
};

export default Address;