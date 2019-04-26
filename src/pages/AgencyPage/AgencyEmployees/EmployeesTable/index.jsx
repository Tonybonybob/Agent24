import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Route } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import './style.scss';

import { getClientId, getObjectsExist, getObjects } from '../../../../store/reducers/client';
import Table from '../../../../components/common/Table';
import SmallPersonBlock from '../../../../components/general/SmallPersonBlock';
import EmployeesCard from '../EmployeesCard';
import { getFlatAttributes } from '../../../../store/reducers/attributes';
import EditPopupCard from './EditPopupCard';

/* eslint-disable class-methods-use-this */
class EmployeesTableObjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePopup: null,
    };

    this.editOperations = [
      { name: 'Уволить', value: 'fire' },
      { name: 'Блокировать', value: 'block' },
      { name: 'Перевести в другой филиал', value: 'moveToAnotherFilial' },
      { name: 'Изменить роль', value: 'changeRole' },
      { name: 'Изменить руководителя', value: 'changeBoss' },
    ];

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
    const { activePopup } = this.state;
    const {
      objects, history, match, location,
    } = this.props;

    return objects.map(object => object && [[
      {
        content: (
          <SmallPersonBlock
            person={{
              name: 'Константин К.',
              phone: 'Филиал 1',
              img: 'http://api.agent24.pro/fupload/tmp/0061137d9415e5601351156ffed8e06d',
            }}
          />
        ),
      },
      { content: 'Риелтор' },
      { content: 'Константин К.' },
      { content: 'Активен' },
      { content: '2/5' },
      { content: 'Продажа - квартиры' },
      {
        content: (
          <div className="employeesTable__editHolder" onClick={e => e.stopPropagation()}>
            <span>
              20
            </span>
            <div className="employeesTable__edit" onClick={() => this.setState({ activePopup: object.id })}>
              <div className="employeesTable__editDots" />
            </div>
            {activePopup === object.id && (
              <ClickAwayListener onClickAway={() => this.setState({ activePopup: null })}>
                <EditPopupCard className="employeesTable__popup" items={this.editOperations} />
              </ClickAwayListener>
            )}
          </div>
        ),
      },
    ], {
      contentClick: (
        <Route
          path={`${match.url}/${object.id}`}
          render={() => <EmployeesCard close={() => history.push(match.url)} />}
        />
      ),
      handleClick: () => {
        if (`${match.url}/${object.id}` === location.pathname) {
          history.push({
            pathname: match.path,
            search: location.search,
          });
        } else {
          history.push({
            pathname: match.path,
            search: location.search,
          });
          history.push({
            pathname: `${match.url}/${object.id}`,
            search: location.search,
          });
        }
      },
      id: object.id,
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
    const { objectsExist, location } = this.props;

    const locationArr = location.pathname.split('/');
    const id = locationArr[locationArr.length - 1];
    return (
      <div className="employeesTableWrapper">
        {objectsExist && (
          <div className="employeesTable">
            <Table
              tableHead={this.createTableHead()}
              tableContent={this.createTableContent()}
              equalSpaces
              activeId={id}
            />
          </div>
        )}
      </div>
    );
  }
}

EmployeesTableObjects.propTypes = {
  objects: PropTypes.array,
};

EmployeesTableObjects.defaultProps = {
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
)(EmployeesTableObjects);
