import React from 'react';
import { FieldArray } from 'redux-form';

import SocialNetworkItem from './SocialNetworkItem';

const SocialNetworksLine = () => (
  <div className="editLine">
    <FieldArray
      name="socialNetworks"
      component={SocialNetworkItem}
      rerenderOnEveryChange
    />
  </div>
);

export default SocialNetworksLine;
