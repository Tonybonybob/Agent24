import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';

import RequestNew from '../../../components/general/RequestNew';
import ClientTableObjects from '../../../components/general/ClientTableObjects';
import ClientMobileCards from './ClientMobileCards';
import { Button } from '../../../components/general/Button';
import { withSizes } from '../../../utils';
import { clientLoadObjectsDatabase } from '../../../store/actions/client';
import './style.scss';
// eslint-disable-next-line react/prefer-stateless-function
class ClientRequests extends Component {
  constructor(props) {
    super(props);

    this.tableContainerRef = React.createRef();

    this.goToNewRequest = this.goToNewRequest.bind(this);
  }

  componentDidMount() {
    const { loadObjects, match } = this.props;

    const id = match.path.split('/')[2];
    loadObjects(id);
  }

  componentDidUpdate(prevProps) {
    const { loadObjects, location, match } = this.props;

    const isNewOrEdit = location.pathname.split('/')[4];
    const wasAtNewOrEdit = prevProps.location.pathname.split('/')[4];
    const newEditArr = ['new', 'edit'];

    if (
      newEditArr.includes(wasAtNewOrEdit) &&
      !newEditArr.includes(isNewOrEdit)
    ) {
      const id = match.path.split('/')[2];
      loadObjects(id);
    }
  }

  goToNewRequest() {
    const { match, location, history } = this.props;

    history.push({
      pathname: `${match.url}/new`,
      search: location.search,
    });
  }

  renderLinkToNewRequest() {
    const { isSmallMobile, location, match } = this.props;

    return (
      isSmallMobile && (
        <div className="client-content__topButton">
          <Button
            onClick={this.goToNewRequest}
            className={
              location.pathname === `${match.url}/new`
                ? 'client-content__topButton_disabled'
                : ''
            }
          >
            НОВЫЙ ЗАПРОС
          </Button>
        </div>
      )
    );
  }

  render() {
    const { match, isMobile, location } = this.props;

    return (
      <div className="client-content">
        {match.url === location.pathname && this.renderLinkToNewRequest()}
        {isMobile ? <ClientTableObjects /> : <ClientMobileCards />}
        {match.url !== location.pathname && this.renderLinkToNewRequest()}
        <Switch>
          <Route exact path={`${match.url}/new`} component={RequestNew} />
          <Route exact path={`${match.url}/edit`} component={RequestNew} />
        </Switch>
      </div>
    );
  }
}

ClientRequests.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
  isSmallMobile: PropTypes.bool.isRequired,
  loadObjects: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadObjects: contactId => dispatch(clientLoadObjectsDatabase(contactId)),
});

export default compose(
  withSizes,
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(ClientRequests);
