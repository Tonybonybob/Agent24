import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
class LandingFeature extends Component {
  render() {
    const { title, description, className, highlightColor, highlightDisabled} = this.props;
    const titleBlock = title?(
      <div 
        className="landingFeature__title"
      >
        {title}
      </div>
    ) : null;
    const descriptionBlock = description?(
      <div 
        className="landingFeature__description"
      >
        {description}
      </div>
    ) : null;
    return(
      <div 
        className={
          `landingFeature
          ${className?className:''}
          ${highlightDisabled?'landingFeature_highlightDisabled':''}
          ${highlightColor&&highlightColor=='blue'?'landingFeature_blue':''}
        `}
      >
        {titleBlock}
        {descriptionBlock}
      </div>
    );
  }
}

LandingFeature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
  highlightDisabled: PropTypes.bool,
  highlightColor: PropTypes.oneOf(['blue', 'cream']),
}

export default LandingFeature;