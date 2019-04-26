import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ClickAwayListener } from '@material-ui/core';

import HeaderUnauthorised from '../../components/common/HeaderUnauthorised';
import TextField from '../../components/common/TextField';
import { Button } from '../../components/general/Button';
import LandingClientRequestFeature from '../LandingPage/sections/LandingClientRequest/Features/Feature';
import { sendMailAsyncAction, closeModalAction } from '../../store/actions/landing';
import { getShowModal, getFormPending } from '../../store/reducers/landing';
import BigClose from '../../assets/BigClose';

const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailRequired = value => email.test(value) ? undefined : 'Введите настоящую почту';

class ResumesPage extends Component {

  setActiveCurrentFeature = (number) => {
    this.setState({
      currentFeature: number,
    });
  }

  features = () => {
    const { valid, handleSubmit, pending } = this.props;

    return [{
      id: 0,
      title: 'Java Middle/Senior Developer',
      description: (
        <div className="container">
          <div className="row">
            <div className="row__col row__col_12 row__col_lg6">
              <p className="resumesPage__description">
                Агент24 это продуктовая компания. И мы невероятно рады в преддверии
                запуска расширить состав разработчиков. Ищем талантливых
                мотивированных и готовых к новым вызовам Java девелоперов.
                <br />
                <br />
                Присоединившись к команде Агент24 вы станете частью разработки
                большого SAAS, социальной сети, искусственного интеллекта
                и новой платформы B2B для рынка недвижимости
              </p>
            </div>
            <div className="row__col row__col_12 row__col_lg6 resumesPage__required">
              <div className="resumesPage__requiredTitle">
                Требования
              </div>
              <ul className="resumesPage__requiredList">
                <li>
                  Более 2х лет опыта разработки Java/Java 8, Spring, Hibernate
                </li>
                <li>
                  Rest API, Selenium, Git
                </li>
                <li>
                  Database: MySQL, PostgreSQL
                </li>
                <li>
                  Middle/ Senior level
                </li>
                <li>
                  Advanced unit/functional testing skills
                </li>
                <li>
                  SCRUM, Jira
                </li>
                <li>
                  Docker, Swagger
                </li>
              </ul>
            </div>
            <form className="row resumesPage__form" onSubmit={handleSubmit(values => this.submit({ ...values, candidateType: 'JAVA' }))}>
              <div className="row__col row__col_10 row__col_ml1  row__col_lg4 row__col_mllg1">
                <TextField
                  name="candidateName"
                  label="Имя"
                />
              </div>
              <div className="row__col row__col_10 row__col_ml1 row__col_mllg0 row__col_lg3">
                <TextField
                  name="candidateEmail"
                  label="Email"
                  type="email"
                  validate={[emailRequired]}
                />
              </div>
              <div className="row__col row__col_10 row__col_ml1 row__col_mllg0  row__col_lg3">
                <TextField
                  name="candidatePhone"
                  label="Телефон или скайп"
                />
              </div>
              <div className="row__col row__col_10 row__col_ml1  row__col_lg6 row__col_mllg1">
                <TextField
                  name="candidateDetails"
                  label="Детали"
                  multiline
                  required={false}
                />
              </div>
              <div className="row__col row__col_10 row__col_ml1 row__col_mllg0  row__col_lg4">
                <Button buttonType="add" full disabled={!valid || pending} type="submit">
                  {pending
                    ? 'ОБРАБАТЫВАЕТСЯ'
                    : 'ОТПРАВИТЬ ЗАЯВКУ НА ВАКАНСИЮ'
                  }
                </Button>
              </div>
            </form>
          </div>
        </div>
      ),

    }, {
      id: 1,
      title: 'Front-End JS Dev',
      description: (
        <div className="container">
          <div className="row">
            <div className="row__col row__col_12 row__col_lg6">
              <p className="resumesPage__description">
                Мы в поисках Frontend разработчиков в быстро растущую продуктовую
                компанию, талантливых, мотивированных и готовых к новым вызовам.
                <br />
                <br />
                Постройте успешную карьеру присоединившись к команде Агент24!
                Вы станете частью разработки большого SAAS, социальной сети,
                искусственного интеллекта и новой платформы B2B для рынка недвижимости
              </p>
            </div>
            <div className="row__col row__col_12 row__col_lg6 resumesPage__required">
              <div className="resumesPage__requiredTitle">
                Требования
              </div>
              <ul className="resumesPage__requiredList">
                <li>
                  Более 2х лет опыта разработки в Javascript, React + Redux
                </li>
                <li>
                  Figma, Rest API, Webpack, Bootstrap, jQuery, HTML (5), CSS (3), jQuery, SASS(SCSS)
                </li>
                <li>
                  Стронг скилы по адаптивной верстке
                </li>
                <li>
                  Strong Junior/Middle/Senior
                </li>
                <li>
                  SCRUM, Jira, Git
                </li>
              </ul>
            </div>
            <form className="row resumesPage__form" onSubmit={handleSubmit(values => this.submit({ ...values, candidateType: 'JS' }))}>
              <div className="row__col row__col_10 row__col_ml1 row__col_lg4 row__col_mllg1">
                <TextField
                  name="candidateName"
                  label="Имя"
                />
              </div>
              <div className="row__col row__col_10 row__col_ml1 row__col_mllg0 row__col_lg3">
                <TextField
                  name="candidateEmail"
                  label="Email"
                  type="email"
                  validate={[emailRequired]}
                />
              </div>
              <div className="row__col row__col_10 row__col_ml1 row__col_lg3 row__col_mllg0">
                <TextField
                  name="candidatePhone"
                  label="Телефон или скайп"
                />
              </div>
              <div className="row__col row__col_10 row__col_ml1  row__col_lg6 row__col_mllg1">
                <TextField
                  name="candidateDetails"
                  label="Детали"
                  multiline
                  required={false}
                />
              </div>
              <div className="row__col row__col_10 row__col_ml1 row__col_mllg0 row__col_lg4">
                <Button buttonType="add" full disabled={!valid || pending} type="submit">
                  {pending
                    ? 'ОБРАБАТЫВАЕТСЯ'
                    : 'ОТПРАВИТЬ ЗАЯВКУ НА ВАКАНСИЮ'
                  }
                </Button>
              </div>
            </form>
          </div>
        </div>
      ),
      className: 'landingClientRequest__stageCharacter_addObject',
    }];
  }

