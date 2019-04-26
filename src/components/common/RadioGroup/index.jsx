import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import {
  RadioGroup,
  // Switch
} from 'redux-form-material-ui';

import TextField from '../TextField';
import './style.scss';
const MyRadioGroup = ({
  name, items, label, required, color,
}) => (
  <Fragment>
    <Field className="radioGroup" name={name} component={RadioGroup}>
      <InputLabel
        component="h5"
        classes={{
          root: 'radioGroup__label',
        }}
      >
        {label}
      </InputLabel>
      {items.map((radio, index) => (
        <FormControlLabel
          key={radio.label}
          value={radio.value}
          control={<Radio classes={{ root: 'radioGroup__radio' }} color={color || 'primary'} />}
          label={radio.label}
          classes={{
            label: 'radioGroup__radioLabel',
          }}
        />
      ))}
    </Field>
    <TextField component="input" name={name} required={required} type="hidden" />
  </Fragment>
);

export default MyRadioGroup;
