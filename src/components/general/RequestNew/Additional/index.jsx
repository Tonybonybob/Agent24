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

class Additional extends Component {
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
    const MyComponent = this.chooseOperation();
    return (
      <div>
        <MyComponent />
      </div>
    );
  }
}

Additional.propTypes = {
  operation: PropTypes.string,
  object: PropTypes.string,
};

Additional.defaultProps = {
  operation: '',
  object: '',
};

const selector = formValueSelector('NewRequestForm');

const mapStateToProps = state => ({
  operation: selector(state, 'operation'),
  object: selector(state, 'object'),
});

export default connect(mapStateToProps)(Additional);
