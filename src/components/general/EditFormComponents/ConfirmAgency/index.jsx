import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';

import TextField from '../../../common/TextField';
import Select from '../../../common/Select';
import Col from '../../../Grid/Col';
import Row from '../../../Grid/Row';
import { Button } from '../../Button';
import DateField from '../DateField';
import { setIsOOOFormAction } from '../../../../store/actions/auth';

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
    buttons: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          buttonType: PropTypes.string,
          onClick: PropTypes.func,
          disabled: PropTypes.bool,
        }),
      ),
    ]),
  }

  static defaultProps = {
    isOOO: false,
    buttons: false,
  }

  constructor(props) {
    super(props);

    this.buttons = [
      {
        label: 'пропустить',
        buttonType: 'add',
        onClick: () => { },
      },
      {
        label: 'Назад',
        buttonType: 'primary',
        onClick: props.goPrevTab,
      },
      {
        label: 'Финиш',
        buttonType: 'primary',
        onClick: () => { },
        disabled: !props.valid,
      },
    ];
  }

  render() {
    const { isOOO, setIsOOO, buttons } = this.props;

    const renderButtons = buttons || this.buttons;

    return (
      <form className="confirmAgency">
        <p className="profileCreate__info">
          Название Вашего Агентства недвижимости
        </p>
        <p className="profileCreate__info">
          Подтвердите название вашего АН - заполните поля для ООО
          (ваш КВЭД: 68.31) и/или ТМ(класс МКТУ 36)
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
          <Col default={{ col: 11 }} lg={{ col: 3 }}>
            <TextField
              name={isOOO ? 'OOO' : 'TM'}
              label={`Полное название ${isOOO ? 'ООО' : 'ТМ'}`}
            />
          </Col>
          <Col default={{ col: 11 }} lg={{ col: 2 }}>
            {isOOO
              ? <TextField name="OKPO" label="Код ОКПО" />
              : (
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
            <Col default={{ col: 8 }} lg={{ col: 3 }}>
              <TextField
                name="certificate"
                label="№ свидетельства"
              />
            </Col>
          )}
          <Col default={{ col: 8 }} lg={{ col: 4 }}>
            <DateField years={years} />
          </Col>
        </Row>

        <div className="profileCreate__buttons">
          {renderButtons.map(el => (
            <Button
              buttonType={el.buttonType}
              onClick={el.onClick}
              disabled={el.disabled}
            >
              {el.label}
            </Button>
          ))}
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
  setIsOOO: data => dispatch(setIsOOOFormAction(data)),
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
