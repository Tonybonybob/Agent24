import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/home/Header';

// eslint-disable-next-line react/prefer-stateless-function
class HomeLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <Header />
        <div>
          HomeLayout
          {children}
        </div>
      </div>
    );
  }
}


export default HomeLayout;
