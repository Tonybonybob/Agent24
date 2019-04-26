import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';
const Message = (props) => {
  const { message: { id, message, time }, userId } = props;

  return (
    <li className={`chatMessage ${id !== userId ? 'chatMessage-fromFriend' : ''}`}>
      <img
        className="chatMessage__photo"
        src="https://randomuser.me/api/portraits/men/78.jpg"
        alt=""
      />
      <div className="chatMessage__inner">
        {id !== userId
          && (
          <h6 className="chatMessage__name">
John Doe
          </h6>
          )
        }
        <p className="chatMessage__text">
          {message}
          <span className="chatMessage__time">
            {moment.unix(time).format('HH:mm')}
          </span>
        </p>
      </div>
    </li>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number,
    message: PropTypes.string,
    time: PropTypes.number,
  }).isRequired,
  userId: PropTypes.number.isRequired,
};

export default Message;
