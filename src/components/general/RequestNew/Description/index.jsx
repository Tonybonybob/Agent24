import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import FlatBuy from './FlatBuy';
import FlatSell from './FlatSell';
import HouseBuy from './HouseBuy';
import HouseSell from './HouseSell';
import LandBuy from './LandBuy';
import LandSell from './LandSell';
import './style.scss';
class Description extends Component {
  chooseObject(flat, house, land) {
    const { object } = this.props;
    switch (object) {
      case 'flat':
        return flat;
      case 'house':
        return house;
      case 'land':
        return land;
      default:
        return flat;
    }
  }

  chooseOperation() {
    const { operation } = this.props;
    switch (operation) {
      case 'buy':
        return this.chooseObject(FlatBuy, HouseBuy, LandBuy);
      case 'sell':
        return this.chooseObject(FlatSell, HouseSell, LandSell);
      default:
        return this.chooseObject(FlatBuy, HouseBuy, LandBuy);
    }
  }

  render() {
    const { fields, onSegmentChange, onMapAreasChange } = this.props;

    const MyComponent = this.chooseOperation();
    return (
      <div>
        <MyComponent fields={fields} onSegmentChange={onSegmentChange} onMapAreasChange={onMapAreasChange} />
      </div>
    );
  }
}

Description.propTypes = {
  operation: PropTypes.string,
  object: PropTypes.string,
  onSegmentChange: PropTypes.func.isRequired,
  onMapAreasChange: PropTypes.func.isRequired,
};

Description.defaultProps = {
  operation: '',
  object: '',
};

const selector = formValueSelector('NewRequestForm');

const mapStateToProps = state => ({
  operation: selector(state, 'operation'),
  object: selector(state, 'object'),
});

export default connect(mapStateToProps)(Description);
