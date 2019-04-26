import React from 'react';
import styled from 'styled-components';

const Col = styled.div`
    flex-grow: ${props => props.default && (props.default.col || props.default.width) ? 0 : 1};
    flex-basis: ${props => props.default && (props.default.col || props.default.width) ? props.default.width ? props.default.width : props.default.col / 12 * 100 + '%' : 0};
    width: ${props => props.default && (props.default.col || props.default.width) ? props.default.width ? props.default.width : props.default.col / 12 * 100 + '%' : '100%'};
    max-width: 100%;
    padding-left: 6px;
    padding-right: 6px;
    box-sizing: border-box;
    margin-left: ${props => props.default && props.default.marginLeft && (props.default.marginLeft.width || props.default.marginLeft.col) ? props.default.marginLeft.width ? props.default.marginLeft.width : props.default.marginLeft.col / 12 * 100 + '%' : '0'};
    margin-right: ${props => props.default && props.default.marginRight && (props.default.marginRight.width || props.default.marginRight.col) ? props.default.marginRight.width ? props.default.marginRight.width : props.default.marginRight.col / 12 * 100 + '%' : '0'}
    ${props => props.default && props.default.styles}
    ${props => (
    props.xs && `
        @media (min-width: ${props.theme.breakpoints.xs}) {
          flex-grow: ${props.xs.col || props.xs.width ? 0 : 1};
          flex-basis: ${props.xs.col || props.xs.width ? props.xs.width ? props.xs.width : props.xs.col / 12 * 100 + '%' : 0};
          width: ${props.xs.col || props.xs.width ? props.xs.width ? props.xs.width : props.xs.col / 12 * 100 + '%' : '100%'};
        }
      `
  )}
    ${props => (
    props.sm && `
        @media (min-width: ${props.theme.breakpoints.sm}) {
          flex-grow: ${props.sm.col || props.sm.width ? 0 : 1};
          flex-basis: ${props.sm.col || props.sm.width ? props.sm.width ? props.sm.width : props.sm.col / 12 * 100 + '%' : 0};
          width: ${props.sm.col || props.sm.width ? props.sm.width ? props.sm.width : props.sm.col / 12 * 100 + '%' : '100%'};
        }
      `
  )}
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      padding-left: 10px;
      padding-right: 10px;
      ${props => (
    props.md && `
          flex-grow: ${props.md.col || props.md.width ? 0 : 1};
          flex-basis: ${props.md.col || props.md.width ? props.md.width ? props.md.width : props.md.col / 12 * 100 + '%' : 0};
          width: ${props.md.col || props.md.width ? props.md.width ? props.md.width : props.md.col / 12 * 100 + '%' : '100%'};
        `
  )}
    }
    ${props => (
    props.lg && `
        @media (min-width: ${props.theme.breakpoints.lg}) {
          flex-grow: ${props.lg.col || props.lg.width ? 0 : 1};
          flex-basis: ${props.lg.col || props.lg.width ? props.lg.width ? props.lg.width : props.lg.col / 12 * 100 + '%' : 0};
          width: ${props.lg.col || props.lg.width ? props.lg.width ? props.lg.width : props.lg.col / 12 * 100 + '%' : '100%'};
        }
      `
  )}
    ${props => (
    props.xl && `
        @media (min-width: ${props.theme.breakpoints.xl}) {
          flex-grow: ${props.xl.col || props.xl.width ? 0 : 1};
          flex-basis: ${props.xl.col || props.xl.width ? props.xl.width ? props.xl.width : props.xl.col / 12 * 100 + '%' : 0};
          width: ${props.xl.col || props.xl.width ? props.xl.width ? props.xl.width : props.xl.col / 12 * 100 + '%' : '100%'};
        }
      `
  )}
`;

const NewCol = ({ ...other }) => (
  <Col {...other} />
);

export default NewCol;
