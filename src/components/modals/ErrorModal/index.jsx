import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import RadioGroup from '../../common/RadioGroup';
import { Button } from '../../general/Button';
import { addLabelAsyncAction } from '../../../store/actions/modal';

class ErrorModal extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const { addLabel } = this.props;

    if (values.label === 'ERROR') {
      addLabel({
        label: values.label,
      });
    } else {
      addLabel({
        label: 'ERROR',
        isPhoneError: true,
      });
    }
  }

  render() {
    const { label, handleSubmit, closeModal } = this.props;

    return (
      <form className="objectModal">
        <h2 className="objectModal__heading">
          Ошибка
        </h2>
        <RadioGroup
          name="label"
          label="Что с объектом"
          required
          items={[
            { value: 'ERROR', label: 'Этот объект не от риэлтора и добавлен ошибочно' },
            { value: 'WRONG_PHONE', label: 'Не правильный номер телефона' },
          ]}
        />
        <div className="objectModal__buttons">
          <div>
            <Button
              full
              size="big"
              noBorder
              buttonType="add"
              blank
              onClick={closeModal}
            >
              Отмена
            </Button>
          </div>
          <div>
            <Button
              buttonType="add"
              full
              size="big"
              disabled={!label}
              onClick={handleSubmit(this.submit)}
            >
              Подтвердить
            </Button>
          </div>
        </div>
      </form>
    );
  }
};

const selector = formValueSelector('ErrorModalForm');
const mapStateToProps = state => ({
  label: selector(state, 'label'),
});

const mapDispatchToProps = dispatch => ({
  addLabel: data => dispatch(addLabelAsyncAction(data)),
});
export default compose(
  reduxForm({
    form: 'ErrorModalForm',
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(ErrorModal);
