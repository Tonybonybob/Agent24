/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  InfoWindow,
  Polygon,
  Marker,
} from 'react-google-maps';
import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager';

import BrushIcon from '../../../assets/Brush';
import LocationIcon from '../../../assets/BigLocation';
import { withSizes } from '../../../utils';
import './style.scss';
class Map extends Component {
  constructor(props) {
    super(props);
    this.bindRefs = this.bindRefs.bind(this);
  }

  bindRefs = (ref, value) => {
    this[`polygon${value}`] = ref;
    return false;
  };

  renderPolygons() {
    const {
      polygonOptions,
      handlePolygonClick,
      activePolygon,
      polygonList,
      hoveredPolygon,
      onPolygonDragStart,
      onPolygonDragEnd,
      onPolygonMouseUp,
    } = this.props;

    return polygonList.map((polygonItem, key) => (
      <Polygon
        ref={ref => this.bindRefs(ref, polygonItem.value)}
        key={key}
        onClick={({ latLng }) =>
          handlePolygonClick(polygonItem.polygon, key, latLng)
        }
        options={{
          strokeColor: polygonItem.color,
          fillColor: polygonItem.color,
          strokeWeight: 2,
        }}
        path={polygonItem.polygon}
        editable={activePolygon === key}
        defaultOptions={polygonOptions}
        // options={styles}
        onMouseOver={() => this.setState({ hoveredPolygon: key })}
        onMouseOut={() => this.setState({ hoveredPolygon: null })}
        onDragStart={onPolygonDragStart}
        onDragEnd={onPolygonDragEnd}
        onMouseUp={data =>
          onPolygonMouseUp(
            data,
            this[`polygon${polygonItem.value}`],
            polygonItem.value
          )
        }
      />
    ));
  }

  renderWindowInfo() {
    const { polygonInfo, markerInfo, windowInfo } = this.props;

    return (
      windowInfo && (
        <InfoWindow
          position={{ lat: windowInfo.lat, lng: windowInfo.lng }}
          onCloseClick={() => this.setState({ windowInfo: false })}
        >
          <div>
            {windowInfo.isPolygon && polygonInfo}
            {windowInfo.isMarker && markerInfo}
          </div>
        </InfoWindow>
      )
    );
  }

  renderDrawingManager() {
    const { drawingMode, handlePolygonComplete } = this.props;
    return (
      <DrawingManager
        defaultDrawingMode={null}
        defaultOptions={{
          drawingControl: false,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON],
          },
        }}
        drawingMode={drawingMode}
        onPolygonComplete={handlePolygonComplete}
      />
    );
  }

  renderMarkers() {
    const {
      markersList,
      handleMarkerClick,
      handleMarkerDragStart,
      handleMarkerDragEnd,
    } = this.props;
    return markersList.map((marker, key) => (
      <Marker
        key={key}
        position={marker}
        onClick={({ latLng }) => handleMarkerClick(marker, key, latLng)}
        draggable
        onDragStart={handleMarkerDragStart}
        onDragEnd={handleMarkerDragEnd}
      />
    ));
  }

  render() {
    const {
      center,
      zoom,
      toggleDrawMode,
      handleMapClick,
      toAddMarkerMode,
      addMarkerMode,
      drawingMode,
      isDesktop,
    } = this.props;

    console.log('marker', addMarkerMode);

    return (
      <div>
        <div className="map-holder__buttonsWrapper">
          <button
            className={`map-holder__button ${
              addMarkerMode ? 'map-holder__button_active' : ''
            }`}
            type="button"
            onClick={toAddMarkerMode}
          >
            <LocationIcon />
            {isDesktop && 'Добавить точку'}
          </button>
          <button
            className={`map-holder__button ${
              drawingMode === 'polygon' ? 'map-holder__button_active' : ''
            }`}
            type="button"
            onClick={toggleDrawMode}
          >
            <BrushIcon />
            {isDesktop && 'Создать область'}
          </button>
        </div>
        <GoogleMap
          defaultZoom={zoom}
          defaultCenter={{ lat: center.lat, lng: center.lng }}
          defaultOptions={{
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
          onClick={handleMapClick}
        >
          {this.renderDrawingManager()}

          {this.renderPolygons()}

          {this.renderWindowInfo()}

          {this.renderMarkers()}
        </GoogleMap>
      </div>
    );
  }
}

Map.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  zoom: PropTypes.number.isRequired,
  polygonOptions: PropTypes.shape({
    fillColor: PropTypes.string,
    fillOpacity: PropTypes.number,
    strokeWeight: PropTypes.number,
    strokeColor: PropTypes.string,
    clickable: PropTypes.bool,
    editable: PropTypes.bool,
    zIndex: PropTypes.number,
  }),
  drawingMode: PropTypes.string,
  handlePolygonClick: PropTypes.func,
  toggleDrawMode: PropTypes.func,
  handlePolygonComplete: PropTypes.func,
  handleMapClick: PropTypes.func,
  polygonList: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      })
    )
  ),
  markersList: PropTypes.arrayOf(PropTypes.object),
  onPolygonDragStart: PropTypes.func,
  onPolygonDragEnd: PropTypes.func,
  onPolygonMouseUp: PropTypes.func,
};

Map.defaultProps = {
  polygonOptions: {
    fillColor: 'rgba(233, 125, 125, 0.43)',
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: 'rgb(233, 125, 125)',
    clickable: true,
    editable: false,
    zIndex: 1,
  },
  handlePolygonClick: () => {},
  toggleDrawMode: () => {},
  handlePolygonComplete: () => {},
  handleMapClick: () => {},
  drawingMode: null,
  polygonList: [],
  markersList: [],
  onPolygonDragStart: () => {},
  onPolygonDragEnd: () => {},
  onPolygonMouseUp: () => {},
};

export default compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px', marginBottom: '20px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
  withSizes
)(Map);
