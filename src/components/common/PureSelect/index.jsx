import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './style.scss';
const UnitedSelect = ({ label, items, value, ...other }) => {
  return (
    <div className="select">
      <FormControl classes={{
        root: 'select__container',
      }}
      >
        <InputLabel htmlFor="xd">
          {label}
        </InputLabel>
        <Select
          id="xd"
          name="xd"
          classes={{
            root: 'select__underline',
          }}
          value={value || []}
          {...other}
        >
          {items.length > 0 && items.map(item => (
            <MenuItem
              value={item.value || item.id}
              key={item.value || item.id}
              component={item.container || null}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

UnitedSelect.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  required: PropTypes.bool,
};

UnitedSelect.defaultProps = {
  required: true,
};

export default UnitedSelect;
