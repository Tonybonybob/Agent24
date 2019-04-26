import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AreaLine from './AreaLine';
import SegmentsTable from './SegmentsTable';
import PlusIcon from '../../../../assets/Plus';
import TrashIcon from '../../../../assets/Trash';
import { Button } from '../../Button';
import PureSelect from '../../../common/PureSelect';
import './style.scss';

class AreaSegments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingSegments: [{}],
      operation: 'sell',
      object: 'flat',
    };

    this.operationItems = [
      { name: 'Продажа', value: 'sell' },
      { name: 'Покупка', value: 'buy' },
    ];
    this.objectItems = [
      { name: 'Квартира', value: 'flat' },
      { name: 'Дом', value: 'house' },
      { name: 'Земля', value: 'land' },
    ];
  }

  addEditingSegment = () => {
    const { editingSegments } = this.state;

    this.setState({
      editingSegments: [...editingSegments, {}],
    });
  }

  deleteEditingSegment = (id) => {
    const { editingSegments } = this.state;

    this.setState({
      editingSegments: [
        ...editingSegments.slice(0, id),
        ...editingSegments.slice(id + 1),
      ],
    });
  }

  handleSegmentsChange(newSegment, id) {
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
    const { editingSegments, operation, object } = this.state;
    const { onClose, segments } = this.props;

    return (
      <div className="areaSegments">
        <div className="areaSegments__segmentsTable">
          <SegmentsTable close={onClose} segments={segments} />
        </div>
        <div className="areaSegments__edit">
          <div className="areaSegments__selects">
            <PureSelect
              label="Операция"
              items={this.operationItems}
              onChange={e => this.setState({ operation: e.target.value })}
              value={operation}
            />
            <PureSelect
              label="Обьект"
              items={this.objectItems}
              onChange={e => this.setState({ object: e.target.value })}
              value={object}
            />
          </div>
          {editingSegments.map((segment, id) => (
            <div className="areaSegmentsSegment">
              <AreaLine
                segment={segment}
                onChange={newSegment => this.handleSegmentsChange(newSegment, id)}
              />
              {editingSegments.length > 1 && (
                <div
                  className="areaSegmentsSegment__delete"
                  onClick={() => this.deleteEditingSegment(id)}
                >
                  <TrashIcon />
                </div>
              )}
              <div
                className="areaSegmentsSegment__add"
                onClick={this.addEditingSegment}
              >
                <PlusIcon />
              </div>
            </div>
          ))}
        </div>
        <div className="areaSegments__buttons">
          {onClose && (
            <Button buttonType="add" noBorder onClick={onClose}>
              Отмена
            </Button>
          )}
          <Button buttonType="add" onClick={this.handleAddSegments}>
            Добавить сегмент
          </Button>
        </div>
      </div>
    );
  }
}

AreaSegments.propTypes = {
  onClose: PropTypes.func,
  segments: PropTypes.array,
};

AreaSegments.defaultProps = {
  onClose: false,
  segments: [],
};

export default AreaSegments;
