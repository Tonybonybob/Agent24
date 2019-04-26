import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { getClientId, getObjectsExist, getObjects } from '../../../../store/reducers/client';
import Table from '../../../../components/common/Table';
// import SmallPersonBlock from '../../../../components/general/SmallPersonBlock';
import { getFlatAttributes } from '../../../../store/reducers/attributes';

/* eslint-disable class-methods-use-this */
class ServicesTableObjects extends Component {
  constructor(props) {
    super(props);

    this.goToPureRequests = this.goToPureRequests.bind(this);
  }

  createTableHead() {
    return [
      { content: 'Сотрудник' },
      { content: 'Роль' },
      { content: 'Руководитель' },
      { content: 'Статус' },
      { content: 'Л.' },
      { content: 'Сегменты' },
      { content: '₴' },
    ];
  }

  createTableContent() {
    const {
      objects,
    } = this.props;

    return objects.map(object => object && [[
      { content: 'fasd' },
      { content: 'Риелтор' },
      { content: 'Константин К.' },
      { content: 'Активен' },
      { content: '2/5' },
      { content: 'Продажа - квартиры' },
      { content: 'fasd' },
    ], {
      contentClick: false,
      handleClick: () => {},
    },
    ]);
  }

  goToPureRequests() {
    const { history, location, match } = this.props;

    history.push({
      pathname: match.url,
      search: location.search,
    });
  }

  render() {
    return (
      <div className="employeesTableWrapper">
        <div className="employeesTable">
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

ServicesTableObjects.propTypes = {
  objects: PropTypes.array,
};

ServicesTableObjects.defaultProps = {
  objects: [],
};

const mapStateToProps = state => ({
  id: getClientId(state),
  objects: getObjects(state),
  objectsExist: getObjectsExist(state),
  attributes: getFlatAttributes(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(ServicesTableObjects);
