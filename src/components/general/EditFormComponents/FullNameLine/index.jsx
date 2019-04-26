import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../../../common/TextField';

const FullNameLine = ({ className }) => (
  <div className={`${className} editLine editLine_fullName`}>
    <TextField
      name="firstName"
      label="Имя"
    />
    <TextField
      name="lastName"
      label="Фамилия"
    />
    <TextField
      name="middleName"
      label="Отчество"
    />
  </div>
);

FullNameLine.propTypes = {
  className: PropTypes.string,
};

FullNameLine.defaultProps = {
  className: '',
};

export default FullNameLine;
