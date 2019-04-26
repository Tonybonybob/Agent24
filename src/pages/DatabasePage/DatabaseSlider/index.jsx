import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import withSizes from 'react-sizes';
import './style.scss';
class Sliders extends Component {
  static propTypes = {
    activeIndex: PropTypes.number,
  }

  static defaultProps = {
    activeIndex: 0,
  }

  constructor(props) {
    super(props);

    this.bigSliderRef = React.createRef();
    this.smallSliderRef = React.createRef();

    this.state = {
      bigSlider: null,
      smallSlider: null,
    };
    this.isInteriorShown = false;
    this.isFacadeShown = false;
    this.isPlanShown = false;

    this.handleFakeSliderClick = this.handleFakeSliderClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      bigSlider: this.bigSliderRef.current,
      smallSlider: this.smallSliderRef.current,
    });
  }

  handleFakeSliderClick(event) {
    const { bigSlider } = this.state;

    const activeIndex = Number(event.target.getAttribute('data-index'));

    bigSlider.slickGoTo(activeIndex);
  }

  renderSmallImages(clicker) {
    const { images, index: activeIndex } = this.props;

    return images.map((image, index) => {
      const showInterior = image.photoType === 'interior'
        ? !this.isInteriorShown
        : undefined;
      this.isInteriorShown = showInterior !== undefined && true;

      const showFacade = image.photoType === 'facade'
        ? !this.isFacadeShown
        : undefined;
      this.isFacadeShown = showFacade !== undefined && true;

      const showPlan = image.photoType === 'plan'
        ? !this.isPlanShown
        : undefined;
      this.isPlanShown = showPlan !== undefined && true;

      return (
        <div key={index} className="objectInfoSmallSlider__item">
          {showInterior && (
          <span className="objectInfoSmallSlider__tag">
Интерьер
          </span>
          )}
          {showFacade && (
          <span className="objectInfoSmallSlider__tag">
Фасад здания
          </span>
          )}
          {showPlan && (
          <span className="objectInfoSmallSlider__tag">
Планировка
          </span>
          )}
          <div
            onClick={clicker}
            className={`objectInfoSmallSlider__image ${activeIndex === index ? 'objectInfoSmallSlider__image_active' : ''}`}
            data-index={index}
            style={{ backgroundImage: `url(${image.photoId})` }}
          />
        </div>
      );
    });
  }

  render() {
    const { bigSlider, smallSlider } = this.state;

    const {
      images, close, width, index, click,
    } = this.props;

    return (
      <Fragment>
        <div className="objectInfoSlider">
          <button type="button" onClick={close}>
close
          </button>
          <Slider
            dots={false}
            speed={300}
            slidesToShow={1}
            infinite
            centerPadding="20%"
            centerMode
            initialSlide={index}
            responsive={[
              {
                breakpoint: 800,
                settings: {
                  centerPadding: '50px',
                },
              },
            ]}
            swipeToSlide
            focusOnSelect
            arrows={false}
            afterChange={click}
            ref={this.bigSliderRef}
            asNavFor={smallSlider}
          >
            {images.map((image, index) => (
              <div>
                <div key={index} style={{ backgroundImage: `url(${image.photoId})` }} className="objectInfoSlider__item" />
              </div>
            ))}
          </Slider>
        </div>
        <div className="objectInfoSmallSlider">
          {width >= images.length * 70 + 28 // padding
            ? (
              <div className="objectInfoSmallSlider__wrapper">
                {this.renderSmallImages(this.handleFakeSliderClick)}
              </div>
            ) : (
              <Slider
                asNavFor={bigSlider}
                ref={this.smallSliderRef}
                slidesToShow={5}
                swipeToSlide
                initialSlide={index}
                arrows={false}
                dots={false}
                infinite
                variableWidth
                focusOnSelect
              >
                {this.renderSmallImages()}
              </Slider>
            )}
        </div>
      </Fragment>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  width,
});

export default withSizes(mapSizesToProps)(Sliders);
