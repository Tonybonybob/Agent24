import React, { Component } from 'react';

import SideBarInfo from '../../components/general/SideBarInfo';
import ProfileServices from '../../components/common/ProfileServices';
import authGuard from '../../guards/AuthGuard';
import GeneralLayout from '../../layouts/GeneralLayout/index';

// eslint-disable-next-line react/prefer-stateless-function
class ProfilePage extends Component {
  render() {
    return (
      <GeneralLayout>
        <div className="page">
          <div className="page__sidebar">
            <SideBarInfo profileType="user" />
          </div>
          <div className="page__content">
            <ProfileServices />
          </div>
        </div>
      </GeneralLayout>
    );
  }
}

export default authGuard({ redirectTo: '/signin' })(ProfilePage);
