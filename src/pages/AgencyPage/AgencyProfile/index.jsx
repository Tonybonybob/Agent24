import React from 'react';

import AgencyInfo from './AgencyInfo';
import ConfirmAgency from '../../../components/general/EditFormComponents/ConfirmAgency';
import './style.scss';
const AgencyProfile = () => (
  <div className="agencyProfile">
    <AgencyInfo />
    <h2 className="agencyProfile__title">
      Подтвердить Агенство
    </h2>
    <div className="agencyProfile__whiteCard">
      <ConfirmAgency
        buttons={[
          {
            label: 'Подтвердить',
            buttonType: 'primary',
            onClick: () => { },
          },
        ]}
      />
    </div>
  </div>
);

export default AgencyProfile;
