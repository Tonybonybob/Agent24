import React, { Component, Fragment } from 'react';
import { FieldArray } from 'redux-form';
import { connect } from 'react-redux';

import Select from '../../../../common/Select';
import TextField from '../../../../common/TextField';
import AreaSelect from '../../../../common/AreaSelect';
import GoogleMapHolder from '../../../../common/AreaSelect/GoogleMapHolder';
import AreaLine from '../../../EditFormComponents/AreaSegments/AreaLine';
import TrashIcon from '../../../../../assets/Trash';
import PlusIcon from '../../../../../assets/Plus';
import FlatBuyParametrs from './FlatBuyParametrs';
import Row from '../../../../Grid/Row';
import Col from '../../../../Grid/Col';
import { turnToAreasAsyncaction, removeAreasAction, turnToAreasAsyncAction } from '../../../../../store/actions/newRequest';
import { getMapAreas } from '../../../../../store/reducers/newRequest';
import { withSizes } from '../../../../../utils';
import { compose } from 'redux';
import './style.scss';
// eslint-disable-next-line react/prefer-stateless-function
class FlatBuy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingSegments: [{}],
    };
  }

  componentDidUpdate(prevProps) {
    const { mapAreas, onMapAreasChange } = this.props;

    if (mapAreas.length !== prevProps.mapAreas.length) {
      onMapAreasChange(mapAreas.length);
    }
  }

  addEditingSegment = () => {
    const { editingSegments } = this.state;

    const { onSegmentChange } = this.props;

    onSegmentChange(editingSegments.length);

    this.setState({
      editingSegments: [...editingSegments, {}],
    });
  }

  deleteEditingSegment = (id) => {
    const { editingSegments } = this.state;

    const { onSegmentChange } = this.props;

    onSegmentChange(editingSegments.length);

    this.setState({
      editingSegments: [
        ...editingSegments.slice(0, id),
        ...editingSegments.slice(id + 1),
      ],
    });
  }

  handleSegmentsChange = (newSegment, id) => {
    const { editingSegments } = this.state;

    this.setState({
      editingSegments: editingSegments.map((segment, idx) => (id === idx ? newSegment : segment)),
    });
  }

  handleAddSegments = () => {
    const { editingSegments, operation, object } = this.state;

    const { addSegment } = this.props;

    console.log('yeee', editingSegments);

    const areas = [];
    const cities = [];
    const adminAreas = [];
    const microdistricts = [];
    const totalAreas = [];

    editingSegments.forEach((segment) => {
      if (segment.areaId) {
        if (!areas.includes(segment.areaId)) {
          areas.push(segment.areaId);

          totalAreas.push({
            areaName: segment.areaName,
            areaId: segment.areaId,
            cities: [],
          });
        }
      }
      if (segment.cityId) {
        if (!cities.includes(segment.cityId)) {
          cities.push(segment.cityId);

          const areaIndex = areas.indexOf(segment.areaId);

          totalAreas[areaIndex] && totalAreas[areaIndex].cities.push({
            cityName: segment.cityName,
            cityId: segment.cityId,
            adminAreas: [],
          });
        }
      }
      if (segment.adminAreaId) {
        if (!adminAreas.includes(segment.adminAreaId)) {
          adminAreas.push(segment.adminAreaId);

          const areaIndex = areas.indexOf(segment.areaId);

          totalAreas[areaIndex].cities.map((city) => {
            if (city.cityId === segment.cityId) {
              city.adminAreas.push({
                adminAreaName: segment.adminAreaName,
                adminAreaId: segment.adminAreaId,
                microdistricts: [],
              });
            }
            return true;
          });
        }
      }
      if (segment.microdistrictId) {
        if (!microdistricts.includes(segment.microdistrictId)) {
          microdistricts.push(segment.microdistrictId);

          const areaIndex = areas.indexOf(segment.areaId);
          totalAreas[areaIndex].cities.map((city) => {
            if (city.cityId === segment.cityId) {
              city.adminAreas.map((adminArea) => {
                if (adminArea.adminAreaId === segment.adminAreaId) {
                  adminArea.microdistricts.push({
                    microdistrictId: segment.microdistrictId,
                    microdistrictName: segment.microdistrictName,
                  });
                }
                return true;
              });
            }
            return true;
          });
        }
      }
    });

    addSegment({
      areas: totalAreas,
      operation,
      object,
    });

    this.setState({
      editingSegments: [{}],
    });
    return true;
  }

  render() {
    const { editingSegments } = this.state;

    const { turnToArea, mapAreas, removeArea, isDesktop } = this.props;

    console.log(mapAreas);

    const tempArr = [{ value: 0, name: 'Значение 1' }, { value: 1, name: 'Значение 2' }];
    return (
      <div className="flatBuyDescription">
        <div>
          <GoogleMapHolder areaChanged={turnToArea} mapAreas={mapAreas} />
          {mapAreas.map((mapArea, index) => (
            <div className="flatBuyDescription__mapArea">
              {mapArea.name}
              <span className="flatBuyDescription__deleteArea" onClick={() => removeArea(index)}>
                <TrashIcon />
              </span>
            </div>
          ))}
        </div>
        <div className="areaSegments__edit">
          {editingSegments.map((segment, id) => (
            id === editingSegments.length - 1
              ? (
                <div className="areaSegmentsSegment">
                  <AreaLine
                    segment={segment}
                    onChange={newSegment => this.handleSegmentsChange(newSegment, id)}
                  />
                  <div
                    className="areaSegmentsSegment__add"
                    onClick={this.addEditingSegment}
                  >
                    {!isDesktop && 'Добавить'}
                    <PlusIcon />
                  </div>
                </div>
              ) : (
                <div className="flatBuyDescription__mapArea">
                  {segment.microdistrictName && (
                    <Fragment>
                      {segment.microdistrictName}
                      {segment.adminAreaName && ', '}
                    </Fragment>
                  )}
                  {segment.adminAreaName && (
                    <Fragment>
                      {segment.adminAreaName}
                      {segment.cityName && ', '}
                    </Fragment>
                  )}
                  {segment.cityName && (
                    <Fragment>
                      {segment.cityName}
                      {segment.areaName && ', '}
                    </Fragment>
                  )}
                  {segment.areaName || ''}
                  <span className="flatBuyDescription__deleteArea" onClick={() => this.deleteEditingSegment(id)}>
                    <TrashIcon />
                  </span>
                </div>
              )
          ))}
        </div>
        <FieldArray
          name="parametrs"
          component={FlatBuyParametrs}
        />
        <TextField
          name="description"
          label="Описание"
          multiline
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mapAreas: getMapAreas(state),
});

const mapDispatchToProps = dispatch => ({
  turnToArea: data => dispatch(turnToAreasAsyncAction(data)),
  removeArea: index => dispatch(removeAreasAction(index)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSizes,
)(FlatBuy);
