import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DashBoard from '../DashboardPage';
import Landing from '../LandingPage';
import { getToken } from '../../store/reducers/auth';

// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
  }

  render() {
    const { token } = this.props;
    return token ? <DashBoard /> : <Landing />;
  }
}

const mapStateToProps = state => ({ token: getToken(state) });

export default connect(mapStateToProps)(HomePage);
