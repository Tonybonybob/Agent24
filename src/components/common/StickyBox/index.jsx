import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

const getScrollParent = node => {
  let offsetParent = node;
  // eslint-disable-next-line no-cond-assign, prefer-destructuring
  while ((offsetParent = offsetParent.offsetParent)) {
    const overflowYVal = getComputedStyle(offsetParent, null).getPropertyValue(
      'overflow-y'
    );
    if (overflowYVal === 'auto' || overflowYVal === 'scroll')
      return offsetParent;
  }
  return window;
};

const offsetTill = (node, target) => {
  let current = node;
  let offset = 0;
  do {
    offset += current.offsetTop;
    current = current.offsetParent;
  } while (current && current !== target);
  return offset;
};

const stickyProp = 'fixed';

export default class StickyBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: null };
    this.wasAtBottom = false;
    this.nodeReplacement = React.createRef();
  }

  componentDidMount() {
    if (window.pageYOffset > this.naturalTop) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ mode: 'stickyTop' });
      this.mode = 'stickyTop';
      this.node.style.position = 'fixed';
      this.node.style.top = 0;
    }
  }

  setStickyTop(top = 0) {
    this.setState({ mode: 'stickyTop' });
    this.mode = 'stickyTop';
    this.node.style.position = 'fixed';
    this.node.style.top = `${top}px`;
  }

  setStickyBottom(top = 0) {
    this.setState({ mode: 'stickyBottom' });
    this.mode = 'stickyBottom';
    this.node.style.position = stickyProp;
    this.node.style.top = `${top}px`;
  }

  setRelative(top = 0) {
    this.setState({ mode: 'relative' });
    this.mode = 'relative';
    this.node.style.position = 'relative';
    this.node.style.top = `${top}px`;
  }

  registerContainerRef = n => {
    if (!stickyProp) return;
    this.node = n;
    if (n) {
      this.scrollPane = getScrollParent(this.node);
      this.latestScrollY =
        this.scrollPane === window ? window.scrollY : this.scrollPane.scrollTop;
      this.scrollPane.addEventListener('scroll', this.handleScroll);
      this.scrollPane.addEventListener('mousewheel', this.handleScroll);
      if (this.scrollPane === window) {
        window.addEventListener('resize', this.updateViewport);
        this.updateViewport();
      } else {
        this.rosp = new ResizeObserver(this.updateScrollPane);
        this.rosp.observe(this.scrollPane);
        this.updateScrollPane();
      }
      this.ropn = new ResizeObserver(this.updateParentNode);
      this.ropn.observe(this.node.parentNode);
      this.updateParentNode();

      this.ron = new ResizeObserver(this.updateNode);
      this.ron.observe(this.node);
      this.updateNode();

      this.initial();
    } else {
      this.scrollPane.removeEventListener('mousewheel', this.handleScroll);
      this.scrollPane.removeEventListener('scroll', this.handleScroll);
      if (this.scrollPane === window) {
        window.removeEventListener('resize', this.getMeasurements);
      } else {
        this.rosp.disconnect();
      }
      this.ropn.disconnect();
      this.ron.disconnect();
      this.scrollPane = null;
    }
  };

  updateViewport = () => {
    this.viewPortHeight = window.innerHeight;
    this.scrollPaneOffset = 0;
    if (this.node && this.viewPortHeight < this.nodeHeight) {
      const parent = this.node.parentNode.getBoundingClientRect();
      const parentStyle = window.getComputedStyle(this.node.parentNode);
      if (
        parent.bottom - parseInt(parentStyle.paddingBottom, 10) >
        this.viewPortHeight
      ) {
        if (window.pageYOffset > this.naturalTop) {
          this.setStickyTop(
            this.viewPortHeight - this.nodeHeight + this.scrollPaneOffset
          );
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (window.pageYOffset > this.naturalTop) {
          if (
            parent.bottom - parseInt(parentStyle.paddingBottom, 10) >
            this.viewPortHeight
          ) {
            this.setStickyTop();
          } else {
            this.setStickyTop(
              this.viewPortHeight - this.nodeHeight + this.scrollPaneOffset
            );
          }
        } else {
          this.setRelative();
        }
      }
    } else if (this.node && this.viewPortHeight > this.nodeHeight) {
      if (this.node && this.node.getBoundingClientRect().top < 0) {
        this.setStickyTop();
      } else {
        this.setRelative();
      }
    }
  };

  updateScrollPane = () => {
    this.viewPortHeight = this.scrollPane.offsetHeight;
    this.scrollPaneOffset = this.scrollPane.getBoundingClientRect().top;
  };

  updateParentNode = () => {
    const { parentNode } = this.node;
    const computedParentStyle = getComputedStyle(parentNode, null);
    const parentPaddingTop = parseInt(
      computedParentStyle.getPropertyValue('padding-top'),
      10
    );
    const parentPaddingBottom = parseInt(
      computedParentStyle.getPropertyValue('padding-bottom'),
      10
    );
    const verticalParentPadding = parentPaddingTop + parentPaddingBottom;
    this.naturalTop =
      offsetTill(parentNode, this.scrollPane) +
      parentPaddingTop +
      this.scrollPaneOffset;
    this.parentHeight =
      parentNode.getBoundingClientRect().height - verticalParentPadding;
  };

  updateNode = () => {
    this.nodeHeight = this.node.getBoundingClientRect().height;
  };

  handleScroll = () => {
    const scrollY =
      this.scrollPane === window ? window.scrollY : this.scrollPane.scrollTop;
    const scrollDelta = scrollY - this.latestScrollY;
    if (scrollY === this.latestScrollY) return;
    if (this.nodeHeight <= this.viewPortHeight) {
      // if node smaller than viewport
      if (scrollDelta > 0) {
        // scroll down small
        if (this.mode === 'relative') {
          if (this.latestScrollY >= this.naturalTop) {
            this.setStickyTop();
          }
        }
        if (this.mode === 'stickyTop') {
          if (this.latestScrollY >= this.naturalTop) {
            this.setState({ mode: 'stickyTop' });
            this.node.style.position = 'fixed';
            this.node.style.top = 0;
          }
          if (this.node && this.node.parentNode) {
            const parent = this.node.parentNode.getBoundingClientRect();
            const nodeBottom = this.node.getBoundingClientRect().bottom;
            if (nodeBottom >= parent.bottom) {
              const heightBeforeNode = this.parentHeight - this.nodeHeight;
              this.setRelative(heightBeforeNode);
            }
          }
        }
      } else {
        // scroll up small
        if (this.mode === 'stickyTop') {
          if (this.latestScrollY < this.naturalTop) {
            this.setRelative();
          }
        }
        if (this.mode === 'relative') {
          const nodeTop = this.node.getBoundingClientRect().top;
          if (nodeTop >= 0 && this.latestScrollY > this.naturalTop) {
            this.setStickyTop();
          }
        }
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (scrollDelta > 0) {
        // scroll down =============================
        if (this.mode === 'stickyTop') {
          if (scrollY + this.scrollPaneOffset > this.naturalTop) {
            this.offset = Math.max(
              0,
              this.scrollPaneOffset + this.latestScrollY - this.naturalTop
            );
            this.setRelative(this.offset);
          }
        } else if (this.mode === 'relative') {
          if (this.node && this.node.parentNode) {
            const parent = this.node.parentNode.getBoundingClientRect();
            const parentStyle = window.getComputedStyle(this.node.parentNode);
            if (
              parent.bottom - parseInt(parentStyle.paddingBottom, 10) >
              this.viewPortHeight
            ) {
              if (
                scrollY + this.scrollPaneOffset + this.viewPortHeight >
                this.naturalTop + this.nodeHeight + this.offset
              ) {
                this.setState({ mode: 'stickyTop' });
                this.mode = 'stickyBottom';
                this.node.style.position = stickyProp;
                this.node.style.top = `${this.viewPortHeight -
                  this.nodeHeight +
                  this.scrollPaneOffset}px`;
              }
            }
          }
        } else if (this.mode === 'stickyBottom') {
          if (this.node && this.node.parentNode) {
            const parent = this.node.parentNode.getBoundingClientRect();
            const parentStyle = window.getComputedStyle(this.node.parentNode);
            if (
              parent.bottom - parseInt(parentStyle.paddingBottom, 10) <=
              this.viewPortHeight
            ) {
              this.setRelative(this.parentHeight - this.nodeHeight);
              this.wasAtBottom = true;
            }
          }
        }
      } else {
        // scroll up ===============================
        // eslint-disable-next-line no-lonely-if
        if (this.mode === 'stickyBottom') {
          if (
            this.scrollPaneOffset + scrollY + this.viewPortHeight <
            this.naturalTop + this.parentHeight
          ) {
            this.offset =
              this.scrollPaneOffset +
              this.latestScrollY +
              this.viewPortHeight -
              (this.naturalTop + this.nodeHeight);
            this.setRelative(this.offset);
          }
          if (this.scrollPaneOffset + scrollY < this.naturalTop) {
            this.node.style.position = 'relative';
            this.node.style.top = 0;
          }
        } else if (this.mode === 'relative') {
          if (this.scrollPaneOffset + scrollY < this.naturalTop + this.offset) {
            this.setStickyTop();
          } else if (this.node && this.node.parentNode) {
            const parentStyle = window.getComputedStyle(this.node.parentNode);
            const currentTop =
              this.naturalTop + this.parentHeight - this.nodeHeight;
            const shouldFixTop =
              this.latestScrollY <= currentTop - parentStyle.paddingTop ||
              (this.latestScrollY <= currentTop && this.wasAtBottom);
            if (shouldFixTop) {
              this.setStickyTop();
              this.wasAtBottom = false;
            }
          }
        } else if (this.mode === 'stickyTop') {
          if (this.latestScrollY <= this.naturalTop) {
            this.setState({ mode: 'relative' });
            this.mode = 'stickyTop';
            this.node.style.position = 'relative';
            this.node.style.top = 0;
          }
        }
      }
    }
    this.latestScrollY = scrollY;
  };

  initial() {
    const { bottom } = this.props;
    if (bottom) {
      if (this.mode !== 'stickyBottom') {
        this.setStickyBottom(this.viewPortHeight - this.nodeHeight);
      }
    } else if (this.mode !== 'stickyTop') {
      this.viewPortHeight = window.innerHeight;
      if (this.node && this.viewPortHeight < this.nodeHeight) {
        this.setState({ mode: 'relative' });
        this.mode = 'stickyTop';
        this.node.style.position = 'relative';
        this.node.style.top = 0;
      } else {
        // eslint-disable-next-line no-lonely-if
        if (window.pageYOffset > this.naturalTop) {
          this.setState({ mode: 'relative' });
          this.mode = 'stickyTop';
          this.node.style.position = 'fixed';
          this.node.style.top = 0;
        } else {
          this.setState({ mode: 'relative' });
          this.mode = 'stickyTop';
          this.node.style.position = 'relative';
          this.node.style.top = 0;
        }
      }
    }
  }

  render() {
    const { children, className, style, alwaysStyle } = this.props;

    const { mode } = this.state;

    const width = this.node ? this.node.getBoundingClientRect().width : 0;

    const realStyle =
      mode !== 'relative' ? { ...alwaysStyle, ...style } : alwaysStyle;
    return (
      <Fragment>
        <div
          className={className}
          style={{ height: 'max-content', zIndex: 1, ...realStyle }}
          ref={this.registerContainerRef}
        >
          {children}
        </div>
        {mode !== 'relative' && <div style={{ width, flexShrink: 0 }} />}
      </Fragment>
    );
  }
}

StickyBox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({
    height: PropTypes.string,
  }),
  alwaysStyle: PropTypes.shape({
    height: PropTypes.string,
  }),
  bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

StickyBox.defaultProps = {
  className: '',
  style: {},
  alwaysStyle: {},
  bottom: false,
};
