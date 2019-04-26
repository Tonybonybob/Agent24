import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createTextMask } from 'redux-form-input-masks';

import authGuard from '../../../guards/AuthGuard';
import { signInAsyncAction } from '../../../store/actions/auth';
import AuthLayout from '../../../layouts/AuthLayout';
import AuthInput from '../../../components/common/AuthInput';
import { Button } from '../../../components/general/Button';
import './style.scss';
const mapDispatchToProps = dispatch => ({
  signIn: data => dispatch(signInAsyncAction(data)),
});

// const required = value => (value ? undefined : 'Обязательно');

// const emailOrPhone = value => (((
//   !/^(\+?\d{2})?(\d{10})$/g.test(value)
// ) && (
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//   )) ? 'Поле должно быть или email или телефон' : undefined);

const phoneRequired = value => (value && value.length >= 9 ? undefined : 'Введите номер телефона');
const required = value => value ? undefined : 'Обязательно';

const numberMask = createTextMask({
  pattern: '99 999 9999',
  guide: false,
  allowEmpty: true,
});

class SigninPage extends Component {
  static propTypes = {
    signIn: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(data) {
    const { signIn } = this.props;

    console.log(data);

    signIn({ ...data, username: '+380' + data.username });
  }

  render() {
    const { handleSubmit, valid, errorMessage } = this.props;

    return (
      <AuthLayout>
        <form className="authForm" onSubmit={handleSubmit(this.submit)}>
          <h3 className="authForm__title">
            Вход
          </h3>
          <Field
            name="username"
            type="text"
            htmlAutocomplete="new-phone"
            labelAnimated
            component={AuthInput}
            number
            validate={[phoneRequired]}
            className="loginPage__formItem"
            label="Телефон"
            {...numberMask}
          />
          <Field
            name="password"
            type="password"
            labelAnimated
            component={AuthInput}
            showPrefix={false}
            validate={[required]}
            label="Пароль"
          />
          {errorMessage && (
            <div className="authForm__errorMessage" />
          )}
          <Button disabled={!valid} size="big" full type="submit">
            Войти
          </Button>
          <Link to="recovery" className="authForm__additionalAction">
            Забыли пароль?
          </Link>
          <Link to="signup" className="authForm__additionalAction">
            Регистрация
          </Link>
        </form>
      </AuthLayout>
    );
  }
}

export default compose(
  authGuard({ redirectTo: '/' }),
  connect(null, mapDispatchToProps),
  reduxForm({
    form: 'SigninForm',
    destroyOnUnmount: false,
  }),
)(SigninPage);
