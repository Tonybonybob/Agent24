// import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ theme }) => theme.common.padding.default};
  padding-right: ${({ theme }) => theme.common.padding.default};
  box-sizing: border-box;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: ${({ theme }) => theme.common.padding.md};
    padding-right: ${({ theme }) => theme.common.padding.md};
  }
`;

export default Container;
