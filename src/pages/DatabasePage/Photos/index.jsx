import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import { withSizes } from '../../../utils';
import './style.scss';
class Photos extends Component {
  constructor(props) {
    super(props);

    this.photosSliderRef = React.createRef();

    this.handleDotsClick = this.handleDotsClick.bind(this);
  }

  handleDotsClick(event) {
    const currentSlideIndex = Number(event.target.getAttribute('data-index'));

    this.photosSliderRef.current.slickGoTo(currentSlideIndex);
  }

  render() {
    const {
      images, openSlider, isDesktop, isTablet, slideIndex, slideChange,
    } = this.props;

    this.photosSliderRef.current && this.photosSliderRef.current.slickGoTo(slideIndex);

    return (
      <div className="objectInfoImages">
        {isDesktop
          ? (
            <Fragment>
              <div
                className="objectInfoImages__itemHolder_main objectInfoImages__itemHolder"
              >
                <div
                  className="objectInfoImages__item"
                  style={{ backgroundImage: `url(${images[0] ? images[0].photoId : 'https://uploads-ssl.webflow.com/57e5747bd0ac813956df4e96/5aebae14c6d254621d81f826_placeholder.png'})` }}
                  onClick={images.length > 0 && (() => openSlider(0))}
                />
              </div>
              <div className="objectInfoImages__itemGroupHolder">
                {new Array(3).fill(null).map((image, index) => (
                  images[index + 1] && images.length !== 0 && (
                    <div
                      key={index + 1}
                      className="objectInfoImages__itemHolder"
                    >
                      <div
                        className="objectInfoImages__item"
                        style={{ backgroundImage: `url(${images[index + 1] ? images[index + 1].photoId : 'https://uploads-ssl.webflow.com/57e5747bd0ac813956df4e96/5aebae14c6d254621d81f826_placeholder.png)'}` }}
                      />
                    </div>
                  )
                ))}
                {images.length > 4 && (
                  <div className="objectInfoImages__itemHolder" onClick={() => openSlider(4)}>
                    <div
                      className="objectInfoImages__item"
                      style={{ backgroundImage: `url(${images[4].photoId})` }}
                    />
                    <div className="objectInfoImages__imagesLeftText">
                      {images.length - 4}
                      +
                    </div>
                  </div>
                )}
              </div>
            </Fragment>
          ) : (
            <div className="objectInfoImages__sliderContainer">
              <Slider
                ref={this.photosSliderRef}
                speed={300}
                slidesToShow={1}
                infinite
                dots
                initialSlide={slideIndex}
                variableWidth
                focusOnSelect
                afterChange={slideChange}
                centerMode
                appendDots={dots => (
                  <div>
                    <ul className="objectInfoImages__sliderDots">
                      {dots.map((_, index) => (
                        <li
                          className={`objectInfoImages__sliderDot
                            ${slideIndex === index
                              ? 'objectInfoImages__sliderDot_active'
                              : ''}`
                          }
                          data-index={index}
                          onClick={this.handleDotsClick}
                        />
                      ))}
                    </ul>
                  </div>
                )}
                swipeToSlide
                arrows={false}
                className="objectInfoImages__slider"
                centerPadding="0"
              >
                {images.length === 0
                  ? (
                    <div className="objectInfoImages__sliderItem" style={{ width: isTablet ? '27vw' : 'calc(100vw - 30px)' }}>
                      <div
                        style={{ backgroundImage: 'url(https://uploads-ssl.webflow.com/57e5747bd0ac813956df4e96/5aebae14c6d254621d81f826_placeholder.png)' }}
                        className="objectInfoImages__sliderImage"
                      />
                    </div>
                  ) : images.map((image, index) => (
                    <div className="objectInfoImages__sliderItem" style={{ width: isTablet ? '27vw' : 'calc(100vw - 30px)' }}>
                      <div
                        onClick={() => openSlider(index)}
                        style={{ backgroundImage: `url(${image.photoId})` }}
                        className="objectInfoImages__sliderImage"
                      />
                    </div>
                  ))}
              </Slider>
            </div>
          )
        }
      </div>
    );
  }
}

Photos.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
  })),
  openSlider: PropTypes.func,
  isDesktop: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
  slideIndex: PropTypes.string,
  slideChange: PropTypes.func,
};

Photos.defaultProps = {
  images: [{}],
  openSlider: () => { },
  slideChange: () => { },
  slideIndex: 0,
};

export default withSizes(Photos);
