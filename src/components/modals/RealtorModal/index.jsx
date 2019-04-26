import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import RadioGroup from '../../common/RadioGroup';
import { Button } from '../../general/Button';
import { addLabelAsyncAction } from '../../../store/actions/modal';

class RealtorModal extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(values, isRemove) {
    const { addLabel } = this.props;

    addLabel({
      label: values.label,
      isRemove,
    });
  }

  render() {
    const { label, handleSubmit } = this.props;

    return (
      <form className="objectModal">
        <h2 className="objectModal__heading">
          Риэлтор
        </h2>
        <RadioGroup
          name="label"
          label="Что с объектом"
          required 
          items={[
            { value: 'FAKE', label: 'Это фейковый объект (несуществующий)' },
            { value: 'REALTOR', label: 'Это реальный объект' },
          ]}
        />
        <div className="objectModal__buttons">
          <div>
            <Button
              buttonType="add"
              full
              size="big"
              noBorder
              blank
              disabled={!label}
              onClick={handleSubmit(values => this.submit(values, false))}
            >
              Оставить в своей базе
            </Button>
          </div>
          <div>
            <Button
              buttonType="add"
              full
              size="big"
              disabled={!label}
              onClick={handleSubmit(values => this.submit(values, true))}
            >
              Удалить
            </Button>
          </div>
        </div>
      </form>
    );
  }
};

const selector = formValueSelector('RealtorModalForm');
const mapStateToProps = state => ({
  label: selector(state, 'label'),
});

const mapDispatchToProps = dispatch => ({
  addLabel: data => dispatch(addLabelAsyncAction(data)),
});

export default compose(
  reduxForm({
    form: 'RealtorModalForm',
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(RealtorModal);

