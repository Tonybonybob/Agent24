import React, { Component } from 'react';

import Title from '../../../../components/common/Title';
import LandingFeature from '../../LandingFeature';
import { withSizes } from '../../../../utils/sizes';
import './style.scss';
const LandingDatabase = ({ isDesktop, setActiveImage }) => (
  <div className="landingDatabase landingPage__block">
    <div className="container">
      <div className="row">
        <Title
          title="Единая база объектов"
          description=""
          className="landingDatabase__title"
        />
      </div>
    </div>
    <div
      className="landingDatabase__preview"
    >
      <div
        className="container"
      >
        <div className="landingDatabase__previewImageWrapper">
          <img
            alt="database"
            className="landingDatabase__previewImage"
            src={`public/assets/database${isDesktop ? '' : '_mobile_preview'}.png`}
            onClick={isDesktop ? undefined : () => setActiveImage('public/assets/database_mobile.png')}
          />
        </div>
      </div>
    </div>
    <div
      className="landingDatabase__features"
    >
      <div
        className="container"
      >
        <div
          className="row"
        >
          <div
            className="row__col row__col_10 row__col_ml1 row_col_mr1 row__col_md3 row__col_mrmd0 row__col_mlmd1 landingDatabase__featureWrapper"
          >
            <LandingFeature
              title="Все квартиры дома и участки"
              description="Информация в базе собирается с досок обьявлений Украины от собственников 
и  всех обьектов Частников, Риэлторов 
и Агентств недвижимости Украины 
с обновлением каждые 3 секунды"
              className="landingDatabase__feature landingDatabase__feature_first"
              highlightColor="blue"
            />
          </div>
          <div
            className="row__col row__col_10 row__col_ml1 row_col_mr1 row__col_md3 row__col_mrmd0 row__col_mlmd1 landingDatabase__mls landingDatabase__featureWrapper"
          >
            <LandingFeature
              title="Первая в Украине МЛС"
              description="Регистрируйте Ваши эксклюзивы в Агент24 а также просматривайте все эсклюзивы сообщества. Наша команда модераторов гарантирует безупречный сервис, внимательную проверку эксклюзивных договоров и актуальность информации"
              className="landingDatabase__feature"
            />
          </div>
          <div
            className="row__col row__col_10 row__col_ml1 row_col_mr1 row__col_md3 row__col_mrmd0 row__col_mlmd1 landingDatabase__featureWrapper"
          >
            <LandingFeature
              title="Продвинутые фильтры"
              description="Предустановленные фильтры позволяют сконцентрироваться только на своих сегментах , настраиваемый интерфейс системы позволяет убрать все лишнее и редкоиспользуемое"
              className="landingDatabase__feature"
              highlightColor="blue"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default withSizes(LandingDatabase);
