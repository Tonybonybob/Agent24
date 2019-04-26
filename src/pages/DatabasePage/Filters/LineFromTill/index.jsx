import React from 'react';
import PropTypes from 'prop-types';

import Close from '../../../../assets/Close';

const LineFromTill = ({ prop, ending, remove, fromLabel, toLabel }) => (
  <div>
    <div className="filterName filterName_active filterName_consec">
      {prop.from && (
        <span>
          {fromLabel}
          &nbsp;
          {prop.from}
          &nbsp;
        </span>
      )}
      {prop.to && (
        <span>
          {toLabel}
          &nbsp;
          {prop.to}
        </span>
      )}
      {(prop.to || prop.from) && ending}
      <Close onClick={remove} style={{marginLeft: '6.33px'}} />
    </div>
  </div>
);

LineFromTill.propTypes = {
  fromLabel: PropTypes.string,
  toLabel: PropTypes.string,
};

LineFromTill.defaultProps = {
  fromLabel: 'от',
  toLabel: 'до',
};

export default LineFromTill;
