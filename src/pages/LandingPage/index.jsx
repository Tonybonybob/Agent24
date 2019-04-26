import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { SectionsContainer, Section } from 'react-fullpage';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import LandingClientRequest from './sections/LandingClientRequest';
import LandingDatabase from './sections/LandingDatabase'
import LandingMessanger from './sections/LandingMessanger'
import LandingCalendar from './sections/LandingCalendar'
import LandingAgency from './sections/LandingAgency'
import InlineLogo from '../../assets/InlineLogo';
import LandingPresentation from './sections/LandingPresentation';
import LandingRealtors from './sections/LandingRealtors';
import LandingNotification from './sections/LandingNotification';
import BigClose from '../../assets/BigClose';
import Close from '../../assets/Close';
import { withSizes } from '../../utils';
import './style.scss';
class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLanding: false,
      splashScreenTime: 0,
      splashScreenFade: false,
      activeImage: '',
    };

    this.landingRef = React.createRef();
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.screenSplashTimer = setInterval(this.changeSplashScreenTime, 100);
  }

  componentDidUpdate(_, prevState) {
    const { splashScreenTime } = this.state;

    if (splashScreenTime === 5000 && !prevState.splashScreenFade) {
      clearInterval(this.screenSplashTimer);
      this.setState({
        splashScreenFade: true,
      });
      setTimeout(() => this.setState({
        showLanding: true,
        splashScreenTime: 0,
      }), 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.screenSplashTimer);
  }

  changeSplashScreenTime = () => {
    this.setState(prevState => ({
      splashScreenTime: prevState.splashScreenTime + 100,
    }));
  }

  isBottom = el => el.scrollHeight - el.scrollTop === el.clientHeight;

  handleScrollingEnd = (event) => {
    if (this.isBottom(event.srcElement && event.srcElement.scrollingElement)) {
      this.handleRemoveImageLink();
    }
  }

  handleRemoveImageLink = () => {
    const { landingScroll } = this.state;
    if (this.landingRef.current) {
      this.landingRef.current.style.height = '';
    }
    window.scrollTo(0, landingScroll);


    this.setState({
      activeImage: '',
      landingScroll: 0,
      showDelete: false,
    });
  }

  handleLandingHeightChange = (pixels) => {
    if (this.landingRef.current) {
      this.setState({
        landingScroll: window.pageYOffset,
        showDelete: true,
      });

      this.landingRef.current.style.height = `${pixels}px`;
      window.scrollTo(0, 0);
    }
  };

  handleSetImageLink = (activeImage) => {
    this.setState({
      activeImage,
    });
  }

  render() {
    const {
      showLanding, splashScreenTime, splashScreenFade, activeImage, showDelete,
    } = this.state;

    const { valid, handleSubmit, isDesktop, location } = this.props;

    console.log(location);

    return showLanding
      ? (
        <div
          className="landingPage"
          onScroll={this.handleScrollingEnd}
          ref={this.landingRef}
        >
          {activeImage && (
            <div className="landingPage__mainPhoto">
              <img
                src={activeImage}
                ref={this.imageRef}
                alt="active"
                onLoad={() => this.handleLandingHeightChange(this.imageRef.current.offsetHeight)}
              />
              {showDelete && (
                <div className="landingPage__mainPhotoClose" onClick={this.handleRemoveImageLink}>
                  <div />
                </div>
              )}
            </div>
          )}
          <LandingClientRequest setActiveImage={this.handleSetImageLink} />
          <LandingPresentation setActiveImage={this.handleSetImageLink} />
          <LandingMessanger />
          <LandingDatabase setActiveImage={this.handleSetImageLink} />
          <LandingCalendar />
          <LandingAgency setActiveImage={this.handleSetImageLink} />
          <LandingRealtors setActiveImage={this.handleSetImageLink} />
          <LandingNotification valid={valid} handleSubmit={handleSubmit} location={location} />
        </div>
      ) : (
        <div className={`splashScreen ${splashScreenFade ? 'splashScreen_fade' : ''}`}>
          <InlineLogo />
          <div className="splashScreen__timeWrapper">
            <div className="splashScreen__timer" style={{ width: `${splashScreenTime * 100 / 5000}%` }} />
          </div>
        </div>
      );
  }
}

export default compose(
  withRouter,
  reduxForm({
    form: 'LandingForm',
  }),
  withSizes,
)(LandingPage);
