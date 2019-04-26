import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createTextMask } from 'redux-form-input-masks';

import authGuard from '../../../guards/AuthGuard';
import { recoverPasswordAsyncAction } from '../../../store/actions/auth';
import AuthLayout from '../../../layouts/AuthLayout';
import AuthInput from '../../../components/common/AuthInput';
import { Button } from '../../../components/general/Button';

const mapDispatchToProps = dispatch => ({
  recoverPassword: data => dispatch(recoverPasswordAsyncAction(data)),
});

// const required = value => (value ? undefined : 'Обязательно');

// const emailOrPhone = value => (((
//   !/^(\+?\d{2})?(\d{10})$/g.test(value)
// ) && (
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//   )) ? 'Поле должно быть или email или телефон' : undefined);

const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRequired = value => (value && value.length >= 9 ? undefined : 'Введите номер телефона');

const numberMask = createTextMask({
  pattern: '99 999 9999',
  guide: false,
  allowEmpty: true,
});

class SigninPage extends Component {
  static propTypes = {
    recoverPassword: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(data) {
    const { recoverPassword } = this.props;

    recoverPassword(data.username);
  }

  render() {
    const { handleSubmit, valid } = this.props;

    return (
      <AuthLayout>
        <form className="authForm" onSubmit={handleSubmit(this.submit)}>
          <h3 className="authForm__title authForm__title_recovery">
            Забыли пароль?
          </h3>
          <h5 className="authForm__subTitle">
            Мы сгенерируем новый и отправим его на ваш номер
          </h5>
          <Field
            name="phone"
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
          <Button disabled={!valid} size="big" full type="submit">
            Напомнить пароль
          </Button>
          <Link to="login" className="authForm__additionalAction">
            {'< Вход'}
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
