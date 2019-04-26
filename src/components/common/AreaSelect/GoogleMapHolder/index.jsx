/* eslint-disable */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Image from '../../../../assets/googleMarker.png';

import GoogleMap from '../../GoogleMap';
import TextField from '../../PureTextField';
import { Button } from '../../../general/Button';
import './style.scss';
const colors = [
  '#F2C94C',
  '#6FCF97',
  '#BB6BD9',
  '#50C2E7',
  '#F88181',
  '#0097A7',
];

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

// eslint-disable-next-line react/prefer-stateless-function
class GoogleMapHolder extends Component {
  static propTypes = {
    areaChanged: PropTypes.func,
  };

  static defaultProps = {
    areaChanged: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      polygonList: [],
      markersList: [],
      windowInfo: null,
      activePolygon: null,
      drawingMode: null,
      hoveredPolygon: null,
      addMarkerMode: false,
    };

    this.lastPolygonId = 0; // unique id for each polygon
    this.lastMarkerId = 0;

    this.handlePolygonComplete = this.handlePolygonComplete.bind(this);
    this.handlePolygonDelete = this.handlePolygonDelete.bind(this);
    this.handlePolygonEdit = this.handlePolygonEdit.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.toDrawMode = this.toDrawMode.bind(this);
    this.handlePolygonClick = this.handlePolygonClick.bind(this);
    this.toAddMarkerMode = this.toAddMarkerMode.bind(this);
    this.handleMarkerDelete = this.handleMarkerDelete.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerDragStart = this.handleMarkerDragStart.bind(this);
    this.handleMarkerDragEnd = this.handleMarkerDragEnd.bind(this);
    this.changePolygonName = this.changePolygonName.bind(this);
    this.handleInputEnterKeyPress = this.handleInputEnterKeyPress.bind(this);
    this.onPolygonMouseUp = this.onPolygonMouseUp.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { polygonList, markersList } = this.state;

    const { areaChanged, mapAreas } = this.props;

    const parentList = [...polygonList, ...markersList];

