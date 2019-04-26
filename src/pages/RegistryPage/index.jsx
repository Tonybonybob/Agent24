import React, { Component } from 'react';

import authGuard from '../../guards/AuthGuard';
import GeneralLayout from '../../layouts/GeneralLayout/index';

// eslint-disable-next-line react/prefer-stateless-function
class ProfilePage extends Component {
  render() {
    return (
      <GeneralLayout>
        RegistryPage
      </GeneralLayout>
    );
  }
}

export default authGuard({ redirectTo: '/signin' })(ProfilePage);
