import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { Button } from '../../general/Button';
import { addLabelAsyncAction } from '../../../store/actions/modal';
import Select from '../../common/Select';
import TextField from '../../common/TextField';
import './style.scss';
class CoownershipModal extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    if (window) {
      window.document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    if (window) {
      window.document.body.style.overflow = 'auto';
    }
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
          Совладение обьектом
        </h2>
        <div className="coownershipModal">
          <Select
            name="status"
            label="Состояние"
            items={[{ name: 'aaaa', value: 'aaa' }]}
          />
          <TextField
            name="price"
            label="Цена, $"
          />
          <p className="coownershipModal__text">
            После создания совладения не забудьте добавить свои фото на этот обьект
          </p>
        </div>
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
              Стать совладельцем
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('CoownershipModalForm');
const mapStateToProps = state => ({
  label: selector(state, 'label'),
});

const mapDispatchToProps = dispatch => ({
  addLabel: data => dispatch(addLabelAsyncAction(data)),
});

export default compose(
  reduxForm({
    form: 'CoownershipModalForm',
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(CoownershipModal);
