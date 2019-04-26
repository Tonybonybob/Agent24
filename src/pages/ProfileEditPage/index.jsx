/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Values } from 'redux-form-website-template';

import ProfileEditForm from './ProfileEditForm';
import GeneralLayout from '../../layouts/GeneralLayout';
import authGuard from '../../guards/AuthGuard';
import './style.scss';
// eslint-disable-next-line
class ProfileEditPage extends Component {
  static propTypes = {
    user: PropTypes.shape({
      firstName: PropTypes.string,
    }),
  };

  static defaultProps = {
    user: {},
  };

  render() {
    const { user } = this.props;

    console.log(ProfileEditForm);

    const phone = user.phone || '';

    const currentDateArray = new Date().toLocaleDateString().split('.');
    const initialValues = {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      middleName: user.middleName || '',
      email: user.email || '',
      photo: '',
      city: '',
      isRieltor: false,
      accountType: 'agency',
      agencyName: '',
      accountYear: currentDateArray[2] - 18,
      accountMonth: +currentDateArray[1],
      accountDay: +currentDateArray[0],
      phones: [
        {
          countryCode: phone.substr(0, 4) || '+380',
          phoneNumber: phone.substr(4) || '',
          isViber: user.isViber || false,
          isWhatsApp: user.isWhatsApp || false,
          isTelegram: user.isTelegram || false,
          isMain: true,
        },
      ],
      source: 'Сайт',
    };

    const profileForm = user ? (
      <ProfileEditForm
        initialValues={initialValues}
        overwriteOnInitialValuesChange
      />
    ) : (
      false
    );

    return (
      <GeneralLayout>
        <main className="profileEdit">
          <h1>Редактирование карточки клиента</h1>
          <h3>Основная информация</h3>
          {profileForm}
          {/* <Values form="ProfileEdit" /> */}
        </main>
      </GeneralLayout>
    );
  }
}

export default authGuard({ redirectTo: '/signin' })(ProfileEditPage);
