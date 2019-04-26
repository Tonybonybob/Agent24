import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import IPhoneIcon from '../../../assets/IPhone';
import UserAuthIcon from '../../../assets/UserAuth';
import EmailIcon from '../../../assets/EmailIcon';
import './style.scss';
const AuthInput = ({ number, email, showPrefix, ...other }) => (
  <div className={`authInput ${number ? 'authInput_number' : ''} ${showPrefix ? '' : 'authInput_noPrefix'}`}>
    <span className="authInput__adornment authInputAdornment">
      {showPrefix && number && (
        <Fragment>
          <span className="authInputAdornment__number">
            +380
          </span>
        </Fragment>
      )}
    </span>
    <Input {...other} />
  </div>
);

AuthInput.propTypes = {
  number: PropTypes.bool,
  email: PropTypes.bool,
  showPrefix: PropTypes.bool,
};

AuthInput.defaultProps = {
  number: false,
  email: false,
  showPrefix: true,
}

export default AuthInput;
