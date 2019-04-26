import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
// eslint-disable-next-line import/prefer-default-export
export const Button = (props) => { // primary, secondary, add, cancel, disabled
  const { // big, small, medium
    children, disabled, buttonType, size, className, onClick, full, blank, noBorder, type, ...other
  } = props;

  const runOnClick = disabled ? () => { } : onClick;

  const defaultClass = `${className}
    ${buttonType}Button
    ${size}Button mainButton
    ${full ? 'fullButton' : ''}
    ${blank ? 'blankButton' : ''}
    ${noBorder ? 'noBorderButton' : ''}
  `;

  const buttonClass = disabled ? `${defaultClass} disabledButton` : defaultClass;
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={runOnClick}
      {...other}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  disabled: PropTypes.bool,
  buttonType: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  buttonType: 'primary',
  size: 'medium',
  className: '',
  type: 'button',
  onClick: () => { },
};
