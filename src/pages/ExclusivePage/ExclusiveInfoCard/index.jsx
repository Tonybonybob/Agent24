import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

import ArrowDown from '../../../assets/ArrowDownStroke';
import { setCommentFormValueAction, clientLoadObjectItemDatabase } from '../../../store/actions/client';
import { getFullObject } from '../../../store/reducers/client';
import { addModalFieldAction } from '../../../store/actions/modal';
import { withSizes } from '../../../utils';
import BeforeModerationForm from './BeforeModeration';
import OnModerationForm from './OnModeration';
import ConfirmModeration from './ConfirmModeration';
import AfterModeration from './AfterModeration';
import './style.scss';
// eslint-disable-next-line react/prefer-stateless-function
class ExclusiveInfoCard extends Component {
  constructor(props) {
    super(props);

    this.closeSell = this.closeSell.bind(this);
  }

  componentDidMount() {
    const { loadFullObject, id, match } = this.props;

    loadFullObject(id || match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { loadFullObject, id } = this.props;

    if (id !== prevProps.id) {
      loadFullObject(id);
    }
  }

  closeSell() {
    const { history, location } = this.props;

    const path = location.pathname
      .split('/')
      .slice(0, -1)
      .join('/');

    history.push(path);
  }

  renderHeader() {
    const { history } = this.props;

    const items = [
      {
        label: 'Дата регистрации:',
        value: '18 августа 2018',
      },
      {
        label: 'ID:',
        value: '#23423',
      },
      {
        label: 'Держатель Эксклюзива:',
        value: 'Я',
      },
    ];

    return (
      <div className="exclusiveCard__header">
        {items.map(el => (
          <div key={el.label} className="exclusiveCard__headerItem">
            <strong>
              {el.label}
            </strong>
            {' '}
            {el.value}
          </div>
        ))}
        <div className="exclusiveCard__headerClose" onClick={() => history.push('/exclusive')}>
          <ArrowDown />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="exclusiveCard">
        {this.renderHeader()}
        <BeforeModerationForm error />
        {/* <OnModerationForm /> */}
        {/* <ConfirmModeration /> */}
        {/* <AfterModeration /> */}
      </div>
    );
  }
}

ExclusiveInfoCard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.func,
  }).isRequired,
  loadFullObject: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  object: getFullObject(state),
});

const mapDispatchToProps = dispatch => ({
  setCommentValue: data => dispatch(setCommentFormValueAction(data)),
  loadFullObject: id => dispatch(clientLoadObjectItemDatabase(id)),
  addModalField: data => dispatch(addModalFieldAction(data)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'ExclusiveInfoCardForm',
    initialValues: {
      phones: [{}],
      owner: 0,
    },
  }),
  withSizes,
)(ExclusiveInfoCard);
