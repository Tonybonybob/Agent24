import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import InputAdornment from '@material-ui/core/InputAdornment';

import TextField from '../TextField';
import InputEnter from '../../../assets/InputEnter';

const TextFieldPlane = ({
  className, label, handleClick, name, placeholder, required, ...other
}) => (
  <div className="pureTextFieldPlane">
    <TextField
      name={name}
      className={className}
      label={label}
      placeholder={placeholder}
      required={required}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <InputEnter onClick={handleClick} />
          </InputAdornment>
        ),
      }}
      {...other}
    />
  </div>
);

TextFieldPlane.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  handleClick: PropTypes.func,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

TextFieldPlane.defaultProps = {
  className: '',
  label: '',
  placeholder: '',
  handleClick: () => {},
  required: false,
};

export default TextFieldPlane;
