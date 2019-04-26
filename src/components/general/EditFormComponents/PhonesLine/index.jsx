import React from 'react';
import { FieldArray } from 'redux-form';

import PhoneItem from './PhoneItem';

const PhonesLine = () => (
  <div className="editLine">
    <FieldArray
      name="phones"
      component={PhoneItem}
      rerenderOnEveryChange
    />
  </div>
);

export default PhonesLine;
