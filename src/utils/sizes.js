import _withSizes from 'react-sizes';

const mapSizesToProps = ({ width, ...other }) => ({
  isSmallMobile: width < 576,
  isMobile: width >= 576,
  isTablet: width >= 768,
  isDesktop: width >= 1024,
  isDesktopLarge: width >= 1280,
  isDesktopExtraLarge: width >= 1400,
  isDesktopExtraExtraLarge: width >= 1440,
  ...other,
});

// eslint-disable-next-line import/prefer-default-export
export const withSizes = _withSizes(mapSizesToProps);
