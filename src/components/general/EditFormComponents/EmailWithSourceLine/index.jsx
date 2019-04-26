import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../../../common/TextField';
import Select from '../../../common/Select';

const sourceItems = [
  {
    name: 'Сайт',
    value: 'site',
  },
];

const EmailWithSourceLine = ({ className }) => (
  <div className={`${className} editLine editLine_emailWithSource`}>
    <TextField
      name="email"
      label="Email"
    />
    <Select
      name="source"
      label="Источник"
      items={sourceItems}
    />
  </div>
);

EmailWithSourceLine.propTypes = {
  className: PropTypes.string,
};

EmailWithSourceLine.defaultProps = {
  className: '',
};

export default EmailWithSourceLine;
