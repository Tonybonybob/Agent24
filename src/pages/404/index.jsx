import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Authorized from './Authorized404';
import Unauthorized from './Unauthorized404';
import { getToken } from '../../store/reducers/auth';

// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
  }

  render() {
    const { token } = this.props;
    return token ? <Authorized /> : <Unauthorized />;
  }
}

const mapStateToProps = state => ({ token: getToken(state) });

export default connect(mapStateToProps)(HomePage);
