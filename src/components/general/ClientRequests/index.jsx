import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
const ClientRequests = ({ requests }) => {
  const requestList = [
    {
      name: 'own',
      label: 'моих',
    },
    {
      name: 'agency',
      label: 'агенства',
    },
    {
      name: 'community',
      label: 'сообщества',
    },
  ];
  const tempRequests = {
    own: {
      sell: 5,
      buy: 7,
    },
    agency: {
      sell: 5,
      buy: 7,
    },
    community: {
      sell: 5,
      buy: 7,
    },
  };
  return /* requests.length > 0 &&  */ (
    <div className="clientRequests">
      <div className="clientRequests__title">
        Запросов (продажа / покупка)
      </div>
      <div className="clientRequests__requests">
        {requestList.map(el => /* requests[el.name] && */(
          <div className="clientRequests__request">
            <span className="clientRequests__numbers">
              {tempRequests[el.name].sell}
              /
            {tempRequests[el.name].buy}
            </span>
            <div className="clientRequests__label">
              {el.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ClientRequests.propTypes = {
  requests: PropTypes.shape({
    own: PropTypes.shape({
      sell: PropTypes.number,
      buy: PropTypes.number,
    }),
    agency: PropTypes.shape({
      sell: PropTypes.number,
      buy: PropTypes.number,
    }),
    community: PropTypes.shape({
      sell: PropTypes.number,
      buy: PropTypes.number,
    }),
  }),
};

ClientRequests.defaultProps = {
  requests: {},
};

export default ClientRequests;
