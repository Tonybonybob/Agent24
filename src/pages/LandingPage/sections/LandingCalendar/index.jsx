import React from 'react';

import Title from '../../../../components/common/Title';
import CalendarRounded from '../../../../assets/CalendarRounded';
import TaskerRounded from '../../../../assets/TaskerRounded';
import ProfileRounded from '../../../../assets/ProfileRounded';
import { withSizes } from '../../../../utils/sizes';
import './style.scss';
const LandingCalendar = ({ isDesktop }) => (
  <div className="landingCalendar landingPage__block">
    <div className="container">
      {!isDesktop && (
        <div className="row">
          <div className="row__col row__col_8 row__col_ml2 row__col_mr2">
            <Title
              title="Календарь"
              description="Все планируемые показы в едином интерфейсе"
              className="landingCalendar__title"
              align="left"
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="row__col row__col_8 row__col_mr2 row__col_ml2 row__col_lg5 row__col_mllg0 row__col_mrlg0 row__col_orderlg1 landingCalendar__visualWrapper">
          <img
            src={`../../../../assets/Calendar${isDesktop ? '' : '_mobile'}.png`}
            className="landingCalendar__visual"
            alt=""
          />
        </div>
        <div className="row__col row__col_12 row__col_lg5 row__col_mllg1 row__col_mrlg1">
          {isDesktop && (
            <Title
              title="Календарь"
              description="Все планируемые показы в едином интерфейсе"
              className="landingCalendar__title"
              align="left"
            />
          )}
          <div className="landingCalendar__item">
            <CalendarRounded />
            <span className="landingCalendar__itemText">
              Будь всегда в курсе своего расписания
            </span>
          </div>
          <div className="landingCalendar__item">
            <TaskerRounded />
            <span className="landingCalendar__itemText">
              Управляй задачами и событиями
            </span>
          </div>
          <div className="landingCalendar__item">
            <ProfileRounded />
            <span className="landingCalendar__itemText">
              Добавляй мероприятия в календари коллег
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withSizes(LandingCalendar);
