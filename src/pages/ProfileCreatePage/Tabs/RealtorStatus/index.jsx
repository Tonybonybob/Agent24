import React, { Component } from 'react';
import moment from 'moment';
import { reduxForm } from 'redux-form';

import { Button } from '../../../../components/general/Button';
import Container from '../../../../components/Grid/Container';
import RealtorStatusUpgrade from '../../../../components/common/RealtorStatusUpgrade';
import './style.scss';
// eslint-disable-next-line
class RealtorStatus extends Component {
  render() {
    const { goPrevTab, goNextTab, valid } = this.props;

    console.log(valid);

    return (
      <form className="realtorStatus">
        <p className="profileCreate__info">
          Ваш статус "ЧАСТНИК" Поднимите ваш статус до РИЭЛТОРА — введите Ваш ИНН №
          свидетельства физ-лица предпринимателя и дату его выдачи. Удостоверьтесь что Ваш КВЭД: 68.31
        </p>
        <RealtorStatusUpgrade />
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

export default reduxForm({
  form: 'RealtorStatusForm',
  initialValues: {
    dateDay: Number(moment().format('DD')),
    dateMonth: Number(moment().format('MM')),
    dateYear: Number(moment().format('YYYY')),
  },
})(RealtorStatus);
