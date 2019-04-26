import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';

import CalendarAndTime from '../CalendarAndTime';
import TextField from '../../../common/TextField';
import { Button } from '../../Button';
import Colors from './Colors';
import { calendarCreateTaskAsyncAction, setCalendarTaskFormValuesAction } from '../../../../store/actions/calendar';
import './style.scss';
moment.locale('ru');

export class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleTaskSave = this.handleTaskSave.bind(this);
  }

  handleCalendarChange(newDate) {
    const { setCalendarFormValues, setNewDate } = this.props;

    setCalendarFormValues({
      executionDateTime: newDate,
    });
    setNewDate(moment(newDate, 'YYYY-MM-DD HH:mm'));
  }

  handleColorChange(color) {
    const { setCalendarFormValues } = this.props;

    setCalendarFormValues({ color });
  }

  handleTaskSave(values) {
    const { createTask, closeForm, valid } = this.props;

    if (valid) {
      createTask(values);
      closeForm();
    }
  }

  render() {
    const {
      closeForm, executionDateTime, color, handleSubmit,
    } = this.props;

    return (
      <div className="calendarTaskForm">
        <TextField
          label="Заголовок"
          name="title"
        />
        <CalendarAndTime
          onChange={this.handleCalendarChange}
          dateValue={executionDateTime}
        />
        <TextField
          label="Описание"
          name="description"
        />
        <Colors
          color={color}
          onChange={this.handleColorChange}
        />
        <div className="calendarTaskForm__buttons">
          <Button onClick={closeForm} className="calendarTaskForm__close">
            Отмена
          </Button>
          <Button onClick={handleSubmit(this.handleTaskSave)}>
            Сохранить
          </Button>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('CalendarTaskForm');

TaskForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
  executionDateTime: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  setCalendarFormValues: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  executionDateTime: selector(state, 'executionDateTime'),
  color: selector(state, 'color'),
});

const mapDispatchToProps = dispatch => ({
  setCalendarFormValues: data => dispatch(setCalendarTaskFormValuesAction(data)),
  createTask: task => dispatch(calendarCreateTaskAsyncAction(task)),
});

export default compose(
  reduxForm({
    form: 'CalendarTaskForm',
    initialValues: {
      executionDateTime: moment().format('YYYY-MM-DD HH:mm'),
      color: '#BB6BD9',
    },
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(TaskForm);
