import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { createNumberMask } from 'redux-form-input-masks';

import RadioGroup from '../../common/RadioGroup';
import { Button } from '../../general/Button';
import TextField from '../../common/TextField';
import Checkbox from '../../common/Checkbox';
import Calendar from '../../common/Calendar';
import PureTextField from '../../common/PureTextField';
import { addLabelAsyncAction } from '../../../store/actions/modal';
import './style.scss';

moment.locale('ru');

const priceMask = createNumberMask({
  allowEmpty: true,
});

class CloseModal extends Component {
  static propTypes = {
    label: PropTypes.string,
    price: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    isUnlimited: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    label: '',
    price: '',
    isUnlimited: false,
  }

  constructor(props) {
    super(props);
    
    this.submit = this.submit.bind(this);
    this.handleChangeDateTo = this.handleChangeDateTo.bind(this);

    this.state = {
      dateTo: '',
    };
  }

  submit(values) {
    const { addLabel } = this.props;

    addLabel(values);
  }

  handleChangeDateTo(newValue) {
    this.setState({
      dateTo: moment(newValue).format('YYYY-MM-DD'),
    });
  }

  render() {
    const { label, price, isUnlimited, handleSubmit, closeModal } = this.props;

    const { dateTo } = this.state;

    console.log(this.props);
    return (
      <form className="objectModal closeModal">
        <h2 className="objectModal__heading">
          Закрытие запроса на продажу
        </h2>
        <div className="closeModal__content">
          <div className="closeModal__radio">
            <RadioGroup
              name="label"
              label="Причина"
              required
              items={[
                { value: 'SOLD', label: 'Продан' },
                { value: 'CLOSED', label: 'Снят с продажи' },
              ]}
            />
          </div>
          <div className="closeModal__fields">
              <div className="soldField">
                <div className="closeModal__input">
                  <TextField
                    label="Цена, $"
                    name="price"
                    required={false}
                    disabled={label === 'CLOSED'}
                    noDisabledUnderline
                    {...priceMask}
                  />
                </div>
                <p className={`soldField__text ${label === 'SOLD' ? 'soldField__text_active' : ''}`}>
                  Благодарим за указание цены в пользу улучшения аналитики реальных сделок
                </p>
              </div>
              <div className="closedField">
                <div className="closeModal__input">
                  <Calendar
                    customInput={(
                      <PureTextField
                        value={moment(dateTo, 'YYYY-MM-DD').format('DD MMM YYYY')}
                        label="до"
                        InputLabelProps={null}
                        noDisabledUnderline
                      />
                    )}
                    selected={dateTo ? moment(dateTo, 'YYYY-MM-DD') : null}
                    dateFormat="ll"
                    onChange={this.handleChangeDateTo}
                    disabled={label === 'SOLD' || isUnlimited}
                  />
                </div>
                <Checkbox
                  name="isUnlimited"
                  label="Снят бессрочно"
                  disabled={label === 'SOLD'}
                />
              </div>
          </div>
        </div>
        <div className="objectModal__buttons">
          <div>
            <Button
              blank
              size="big"
              full
              noBorder
              buttonType="add"
              onClick={closeModal}
            >
              Отмена
            </Button>
          </div>
          <div>
            <Button
              // eslint-disable-next-line
              disabled={!(label === 'SOLD' ? price : isUnlimited ? true : dateTo)}
              buttonType="add"
              size="big"
              full
              onClick={handleSubmit(this.submit)}
            >
              Закрыть объект
            </Button>
          </div>
        </div>
      </form>
    );
  }
};

const selector = formValueSelector('CloseModalForm');
const mapStateToProps = state => ({
  label: selector(state, 'label'),
  price: selector(state, 'price'),
  isUnlimited: selector(state, 'isUnlimited'),
});

const mapDispatchToProps = dispatch => ({
  addLabel: data => dispatch(addLabelAsyncAction(data)),
});

export default compose(
  reduxForm({
    form: 'CloseModalForm',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(CloseModal);
