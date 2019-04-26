import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import authGuard from '../../guards/AuthGuard';
import GeneralLayout from '../../layouts/GeneralLayout/index';
import ExclusiveTable from './ExclusiveTable';
import ExclusiveFilters from './ExclusiveFilters';
// import { getObjects } from '../../store/reducers/exclusive';

// eslint-disable-next-line react/prefer-stateless-function
class ExclusivePage extends Component {
  componentDidMount() {
    const { loadExclusiveObjects } = this.props;

    // loadExclusiveObjects();
  }

  render() {
    return (
      <GeneralLayout>
        <ExclusiveFilters />
        <ExclusiveTable />
      </GeneralLayout>
    );
  }
}

ExclusivePage.propTypes = {
  loadExclusiveObjects: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // objects: getObjects(state),
});

const mapDispatchToProps = dispatch => ({
  // loadExclusiveObjects: data => dispatch(loadExclusiveObjectsAsyncAction(data)),
});

export default compose(
  authGuard({ redirectTo: '/signin' }),
  connect(mapStateToProps, mapDispatchToProps),
)(ExclusivePage);
