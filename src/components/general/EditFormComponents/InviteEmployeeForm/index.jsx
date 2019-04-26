import React from 'react';
import { FieldArray } from 'redux-form';

import InviteEnployees from './InviteEmployees';

const InviteEmployeeForm = () => (
  <FieldArray
    name="employees"
    component={InviteEnployees}
  />
);

export default InviteEmployeeForm;
