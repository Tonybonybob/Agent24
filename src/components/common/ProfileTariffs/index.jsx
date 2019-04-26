import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileTariff from './ProfileTariff';
import './style.scss';
class ProfileTariffs extends Component {
  render() {
    const { states } = this.props;

    return (
      <div className="profileTariffs">
        <h3 className="profileTariffs__title">
          Тарифные планы
        </h3>
        <div className="profileTariffs__cards agentProfile__block">
          <ProfileTariff isBeginner isActive />
          <ProfileTariff isAdvanced />
          <ProfileTariff isAgency />
        </div>
      </div>
    );
  }
}

export default ProfileTariffs;
