import React from 'react';
import styled from 'styled-components';

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -6px;
  margin-right: -6px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: -10px;
    margin-right: -10px;
  }
`;

const Row = ({ ...other }) => (
  <StyledRow {...other} />
)


export default Row;
