import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { ClickAwayListener } from '@material-ui/core';

import HeaderUnauthorised from '../../components/common/HeaderUnauthorised';
import TextField from '../../components/common/TextField';
import { Button } from '../../components/general/Button';
import { sendMailAsyncAction, closeModalAction } from '../../store/actions/landing';
import { getShowModal, getFormPending } from '../../store/reducers/landing';
import BigClose from '../../assets/BigClose';
import InvestorsPeopleIcon from '../../assets/InvestorsPeople';
import InvestorsDocumentIcon from '../../assets/InvestorsDocument';
import InvestorsThumbIcon from '../../assets/InvestorsThumb';
import InvestorsShieldIcon from '../../assets/InvestorsShield';
import InvestorsTagIcon from '../../assets/InvestorsTag';
import InvestorsLockIcon from '../../assets/InvestorsLock';
import InvestorsFolderIcon from '../../assets/InvestorsFolder';
import InvestorsHomeIcon from '../../assets/InvestorsHome';
import Check from '../../assets/Check';
import './style.scss';

const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailRequired = value => email.test(value) ? undefined : 'Введите настоящую почту';

class InvestorsPage extends Component {
  submit = (data) => {
    const { sendMail } = this.props;

    sendMail({ ...data, link: '/investors/#modal' });
  }

