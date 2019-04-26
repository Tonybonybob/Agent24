import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RadioFilters from '../../../components/common/RadioFilters';
import { updateExclusivesAction } from '../../../store/actions/exclusive';
import { getMyFilter, getObjectFilter, getStatusFilter } from '../../../store/reducers/exclusive';
import './style.scss';
class ExclusiveFilters extends Component {
  constructor(props) {
    super(props);

    this.myFilters = [
      { name: 'Все', value: 'all' },
      { name: 'Мои', value: 'mine' },
    ];
    this.statusFilters = [
      { name: 'Активные', value: 'active' },
      { name: 'Завершенные', value: 'finished' },
    ];
    this.objectFilters = [
      { name: 'Все', value: 'all' },
      { name: 'Квартиры', value: 'flat' },
      { name: 'Дома', value: 'house' },
      { name: 'Земли', value: 'land' },
    ];

    this.handleMyFilterChange = this.handleMyFilterChange.bind(this);
    this.handleStatusFilterChange = this.handleStatusFilterChange.bind(this);
    this.handleObjectFilterChange = this.handleObjectFilterChange.bind(this);
  }

  handleMyFilterChange(value) {
    const { updateExclusives } = this.props;

    updateExclusives({ myFilter: value });
  }

  handleStatusFilterChange(value) {
    const { updateExclusives } = this.props;

    updateExclusives({ statusFilter: value });
  }

  handleObjectFilterChange(value) {
    const { updateExclusives } = this.props;

    updateExclusives({ objectFilter: value });
  }

  render() {
    const { myFilter, statusFilter, objectFilter } = this.props;

    return (
      <div className="exclusiveFilters">
        <RadioFilters
          items={this.myFilters}
          active={myFilter}
          onChange={this.handleMyFilterChange}
        />
        <RadioFilters
          items={this.statusFilters}
          active={statusFilter}
          onChange={this.handleStatusFilterChange}
        />
        <RadioFilters
          items={this.objectFilters}
          active={objectFilter}
          onChange={this.handleObjectFilterChange}
        />
      </div>
    );
  }
}

ExclusiveFilters.propTypes = {
  myFilter: PropTypes.string.isRequired,
  statusFilter: PropTypes.string.isRequired,
  objectFilter: PropTypes.string.isRequired,
  updateExclusives: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  myFilter: getMyFilter(state),
  statusFilter: getStatusFilter(state),
  objectFilter: getObjectFilter(state),
});

const mapDispatchToProps = dispatch => ({
  updateExclusives: data => dispatch(updateExclusivesAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExclusiveFilters);
