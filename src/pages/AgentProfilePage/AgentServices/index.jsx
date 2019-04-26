import React from 'react';

import AgentPlansTable from '../AgentPlansTable';
import AgentUpgradeBlock from '../AgentUpgradeBlock';
import ProfileServices from '../../../components/common/ProfileServices';
import ProfileTariffs from '../../../components/common/ProfileTariffs';

const AgentServices = () => (
  <div>
    <div className="agentProfile__table">
      <AgentPlansTable />
    </div>
    <div className="agentProfile__upgrade">
      <AgentUpgradeBlock />
    </div>
    <div className="agentProfile__services">
      <ProfileServices />
    </div>
    <div className="agentProfile__tariff">
      <ProfileTariffs />
    </div>
  </div>
);

export default AgentServices;
