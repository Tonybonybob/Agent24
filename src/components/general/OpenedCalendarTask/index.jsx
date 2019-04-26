import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import IconClose from '../../../assets/BigClose';
import './style.scss';
class OpenedCalendarTask extends Component {
  renderPeople() {
    // eslint-disable-next-line no-unused-vars
    const { task } = this.props;
    return (
      <div className="openedTaskPeople">
        <img
          src="https://randomuser.me/api/portraits/men/17.jpg"
          alt=""
          className="openedTaskPeople__photo"
        />
        <div className="openedTaskPeople__content">
          <div className="openedTaskPeople__label">
            Продавец
          </div>
          <div className="openedTaskPeople__nameAndPhoneHolder">
            <span className="openedTaskPeople__name">
              Виктор
            </span>
            <span className="openedTaskPeople__phone">
              +380 63 123 4567
            </span>
          </div>
          <p className="openedTaskPeople__address">
            2 комнатная, хрущёвка, 3 / 9, 40 / 25 / 12, $ 27 000
          </p>
        </div>
      </div>
    );
  }

  render() {
    const { task, absolute, onClick, bottom, right } = this.props;
    const taskTime = moment(task.executionDateTime, 'YYYY-MM-DD HH:mm').format('HH:mm');

    return (
      <div
        className={`openedTask
          ${absolute ? 'openedTask-absolute' : ''}
          ${bottom ? 'openedTask-bottom' : ''}
          ${right ? 'openedTask-right' : ''}`}
        onClick={e => e.stopPropagation()}
        style={{ borderColor: task.color }}
      >
        <div className="openedTask__inner">
          <div>
            <div className="openedTask__time">
              {taskTime}
            </div>
          </div>
          <div className="openedTask__content">
            <div className="openedTask__name">
              {task.title}
            </div>
            <div className="openedTask__desc">
              {task.description}
            </div>
          </div>
          <div className="openedTask__close" onClick={onClick}>
            <IconClose />
          </div>
        </div>
        {/* {this.renderPeople()} */}
      </div>
    );
  }
}

OpenedCalendarTask.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  absolute: PropTypes.bool,
  bottom: PropTypes.bool,
  right: PropTypes.bool,
  onClick: PropTypes.func,
};

OpenedCalendarTask.defaultProps = {
  absolute: false,
  bottom: false,
  right: false,
  onClick: () => { },
};

export default OpenedCalendarTask;
