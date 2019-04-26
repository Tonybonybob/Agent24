import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { clearClientInfoAction } from '../../../store/actions/client';
import BigClose from '../../../assets/BigClose';
import './style.scss';
class Modals extends Component {
  constructor(props) {
    super(props);

    this.escClose = this.escClose.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escClose, false);
  }

  escClose(event) {
    if (event.key === 'Escape') {
      this.handleClose();
    }
  }

  handleClose() {
    const { history, location, clearClient } = this.props;
    let queryParams = location.search ? qs.parse(location.search) : {};
    const modals = queryParams.modals ? queryParams.modals : null;

    if (modals instanceof Array && modals.length > 1) {
      const lastModal = modals.slice(-1);
      if (lastModal === 'addClient') {
        clearClient();
      } else if (lastModal === 'messages') {
        queryParams = Object.keys(queryParams)
          .filter(el => el !== 'chatId')
          .reduce((obj, key) => {
            obj[key] = queryParams[key];
            return obj;
          }, {});
      }

      history.push({
        to: location.pathname,
        search: qs.stringify({
          ...queryParams,
          modals: modals.splice(0, modals.length - 1),
        }),
      });
    } else if (modals) {
      if (modals === 'addClient') {
        clearClient();
      } else if (modals === 'messages') {
        queryParams = Object.keys(queryParams)
          .filter(el => el !== 'chatId')
          .reduce((obj, key) => {
            obj[key] = queryParams[key];
            return obj;
          }, {});
      }
      const { modals: anotherModals, ...withoutModals } = queryParams;
      history.push({
        pathname: location.pathname,
        search: qs.stringify({
          ...withoutModals,
        }),
      });
    }
  }

  render() {
    const { className, children, showCloseButton } = this.props;

    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, { closeModal: () => this.handleClose() }));

    return (
      <div className="modal">
        <div className="modal__container" onClick={() => this.handleClose()}>
          <div className={`${className} modal__item`} onClick={e => e.stopPropagation()}>
            {showCloseButton && (
              <span className="modal__close" onClick={() => this.handleClose()}>
                <BigClose />
              </span>
            )}
            {childrenWithProps}
          </div>
        </div>
      </div>
    );
  }
}

Modals.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  showCloseButton: PropTypes.bool,
};

Modals.defaultProps = {
  className: '',
  showCloseButton: false,
};

const mapDispatchToProps = dispatch => ({
  clearClient: () => dispatch(clearClientInfoAction()),
});

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(Modals);
