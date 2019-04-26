import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import RadioFilters from '../../../components/common/RadioFilters';
import SearchBar from '../../../components/common/SearchBar';
import EmployeesTable from './EmployeesTable';
import InviteEmployeeForm from '../../../components/general/EditFormComponents/InviteEmployeeForm';
import { Button } from '../../../components/general/Button';
import './style.scss';
class AgencyEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };

    this.filters = [
      {
        name: 'Все',
        value: 'all',
      },
      {
        name: 'Активные',
        value: 'active',
      },
      {
        name: 'Заблокированные',
        value: 'blocked',
      },
      {
        name: 'Уволенные',
        value: 'fired',
      },
    ];
    this.handleEmployeeSearch = this.handleEmployeeSearch.bind(this);
  }

  handleEmployeeSearch(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  render() {
    const { searchValue } = this.state;

    return (
      <div className="agencyEmployees">
        <div className="agencyEmployees__nav">
          <RadioFilters
            active="all"
            items={this.filters}
          />
          <SearchBar
            withReduxForm={false}
            placeholder="Поиск сотрудника"
            value={searchValue}
            onChange={this.handleEmployeeSearch}
            white
          />
        </div>
        <EmployeesTable />
        <h2 className="agencyEmployees__title">
          Пригласить сотрудника
        </h2>
        <div className="agencyEmployees__inviteEmployee">
          <InviteEmployeeForm />
          <div className="agencyEmployees__inviteEmployee__buttons">
            <Button buttonType="add" noBorder>
              Отмена
            </Button>
            <Button buttonType="add">
              Создать
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'agencyEmployeesForm',
  initialValues: { employees: [{}] },
})(AgencyEmployees);
