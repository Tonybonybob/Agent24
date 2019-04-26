import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getClientId, getObjectsExist, getObjects } from '../../../../../store/reducers/client';
import Table from '../../../../common/Table';
import { renderOperationContent, renderTypeContent } from '../../../../../utils';
import { getFlatAttributes } from '../../../../../store/reducers/attributes';
import ArrowDown from '../../../../../assets/ArrowDownStroke';

/* eslint-disable class-methods-use-this */
class SegmentsTable extends Component {
  createTableHead() {
    const { close } = this.props;

    return [
      { content: 'Операция' },
      { content: 'Объект' },
      { content: 'Населенный пункт' },
      { content: 'Админ. район' },
      { content: 'Микрорайон' },
      {
        content: close && (
          <div className="closeWrapper" onClick={close}>
            <ArrowDown />
          </div>
        ),
      },
    ];
  }

  createTableContent() {
    const { segments } = this.props;

    return segments.slice(0, 4).map(object => object && [[
      {
        content: (
          <span className={`colorfulOperation colorfulOperation_${object.operation === 'sell' ? 'green' : ''}${object.operation === 'buy' ? 'blue' : ''}`}>
            {renderOperationContent(object.operation.toUpperCase())}
          </span>
        ),
      },
      { content: renderTypeContent(object.object.toUpperCase()) },
      {
        content: (
          object.areas.map(area => (
            area.cities.map(city => (
              <div>
                {city.cityName}
              </div>
            ))
          ))
        ),
      },
      {
        content: (
          object.areas.map(area => (
            area.cities.map(city => (
              <div>
                {city.adminAreas.map(adminArea => (
                  <div>
                    {adminArea.adminAreaName}
                  </div>
                ))}
              </div>
            ))
          ))
        ),
      },
      {
        content: (
          
          object.areas.map(area => (
            area.cities.map(city => (
              <div>
                {city.adminAreas.map(adminArea => (
                  <div>
                    {adminArea.microdistricts.map((microdistrict, index) => (
                      <Fragment>
                        {index !== 0 && ', '}
                        <span>
                          {microdistrict.microdistrictName}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                ))}
              </div>
            ))
          ))
        ),
      },
      { content: '' },
    ], {
      contentClick: false,
      handleClick: () => { },
    },
    ]);
  }

  render() {
    return (
      <div className="clientTableWrapper">
        <div className="clientTableObjects">
          <Table
            tableHead={this.createTableHead()}
            tableContent={this.createTableContent()}
            equalSpaces
          />
        </div>
      </div>
    );
  }
}

SegmentsTable.propTypes = {
  segments: PropTypes.array,
  close: PropTypes.func,
};

SegmentsTable.defaultProps = {
  segments: [],
  close: false,
};

export default SegmentsTable;
