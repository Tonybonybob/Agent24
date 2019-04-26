import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';

import { withSizes } from '../../../../../utils/sizes';
import LandingClientRequestFeature from './Feature';
import DotNav from '../../../../../components/common/DotNav';
import './style.scss';
class LandingClientRequestFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipedOffset: 0,
      intervalId: null,
      progressBarIntervalId: null,
      intervalStopwatchTime: 0,
      progressBarWidth: 0
    };
    this.setInterval = this.setInterval.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
    this.timer = this.timer.bind(this);
    this.handleSwipingLeft = this.handleSwipingLeft.bind(this);
    this.handleSwipingRight = this.handleSwipingRight.bind(this);
    this.handleSwipedLeft = this.handleSwipedLeft.bind(this);
    this.handleSwipedRight = this.handleSwipedRight.bind(this);
    this.progressBarTimer = this.progressBarTimer.bind(this);
    this.handleFeatureClick = this.handleFeatureClick.bind(this);
    this.handleDotClick = this.handleDotClick.bind(this);
  }

  switchItemDelay = 30000;
  refreshProgressBarDelay = 100;

  componentDidMount() {
    const { hideProgressBar } = this.props;

    !hideProgressBar && this.setInterval();
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    if (intervalId) {
      this.clearInterval();
    }
  }

  setInterval() {
    const { features, active } = this.props;
    const { intervalId } = this.state;
    if (!intervalId && (active !== features.length - 1)) {
      const newIntervalId = setInterval(this.timer, this.switchItemDelay);
      const progressBarIntervalId = setInterval(this.progressBarTimer, this.refreshProgressBarDelay);
      this.setState({
        intervalId: newIntervalId,
        progressBarIntervalId,
      });
    }
  }

  clearInterval() {
    const { intervalId, progressBarIntervalId } = this.state;
    if (intervalId) {
      clearInterval(intervalId);
      clearInterval(progressBarIntervalId);
      this.setState({
        intervalId: null,
        progressBarIntervalId: null,
        intervalStopwatchTime: 0,
        progressBarWidth: 0,
      });
    }
  }

  timer() {
    const { active, features, setActive } = this.props;
    this.clearInterval();
    if (active !== features.length - 1) {
      setActive(active + 1, this.setInterval);
    }
  }

  progressBarTimer() {
    const { intervalStopwatchTime } = this.state;

    const { onProgressBarChange, hideProgressBar } = this.props;

    const progressBarWidth = hideProgressBar
      ? null
      : intervalStopwatchTime / this.switchItemDelay * 100;

    onProgressBarChange(progressBarWidth);

    this.setState({
      intervalStopwatchTime: intervalStopwatchTime + this.refreshProgressBarDelay,
      progressBarWidth,
    });
  }

  handleSwipingLeft(_, offset) {
    const { isDesktop } = this.props;
    if (!isDesktop) {
      this.clearInterval();
      this.setState({
        swipedOffset: -offset,
      });
    }
  }

  handleSwipingRight(_, offset) {
    const { isDesktop } = this.props;
    if (!isDesktop) {
      this.clearInterval();
      this.setState({
        swipedOffset: offset,
      });
    }
  }

  handleSwipedLeft() {
    const { isDesktop, active, features, setActive } = this.props;
    if (!isDesktop) {
      this.setState({
        swipedOffset: 0,
      });
      if (active !== features.length - 1) {
        setActive(active + 1, this.setInterval);
      }
    }
  }

  handleSwipedRight() {
    const { isDesktop, active, setActive } = this.props;
    if (!isDesktop) {
      this.setState({
        swipedOffset: 0,
      });
      if (active > 0) {
        setActive(active - 1, this.setInterval);
      } else {
        this.setInterval();
      }
    }
  }

  handleFeatureClick(index) {
    const { setActive, isDesktop } = this.props;
    if (isDesktop) {
      this.clearInterval();
      setActive(index, this.setInterval);
    }
  }

  handleDotClick(index) {
    const { setActive } = this.props;
    this.clearInterval();
    setActive(index, this.setInterval);
  }

  render() {
    const { features, active, className, isDesktop } = this.props;
    const { progressBarWidth } = this.state;
    return (
      <React.Fragment>
        <Swipeable
          trackMouse
          onSwipingLeft={this.handleSwipingLeft}
          onSwipingRight={this.handleSwipingRight}
          onSwipedLeft={this.handleSwipedLeft}
          onSwipedRight={this.handleSwipedRight}
          className={`landingClientRequestFeatures ${className ? className : ''}`}
        >
          {features.map((feature, index) => {
            return (
              <div
                className={`
                    landingClientRequestFeatures__item
                    ${index === 0 ? 'landingClientRequestFeatures__item_first' : ''}
                  `}
                style={{
                  transition: index === 0 && !isDesktop ? 'margin-left 0.5s ease-in-out' : '',
                  marginLeft: index === 0 && !isDesktop ? `-${active * 100}%` : ''
                }}
                key={feature.id}
              >
                <LandingClientRequestFeature
                  number={`0${index + 1}`}
                  title={feature.title}
                  description={feature.description}
                  isActive={index === active}
                  progressBarWidth={progressBarWidth}
                  handleClick={this.handleFeatureClick}
                  id={index}
                />
              </div>
            );
          })}
        </Swipeable>
        {!isDesktop && (
          <div className="landingClientRequestFeatures__dotNav">
            <DotNav
              total={features.length}
              current={active + 1}
              handleChange={this.handleDotClick}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

LandingClientRequestFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired,
  active: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired,
  className: PropTypes.string,
  isDesktop: PropTypes.bool.isRequired,
}

export default withSizes(LandingClientRequestFeatures);