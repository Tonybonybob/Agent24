import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';

import TextField from '../../../../components/common/TextField';
import Select from '../../../../components/common/Select';
import Col from '../../../../components/Grid/Col';
import Row from '../../../../components/Grid/Row';
import { Button } from '../../../../components/general/Button';
import DateField from '../../../../components/general/EditFormComponents/DateField';
import { setIsOOOFormAction } from '../../../../store/actions/auth';
import './style.scss';
moment.locale('ru');


const firstYear = 1956;
const years = new Array(62).fill(null)
  .map((el, key) => ({ name: firstYear + key + 1, value: firstYear + key + 1 }));

// eslint-disable-next-line
class ConfirmAgency extends Component {
  static propTypes = {
    goPrevTab: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
    isOOO: PropTypes.bool,
    setIsOOO: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    isOOO: false,
  }

  render() {
    const { goPrevTab, valid, isOOO, setIsOOO } = this.props;

    return (
      <form className="confirmAgency">
        <h3 className="profileCreate__title">
          Информация об ООО или ТМ
        </h3>
        <p className="profileCreate__info">
          Название Вашего Агентства недвижимости
        </p>
        <p className="profileCreate__info">
          Подтвердите название вашего АН - заполните поля для ООО (ваш КВЭД: 68.31) и/или ТМ(класс МКТУ 36)
        </p>
        <div>
          <span className={`confirmAgency__label confirmAgency__label_first ${isOOO ? 'confirmAgency__label_active' : ''}`} onClick={() => setIsOOO(true)}>
            ООО
          </span>
          <span className={`confirmAgency__label confirmAgency__label_second ${!isOOO ? 'confirmAgency__label_active' : ''}`} onClick={() => setIsOOO(false)}>
            ТМ
          </span>
          <span className="confirmAgency__save">
            Сохранено
          </span>
        </div>
        <Row>
          <Col
            default={{
              col: 11,
            }}
            lg={{
              col: 3,
            }}
          >
            <TextField
              name={isOOO ? 'OOO' : 'TM'}
              label={`Полное название ${isOOO ? 'ООО' : 'ТМ'}`}
            />
          </Col>
          <Col
            default={{
              col: 11,
            }}
            lg={{
              col: 2,
            }}
          >
            {isOOO
              ? (
                <TextField
                  name="OKPO"
                  label="Код ОКПО"
                />
              ) : (
                <Select
                  name="MKTU"
                  items={[
                    { name: 'Класс 36', value: 36 },
                    { name: 'Класс 37', value: 37 },
                  ]}
                  label="Класс МКТУ"
                />
              )}
          </Col>
          {!isOOO && (
            <Col
              default={{
                col: 8,
              }}
              lg={{
                col: 3,
              }}
            >
              <TextField
                name="certificate"
                label="№ свидетельства"
              />
            </Col>
          )}
          <Col default={{ col: 12 }} lg={{ col: 4 }}>
            <DateField years={years} />
          </Col>
        </Row>

        <div className="profileCreate__buttons">
          <Button buttonType="primary" onClick={goPrevTab}>
            Назад
          </Button>
          <Button buttonType="primary" disabled={!valid}>
            Финиш
          </Button>
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('ConfirmAgencyForm');

const mapStateToProps = state => ({
  isOOO: selector(state, 'isOOO'),
});

const mapDispatchToProps = dispatch => ({
  setIsOOO: data => {console.log(data); dispatch(setIsOOOFormAction(data))},
});

export default compose(
  reduxForm({
    form: 'ConfirmAgencyForm',
    initialValues: {
      dateDay: Number(moment().format('DD')),
      dateMonth: Number(moment().format('MM')),
      dateYear: Number(moment().format('YYYY')),
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(ConfirmAgency);
