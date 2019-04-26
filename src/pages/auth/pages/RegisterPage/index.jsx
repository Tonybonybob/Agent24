import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextField from '../../../../components/common/TextField';

import AuthFormBox from '../../AuthFormBox';
import RegisterCheckPhone from './CheckPhone';
import ValidatePhone from './ValidatePhone';
import { getRegistrationStep, getSmsToken, getTokenIsValid } from '../../../../store/reducers/auth';
import { checkPhoneAsyncAction, setRegistrationStepAction, setSmsTokenAction, checkSmsTokenAsyncAction, setTokenIsValid } from '../../../../store/actions/auth';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(data) {
    const { registrationStep, checkPhone, setStep } = this.props;

    console.log('hello');

    switch (registrationStep) {
      case 'initialize':
        setStep('validation');
        break;
      case 'validation':
        console.log('validatePhone', data);
        break;
      case 'completion':
        console.log('complete');
        break;
      default:
        console.log('ok');
        setStep('validation');
        console.log(data);
        break;
    }
  }

  render() {
    const { registrationStep, handleSubmit, checkPhone, valid,
      smsToken, code, setSmsToken, isTokenValid, checkSmsToken,
      phone, setTokenValid
    } = this.props;
    let component;
    switch (registrationStep) {
      case 'initialize':
        component = (
          <AuthFormBox
            title="Регистрация"
            description="Подтвердите номер телефона для работы с сервисом"
          >
            <form onSubmit={handleSubmit(this.submit)}>
              <RegisterCheckPhone valid={valid} />
            </form>
            2121
            <Link to="/signin" className="authFormBox__signin">
              Вход
            </Link>
          </AuthFormBox>
        );
        break;
      case 'validation':
        component = (
          <AuthFormBox
            title="Регистрация"
            description="Подтвердите номер телефона для работы с сервисом"
          >
            <form onSubmit={handleSubmit(this.submit)}>
              <ValidatePhone
                checkPhone={checkPhone}
                code={code}
                smsToken={smsToken}
                valid={valid}
                phone={phone}
                setSmsToken={setSmsToken}
                setTokenValid={setTokenValid}
                checkSmsToken={checkSmsToken}
                isTokenValid={isTokenValid}
              />
            </form>
            <Link to="/signin" className="authFormBox__signin">
              Вход
            </Link>
          </AuthFormBox>
        );
        break;
      case 'completion':
        component = (
          <div>
            Completion
          </div>
        );
        break;
      default:
        component = (
          <AuthFormBox
            title="Регистрация"
            description="Подтвердите номер телефона для работы с сервисом"
          >
            <form onSubmit={handleSubmit(this.submit)}>
              <RegisterCheckPhone valid={valid} />
            </form>
            <Link to="/signin" className="authFormBox__signin">
              Вход
            </Link>
          </AuthFormBox>
        );
        break;
    }
    return component;
  }
}

const selector = formValueSelector('RegisterForm');

const mapStateToProps = state => ({
  registrationStep: getRegistrationStep(state),
  smsToken: getSmsToken(state),
  isTokenValid: getTokenIsValid(state),
  phone: selector(state, 'phone'),
  code: selector(state, 'code'),
});

const mapDispatchToProps = dispatch => ({
  checkPhone: data => dispatch(checkPhoneAsyncAction(data)),
  setStep: data => dispatch(setRegistrationStepAction(data)),
  setSmsToken: data => dispatch(setSmsTokenAction(data)),
  setTokenValid: data => dispatch(setTokenIsValid(data)),
  checkSmsToken: data => dispatch(checkSmsTokenAsyncAction(data)),
});

RegisterPage.propTypes = {
  registrationStep: PropTypes.string.isRequired,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'RegisterForm',
    initialValues: {
      code: '',
    },
  }),
)(RegisterPage);