  submit = (data) => {
    const { sendMail } = this.props;

    sendMail({ ...data, link: '/cv/#modal' });
  }

  constructor(props) {
    super(props);

    this.state = {
      currentFeature: 0,
    };
  }

  render() {
    const { currentFeature } = this.state;

    const { showModal, name, history, location } = this.props;

    console.log(1, this.props);

    return (
      <div className="resumesPage">
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
                      Благодарим за интерес к вакансии,
                      {name}
                    </h4>
                    <h6 className="landingModal__subTitle">
                      Менеджер свяжется с Вами в ближайшее время
                    </h6>
                  </div>
                </div>
              </div>
            </ClickAwayListener>
          </div>
        )}
        <HeaderUnauthorised />
        <div className="resumesPage__content container">
          <div className="row">
            <div className="row__col row__col_12 row__col_lg10 row__col_xl8 row__col_mlxl2 row__col_mrxl2 row__col_mllg1 row__col_mrlg1">
              <h1 className="resumesPage__title">
                Вакансии
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="row__col row__col_12 row__col_lg10 row__col_xl8 row__col_mlxl2 row__col_mrxl2 row__col_mllg1 row__col_mrlg1">
              {this.features().map((feature, index) => (
                <LandingClientRequestFeature
                  number={`0${index + 1}`}
                  title={feature.title}
                  description={feature.description}
                  isActive={index === currentFeature}
                  progressBarWidth={0}
                  handleClick={this.setActiveCurrentFeature}
                  id={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('ResumesForm');

const mapDispatchToProps = dispatch => ({
  sendMail: data => dispatch(sendMailAsyncAction(data)),
  closeModal: () => dispatch(closeModalAction()),
});

const mapStateToProps = state => ({
  showModal: getShowModal(state),
  pending: getFormPending(state),
  name: selector(state, 'candidateName'),
});

export default compose(
  reduxForm({
    form: 'ResumesForm',
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(ResumesPage);
