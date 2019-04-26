import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

import authGuard from '../../../guards/AuthGuard';
import AuthLayout from '../../../layouts/AuthLayout';
import Title from '../../../components/common/Title';
import { Button } from '../../../components/general/Button';
import './style.scss';
class AuthFormBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, description, children, bottomLinks } = this.props;
    return (
      <AuthLayout>
        <div className="authFormBox">
          <div className="container">
            <div className="row">
              <div className="row__col row__col_sm10 row__col_mlsm1 row__col_md8 row__col_mlmd2">
                <div className="authFormBox__formBlock">
                  <Title
                    title={title}
                    description={description}
                    className="authFormBox__title"
                  />
                  {children}
                </div>
                {bottomLinks && bottomLinks.map((link, i) => {
                  return (
                    <div
                      className={`authFormBox__link ${link.className}`}
                      key={i}
                    >
                      <NavLink
                        to={link.to}
                        className="link"
                      >
                        {link.text}
                      </NavLink>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }
}

AuthFormBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  bottomLinks: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string
  })),
};

AuthFormBox.defaultProps = {
  title: '',
  description: '',
}

export default authGuard({ redirectTo: '/' })(AuthFormBox);
