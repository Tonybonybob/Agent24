import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeNotificationAction } from '../../../store/actions/notification';
import './style.scss';
class Notification extends Component {
  static propTypes = {
    notification: PropTypes.shape({
      text: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      myClass: '',
    };

    this.closeNotification = this.closeNotification.bind(this);
  }

  componentDidMount() {
    setTimeout(this.closeNotification, 4800);
  }

  closeNotification() {
    const { close } = this.props;

    this.setState({
      myClass: 'notification_closed',
    });

    setTimeout(close, 200);
  }

  render() {
    const { myClass } = this.state;

    const { notification } = this.props;

    return (
      <div className={`notification ${notification ? myClass : ''}`}>
        <span className="notification__text">
          {notification.text}
        </span>
        <span className="notification__close" onClick={this.closeNotification}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1.2L10.8 0L6 4.8L1.2 0L0 1.2L4.8 6L0 10.8L1.2 12L6 7.2L10.8 12L12 10.8L7.2 6L12 1.2Z" fill="black" fillOpacity="0.48" />
          </svg>
        </span>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  close: () => dispatch(closeNotificationAction()),
});

export default connect(null, mapDispatchToProps)(Notification);
