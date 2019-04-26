import React, { Component, Fragment } from 'react';

import Title from '../../../../components/common/Title';
import LandingFeature from '../../LandingFeature';
import SoonIcon from '../../../../assets/SoonIconRounded';
import ProfileFaceRounded from '../../../../assets/ProfileFaceRounded';
import ProtectedIconRounded from '../../../../assets/ProtectedIconRoundd';
import { withSizes } from '../../../../utils';
import './style.scss';
class LandingRealtors extends Component {
  render() {
    const { isDesktop, setActiveImage } = this.props;

    return (
      <div className="landingRealtors landingPage__block">
        <div
          className="container"
        >
          <div className="row">
            <h3 className="landingRealtors__title">
              Реестр риэлторов
            </h3>
          </div>
          <div className="row">
            <h3 className="landingRealtors__subtitle">
              Участвуйте в национальном рейтинге риэлторов Украины. Зарабатывайте репутацию, собирайте отзывы коллег и клиентов сразу после сделки, становитесь лучшим агентом и агентством страны!
            </h3>
          </div>
          <div
            className="row"
          >
            <div className="landingRealtors__photo">
              <img
                src={`/public/assets/Realtors${isDesktop ? '' : '_mobile_preview'}.png`}
                alt=""
                onClick={isDesktop ? undefined : () => setActiveImage('public/assets/Realtors_mobile.png')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withSizes(LandingRealtors);
