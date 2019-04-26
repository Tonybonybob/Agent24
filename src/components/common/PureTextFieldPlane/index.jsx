import React from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';

import PureTextField from '../PureTextField';
import InputEnter from '../../../assets/InputEnter';
import './style.scss';
const PureTextFieldPlane = ({ className, label, handleClick, value }) => (
  <div className="pureTextFieldPlane">
    <PureTextField
      className={className}
      label={label}
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <InputEnter onClick={() => handleClick(value)} />
          </InputAdornment>
        ),
      }}
    />
  </div>
);

PureTextFieldPlane.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  handleClick: PropTypes.func,
  value: PropTypes.string,
};

PureTextFieldPlane.defaultProps = {
  className: '',
  label: '',
  handleClick: () => {},
  value: '',
};

export default PureTextFieldPlane;
