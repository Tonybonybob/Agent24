import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';
import { Link, withRouter } from 'react-router-dom';

// import { signInAsyncAction } from '../../../../../store/actions/auth';
import TextField from '../../../../../components/common/TextField';
import AuthInput from '../../../../../components/common/AuthInput';
import CodeField from '../../../../../components/common/CodeField';
import { Button } from '../../../../../components/general/Button';
import './style.scss';
const nameRequired = value => (value ? undefined : 'Вы не представились');
const phoneRequired = value => (value && value.length >= 9 ? undefined : 'Введите номер телефона');

class ValidatePhone extends Component {
  static propTypes = {
    phone: PropTypes.string.isRequired,
    checkSmsToken: PropTypes.func.isRequired,
    showCallAgain: PropTypes.bool,
    smsToken: PropTypes.bool,
    code: PropTypes.string,
    setSmsToken: PropTypes.func.isRequired,
    checkPhone: PropTypes.func,
    setTokenValid: PropTypes.func.isRequired,
    isTokenValid: PropTypes.bool,
  }

  static defaultProps = {
    showCallAgain: false,
    smsToken: false,
    code: '',
    isTokenValid: false,
    checkPhone: undefined,
  }

  constructor(props) {
    super(props);

    this.numberMask = createTextMask({
      pattern: '99 999 9999',
      guide: false,
      onCompletePattern: (value) => {
        console.log(value);
        props.checkPhone({
          phone: '380'.concat(value),
          type: 'REGISTRATION',
        });
      },
      onChange: () => props.setSmsToken(false),
      allowEmpty: true,
    });
  }


  render() {
    const {
      smsToken, isTokenValid, code, checkPhone, phone, setSmsToken, setTokenValid, checkSmsToken,
      history
    } = this.props;

    console.log(smsToken);
    console.log(isTokenValid);

    return (
      <div className="validate">
        <div className="validate__fieldsWrapper">
          <Field
            name="firstName"
            type="text"
            htmlAutocomplete="new-first-name"
            labelAnimated
            component={AuthInput}
            validate={[nameRequired]}
            label="Имя"
            className="authFormBox__formItem authFormBox__formItem_first"
          />
          <div className="validate__phoneWrapper">
            <Field
              name="phone"
              type="text"
              htmlAutocomplete="new-phone"
              labelAnimated
              component={AuthInput}
              number
              validate={[phoneRequired]}
              disabled={smsToken}
              className="loginPage__formItem"
              label="Телефон"
              {...this.numberMask}
            />
            {smsToken && (
              <span className="validate__change" onClick={this.handleChangePhone}>
                изменить
              </span>
            )}
          </div>

          <CodeField
            code={code}
            phone={phone}
            smsToken={smsToken}
            checkPhone={checkPhone}
            isTokenValid={isTokenValid}
            showCallAgain
            setSmsToken={setSmsToken}
            setTokenValid={setTokenValid}
            checkSmsToken={checkSmsToken}
            checkPhoneValue={{
              phone: '380'.concat(phone),
              type: 'REGISTRATION',
            }}
          />
          <Button
            className="authFormBox__formSubmit"
            type="submit"
            disabled={!isTokenValid}
            full
            size="big"
            onClick={() => history.push('/profile-create')}
          >
            Подтвердить
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(ValidatePhone);
