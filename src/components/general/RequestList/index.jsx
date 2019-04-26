import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class RequestList extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
				RequestList
        <div>
          <Link to={`${match.url}/77`}>
Request 77
          </Link>
        </div>
      </div>
    );
  }
}

RequestList.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default withRouter(RequestList);
