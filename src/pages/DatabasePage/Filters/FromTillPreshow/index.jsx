import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const FromTillPreshow = ({ values, ending, fromLabel, toLabel }) => (
  values.length > 1 && (
    values.map((value, index) => index !== values.length - 1 && (
      <span className="filterName filterName_active filterName_consec filterName_preshow">
        {value.from && (
          <span>
            от
            {' '}
            <span>{value.from}</span>
            {' '}
          </span>
        )}
        {value.to && (
          <span>
            до
            {' '}
            <span>
              {value.to}
            </span>
          </span>
        )}
        {ending}
      </span>
    ))
  )
);

FromTillPreshow.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  })),
  ending: PropTypes.string,
  fromLabel: PropTypes.string,
  toLabel: PropTypes.string,
};

FromTillPreshow.defaultProps = {
  ending: '',
  fromLabel: 'от',
  toLabel: 'до',
};

export default FromTillPreshow;
