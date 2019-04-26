import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import ClickAwayListener from 'material-ui/internal/ClickAwayListener';
import { withRouter } from 'react-router-dom';

import AuthInput from '../../../../components/common/AuthInput';
import MessagesIcon from '../../../../assets/MessagesIcon';
import { Button } from '../../../../components/general/Button';
import Logo from '../../../../assets/Logo';
import YoutubeRounded from '../../../../assets/YoutubeRounded';
import FacebookRounded from '../../../../assets/FacebookRounded';
import { sendMailAsyncAction, closeModalAction } from '../../../../store/actions/landing';
import { getShowModal, getFormPending } from '../../../../store/reducers/landing';
import BigClose from '../../../../assets/BigClose';
import { compose } from 'recompose';
import './style.scss';
const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailRequired = value => email.test(value) ? undefined : 'Введите настоящую почту';

class LandingNotification extends Component {
  static propTypes = {
    sendMail: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  submit = (data) => {
    const { sendMail } = this.props;

    sendMail({ ...data, link: '/#modal' });
  }

  render() {
    const {
      valid, handleSubmit, pending, showModal,
      closeModal, name, location, history,
    } = this.props;

    console.log(location);

    return (
      <div className="landingNotification landingPage__block" id="footer">
        {location.hash === '#modal' && (
          <div className="landingModal">
            <ClickAwayListener onClickAway={() => history.goBack()}>
              <div className="landingModal__wrapper">
                <div className="landingModal__inner">
                  <div className="landingModal__close" onClick={() => history.goBack()}>
                    <BigClose />
                  </div>
                  <div className="landingModal__innerContent">
                    <h4 className="landingModal__title">
                      Благодарим за подписку,
                      {name}
                    </h4>
                    <h6 className="landingModal__subTitle">
                      Теперь Вы получаете актуальные новости Агент24
                    </h6>
                  </div>
                </div>
              </div>
            </ClickAwayListener>
          </div>
        )}
        <div
          className="container"
        >
          <div className="row">
            <div className="row__col row__col_12 row__col_lg8 row__col_mllg2">
              <h3 className="landingNotification__title">
                Подпишитесь на наши обновления и
                <br />
                получите бесплатный доступ
                <br />
                в день запуска
              </h3>
            </div>
          </div>
          <form onSubmit={handleSubmit(this.submit)}>
            <div className="row">
              <div className="row__col row__col_12 row__col_lg4 row__col_mllg4 landingNotification__sendItem landingNotification__sendItem_first">
                <Field
                  name="subscribeName"
                  type="text"
                  labelAnimated
                  component={AuthInput}
                  // validate={[nameRequired]}
                  label="Имя"
                />
              </div>
            </div>
            <div className="row">
              <div className="row__col row__col_12 row__col_lg4 row__col_mllg4 landingNotification__sendItem">
                <Field
                  name="subscribeEmail"
                  type="email"
                  labelAnimated
                  email
                  component={AuthInput}
                  validate={[emailRequired]}
                  label="Email"
                />
              </div>
            </div>
            <div className="row">
              <div className="row__col row__col_12 row__col_lg4 row__col_mllg4 landingNotification__sendItem">
                <Button size="big" disabled={!valid || pending} type="submit">
                  {pending
                    ? 'ОБРАБАТЫВАЕТСЯ'
                    : 'ПОДПИСАТЬСЯ'
                  }
                </Button>
              </div>
            </div>
          </form>
          <footer className="landingNotification__footer">
            <div className="row">
              <div className="row__col row__col_12 row__col_lg3 row__col_mlxl1">
                <Logo />
                <div className="landingNotification__logoText">
                  Единая
                  <br />
                  Риелторская Сеть
                </div>
              </div>
              <div className="row__col row__col_12 row__col_lg4 row__col_xl3 row__col_mrlg1 landingNotification__rights">
                2018 •
                <a href="/" className="landingNotification__agent24 landingNotification__agent24_margin">
                  Agent24
                </a>
                © — все права защищены
              </div>
              <div className="row__col row__col_12 row__col_lg4 row__col_xl3 landingNotification__links">
                <div>
                  <MessagesIcon />
                  <a href="mailto:info@agent24.ua" className="landingNotification__agent24">
                    info@agent24.ua
                  </a>
                </div>
                <div>
                  <a href="https://facebook.com" target="_blank" className="landingNotification__social_first">
                    <FacebookRounded />
                  </a>
                  <a href="https://youtube.com" target="_blank" className="landingNotification__social">
                    <YoutubeRounded />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('LandingForm');

const mapDispatchToProps = dispatch => ({
  sendMail: data => dispatch(sendMailAsyncAction(data)),
  closeModal: () => dispatch(closeModalAction()),
});

const mapStateToProps = state => ({
  showModal: getShowModal(state),
  pending: getFormPending(state),
  name: selector(state, 'subscribeName'),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(LandingNotification);
