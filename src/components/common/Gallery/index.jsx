import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import styled from 'styled-components';
import withSizes from 'react-sizes';
// import { withSizes } from '../../../utils';
import DotNav from '../DotNav';
import ArrowDownIcon from '../../../assets/ArrowDownStroke';
import CloseIcon from '../../../assets/BigClose';

const StyledGallery = styled.div`
  position: relative;
  overflow:hidden;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 16px;
  @media (min-width:${({ theme }) => (theme.breakpoints.sm)}) {
    display: flex;
  }
`;

const GalleryScene = styled(Swipeable)`
  position: relative;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px
  @media (min-width:${({ theme }) => (theme.breakpoints.sm)}) {
    margin-right: 8px;
  }
`;

const GallerySceneImages = styled.div.attrs({
  style: ({ offset, activeImage, isSmallMobile }) => ({
    ...(activeImage
      ? {
        top: isSmallMobile ? `-${activeImage * 100}%` : 0,
        left: !isSmallMobile ? `-${activeImage * 100}%` : 0,
      } : {}
    ),
    ...(offset
      ? {
        top: isSmallMobile ? `calc(-${activeImage * 100}% + ${offset}px)` : 0,
        left: !isSmallMobile ? `calc(-${activeImage * 100}% + ${offset}px)` : 0,
      } : {}
    ),
  }),
})`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: left 0.15s ease-out, top 0.15s ease-out;
  @media (min-width:${({ theme }) => (theme.breakpoints.sm)}) {
    flex-direction: column;
  }
`;

const GallerySceneImage = styled.div.attrs({
  style: ({ image }) => ({
    backgroundImage: `url(${image})`,
  }),
})`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background-position: center;
  background-size: cover;
`;

const GalleryPreview = styled(Swipeable)`
  position: relative;
  display: none;
  margin-top: 8px;
  @media (min-width:${({ theme }) => (theme.breakpoints.xs)}) {
    height: 54px;
    display: block;
  }
  @media (min-width:${({ theme }) => (theme.breakpoints.sm)}) {
    margin-top: 0;
    height: initial;
    width: 54px;
  }
`;

const GalleryPreviewImages = styled.div.attrs({
  style: ({ activeImage, images, isSmallMobile }) => ({
    ...(activeImage && isSmallMobile ? {
      top: (images.length - 1 - activeImage > 2)
        ? `-${(activeImage - 1) * 62}px`
        : `-${(images.length - 4) * 62}px`,
    } : {}),
  }),
})`
  position: absolute;
  display: flex;
  justify-content: center;
  @media (min-width:${({ theme }) => (theme.breakpoints.sm)}) {
    flex-direction: column;
  }
  top: 0;
  left: 0;
  width: 100%;
  transition: top 0.15s ease-out;
`;

const GalleryPreviewImage = styled.div.attrs({
  style: ({ image, active }) => ({
    backgroundImage: `url(${image})`,
    ...(active ? {
      border: '2px solid #ffc000',
    } : {}),
  }),
})`
  cursor: pointer;
  width: 54px;
  height: 54px;
  background-clip: border-box;
  box-sizing: border-box;
  margin-right: 8px;
  flex-shrink: 0;
  background-position: center;
  background-size: cover;
  @media (min-width:${({ theme }) => (theme.breakpoints.sm)}) {
    margin-right: 0;
    margin-bottom: 8px;
  }
`;

const StyledDotNav = styled(DotNav)`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  bottom: 12px;
   @media (min-width:${({ theme }) => (theme.breakpoints.xs)}) {
    display: none;
  }
`;

const GalleryFullscreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.75);
  z-index: 9;
  overflow: hidden;
`;

const GalleryFullscreenCloser = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  z-index: 12;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
    path {
      fill: #fff;
      opacity: 1;
    }
  }
`;

const GalleryFullscreenPreview = styled.div`

`;

const GalleryFullscreenImages = styled(Swipeable).attrs({
  style: ({ activeImage, offset }) => ({
    ...(activeImage
      ? {
        left: `-${activeImage * 100}%`,
      } : {}
    ),
    ...(offset
      ? {
        left: `calc(-${activeImage * 100}% + ${offset}px)`,
      } : {}
    ),
  }),
})`
  z-index: 11;
  display: flex;
  left: 0;
  height: 100%;
  width: 100%;
  position: relative;
  transition: left 0.15s ease-out;
`;

const GalleryFullscreenImageWrapper = styled.div`
  position: relative;
  flex-grow: 0
  flex-shrink: 0;
  flex-basis: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  box-sizing: border-box;
`;

