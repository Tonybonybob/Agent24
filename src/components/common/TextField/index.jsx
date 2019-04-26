import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import './style.scss';
const validateRequired = value => (value ? undefined : 'Обязательно');

const MyTextField = ({
  name,
  label,
  disabled,
  required,
  InputLabelProps,
  InputProps,
  validate,
  noDisabledUnderline,
  onFocus,
  onBlur,
  onChange,
  ...other
}) => (
  <div className="textField">
    <Field
      classes={{
        root: 'textField__container',
      }}
      InputProps={{
        classes: {
          root: 'textField__input',
          error: 'textField__input_error',
          underline: `textField__underline ${
            noDisabledUnderline ? 'textField__underline_no' : ''
          }`,
        },
        onFocus,
        onBlur,
        ...InputProps,
      }}
      // format={value => (value === null ? '' : value)}
      label={label}
      name={name}
      disabled={disabled}
      onChange={onChange}
      component={TextField}
      InputLabelProps={InputLabelProps || null}
      validate={[required ? validateRequired : () => undefined, ...validate]}
      {...other}
    />
  </div>
);

MyTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  InputLabelProps: PropTypes.oneOfType([
    PropTypes.shape({
      shrink: PropTypes.bool,
    }),
    PropTypes.bool,
  ]),
  validate: PropTypes.array,
  noDisabledUnderline: PropTypes.bool,
};

MyTextField.defaultProps = {
  label: '',
  disabled: false,
  required: true,
  InputLabelProps: false,
  noDisabledUnderline: false,
  name: 'moshkara',
  validate: [],
};

export default MyTextField;
