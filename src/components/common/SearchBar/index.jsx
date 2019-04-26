import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import SearchIcon from '../../../assets/SearchIcon';
import CloseIcon from '../../../assets/Close';
import './style.scss';
const SearchBar = ({
  className, name, withReduxForm, white, ...other
}) => (
  <div className={`${className} searchBar ${white ? 'searchBar_white' : ''}`}>
    {withReduxForm
      ? (
        <Field
          component="input"
          name={name}
          {...other}
          className="searchBar__input"
        />
      )
      : (
        <input
          className="searchBar__input"
          {...other}
        />
      )
    }
    <span className="searchBar__icon">
      <SearchIcon />
    </span>
  </div>
);

SearchBar.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  withReduxForm: PropTypes.bool,
  white: PropTypes.bool,
};

SearchBar.defaultProps = {
  className: '',
  withReduxForm: true,
  white: false,
};

export default SearchBar;
