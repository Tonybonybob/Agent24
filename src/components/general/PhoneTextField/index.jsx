import React from 'react';
import PropTypes from 'prop-types';
import { createTextMask } from 'redux-form-input-masks';

import TextField from '../../common/TextField';
import './style.scss'
const phoneMask = createTextMask({
  pattern: '+380      99 999 9999',
  placeholder: ' ',
  guide: false,
});

const PhoneTextField = ({ label, name, ...rest }) => (
  <TextField
    className="phoneTextField"
    label={label}
    name={name}
    {...rest}
    {...phoneMask}
  />
);

PhoneTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

PhoneTextField.defaultProps = {
  label: 'Телефон',
};

export default PhoneTextField;
