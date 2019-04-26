import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
class LandingClientRequestFeature extends Component {
  render() {
    const { id, number, title, description, isActive, progressBarWidth, handleClick } = this.props;

    const progressBar = isActive ? (
      <div
        className="landingClientRequestFeature__progressBar"
        style={{
          width: `${progressBarWidth}%`
        }}
      ></div>
    ) : null;
    return (
      <div
        className={`landingClientRequestFeature ${isActive ? 'landingClientRequestFeature_active' : ''}`}
        onClick={() => { handleClick(id) }}
      >
        <div className="landingClientRequestFeature__number">
          {number}
        </div>
        <div className="landingClientRequestFeature__content">
          <div className="landingClientRequestFeature__title">
            {title}
          </div>
          <div className="landingClientRequestFeature__description">
            {description}
          </div>
        </div>
        {progressBar}
      </div>
    );
  }
}

LandingClientRequestFeature.propTypes = {
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  progressBarWidth: PropTypes.number,
  id: PropTypes.number,
  handleClick: PropTypes.func
}

export default LandingClientRequestFeature;