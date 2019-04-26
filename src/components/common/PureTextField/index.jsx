import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import AutosizeInput from 'react-input-autosize';
import './style.scss';
const MyPureTextField = ({
  label,
  InputLabelProps,
  className,
  onChange,
  inputRef,
  InputProps,
  overflow,
  resizableInput,
  noDisabledUnderline,
  placeholder,
  error,
  ...other
}) =>
  resizableInput ? (
    <div className="resizeInputHolder">
      <AutosizeInput
        placeholder={placeholder}
        inputRef={inputRef}
        onChange={onChange}
        className="resizeInput"
        {...other}
      />
      {error && <span>Обязательно</span>}
    </div>
  ) : (
    <div className={`pureTextField ${className}`}>
      <TextField
        classes={{
          root: 'pureTextField__container',
        }}
        onChange={onChange}
        InputProps={{
          ...InputProps,
          classes: {
            root: 'pureTextField__input',
            error: 'pureTextField__input_error',
            underline: `pureTextField__underline ${
              noDisabledUnderline ? 'pureTextField__underline_no' : ''
            }`,
            input: `${overflow ? 'pureTextField__field_overflow' : ''}`,
          },
        }}
        label={label}
        placeholder={placeholder}
        InputLabelProps={InputLabelProps}
        inputProps={{ inputRef }}
        inputRef={inputRef}
        error={error}
        {...other}
      />
    </div>
  );

MyPureTextField.propTypes = {
  label: PropTypes.string,
  InputLabelProps: PropTypes.shape({
    shrink: PropTypes.bool,
  }),
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  overflow: PropTypes.bool,
};

MyPureTextField.defaultProps = {
  label: '',
  InputLabelProps: null,
  className: '',
  overflow: false,
  onChange: () => {},
};

export default MyPureTextField;
