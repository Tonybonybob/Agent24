import React, { Component } from 'react';
import { Gmaps, Marker } from 'react-gmaps';

import GisMap from '../../common/GisMap';
import { maps } from '../../../config';

class MapSelectWrapper extends Component {
  renderGisMap = () => {
    const { location } = this.props;
    return <GisMap location={location} />;
  };
  renderGoogleMap = () => {
    const params = { v: '3.exp', key: maps.apiKey };
    const { location } = this.props;

    return (
      <Gmaps
        width="100%"
        height="100%"
        lat={location.lat}
        lng={location.lng}
        zoom={18}
        params={params}
        onMapCreated={this.onMapCreated}
      >
        <Marker lat={location.lat} lng={location.lng} draggable={false} />
      </Gmaps>
    );
  };

  render() {
    const isGoogle = false;
    return isGoogle ? this.renderGoogleMap() : this.renderGisMap();
  }
}

export default MapSelectWrapper;
