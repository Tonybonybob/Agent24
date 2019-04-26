import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getToken } from '../store/reducers/auth';

const AuthGuard = ({ redirectTo }) => (
  Component => compose(
    withRouter,
    connect(state => ({ token: getToken(state) })),
  )(
    // eslint-disable-next-line react/prefer-stateless-function
    class Wrapper extends React.Component {
      static propTypes = {
        token: PropTypes.string.isRequired,
        history: PropTypes.shape({
          push: PropTypes.func.isRequired,
        }).isRequired,
      }

      componentDidMount() {
        this.checkToRedirect();
      }

      checkToRedirect() {
        const { token, history } = this.props;

        if (token && redirectTo === '/') {
          history.push('/');
        } else if (!token && redirectTo === '/signin') {
          history.push('/signin');
        }
      }

      render() {
        const { token, ...other } = this.props;
        if (token) {
          return redirectTo === '/signin' ? <Component {...other} /> : null;
        }
        // if no token
        return redirectTo === '/signin' ? null : <Component {...other} />;
      }
    },
  ));

export default AuthGuard;
