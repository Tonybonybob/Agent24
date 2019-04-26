import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';

// import { signInAsyncAction } from '../../../../../store/actions/auth';
import { Button } from '../../../../../components/general/Button';
import AuthInput from '../../../../../components/common/AuthInput';
import ArrowForward from '../../../../../assets/ArrowForward';

const numberMask = createTextMask({
  pattern: '99 999 9999',
  guide: false,
  allowEmpty: true,
});

class RegisterCheckPhone extends Component {
  render() {
    return (
      <div className="validate__fieldsWrapper">
        <div>
          <Field
            name="firstName"
            type="text"
            htmlAutocomplete="new-first-name"
            labelAnimated
            component={AuthInput}
            // validate={[nameRequired]}
            label="Имя"
            className="authFormBox__formItem authFormBox__formItem_first"
          />
          <Field
            name="phone"
            type="text"
            htmlAutocomplete="new-phone"
            labelAnimated
            component={AuthInput}
            number
            // validate={[phone, phoneRequired]}
            className="loginPage__formItem"
            label="Телефон"
            {...numberMask}
          />
          <Button
            className="authFormBox__formSubmit"
            type="submit"
            full
            size="big"
          >
            Создать аккаунт
            <span style={{ marginLeft: '10px' }}>
              <ArrowForward />
            </span>
          </Button>
        </div>
      </div>
    );
  }
}

export default RegisterCheckPhone;
