import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Select } from 'redux-form-material-ui';
import './style.scss';
const validateRequired = value => (value ? undefined : 'Обязательно');

const UnitedSelect = ({
  name, label, items, required, ...other
}) => (
    <div className="select">
      <FormControl classes={{
        root: 'select__container',
      }}
      >
        <InputLabel htmlFor={name}>
          {label}
        </InputLabel>
        <Field
          component={Select}
          name={name}
          id={name}
          classes={{
            root: 'select__underline',
          }}
          validate={required && validateRequired}
          value={name}
          {...other}
          // format={value => (Array.isArray(value) ? value : [])}
        >
          {items.map(item => (
            <MenuItem
              value={item.value || item.id}
              key={item.value || item.id}
              component={item.container || null}
            >
              {item.name}
            </MenuItem>
          ))}
        </Field>
      </FormControl>
    </div>
  );

UnitedSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  required: PropTypes.bool,
};

UnitedSelect.defaultProps = {
  required: true,
};

export default UnitedSelect;
