import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AreaSegments from '../../../../components/general/EditFormComponents/AreaSegments';
import './style.scss';
class EmployeesCard extends Component {
  render() {
    const { close } = this.props;

    return (
      <div className="employeesTableCard">
        <AreaSegments onClose={close} />
      </div>
    );
  }
}

EmployeesCard.propTypes = {
  close: PropTypes.func.isRequired,
};

export default EmployeesCard;
