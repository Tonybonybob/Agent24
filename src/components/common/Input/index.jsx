import React, { Component } from 'react';
import { propTypes } from 'redux-form';
import PropTypes from 'prop-types';
import './style.scss';
class Input extends Component {
  render() {
    const {
      className, label, labelAnimated,
      type, placeholder, htmlAutocomplete,
      input, meta: { pristine, visited, active, error }, ...other
    } = this.props;
    const id = Date.now();
    if (htmlAutocomplete) {
      input.autoComplete = htmlAutocomplete;
    }
    if (placeholder && !labelAnimated || placeholder && active) {
      input.placeholder = placeholder;
    }
    return (
      <div
        className={`
            input
            ${active ? 'input_active' : ''}
            ${pristine ? 'input_pristine' : ''}
            ${error && visited && !active ? 'input_error' : ''}
            ${labelAnimated ? 'input_labelAnimated' : ''}
            input_label
            ${className ? className : ''}
          `}
      >
        {label &&
          <label
            className="input__label"
            htmlFor={id}
          >
            {label}
          </label>
        }
        <input {...input}
          id={id}
          type={type ? type : "text"}
          className="input__control"
          {...other}
        />
        {error && visited && !active &&
          <div
            className="input__error"
          >
            {error}
          </div>
        }
      </div>

    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  // input: PropTypes.shape(propTypes),
  // meta: PropTypes.isRequired,
  labelAnimated: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'password']),
  placeholder: PropTypes.string,
  htmlAutocomplete: PropTypes.string,
  className: PropTypes.string
};

export default Input;
