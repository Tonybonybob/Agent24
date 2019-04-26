import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../../common/Select';
import TextField from '../../../../common/TextField';
import TrashIcon from '../../../../../assets/Trash';
import PlusIcon from '../../../../../assets/Plus';
import './style.scss';
const socialNetworks = [
  {
    name: 'Facebook',
    value: 'Facebook',
  },
  {
    name: 'Instagram',
    value: 'Instagram',
  },
];

const SocialNetworksItem = ({ fields }) => (
  <div className="editLine editLine_socials">
    {fields.map((networkField, id) => {
      const network = fields.get(id);

      return (
        <div key={network.profile} className="editLineSocials">
          <Select
            name={`${networkField}.profile`}
            label="Профиль"
            items={socialNetworks}
          />
          <TextField
            name={`${networkField}.id`}
            label="Никнейм или ID"
            className={network.profile ? '' : 'editLine__placeholder'}
          />
          <div className="editLineSocials__icons">
            <div
              className={`editLineSocials__icon editLineSocials__delete ${fields.length > 1 ? '' : 'editLine__placeholder'}`}
              onClick={() => fields.remove(id)}
            >
              <TrashIcon />
            </div>
            <div
              className={`editLineSocials__icon editLineSocials__add 
                ${id === fields.length - 1 && network.profile && network.id ? '' : 'editLine__placeholder'}`}
              onClick={() => fields.push({})}
            >
              <PlusIcon />
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

SocialNetworksItem.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

SocialNetworksItem.defaultProps = {
  fields: [],
};

export default SocialNetworksItem;
