import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import { Button } from '../../../components/general/Button';
import RealtorStatusUpgrade from '../../../components/common/RealtorStatusUpgrade';
import './style.scss';
class AgentUpgradeBlock extends Component {
  render() {
    return (
      <form>
        <div className="agentUpgradeToFLP">
          <div className="agentUpgradeToFLP__headingWrapper">
            <h2 className="agentUpgradeToFLP__title">
              Поднять статус до «Риэлтор ФЛП»
            </h2>
            <span className="agentUpgradeToFLP__status">
              Ваш статус
            </span>
            <span className="agentUpgradeToFLP__type">
              ЧАСТНИК
            </span>
          </div>
          <div className="agentUpgradeToFLP__content agentProfile__block">
            <p className="agentUpgradeToFLP__info">
            Поднимите статус до риелтора ФЛП бесплатно и гарантированно работайте со всеми АН и риэлторами рынка недвижимости Украины 50/50.
            </p>
            <p className="agentUpgradeToFLP__info">
            Укажите регистрационные данные Вашего свидетельств Физ-Лица Предпринимателя ниже: 
            </p>
            <RealtorStatusUpgrade />
            <div className="agentUpgradeToFLP__submit">
              <Button type="submit" buttonType="primary">
                Подтвердить
              </Button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'RealtorStatusForm',
  initialValues: {
    dateDay: Number(moment().format('DD')),
    dateMonth: Number(moment().format('MM')),
    dateYear: Number(moment().format('YYYY')),
  },
})(AgentUpgradeBlock);
