
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDotNav = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  width: 160px;
  margin-left: auto;
  margin-right: auto;
`;

const DotNavItemContainer = styled.div`
  ${({ transition }) => (transition ? `transition:${transition};` : '')}
  ${({ marginLeft }) => (marginLeft ? `margin-left:${marginLeft};` : '')}
  flex-shrink: 0;
  flex-basis: 14.28%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DotNavItem = styled.div`
  width 8px;
  height 8px;
  border-radius 100%;
  background ${props => (props.active ? 'linear-gradient(270deg, rgba(0, 151, 167, 0.72) 0%, rgba(21, 190, 160, 0.72) 100%), #15BEA0' : '#D0D8DC')};
  cursor pointer;
`;

class DotNav extends Component {
  render() {
    const { total, current, handleChange, className } = this.props;

    const dotNavItems = [];
    let beforeDotUsed = false;
    let afterDotUsed = false;
    let dotToOffset = 0;

    for (let i = 1; i <= total; i++) {
      if (current > 3 && i < current - 2 && i !== total - 3) {
        if (beforeDotUsed) {
          dotToOffset += 1;
        }
        beforeDotUsed = true;
      }
    }

    for (let i = 1; i <= total; i++) {
      if (current <= 3) {
        if (i >= 1 && i <= 3) {
          if (i === current) {
            dotNavItems.push(
              <DotNavItemContainer className="dotNav__container" key={i}>
                <DotNavItem className="dotNav__item" active onClick={() => { handleChange(i - 1); }} />
              </DotNavItemContainer>,
            );
          } else {
            dotNavItems.push(
              <DotNavItemContainer className="dotNav__container" key={i}>
                <DotNavItem className="dotNav__item" nearest onClick={() => { handleChange(i - 1); }} />
              </DotNavItemContainer>,
            );
          }
        } else if (i === 4) {
          dotNavItems.push(
            <DotNavItemContainer className="dotNav__container" key={i}>
              <DotNavItem className="dotNav__item" near onClick={() => { handleChange(i - 1); }} />
            </DotNavItemContainer>,
          );
        } else if (!afterDotUsed) {
          dotNavItems.push(
            <DotNavItemContainer className="dotNav__container" key={i}>
              <DotNavItem className="dotNav__item" onClick={() => { handleChange(i - 1); }} />
            </DotNavItemContainer>,
          );
          afterDotUsed = true;
        }
      } else if (i === current) {
        dotNavItems.push(
          <DotNavItemContainer className="dotNav__container" key={i}>
            <DotNavItem className="dotNav__item" active onClick={() => { handleChange(i - 1); }} />
          </DotNavItemContainer>,
        );
      } else if (i === current - 1 || i === current + 1 || i === current - 2 && current === total) {
        dotNavItems.push(
          <DotNavItemContainer className="dotNav__container" key={i}>
            <DotNavItem className="dotNav__item" nearest onClick={() => { handleChange(i - 1); }} />
          </DotNavItemContainer>,
        );
      } else if (i === current - 2 || i === current + 2 || i === current - 3 && current === total) {
        dotNavItems.push(
          <DotNavItemContainer className="dotNav__container" key={i}>
            <DotNavItem className="dotNav__item" near onClick={() => { handleChange(i - 1); }} />
          </DotNavItemContainer>,
        );
      } else if (i < current && current !== 4 || i > current && !afterDotUsed) {
        dotNavItems.push(
          <DotNavItemContainer
            key={i}
            className="dotNav__container"
            transition={i === 1 ? 'margin-left 0.15s ease-in-out' : false}
            marginLeft={i === 1 ? `-${dotToOffset * 14.28}%` : false}
          >
            <DotNavItem className="dotNav__item" onClick={() => { console.log(this.props); handleChange(i - 1); }} />
          </DotNavItemContainer>,
        );
        if (i > current) {
          afterDotUsed = true;
        }
      }
    }
    return (
      <StyledDotNav className={`dotNav ${className}`}>
        {dotNavItems}
      </StyledDotNav>
    );
  }
}

DotNav.propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

DotNav.defaultProps = {
  className: '',
};

export default DotNav;
