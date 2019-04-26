import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InfoIcon from '../../../assets/Info';
import './style.scss';
class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.popup = React.createRef();
  }

  componentDidMount() {
    if (this.popup.current) {
      const height = this.popup.current.offsetHeight;
      this.popup.current.style.top = `-${height / 2}px`;
    }
  }

  render() {
    const { text, className, primary } = this.props;

    return (
      <div className={`tooltip ${className} ${primary ? 'tooltip-primary' : ''}`}>
        <span className="tooltip__icon">
          <InfoIcon />
        </span>
        {text && (
          <div className="tooltip__popupHolder">
            <div className="tooltip__popup" ref={this.popup}>
              {text}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Tooltip.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  primary: PropTypes.bool,
};

Tooltip.defaultProps = {
  className: '',
  primary: false,
  text: '',
};

export default Tooltip;