  render() {
    const {
      valid, handleSubmit, pending, history,
      showModal, closeModal, name, location,
    } = this.props;

    return (
      <div className="investorsPage">
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
                      Благодарим за интерес к Агент24,
                      {' '}
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
        <div className="investorsPage__content">
          <div className="row">
            <div className="row__col row__col_12 row__col_lg10 row__col_mllg1 row__col_xl8 row__col_mlxl2">
              <h1 className="investorsPage__title">
                Инвесторам
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="row__col row__col_12 row__col_lg10 row__col_mllg1 row__col_xl8 row__col_mlxl2">
              <p className="investorsPage__paragraph">
                <div>
                  <strong>
                    Агент24 RSN (Realtor Social Network)
                  </strong>
                  - это CRM/BPM система, закрытая социальная сеть для риэлторов,
                  агентств недвижимости и отделов продаж застройщиков,
                  мобильное приложение в стиле Uber и Facebook для покупателей, продавцов,
                  арендаторов и арендодателей на рынке недвижимости
                  Украины.
                </div>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="row__col row__col_12 row__col_lg4 row__col_mllg1 row__col_xl3 row__col_mlxl2 row__col_mrlg1 row__col_mrxl0">
              <p className="investorsPage__paragraph_small">
                Мы создали новое,
                <strong>
                  SAAS-архитектурное решениe
                </strong>
                , основанное на искусственном
                интеллекте, которое в корне изменит способ продажи и аренды жилья начиная с 2019г.
              </p>
            </div>
            <div className="row__col row__col_12 row__col_lg4 row__col_xl3">
              <p className="investorsPage__paragraph_small">
                <strong>
                  Агент24
                </strong>
                - это первый в мире, настоящий автопилот продаж и аренды объектов всех типов:
               квартиры, дома, участки и коммерческая недвижимости
              </p>
            </div>
          </div>
          <div className="row">
            <div className="investorsPage__possibilitiesWrapper row__col_12 row__col_lg10 row__col_mrlg1 row__col_mrxl2 row__col_mllg1 row__col_xl8 row__col_mlxl2">
              <h3 className="investorsPage__possibilities">
                <span className="investorsPage__number">
                  <div className="investorsPage__numberContent">
                    50+
                  </div>
                </span>
                возможностей Агент24, в том числе 7 не существующих на рынке:
              </h3>
              <div className="row">
                <div className="row__col_lg5 row__col_mrlg1 investorsPage__list">
                  <ul>
                    <li>
                      Единая база объектов недвижимости на продажу и аренду от
                      собственников с обновлениями и модерацией каждую 1 секунду 365 дней в году
                    </li>
                    <li>
                      Отсутствие фейков - только реальные обьекты с настоящими фото,
                      характеристиками и актуальной ценой
                  </li>
                    <li>
                      Эксклюзивы всех Агентств недвижимости страны на одной удобной странице, 40 тыс риэлторов
                  </li>
                    <li>
                      Единая База покупателей/арендаторов всех агентств недвижимости Украины
                  </li>
                    <li>
                      Автопоиск обьектов под любого клиента и наоборот - в один клик или свайп
                      в телефоне с сложной обработкой в Google Distance (не существующая функция ни в одной компании в мире)
                  </li>
                    <li>
                      Первый Украинский веб-портал по недвижимости обьединяющий все обьекты собственников, частных
                      риэлторов и всех Агентств недвижимости в одном месте с удобным поиском и виртуальным офисом
                  </li>
                    <li>
                      Первый сервис с удобным продвинутым мобильным приложением на iOs и Android как для риэлторов,
                      застройщиков, так и для покупателей и продавцов
                  </li>
                    <li>
                      Подбор и регистрация показов без звонка риэлторам по вашей геолокации в стиле Uber
                  </li>
                    <li>
                      Кросс-платформенный мессенджер 3 в 1: Viber, WhatsApp, Telegram
                  </li>
                    <li>
                      Цена сервиса в месяц всего 299 грн
                  </li>
                  </ul>
                </div>
                <div className="row__col_lg5 investorsPage__list investorsPage__list_last">
                  <ul>
                    <li>
                      Первый сервис аналитики реальных сделок по всей стране в сегментах Продажа
                      и Аренда Квартиры/Дома/Земли/Коммерция
                  </li>
                    <li>
                      Создание и внедрение бизнес-процессов как на предприятии
                      Агентства недвижимости так и у Застройщиков
                  </li>
                    <li>
                      Армия модераторов Реестра объектов, риэлторов, застройщиков, парсер-объектов,
                      эксклюзивных договоров, комментариев, фейков
                  </li>
                    <li>
                      Кадастровый реестр, реестр вещных прав на недвижимое имущество - быстрые заказы
                      проверок недвижимости, вытягов из всех электронных реестров
                  </li>
                    <li>
                      Интеграция с ip-телефонией, многоканальная мобильная связь, горячие линии,
                      рекламные номера для аналитики лидов
                  </li>
                    <li>
                      Бесплатное Дисковое пространство 5 Гб на одного пользователя
                  </li>
                    <li>
                      Интеграция с соцсетями: Instagram, Facebook, Youtube
                  </li>
                    <li>
                      Бесплатная подписка - все контакты и сделки риэлторов будут сохранены навсегда
                  </li>
                    <li>
                      8 дополнительных сервисов  монетизации Агент24 жизненно
                      необходимых для агентов и компаний в 2019г
                  </li>
                    <li>
                      И многое МНОГОЕ другое...
                  </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="investorsPage__principles">
          <div className="row">
            <div className="row__col row__col_12 row__col_lg10 row__col_mllg1 row__col_xl8 row__col_mlxl2 investorsPage__principleWrapper">
              <div className="investorsPage__principle investorsPage__principleTitle">
                Главные принципы Агент24:
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row__col row__col_12 row__col_lg10 row__col_mllg1 row__col_xl8 row__col_mlxl2 investorsPage__principleWrapper">
              <div className="investorsPage__principle">
                <InvestorsPeopleIcon />
                Формирование цивилизованного рынка недвижимости, стандартизация и
                популяризация профессиональной риэлторской услуги
              </div>
              <div className="investorsPage__principle">
                <InvestorsDocumentIcon />
                Мотивация риэлторов на создание бренда и поддержание высокого качества
                услуги продавцу и покупателю
              </div>
              <div className="investorsPage__principle">
                <InvestorsThumbIcon />
                Прозрачность отношений между риэлторами и клиентами
              </div>
              <div className="investorsPage__principle">
                <InvestorsShieldIcon />
                Санкции и исключения недобросовестных риэлторов
              </div>
            </div>
            <div className="row__col row__col_12 row__col_lg10 row__col_mllg1 row__col_xl8 row__col_mlxl2 investorsPage__principleWrapper">
              <div className="investorsPage__principle">
                <InvestorsTagIcon />
                Самый последний стек технологий back-end и front-end разработки, самые
                передовые новинки IT всегда в нашем сервисе
              </div>
              <div className="investorsPage__principle">
                <InvestorsLockIcon />
                Защищенность конфиденциальной информации и
                отказоустойчивость всей системы 24 / 7 / 365
              </div>
              <div className="investorsPage__principle">
                <InvestorsFolderIcon />
                Защита потребителя от мошенников и объектов с сомнительными документами
              </div>
              <div className="investorsPage__principle">
                <InvestorsHomeIcon />
                Клиент получает самые релевантные объекты с 97% охватом рынка
              </div>
            </div>
          </div>
        </div>
        <div className="investorsPage__checkList">
          <div className="row">
            <div className="row__col row__col_12 row__col_lg10 row__col_mllg1 row__col_xl8 row__col_mlxl2 investorsPage__checkListWrapper">
              <div className="investorsPage__checkListTitle">
                ЧЕК-Лист Инвестора Агент24:
              </div>
              <div className="investorsPage__checkListPart">
                <div className="investorsPage__checkListItem">
                  <Check />
                  Вы пользовались или пользуетесь услугами
                  риэлтора и считаете это полезным и выгодным
                </div>
                <div className="investorsPage__checkListItem">
                  <Check />
                  Вы хотите зарабатывать от 100 долл до 10 тыс долл в месяц пассивного дохода
                </div>
                <div className="investorsPage__checkListItem">
                  <Check />
                  Вы уверены что современные порталы по недвижимости
                  это мусорка фейков и несуществующих обьектов
                </div>
                <div className="investorsPage__checkListItem">
                  <Check />
                  Вы знаете что современный рынок первичного жилья переживает недостаток
                  спроса и требует новых инструментов поиска и вовлечения клиентов
                </div>
                <div className="investorsPage__checkListItem">
                  <Check />
                  Чат-боты, туннели продаж, социальные сети, ютуб - все вместе создают
                  больше продаж чем расклейка и объявления в газетах
                </div>
              </div>
              <div className="investorsPage__checkListPart">
                <div className="investorsPage__checkListItem">
                  <Check />
                  Вы догадываетесь что через 3-5 лет искусственный интеллект
                  будет лучшим помощником не только на работе но
                  и в воспитании ваших детей
                </div>
                <div className="investorsPage__checkListItem">
                  <Check />
                  Вы хотели бы что бы ваш электронный помощник взаимодействуя
                  с нашей системой подобрал вам покупателя и одновременно
                  нашел новый более интересный обьект для проживания вашей семьи
                  без доплаты учитывая пополнение в семье, ваши увлечения
                  и частые маршруты передвижения
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row__col row__col_12 row__col_lg10 row__col_mllg1 row__col_xl8 row__col_mlxl2">
              <p className="investorsPage__paragraph">
                Если вы согласны с чек-листом выше - заполните короткую заявку ниже
                и мы отправим вам подробную презентацию о продукте, монетизации
                и механизме оформления Вашей инвестиции в Агент24
                <br />
                <br />
                P.S. Предложение по инвестированию очень короткое и в ближайшее время
                будет закрыто, навсегда. Поспешите
                стать частью самого успешного стартапа на самом дорогом и прибыльном
                рынке мира - рынке недвижимости.
              </p>
              <p className="investorsPage__paragraph">
                <span className="investorsPage__exclamation">
                  !
                </span>
                Пополняйте свой инвестиционный портфель следующей
                мультимиллионной компанией!
              </p>
            </div>
          </div>
          <div className="row">
            <div className="row__col row__col_12 row__col_lg10 row__col_mllg1 row__col_xl8 row__col_mlxl2">
              <form className="investorsPage__form row" onSubmit={handleSubmit(this.submit)}>
                <div className="row__col row__col_10 row__col_ml1 row__col_mr1 row__col_lg3 row__col_mllg1 row__col_mrlg0">
                  <TextField name="investorsName" label="Имя" />
                </div>
                <div className="row__col row__col_10 row__col_ml1 row__col_mr1 row__col_lg3 row__col_mrlg0 row__col_mllg0">
                  <TextField name="investorsPhone" label="Телефон или скайп" />
                </div>
                <div className="row__col row__col_10 row__col_ml1 row__col_mr1 row__col_lg4 row__col_mrlg1 row__col_mllg0">
                  <TextField name="investorsEmail" validate={[emailRequired]} label="Email" type="email" />

                </div>
                <div className="row__col row__col_10 row__col_ml1 row__col_mr1 row__col_lg6 row__col_mllg1 row__col_mrlg0">
                  <TextField name="investorsDetails" label="Детали" multiline />
                </div>
                <div className="row__col row__col_10 row__col_ml1 row__col_mr1 row__col_lg4 row__col_mrlg1 row__col_mllg0">
                  <Button buttonType="add" full disabled={!valid || pending} type="submit" noBorder>
                    {pending
                      ? 'ОБРАБАТЫВАЕТСЯ'
                      : 'ОТПРАВИТЬ ЗАЯВКУ'
                    }
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const selector = formValueSelector('InvestorsForm');

const mapDispatchToProps = dispatch => ({
  sendMail: data => dispatch(sendMailAsyncAction(data)),
  closeModal: () => dispatch(closeModalAction()),
});

const mapStateToProps = state => ({
  showModal: getShowModal(state),
  pending: getFormPending(state),
  name: selector(state, 'investorsName'),
});

export default compose(
  reduxForm({
    form: 'InvestorsForm',
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(InvestorsPage);
