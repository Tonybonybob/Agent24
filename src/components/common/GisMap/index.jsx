import React, { Component } from 'react';
import DG from '2gis-maps';

class GisMap extends Component {
  componentDidMount() {
    this._map = DG.map('map', {
      center: [0, 0],
    });
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    const isNewLocationIsset = location.lat && location.lng;
    const isLocationChange = location !== prevProps.location;

    if (!(isNewLocationIsset && isLocationChange)) {
      return;
    }

    this._marker && this._marker.removeFrom(this._map);
    this._marker = DG.marker([location.lat, location.lng]).addTo(this._map);
    this._map.setView([location.lat, location.lng], 17);
  }

  _map = null;
  _marker = null;

  render() {
    return <div id="map" style={{ width: '100%', height: '100%' }} />;
  }
}

export default GisMap;
