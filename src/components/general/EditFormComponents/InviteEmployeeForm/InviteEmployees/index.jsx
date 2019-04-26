import React from 'react';

import InviteEmployeeCard from '../InviteEmployeeCard';

const InviteEmployees = ({ fields }) => (
  fields.map((worker, index) => {
    const workerInfo = fields.get(index);

    return (
      <div className="inviteEmployees">
        {index !== 0 && <hr />}
        <InviteEmployeeCard workerInfo={workerInfo} worker={worker} index={index} />
      </div>
    );
  })
);

export default InviteEmployees;
