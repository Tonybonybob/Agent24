import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox } from 'redux-form-material-ui';
import './style.scss';
const MyCheckbox = ({
  name, label, color, ...other
}) => (
  <FormControlLabel
    control={(
      <Field
        name={name}
        component={Checkbox}
        color={color}
        classes={{
          root: 'checkbox__checkbox',
          checked: 'checkbox__checkbox_checked',
        }}
        {...other}
      />
    )}
    classes={{
      root: 'checkbox',
      label: 'checkbox__label',
    }}
    label={label}
  />
);

MyCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  label: PropTypes.string,
};

MyCheckbox.defaultProps = {
  color: 'primary',
  label: '',
};

export default MyCheckbox;