const GalleryFullscreenImage = styled.img.attrs({
  style: ({ activeImage, currentImage }) => ({
    ...(currentImage === activeImage ? {
      cursor: 'initial',
      maxHeight: '1000px',
    } : {}
    ),
  }),
})`
    transition: max-height 0.25s ease-out;
    max-height: 250px;
    cursor: pointer;
    max-width: 100%;
    z-index: 10;
    user-select: none;
  `;

const GalleryPrev = styled.div`
  position: absolute;
  left: 0;
  width: ${({ fullscreen }) => (fullscreen ? '20px' : '10px')};
  height: ${({ fullscreen }) => (fullscreen ? '60px' : '30px')};
  z-index: ${({ fullscreen }) => (fullscreen ? '12' : '1')};
  left: 12px;
  overflow: hidden;
  cursor: pointer;
  @media (max-width:${({ theme }) => (theme.breakpoints.sm)}) {
    display: none;
  }
  @media (min-width:${({ theme }) => (theme.breakpoints.lg)}) {
    width: 40px;
    height: 80px;
  }
  svg {
    transform: rotate(90deg);
    width 100%;
    height: 100%;
    path {
      fill: #fff;
      opacity: 1;
    }
  }
`;

const GalleryNext = styled.div`
  position: absolute;
  right: 0;
  z-index: ${({ fullscreen }) => (fullscreen ? '12' : '1')};
  width: ${({ fullscreen }) => (fullscreen ? '20px' : '10px')};
  height: ${({ fullscreen }) => (fullscreen ? '60px' : '30px')};
  right: 12px;
  overflow: hidden;
  cursor: pointer;
  @media (max-width:${({ theme }) => (theme.breakpoints.sm)}) {
    display: none;
  }
  @media (min-width:${({ theme }) => (theme.breakpoints.lg)}) {
    width: 40px;
    height: 80px;
  }
  svg {
    transform: rotate(-90deg);
    width 100%;
    height: 100%;
    path {
      fill: #fff;
      opacity: 1;
    }
  }
`;

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false,
      activeImage: 0,
      offset: 0,
      fullscreenActiveImage: 0,
      fullscreenOffset: 0,
    };
    this.viewFullscreen = this.viewFullscreen.bind(this);
    this.setActiveImage = this.setActiveImage.bind(this);

    this.escFunction = this.escFunction.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction(event) {
    const { images } = this.props;
    const { fullscreen, activeImage, fullscreenActiveImage } = this.state;
    if (fullscreen) {
      if (event.which === 27) {
        this.setState({
          fullscreen: false
        });
      } else if (event.which === 37 && fullscreenActiveImage > 0) { // leftBtn
        this.setState({
          fullscreenActiveImage: fullscreenActiveImage - 1
        });
      } else if (event.which === 39 && fullscreenActiveImage !== images.length - 1) { // rightBtn
        this.setState({
          fullscreenActiveImage: fullscreenActiveImage + 1
        });
      }
    }

    // } else if (event.which === 38) { // upBtn

    // } else if (event.which === 40) { // downBtn

    // }
  }

  viewFullscreen(status, activeImage = 0) {
    this.setState({
      fullscreen: status,
      fullscreenActiveImage: activeImage,
    });
  }

  setActiveImage(number) {
    this.setState({
      activeImage: number,
      offset: 0,
    });
  }

  handleSwipingNext = (_, offset) => {
    const { fullscreen } = this.state;
    this.setState({
      ...(
        fullscreen ? {
          fullscreenOffset: -offset,
        } : {
          offset: -offset,
        }
      ),
    });
  }

  handleSwipingPrev = (_, offset) => {
    const { fullscreen } = this.state;
    this.setState({
      ...(
        fullscreen ? {
          fullscreenOffset: offset,
        } : {
          offset,
        }
      ),
    });
  }

  handleSwipedNext = () => {
    const { images } = this.props;
    const { fullscreen, activeImage, fullscreenActiveImage } = this.state;

    this.setState({
      ...(
        fullscreen ? {
          fullscreenActiveImage: fullscreenActiveImage !== images.length - 1
            ? fullscreenActiveImage + 1
            : fullscreenActiveImage,
          fullscreenOffset: 0,
        } : {
          activeImage: activeImage !== images.length - 1 ? activeImage + 1 : activeImage,
          offset: 0,
        }
      ),
    });
  }

  handleSwipedPrev = () => {
    const { fullscreen, activeImage, fullscreenActiveImage } = this.state;

    this.setState({
      ...(
        fullscreen ? {
          fullscreenActiveImage: fullscreenActiveImage > 0
            ? fullscreenActiveImage - 1
            : fullscreenActiveImage,
          fullscreenOffset: 0,
        } : {
          activeImage: activeImage > 0 ? activeImage - 1 : activeImage,
          offset: 0,
        }
      )
    });
  }

  render() {
    const { images, isSmallMobile } = this.props;
    const {
      activeImage, offset, fullscreen, fullscreenOffset, fullscreenActiveImage,
    } = this.state;

    return (
      <React.Fragment>
        {fullscreen && (
          <GalleryFullscreen>
            <GalleryFullscreenCloser onClick={() => this.viewFullscreen(false)}>
              <CloseIcon />
            </GalleryFullscreenCloser>
            <GalleryPrev fullscreen onClick={this.handleSwipedPrev}>
              <ArrowDownIcon />
            </GalleryPrev>
            <GalleryFullscreenImages
              activeImage={fullscreenActiveImage}
              trackMouse
              onSwipingLeft={this.handleSwipingNext}
              onSwipingRight={this.handleSwipingPrev}
              onSwipedLeft={this.handleSwipedNext}
              onSwipedRight={this.handleSwipedPrev}
              offset={fullscreenOffset}
            >
              {images.map((image, i) => (
                <GalleryFullscreenImageWrapper
                  key={i}
                  currentImage={i}
                  activeImage={activeImage}
                >
                  <GalleryFullscreenImage
                    src={i === fullscreenActiveImage + 1 || i === fullscreenActiveImage || i === fullscreenActiveImage - 1 ? image : ''}
                    draggable="false"
                  />
                </GalleryFullscreenImageWrapper>
              ))}
            </GalleryFullscreenImages>
            <GalleryNext fullscreen onClick={this.handleSwipedNext}>
              <ArrowDownIcon />
            </GalleryNext>
            <GalleryFullscreenPreview />
          </GalleryFullscreen>
        )}
        <StyledGallery>
          <GalleryScene
            trackMouse
            onSwipingLeft={!isSmallMobile && this.handleSwipingNext}
            onSwipingRight={!isSmallMobile && this.handleSwipingPrev}
            onSwipedLeft={!isSmallMobile && this.handleSwipedNext}
            onSwipedRight={!isSmallMobile && this.handleSwipedPrev}
            onSwipingUp={isSmallMobile && this.handleSwipingNext}
            onSwipingDown={isSmallMobile && this.handleSwipingPrev}
            onSwipedUp={isSmallMobile && this.handleSwipedNext}
            onSwipedDown={isSmallMobile && this.handleSwipedPrev}
            onTap={() => this.viewFullscreen(true, activeImage)}
          >
            <GalleryPrev
              onClick={this.handleSwipedPrev}
            />
            <GallerySceneImages
              activeImage={activeImage}
              offset={offset}
              isSmallMobile={isSmallMobile}
            >
              {images.length > 0 && images.map((image, i) => (
                <GallerySceneImage
                  key={i}
                  image={i === activeImage + 1 || i === activeImage || i === activeImage - 1 ? image : ''}
                />
              ))}
              {images.length === 0 && (
                <GallerySceneImage
                  image="http://api.agent24.pro/fupload/tmp/60b07355c02749bd9b04c883de98238d"
                />
              )}
            </GallerySceneImages>
            <GalleryNext
              onClick={this.handleSwipedNext}
            />
          </GalleryScene>
          {images.length > 0 && (
            <GalleryPreview>
              <GalleryPreviewImages
                activeImage={activeImage}
                images={images}
                isSmallMobile={isSmallMobile}
              >
                {images.map((image, i) => (
                  <GalleryPreviewImage
                    key={i}
                    image={image}
                    {...(activeImage === i ? {
                      active: true,
                    } : {})}
                    onClick={() => this.setActiveImage(i)}
                  />
                ))}
              </GalleryPreviewImages>
            </GalleryPreview>
          )}
          
          <StyledDotNav
            total={images.length}
            current={activeImage + 1}
            handleChange={this.setActiveImage}
          />
        </StyledGallery>
      </React.Fragment>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
  isExtraSmallMobile: width >= 480,
  isSmallMobile: width >= 576,
  isTablet: width >= 768,
  isDesktop: width >= 1024,
  isDesktopLarge: width >= 1280,
  isDesktopExtraLarge: width >= 1400,
});

export default withSizes(mapSizesToProps)(Gallery);
