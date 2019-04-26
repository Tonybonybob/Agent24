import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const PureRadioButton = ({ ...custom }) => (
  <FormControlLabel
    control={<Radio classes={{ root: 'radioGroup__radio' }} color="primary" />}
    classes={{
      label: 'radioGroup__radioLabel',
    }}
    {...custom}
  />
);

export default PureRadioButton;
