import React, { Component } from 'react';
import { reduxForm, formValueSelector, FieldArray } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Row from '../../../../components/Grid/Row';
import Col from '../../../../components/Grid/Col';
import { Button } from '../../../../components/general/Button';
import Branch from './Branch';
import Workers from './Workers';
import InviteEmployeeForm from '../../../../components/general/EditFormComponents/InviteEmployeeForm';
import './style.scss';

const initialBranchValue = {
  links: [{}],
  emails: [''],
  phones: [],
}

// eslint-disable-next-line
class CreateAgency extends Component {
  render() {
    const { valid, goNextTab, goPrevTab, array } = this.props;

    return (
      <form className="createAgency">
        <h3 className="profileCreate__title">
          Информация о Компании
        </h3>
        <FieldArray name="branches" component={Branch} />
        <Row>
          <Col
            default={{
              col: 12,
            }}
            lg={{
              col: 3,
            }}
          >
            <Button buttonType="add" full onClick={() => array.push('branches', initialBranchValue)}>
              Добавить филиал
            </Button>
          </Col>
        </Row>
        <hr />
        <h3 className="createAgency__title">
          Пригласить сотрудника
        </h3>
        <InviteEmployeeForm />
        {/* <FieldArray name="workers" component={Workers} /> */}
        <Row>
          <Col
            default={{
              col: 12,
            }}
            lg={{
              col: 3,
            }}
          >
            <Button buttonType="add" full style={{ marginTop: '20px' }} onClick={() => array.push('employees', {})}>
              Добавить cотрудника
            </Button>
          </Col>
        </Row>
        <div className="profileCreate__buttons">
          <Button buttonType="add" onClick={goNextTab}>
            пропустить
          </Button>
          <Button buttonType="primary" onClick={goPrevTab}>
            Назад
          </Button>
          <Button buttonType="primary" disabled={!valid} onClick={goNextTab}>
            Далее
          </Button>
        </div>
      </form>
    );
  }
}


export default compose(
  reduxForm({
    form: 'CreateAgencyForm',
    initialValues: {
      branches: [
        {
          isMain: true,
          ...initialBranchValue,
        }
      ],
      workers: [{}],
      employees: [{}],
    },
  }),
)(CreateAgency);