    if (
      polygonList !== prevState.polygonList ||
      markersList !== prevState.markersList
    ) {
      const totalList = parentList.sort((a, b) => a.date >= b.date);

      areaChanged(totalList);
    } else {
      if (mapAreas.length !== parentList.length) {
        const polygon = [];
        const markers = [];

        mapAreas.forEach(mapArea => {
          if (mapArea.polygon) {
            polygon.push(mapArea);
          } else {
            markers.push(mapArea);
          }
        });

        this.setState({
          polygonList: polygon,
          markersList: markers,
        });
      }
    }
  }

  componentDidMount() {
    const { mapAreas } = this.props;

    if (mapAreas.length) {
      const polygon = [];
      const markers = [];

      mapAreas.forEach(mapArea => {
        if (mapArea.polygon) {
          polygon.push(mapArea);
        } else {
          markers.push(mapArea);
        }
      });

      this.setState({
        polygonList: polygon,
        markersList: markers,
      });
    }
  }

  onPolygonMouseUp(data, polygon, polygonValue) {
    const { polygonList } = this.state;

    const newPath = polygon.getPath().b;
    const prevPath = (polygonList.find(el => el.value === polygonValue) || {})
      .polygon;

    const isChanged =
      prevPath.length !== newPath.length ||
      prevPath.some((coord, id) => {
        const newCoord = newPath[id];
        return coord.lat !== newCoord.lat() && coord.lng !== newCoord.lng();
      });
    if (isChanged) {
      this.setState({
        polygonList: [
          ...polygonList.filter(el => el.value !== polygonValue),
          {
            polygon: newPath.map(elem => ({
              lat: elem.lat(),
              lng: elem.lng(),
            })),
            name: polygonList.find(el => el.value === polygonValue).name,
            value: polygonValue,
          },
        ],
      });
    }
  }

  handlePolygonEdit() {
    const { activePolygon, windowInfo } = this.state;

    const isActive = activePolygon === windowInfo.id;
    this.setState({
      activePolygon: isActive ? null : windowInfo.id,
      windowInfo: false,
    });
  }

  handlePolygonDelete() {
    const { windowInfo, polygonList } = this.state;
    this.setState({
      polygonList: polygonList.filter((el, key) => key !== windowInfo.id),
      windowInfo: false,
    });
  }

  changePolygonName(e, isPolygon) {
    const { polygonList, windowInfo, markersList } = this.state;

    if (isPolygon) {
      this.setState({
        polygonList: polygonList.map((polygon, key) => {
          if (windowInfo.id === key) {
            return { ...polygon, name: e.target.value };
          }
          return polygon;
        }),
      });
    } else {
      this.setState({
        markersList: markersList.map((polygon, key) => {
          if (windowInfo.id === key) {
            return { ...polygon, name: e.target.value };
          }
          return polygon;
        }),
      });
    }
  }

  handlePolygonComplete(polygon) {
    const { polygonList } = this.state;
    const coords = polygon.latLngs.b[0].b;

    const newPolygon = coords.map(el => ({
      lat: el.lat(),
      lng: el.lng(),
    }));

    const randomColorIndex = getRandomInt(colors.length - 1);

    this.setState({
      polygonList: [
        ...polygonList,
        {
          polygon: newPolygon,
          name: `Новая Область ${polygonList.length}`,
          // eslint-disable-next-line no-plusplus
          value: this.lastPolygonId++,
          date: Date.now(),
          color: colors[randomColorIndex],
        },
      ],
      drawingMode: null,
    });
    polygon.setMap(null);
  }

  handlePolygonClick(polygon, id, latLng) {
    const {
      windowInfo,
      hoveredPolygon,
      activePolygon,
      addMarkerMode,
      markersList,
    } = this.state;

    if (addMarkerMode) {
      const newMarker = {
        id,
        lat: latLng.lat(),
        lng: latLng.lng(),
        name: '',
      };
      this.setState({
        markersList: [...markersList, newMarker],
        addMarkerMode: false,
      });
      return false;
    }

    const isActive = windowInfo && windowInfo.id === id;

    const newWindowInfo = isActive
      ? false
      : {
          id,
          lat: latLng.lat(),
          lng: latLng.lng(),
          isPolygon: true,
        };
    if (hoveredPolygon && hoveredPolygon === activePolygon) {
      this.setState({ windowInfo: false });
    } else if (activePolygon !== id) {
      this.setState({
        windowInfo: newWindowInfo,
        activePolygon: null,
      });
    }
    return false;
  }

  toAddMarkerMode() {
    const { addMarkerMode } = this.state;
    this.setState({
      addMarkerMode: !addMarkerMode,
      drawingMode: null,
      activePolygon: null,
      windowInfo: null,
    });
  }

  handleMarkerDelete() {
    const { windowInfo, markersList } = this.state;
    this.setState({
      markersList: markersList.filter((el, key) => key !== windowInfo.id),
      windowInfo: false,
    });
  }

  handleMarkerClick(marker, id) {
    const { windowInfo } = this.state;

    const isActive = windowInfo && windowInfo.id === id;

    const newWindowInfo = isActive
      ? false
      : {
          id,
          lat: marker.lat,
          lng: marker.lng,
          isMarker: true,
        };
    this.setState({
      windowInfo: newWindowInfo,
      activePolygon: null,
    });
  }

  handleMarkerDragStart({ latLng }) {
    const { markersList } = this.state;

    this.setState({
      markersList: markersList.map(marker => {
        if (marker.lat === latLng.lat() && marker.lng === latLng.lng()) {
          return { ...marker, isDragged: true };
        }
        return marker;
      }),
    });
  }

  handleMarkerDragEnd({ latLng }) {
    const { markersList } = this.state;

    console.log('dragEnd');

    const filteredMarkersList = markersList.filter(el => !el.isDragged);
    this.setState({
      markersList: [
        ...filteredMarkersList,
        { lat: latLng.lat(), lng: latLng.lng() },
      ],
    });
  }

  handleInputEnterKeyPress(event) {
    if (event.key === 'Enter') {
      this.setState({ windowInfo: null });
    }
  }

  toDrawMode() {
    const { drawingMode } = this.state;
    this.setState({
      drawingMode: drawingMode ? null : google.maps.drawing.OverlayType.POLYGON,
      activePolygon: null,
      addMarkerMode: false,
      windowInfo: null,
    });
  }

  handleMapClick({ latLng }) {
    const {
      hoveredPolygon,
      addMarkerMode,
      markersList,
      activePolygon,
      windowInfo,
    } = this.state;

    if (addMarkerMode) {
      const newMarker = {
        lat: latLng.lat(),
        lng: latLng.lng(),
        date: Date.now(),
        // eslint-disable-next-line
        value: this.lastMarkerId++,
        name: `Новый маркер ${markersList.length}`,
      };
      this.setState({
        activePolygon: hoveredPolygon ? activePolygon : null,
        markersList: [...markersList, newMarker],
        addMarkerMode: false,
        windowInfo: null,
      });
    } else if (
      !hoveredPolygon &&
      (windowInfo || activePolygon || activePolygon === 0)
    ) {
      this.setState({
        activePolygon: null,
        windowInfo: null,
      });
    }
  }

  render() {
    const {
      windowInfo,
      polygonList,
      markersList,
      drawingMode,
      activePolygon,
      hoveredPolygon,
      addMarkerMode,
    } = this.state;

    console.log('DRAWING MODE', drawingMode);

    return (
      <div
        className={`map-holder ${addMarkerMode ? 'map-holder_add-marker' : ''}`}
      >
        <img src={Image} style={{ width: 50, height: 50 }} alt="" />
        <GoogleMap
          center={{ lat: 48.47186, lng: 34.995201 }}
          zoom={11}
          polygonInfo={
            windowInfo &&
            polygonList[windowInfo.id] && (
              <div className="map-holder__edit">
                <TextField
                  value={polygonList[windowInfo.id].name}
                  onChange={value => this.changePolygonName(value, true)}
                  onKeyPress={this.handleInputEnterKeyPress}
                  resizableInput
                />
                <Button
                  type="button"
                  onClick={this.handlePolygonEdit}
                  buttonType="add"
                  size="medium"
                >
                  РЕДАКТИРОВАТЬ
                </Button>
                <Button
                  type="button"
                  onClick={this.handlePolygonDelete}
                  buttonType="add"
                  size="medium"
                  noBorder
                >
                  УДАЛИТЬ
                </Button>
              </div>
            )
          }
          activePolygon={activePolygon}
          addMarkerMode={addMarkerMode}
          hoveredPolygon={hoveredPolygon}
          markerInfo={
            windowInfo &&
            markersList[windowInfo.id] && (
              <div className="map-holder__edit">
                <TextField
                  value={markersList[windowInfo.id].name}
                  onChange={value => this.changePolygonName(value, false)}
                  onKeyPress={this.handleInputEnterKeyPress}
                  resizableInput
                />
                <button type="button" onClick={this.handleMarkerDelete}>
                  УДАЛИТЬ
                </button>
              </div>
            )
          }
          windowInfo={windowInfo}
          polygonList={polygonList}
          markersList={markersList}
          drawingMode={drawingMode}
          handlePolygonDelete={this.handlePolygonDelete}
          handlePolygonEdit={this.handlePolygonEdit}
          handlePolygonComplete={this.handlePolygonComplete}
          handlePolygonClick={this.handlePolygonClick}
          toggleDrawMode={this.toDrawMode}
          handleMapClick={this.handleMapClick}
          toAddMarkerMode={this.toAddMarkerMode}
          handleMarkerDelete={this.handleMarkerDelete}
          handleMarkerClick={this.handleMarkerClick}
          handleMarkerDragStart={this.handleMarkerDragStart}
          handleMarkerDragEnd={this.handleMarkerDragEnd}
          onPolygonMouseUp={this.onPolygonMouseUp}
        />
      </div>
    );
  }
}

export default GoogleMapHolder;
