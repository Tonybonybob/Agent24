import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/signin">
          Войти
        </Link>
        Header
      </div>
    );
  }
}

export default Header;
