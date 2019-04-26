import React from 'react';

import Title from '../../../../components/common/Title';
import LandingFeature from '../../LandingFeature';
import { withSizes } from '../../../../utils/sizes';
import './style.scss';
const LandingAgency = ({ isDesktop, setActiveImage }) => (
  <div className="landingAgency landingPage__block">
    <div className="container">
      <Title
        title="Твое Агентство — твои правила"
        className="landingAgency__title"
      />
      <div className="row">
        <div className="row__col row__col_10 row__col_ml1 row__col_mlmd0 row__col_md6 row__col_lg8 landingAgency__visual">
          <img
            src={`../../../assets/Agency${
              isDesktop ? '' : '_mobile_preview'
            }.png`}
            className="landingAgency__visualImage"
            alt="agency"
            onClick={
              isDesktop
                ? undefined
                : () => setActiveImage('public/assets/Agency_mobile.png')
            }
          />
        </div>
        <div className="row__col row__col_10 row__col_ml1 row__col_mlmd0 row__col_md6 row__col_lg4 landingAgency__features">
          <LandingFeature
            title="Регистрируй свое Агентство"
            description="Cоздавай репутацию, набирай баллы, открывай филиалы по всей стране"
            className="landingAgency__feature landingAgency__feature_first"
            highlightColor="blue"
          />
          <LandingFeature
            title="Полный отчет для РОПов и ТОПов"
            description="Просматривайте всю информацию о вашем агенте - сколько реальных часов отработал, сколько подборок сделал/отправил, сколько новых клиентов и обьектов добавил и многое МНОГОЕ другое..."
            className="landingAgency__feature"
          />
          <LandingFeature
            title="Настройка сервисов"
            description="Управляйте пакетами услуг сотрудников для эффективной работы"
            className="landingAgency__feature"
            highlightColor="blue"
          />
        </div>
      </div>
    </div>
  </div>
);

export default withSizes(LandingAgency);
