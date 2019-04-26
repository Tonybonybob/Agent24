import React from 'react';
import { FieldArray } from 'redux-form';

import BoundedContactItem from './BoundedContactItem';

const BoundedContacts = props => (
  <FieldArray
    name="relationsContacts"
    component={BoundedContactItem}
    rerenderOnEveryChange
    props={props}
  />
);

export default BoundedContacts;
