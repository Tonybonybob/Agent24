import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import './style.scss';
const CommonDropzone = ({ children, className, ...rest }) => (
  <Dropzone
    {...rest}
    className={`${className} customDropzone`}
  >
    <div className="customDropzone__inner">
      {children || <div className="customDropzone__circle" />}
    </div>
  </Dropzone>
);

CommonDropzone.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.bool,
  ]),
  className: PropTypes.string,
};

CommonDropzone.defaultProps = {
  children: false,
  className: '',
};

export default CommonDropzone;
