import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import qs from 'query-string';

const LinkToModal = (props) => {
  const {
    children, location, queryParam, className, state
  } = props;
  const locationQuery = location.search ? qs.parse(location.search) : {};
  let newModals = null;
  const finalTo = {
    pathname: location.pathname,
    search: qs.stringify(locationQuery),
  };

  if (locationQuery.modals) {
    let modalsArray = locationQuery.modals;

    if (modalsArray instanceof Array) {
      modalsArray = modalsArray.filter(el => el !== queryParam);
      newModals = [...modalsArray, queryParam];
    } else if (modalsArray === queryParam) {
      newModals = [queryParam];
    } else {
      newModals = [modalsArray, queryParam];
    }


    finalTo.search = qs.stringify({
      ...locationQuery,
      modals: newModals,
    });
  } else if (!locationQuery.modals) {
    finalTo.search = qs.stringify({ ...locationQuery, modals: queryParam });
  }
  return (
    <Link to={{ search: finalTo.search, pathname: finalTo.pathname, state }} className={className}>
      {children}
    </Link>
  );
};

LinkToModal.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
  queryParam: PropTypes.string.isRequired,
  className: PropTypes.string,
};

LinkToModal.defaultProps = {
  className: '',
};

export default withRouter(LinkToModal);
